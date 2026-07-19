import images from "./data/images.json"

export const site = {
  name: "Develop EC",
  by: "by Adamopoulos & Partners",
  tagline: "Από τη Μελέτη στην Κατασκευή",
  taglineEn: "From Design to Construction",
  email: "adamopoulos.gm@gmail.com",
  instagram: "@adamopoulos_ge",
  instagramUrl: "https://www.instagram.com/adamopoulos_ge",
  locations: "Πύργος Ηλείας & Αθήνα",
}

export const nav = [
  { label: "Έργα", href: "#projects" },
  { label: "Υπηρεσίες", href: "#services" },
  { label: "Σχετικά", href: "#about" },
  { label: "Επικοινωνία", href: "#contact" },
]

export const hero = {
  video: "/projects/hero/drone-hero.mp4",
  poster: "/projects/hero/poster.jpg",
}

export const cinematic = {
  frames: images["hero-frames"],
  caption: "Κάθε έργο, μια υπογραφή.",
  captionSub: "Σχεδιάζουμε και κατασκευάζουμε με ακρίβεια μηχανικού και ματιά αρχιτέκτονα.",
}

export const services = [
  {
    index: "01",
    title: "Μελέτη",
    text: "Αρχιτεκτονικές και στατικές μελέτες που συνδυάζουν αισθητική και λειτουργικότητα.",
  },
  {
    index: "02",
    title: "Αδειοδότηση",
    text: "Πλήρης διαχείριση αδειοδοτήσεων και ένταξη σε αναπτυξιακά προγράμματα.",
  },
  {
    index: "03",
    title: "Κατασκευή",
    text: "Κατασκευή υψηλών προδιαγραφών με έμφαση στην ποιότητα και τη βιωσιμότητα.",
  },
]

export const projects = [
  {
    id: "polykatoikia-tsaldari",
    title: "Πολυκατοικία Τσαλδάρη",
    location: "Πύργος Ηλείας",
    type: "Πολυκατοικία",
    description:
      "Ανέγερση 5όροφης πολυκατοικίας με ισόγεια καταστήματα. Minimal σχεδιασμός, μεγάλα ανοίγματα, εξώστες έως 3m, smart home, ενεργειακή κλάση Α+.",
    images: images["01-polykatoikia-pyrgos"],
  },
  {
    id: "athlitiko-kentro",
    title: "Κλειστό Αθλητικό Κέντρο",
    location: "Ηλεία",
    type: "Δημόσιο Έργο",
    description: "Μελέτη και κατασκευή κλειστού αθλητικού κέντρου στην Ηλεία.",
    images: images["02-kleisto-athlitiko-kentro"],
  },
  {
    id: "touristika-katalymata",
    title: "Τουριστικά Καταλύματα",
    location: "Ηλεία",
    type: "Τουριστική Μονάδα",
    description: "Ανέγερση νέας μονάδας τουριστικών καταλυμάτων στην Ηλεία.",
    images: images["03-touristika-katalymata"],
  },
  {
    id: "katoikia-chalandri",
    title: "Κατοικία Χαλανδρίου",
    location: "Χαλάνδρι, Αττική",
    type: "Κατοικία",
    description: "Ιδιωτική κατοικία υψηλών προδιαγραφών στο Χαλάνδρι.",
    images: images["04-chalandri"],
  },
  {
    id: "katoikia-pyrgou",
    title: "Κατοικία Πύργου",
    location: "Πύργος Ηλείας",
    type: "Κατοικία",
    description: "Σύγχρονη ιδιωτική κατοικία στον Πύργο Ηλείας.",
    images: images["05-pyrgos-villa"],
  },
  {
    id: "ergo-milou",
    title: "Έργο Μήλου",
    location: "Νήσος Μήλος",
    type: "Κατασκευή",
    description: "Κατασκευαστικό έργο στη νήσο Μήλο.",
    images: images["06-milos-island"],
  },
  {
    id: "polykatoikia-attikis",
    title: "Πολυκατοικία Αττικής",
    location: "Αττική",
    type: "Πολυκατοικία",
    description: "Ολοκληρωμένη πολυκατοικία στην Αττική.",
    images: images["07-completed-building"],
  },
]

export const process = {
  title: "Η Διαδικασία",
  images: images["construction-process"],
}

export const about = {
  heading: "Γεώργιος Αδαμόπουλος",
  sub: "MSc Δομοστατικός Πολιτικός Μηχανικός · ΕΜΠ",
  text: "Με σπουδές στο Εθνικό Μετσόβιο Πολυτεχνείο και μεταπτυχιακό στην Τοπική Ανάπτυξη από το Πανεπιστήμιο Πειραιώς, ο Γεώργιος Αδαμόπουλος ηγείται της Develop EC με ένα όραμα: κάθε έργο να παραδίδεται άρτιο — από την πρώτη γραμμή της μελέτης έως το τελευταίο υλικό της κατασκευής. Με παρουσία σε Ηλεία, Αττική, Κυκλάδες, Θεσσαλία, Μεσσηνία και Ιόνιο, η εταιρεία προσφέρει ολοκληρωμένες υπηρεσίες — από τον σχεδιασμό και τη χρηματοδότηση μέχρι την κατασκευή.",
  image: "/projects/construction-process/photo_10_2026-07-18_00-20-46.jpg",
  stats: [
    { value: "50+", label: "Έργα" },
    { value: "8+", label: "Χρόνια" },
    { value: "6", label: "Περιφέρειες" },
  ],
}

export const contact = {
  heading: "Επικοινωνία",
  sub: "Συζητήστε μαζί μας το επόμενο έργο σας.",
  fields: { name: "Όνομα", email: "Email", message: "Μήνυμα" },
  submit: "Επικοινωνήστε",
}

export const footer = {
  copyright: `© ${new Date().getFullYear()} Develop EC. All rights reserved.`,
  credit: "Website by Evriel Systems",
  privacy: "Privacy Policy",
}
