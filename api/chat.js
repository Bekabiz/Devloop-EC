// Develop EC — chat assistant proxy.
// The OpenAI key lives ONLY in process.env.OPENAI_API_KEY (Vercel env var).
// The browser never talks to OpenAI directly.
import { KNOWLEDGE } from "./_knowledge.js"

const MODEL = "gpt-4o-mini" // upgrade path: change to "gpt-4o" here only
const MAX_TOKENS = 400
const TEMPERATURE = 0.4

const LIMITS = {
  perSessionUserMessages: 12,
  perHour: 30,
  perDay: 100,
  minIntervalMs: 1500,
  maxMessageChars: 500,
  historyMessages: 10,
}

const FRIENDLY = {
  en: {
    error: "Something went wrong on our end. Please try again, or call us on 2621 302634.",
    tooLong: "That message is a little long for chat. Could you shorten it, or call us on 2621 302634?",
    rate: "You have reached the chat limit for now. For anything more detailed, please contact us directly at 2621 302634 or through the contact form.",
    slow: "One moment please, then send your next message.",
  },
  gr: {
    error: "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή καλέστε μας στο 2621 302634.",
    tooLong: "Το μήνυμα είναι λίγο μεγάλο για το chat. Μπορείτε να το συντομεύσετε ή να μας καλέσετε στο 2621 302634;",
    rate: "Φτάσατε το όριο μηνυμάτων για την ώρα. Για οτιδήποτε πιο αναλυτικό, επικοινωνήστε μαζί μας στο 2621 302634 ή μέσω της φόρμας επικοινωνίας.",
    slow: "Μια στιγμή παρακαλώ, και στείλτε το επόμενο μήνυμά σας.",
  },
}

const SYSTEM_PROMPT = `You are the assistant for Develop EC, a Greek construction and civil engineering company. You represent the company to visitors on its website.

YOUR JOB
Be genuinely helpful. Answer questions about the company warmly and in full. You are a knowledgeable representative who wants to help visitors understand what Develop EC does and how it can help them.

ALWAYS ANSWER questions about:
- The company, its history, what it does, how it works
- Any of the projects, individually or as a whole
- Services: studies, design, licensing, permits, construction, supervision, renovation
- The team, Georgios Adamopoulos, qualifications, experience
- Regions and locations where the company works
- Construction and engineering topics generally: how permits work in Greece, ESPA and EU funding, building processes, materials, typical stages of a project
- Anything about starting a project, what the process looks like, what to expect
- Contact details and how to get in touch
- Open questions such as "tell me about Develop EC", "what do you do", "who are you", "can you help me". These are exactly the questions you exist to answer. Answer them properly.

ONLY REFUSE if a question is clearly unrelated to the company or construction. Examples: world population, writing poems, homework help, coding questions, weather, celebrities, other companies. In those cases say briefly:
"I'm here to help with questions about Develop EC and our work. Is there something about our projects or services I can help you with?"
Greek: "Είμαι εδώ για ερωτήσεις σχετικά με την Develop EC και τη δουλειά μας. Μπορώ να σας βοηθήσω με κάτι σχετικό με τα έργα ή τις υπηρεσίες μας;"

Never refuse a question about Develop EC. Never tell a visitor you can only discuss Develop EC when they have just asked about Develop EC. If you are unsure whether something is on topic, answer it.

STYLE RULES
- Never use em dashes or long dashes in your replies. Use commas, full stops, or short connecting words instead. This is a strict formatting rule.
- Keep replies short, roughly two to four sentences, unless the visitor asks for more detail.
- Write in whatever language the visitor writes in. Greek in, Greek out. English in, English out. Switch if they switch. Greek must be natural and professional, not translated English.
- Warm, professional, confident. You represent an established engineering practice.
- No emoji.
- Speak as "we" and "our team". Develop EC is a multidisciplinary practice of civil engineers, architects, structural engineers, surveyors, site supervisors and construction crews, led by Georgios Adamopoulos. Never present it as one person working alone.

ACCURACY
- Never invent prices, timelines, delivery dates, or technical guarantees. Every project is different. For anything requiring a quote or an assessment, invite them to get in touch.
- Never invent project details that are not in your knowledge below.
- If you genuinely do not know something, say so plainly and give the phone number.

CONTACT
Phone 2621 302634, hours 9:00 to 20:00
Email adamopoulosandpartners@gmail.com
Instagram @adamopoulos_ge
Offices in Athens and Pyrgos, Ilia

KNOWLEDGE BASE
${KNOWLEDGE}`

