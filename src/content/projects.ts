export interface StoryCaption {
  kicker: string
  text: string
}

export interface Project {
  slug: string
  name: string
  location: string
  type: string
  status: string
  year: string
  services: string
  description: string
  /** captions keyed by photo index (1-based) for the split layout blocks */
  captions: Record<number, StoryCaption>
  photoCount: number
}

const media = (slug: string) => `/media/projects/${slug}`

export const projectMedia = {
  thumb: (p: Project) => `${media(p.slug)}/thumb.webp`,
  video: (p: Project) => `${media(p.slug)}/video.mp4`,
  poster: (p: Project) => `${media(p.slug)}/poster.jpg`,
  photo: (p: Project, n: number, mobile = false) =>
    `${media(p.slug)}/${String(n).padStart(2, "0")}${mobile ? "-m" : ""}.webp`,
}

export const projects: Project[] = [
  {
    slug: "katakolo-retreats",
    name: "Katakolo Seaside Retreats",
    location: "Katakolo, Ilia",
    type: "Tourism",
    status: "Under Construction",
    year: "2026",
    services: "Design · Licensing · Construction",
    description:
      "A cluster of self-catering tourist residences set among mature gardens a short walk from the port of Katakolo. Timber pergolas and clay-tiled roofs shade private pools, while each unit opens onto its own landscaped court — a quiet, low-rise settlement that grows out of the olive landscape rather than sitting on top of it.",
    captions: {
      2: {
        kicker: "The settlement",
        text: "Seen from above, the residences read as a village — small roofs gathered around water, connected by garden paths.",
      },
      3: {
        kicker: "Private courts",
        text: "Every unit holds its own pool and terrace, framed by pergolas that filter the western Peloponnese light.",
      },
      5: {
        kicker: "Materiality",
        text: "Clay tile, warm timber and rough stone — a palette drawn directly from the rural buildings of Ilia.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "pyrgos-luxury-complex",
    name: "Pyrgos Grand Residences",
    location: "Pyrgos, Ilia",
    type: "Residential",
    status: "Completed",
    year: "2025",
    services: "Architectural Study · Structural Study · Supervision",
    description:
      "A luxury residential complex for the centre of Pyrgos. Deep balconies wrapped in dark metal and warm timber slats give the building its horizontal rhythm, while a planted roof garden crowns the composition. At street level, a double-height entrance colonnade lined with palms brings an unexpected generosity to the urban block.",
    captions: {
      2: {
        kicker: "Street presence",
        text: "Layered balconies in dark steel and iroko timber turn the façade into a play of shadow and depth.",
      },
      3: {
        kicker: "The entrance",
        text: "A covered walkway of slatted timber leads residents from the street to the lobby beneath the palms.",
      },
      5: {
        kicker: "Living outdoors",
        text: "Each apartment extends into a sheltered outdoor room, usable through every month of the Greek year.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "archos-villa",
    name: "Archos Villa",
    location: "Cyclades",
    type: "Tourism",
    status: "Completed",
    year: "2024",
    services: "Design · Licensing · Construction",
    description:
      "A vaulted stone-and-plaster villa standing alone in the dry Cycladic landscape. The great arch of the upper floor recalls the island's chapels and cisterns, reinterpreted in exposed masonry and white render. An infinity pool stretches toward the horizon, separating the house from the endless line of the Aegean.",
    captions: {
      2: {
        kicker: "The arch",
        text: "A single monumental vault organises the whole house, holding the bedroom loggia above the shaded terrace.",
      },
      3: {
        kicker: "Stone and render",
        text: "Local dry stone meets smooth white plaster — the two materials of the Cyclades, set in quiet opposition.",
      },
      5: {
        kicker: "Toward the sea",
        text: "The pool terrace is detailed as a continuation of the landscape, its edge dissolving into the horizon.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "chalandri-residence",
    name: "Chalandri Residence",
    location: "Chalandri, Attica",
    type: "Residential",
    status: "Completed",
    year: "2023",
    services: "Architectural Study · Structural Study · Construction",
    description:
      "A sculptural private residence on a corner plot in the northern suburbs of Athens. Two white cantilevered volumes slide past one another above a glazed ground floor, while a screen of black steel fins wraps the garden boundary. The house is composed to be read in motion — from the street it changes with every step.",
    captions: {
      2: {
        kicker: "Composition",
        text: "Two orthogonal volumes, shifted and cantilevered — the structural frame made into the architecture itself.",
      },
      3: {
        kicker: "The corner",
        text: "At the junction of two streets the house presents its sharpest edge, a white prow above the dark fence line.",
      },
      5: {
        kicker: "Light and glass",
        text: "Full-height glazing dissolves the ground floor, letting the garden flow beneath the floating upper storey.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "elaia-residences",
    name: "Elaia Garden Residences",
    location: "Ilia",
    type: "Residential",
    status: "Completed",
    year: "2025",
    services: "Design · Licensing · Construction",
    description:
      "A row of garden townhouses that pairs exposed concrete frames with infill walls of local stone. Hanging planting spills from the roof slabs over double-height verandas, and each residence steps back behind its own pool court. The ensemble proves that repeatable housing can still feel individually crafted.",
    captions: {
      2: {
        kicker: "The frame",
        text: "An exposed concrete grid gives the row its order; stone, timber and greenery give each house its character.",
      },
      3: {
        kicker: "Pool courts",
        text: "Between street and living room, a private landscape of water, stone paving and Mediterranean planting.",
      },
      5: {
        kicker: "Green edges",
        text: "Cascading planting softens every slab edge, knitting the architecture into its garden setting.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "kourouta-beach-villas",
    name: "Kourouta Beach Villas",
    location: "Kourouta, Ilia",
    type: "Tourism",
    status: "Completed",
    year: "2024",
    services: "Design · Licensing · Construction",
    description:
      "Twin villas a few steps from the long sandy beach of Kourouta. Behind a rhythmic timber fence, the houses rise among palms and cycads — smooth white volumes with glazed corners and cantilevered canopies. The architecture is deliberately calm, letting the exuberant coastal garden carry the atmosphere.",
    captions: {
      2: {
        kicker: "Behind the fence",
        text: "A slatted timber boundary filters views from the beach road, revealing the villas gradually through the palms.",
      },
      3: {
        kicker: "Twin volumes",
        text: "Two mirrored houses share one composition — connected by a floating canopy over the entrance court.",
      },
      5: {
        kicker: "Coastal garden",
        text: "Dense subtropical planting turns the plot into an oasis, shading terraces through the long summer season.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "cycladic-hillside",
    name: "Hillside Residences",
    location: "Cyclades",
    type: "Tourism",
    status: "Completed",
    year: "2023",
    services: "Design · Licensing · Construction",
    description:
      "A terraced complex of white and stone residences stepping down a rocky island hillside. Dry-stone retaining walls carry the tradition of the agricultural terraces they replace, while timber balconies and pergolas hang from the crisp white volumes above. Bougainvillea marks the thresholds between built and wild.",
    captions: {
      2: {
        kicker: "On the terraces",
        text: "The buildings follow the old field walls, each level claiming its own view over the Aegean below.",
      },
      3: {
        kicker: "Two traditions",
        text: "Whitewashed cubes and rough island masonry — the complex mediates between village and landscape.",
      },
      5: {
        kicker: "Thresholds",
        text: "Timber-railed balconies and stone stairs stitch the units together into one continuous promenade.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "pyrgos-urban-residences",
    name: "Pyrgos Urban Residences",
    location: "Pyrgos, Ilia",
    type: "Residential",
    status: "Completed",
    year: "2025",
    services: "Architectural Study · Structural Study · Construction",
    description:
      "A contemporary apartment building that resets the standard for its street. Between two white frames, a dark glazed core steps back floor by floor behind continuous balconies. The pilotis level keeps the ground open for parking and planting, and the crowning slab throws deep shade over the roof terrace.",
    captions: {
      2: {
        kicker: "The frame",
        text: "A white perimeter frame holds the dark glass volume — a clear, legible diagram of structure and skin.",
      },
      3: {
        kicker: "In context",
        text: "Set among the ochre apartment blocks of Pyrgos, the building modernises the street without shouting.",
      },
      5: {
        kicker: "Open ground",
        text: "The pilotis dissolves the base into shadow, cars and gardens sliding beneath the floating floors.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "olive-grove-villas",
    name: "Olive Grove Villas",
    location: "Messinia",
    type: "Residential",
    status: "Completed",
    year: "2024",
    services: "Design · Licensing · Construction",
    description:
      "Two stone-and-concrete villas set into a hillside of olives and lavender. Deep horizontal roof slabs float above walls of golden fieldstone, and a shared pool terrace bridges between the houses. The landscape design treats the native scrub as a garden, mowing paths through it rather than replacing it.",
    captions: {
      2: {
        kicker: "Floating roofs",
        text: "Thin concrete planes hover over the stone walls, their shadows drawing long horizontals across the site.",
      },
      3: {
        kicker: "Golden stone",
        text: "Fieldstone gathered from the plot returns to the walls, tying the new houses to their ground.",
      },
      5: {
        kicker: "The pool terrace",
        text: "A shared deck of pale stone holds the water between the two houses, facing the evening sun.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "pyrgos-hilltop-villa",
    name: "Hilltop Villa",
    location: "Pyrgos, Ilia",
    type: "Residential",
    status: "Completed",
    year: "2025",
    services: "Architectural Study · Structural Study · Construction",
    description:
      "A panoramic villa on the heights above the city, looking over rooftops to the Ionian Sea. Two long horizontal slabs frame a glazed living level that opens on all sides to terraces, lawn and pool. The white perimeter wall creates a private plateau — inside it, only sky, water and the distant skyline.",
    captions: {
      2: {
        kicker: "The plateau",
        text: "House, lawn and pool share one artificial ground, cut cleanly into the crown of the hill.",
      },
      3: {
        kicker: "Horizontals",
        text: "Two parallel slabs compress the view into a wide cinematic band of sea and city.",
      },
      5: {
        kicker: "Evening light",
        text: "As the sun drops toward the Ionian, the glazed core turns lantern — the house glows from within.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "ilia-tourist-residences",
    name: "Ilia Tourist Residences",
    location: "Ilia",
    type: "Tourism",
    status: "Completed",
    year: "2024",
    services: "Design · Licensing · Construction",
    description:
      "A new unit of tourist residences terraced into an olive-covered slope. Board-marked concrete, local stone and planted roofs let the buildings recede into the grove, while each residence keeps a private pool aligned with the sea horizon. The section does the work: every roof is the next terrace's garden.",
    captions: {
      2: {
        kicker: "Into the slope",
        text: "The residences step with the land, each roof slab becoming a planted foreground for the unit above.",
      },
      3: {
        kicker: "Concrete and stone",
        text: "Board-marked concrete frames sit on rough stone plinths — robust materials left honestly exposed.",
      },
      5: {
        kicker: "Water lines",
        text: "Long narrow pools echo the horizon line, doubling the sky at every level of the complex.",
      },
    },
    photoCount: 6,
  },
  {
    slug: "ilia-industrial-unit",
    name: "Ilia Industrial Unit",
    location: "Ilia",
    type: "Industrial",
    status: "Completed",
    year: "2023",
    services: "Structural Study · Licensing · Construction",
    description:
      "A steel-framed industrial building that takes its public face seriously. The long white envelope is cut by a single dark entrance volume — a folded canopy of angled glazing that signals the offices within. Generous landscaping and brick-paved forecourts make an industrial program feel like a corporate campus.",
    captions: {
      2: {
        kicker: "The cut",
        text: "One precise dark incision in the white envelope concentrates all the building's expression at the entrance.",
      },
      3: {
        kicker: "Steel logic",
        text: "A clear-span steel frame keeps the production floor free — the architecture lives in the envelope.",
      },
      5: {
        kicker: "The forecourt",
        text: "Brick paving, lavender and young trees receive visitors — dignity is part of the industrial brief.",
      },
    },
    photoCount: 6,
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