/** strict formatting rule from the client: no em or en dashes in replies */
function cleanDashes(text) {
  return text
    .replace(/\s*—\s*/g, ", ")
    .replace(/\s*–\s*/g, ", ")
    .replace(/\s+,/g, ",")
    .replace(/,\s*,/g, ",")
}

// naive off-topic pre-check for obviously unrelated asks (cheap, best-effort;
// the system prompt is the primary defence)
const OFFTOPIC = /\b(poem|homework|weather|bitcoin|crypto|lyrics|joke|recipe|πο[ιί]ημα|συνταγ|καιρ[οό]ς|αν[εέ]κδοτο)\b/i

/** in-memory per-IP store; resets on cold start, which is acceptable here */
const ipStore = new Map()
function ipState(ip) {
  let s = ipStore.get(ip)
  const now = Date.now()
  if (!s) {
    s = { hour: [], day: [], last: 0 }
    ipStore.set(ip, s)
  }
  s.hour = s.hour.filter((t) => now - t < 3600_000)
  s.day = s.day.filter((t) => now - t < 86_400_000)
  return s
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method" })
    return
  }

  const lang = req.body?.lang === "gr" ? "gr" : "en"
  const msg = FRIENDLY[lang]
  const reply = (text, status = 200) => res.status(status).json({ reply: text })

  try {
    // origin check: only the site itself may call this endpoint
    const origin = String(req.headers.origin || req.headers.referer || "")
    const allowed =
      origin.includes("developec.gr") ||
      origin.includes("vercel.app") ||
      origin.includes("localhost") ||
      origin.includes("127.0.0.1")
    if (!allowed) {
      res.status(403).json({ error: "origin" })
      return
    }

    const ip = String(req.headers["x-forwarded-for"] || "unknown").split(",")[0].trim()
    const state = ipState(ip)
    const now = Date.now()

    if (now - state.last < LIMITS.minIntervalMs) return reply(msg.slow, 429)
    if (state.hour.length >= LIMITS.perHour || state.day.length >= LIMITS.perDay)
      return reply(msg.rate, 429)

    const incoming = Array.isArray(req.body?.messages) ? req.body.messages : []
    const clean = incoming
      .filter(
        (m) =>
          m &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string"
      )
      .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))

    const userMessages = clean.filter((m) => m.role === "user")
    const last = userMessages[userMessages.length - 1]
    if (!last || !last.content.trim()) return reply(msg.error, 400)
    if (last.content.length > LIMITS.maxMessageChars) return reply(msg.tooLong)
    if (userMessages.length > LIMITS.perSessionUserMessages) return reply(msg.rate)

    if (OFFTOPIC.test(last.content)) {
      return reply(
        lang === "gr"
          ? "Είμαι εδώ για ερωτήσεις σχετικά με την Develop EC και τη δουλειά μας. Μπορώ να σας βοηθήσω με κάτι σχετικό με τα έργα ή τις υπηρεσίες μας;"
          : "I'm here to help with questions about Develop EC and our work. Is there something about our projects or services I can help you with?"
      )
    }

    state.last = now
    state.hour.push(now)
    state.day.push(now)

    const history = clean.slice(-LIMITS.historyMessages)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 20_000)
    const oaRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
      }),
    })
    clearTimeout(timeout)

    if (!oaRes.ok) {
      // log status server-side only; never expose upstream details to visitors
      console.error("openai error", oaRes.status)
      return reply(msg.error, 502)
    }
    const data = await oaRes.json()
    const text = data?.choices?.[0]?.message?.content?.trim()
    if (!text) {
      console.error("openai empty response")
      return reply(msg.error, 502)
    }
    return reply(cleanDashes(text))
  } catch (err) {
    console.error("chat handler error", err?.name || err)
    return reply(msg.error, 500)
  }
}
