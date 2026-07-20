export type Lang = "en" | "gr"

export interface StoryCaption {
  kicker: string
  text: string
}

export interface ProjectText {
  name: string
  location: string
  type: string
  status: string
  services: string
  description: string
  /** captions keyed by photo index (1-based) for the split layout blocks */
  captions: Record<number, StoryCaption>
}

export interface Project {
  slug: string
  year: string
  photoCount: number
  i18n: Record<Lang, ProjectText>
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
    year: "2026",
    photoCount: 6,
    i18n: {
      en: {
        name: "Katakolo Seaside Retreats",
        location: "Katakolo, Ilia",
        type: "Tourism",
        status: "Under Construction",
        services: "Design · Licensing · Construction",
        description:
          "A cluster of self-catering tourist residences set among mature gardens a short walk from the port of Katakolo. Timber pergolas and clay-tiled roofs shade private pools, while each unit opens onto its own landscaped court: a quiet, low-rise settlement that grows out of the olive landscape rather than sitting on top of it.",
        captions: {
          2: {
            kicker: "The settlement",
            text: "Seen from above, the residences read as a village: small roofs gathered around water, connected by garden paths.",
          },
          3: {
            kicker: "Private courts",
            text: "Every unit holds its own pool and terrace, framed by pergolas that filter the western Peloponnese light.",
          },
          5: {
            kicker: "Materiality",
            text: "Clay tile, warm timber and rough stone, a palette drawn directly from the rural buildings of Ilia.",
          },
        },
      },
      gr: {
        name: "Παραθαλάσσια Καταλύματα Κατακόλου",
        location: "Κατάκολο, Ηλεία",
        type: "Τουριστικό",
        status: "Υπό κατασκευή",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Ένα σύνολο αυτοεξυπηρετούμενων τουριστικών καταλυμάτων μέσα σε ώριμους κήπους, λίγα βήματα από το λιμάνι του Κατακόλου. Ξύλινες πέργκολες και κεραμοσκεπές σκιάζουν ιδιωτικές πισίνες, ενώ κάθε μονάδα ανοίγει στη δική της διαμορφωμένη αυλή: ένας ήσυχος, χαμηλός οικισμός που αναδύεται μέσα από το τοπίο της ελιάς.",
        captions: {
          2: {
            kicker: "Ο οικισμός",
            text: "Από ψηλά, τα καταλύματα διαβάζονται σαν χωριό: μικρές στέγες γύρω από το νερό, ενωμένες με μονοπάτια κήπου.",
          },
          3: {
            kicker: "Ιδιωτικές αυλές",
            text: "Κάθε μονάδα διαθέτει δική της πισίνα και βεράντα, πλαισιωμένη από πέργκολες που φιλτράρουν το φως της δυτικής Πελοποννήσου.",
          },
          5: {
            kicker: "Υλικότητα",
            text: "Κεραμίδι, ζεστό ξύλο και ακατέργαστη πέτρα, μια παλέτα βγαλμένη από τα αγροτικά κτίσματα της Ηλείας.",
          },
        },
      },
    },
  },
  {
    slug: "pyrgos-luxury-complex",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Pyrgos Grand Residences",
        location: "Pyrgos, Ilia",
        type: "Residential",
        status: "Completed",
        services: "Architectural Study · Structural Study · Supervision",
        description:
          "A luxury residential complex for the centre of Pyrgos. Deep balconies wrapped in dark metal and warm timber slats give the building its horizontal rhythm, while a planted roof garden crowns the composition. At street level, a double-height entrance colonnade lined with palms brings an unexpected generosity to the urban block.",
        captions: {
          2: {
            kicker: "Street presence",
            text: "Layered balconies in dark steel and iroko timber turn the facade into a play of shadow and depth.",
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
      },
      gr: {
        name: "Πολυτελές Συγκρότημα Πύργου",
        location: "Πύργος, Ηλεία",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Αρχιτεκτονική Μελέτη · Στατική Μελέτη · Επίβλεψη",
        description:
          "Ένα πολυτελές κτιριακό συγκρότημα για το κέντρο του Πύργου. Βαθιά μπαλκόνια ντυμένα με σκούρο μέταλλο και ζεστές ξύλινες περσίδες δίνουν στο κτίριο τον οριζόντιο ρυθμό του, ενώ ένας φυτεμένος κήπος στο δώμα στέφει τη σύνθεση. Στο επίπεδο του δρόμου, μια είσοδος διπλού ύψους με φοίνικες προσφέρει απρόσμενη γενναιοδωρία στο αστικό μέτωπο.",
        captions: {
          2: {
            kicker: "Παρουσία στον δρόμο",
            text: "Τα διαδοχικά μπαλκόνια από σκούρο χάλυβα και ξύλο ιρόκο μετατρέπουν την όψη σε παιχνίδι σκιάς και βάθους.",
          },
          3: {
            kicker: "Η είσοδος",
            text: "Ένας στεγασμένος διάδρομος με ξύλινες περσίδες οδηγεί τους ενοίκους από τον δρόμο στο λόμπι, κάτω από τους φοίνικες.",
          },
          5: {
            kicker: "Ζωή στο ύπαιθρο",
            text: "Κάθε διαμέρισμα επεκτείνεται σε ένα προστατευμένο υπαίθριο δωμάτιο, χρήσιμο όλους τους μήνες του ελληνικού έτους.",
          },
        },
      },
    },
  },
  {
    slug: "archos-villa",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "Archos Villa",
        location: "Cyclades",
        type: "Tourism",
        status: "Completed",
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
            text: "Local dry stone meets smooth white plaster, the two materials of the Cyclades set in quiet opposition.",
          },
          5: {
            kicker: "Toward the sea",
            text: "The pool terrace is detailed as a continuation of the landscape, its edge dissolving into the horizon.",
          },
        },
      },
      gr: {
        name: "Βίλα Άρχος",
        location: "Κυκλάδες",
        type: "Τουριστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Μια θολωτή βίλα από πέτρα και σοβά, μόνη μέσα στο ξηρό κυκλαδίτικο τοπίο. Η μεγάλη αψίδα του ορόφου θυμίζει τα ξωκλήσια και τις στέρνες του νησιού, ερμηνευμένη ξανά με εμφανή λιθοδομή και λευκό επίχρισμα. Μια πισίνα υπερχείλισης απλώνεται προς τον ορίζοντα, χωρίζοντας το σπίτι από την ατελείωτη γραμμή του Αιγαίου.",
        captions: {
          2: {
            kicker: "Η αψίδα",
            text: "Ένας μνημειακός θόλος οργανώνει όλο το σπίτι, κρατώντας τη λότζια του υπνοδωματίου πάνω από τη σκιερή βεράντα.",
          },
          3: {
            kicker: "Πέτρα και σοβάς",
            text: "Η τοπική ξερολιθιά συναντά το λείο λευκό επίχρισμα, τα δύο υλικά των Κυκλάδων σε ήσυχη αντίθεση.",
          },
          5: {
            kicker: "Προς τη θάλασσα",
            text: "Η βεράντα της πισίνας σχεδιάστηκε ως συνέχεια του τοπίου, με το χείλος της να χάνεται στον ορίζοντα.",
          },
        },
      },
    },
  },
  {
    slug: "chalandri-residence",
    year: "2023",
    photoCount: 6,
    i18n: {
      en: {
        name: "Chalandri Residence",
        location: "Chalandri, Attica",
        type: "Residential",
        status: "Completed",
        services: "Architectural Study · Structural Study · Construction",
        description:
          "A sculptural private residence on a corner plot in the northern suburbs of Athens. Two white cantilevered volumes slide past one another above a glazed ground floor, while a screen of black steel fins wraps the garden boundary. The house is composed to be read in motion: from the street it changes with every step.",
        captions: {
          2: {
            kicker: "Composition",
            text: "Two orthogonal volumes, shifted and cantilevered, the structural frame made into the architecture itself.",
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
      },
      gr: {
        name: "Κατοικία στο Χαλάνδρι",
        location: "Χαλάνδρι, Αττική",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Αρχιτεκτονική Μελέτη · Στατική Μελέτη · Κατασκευή",
        description:
          "Μια γλυπτική ιδιωτική κατοικία σε γωνιακό οικόπεδο στα βόρεια προάστια της Αθήνας. Δύο λευκοί πρόβολοι γλιστρούν ο ένας δίπλα στον άλλο πάνω από ένα υαλωτό ισόγειο, ενώ ένα πέτασμα από μαύρες μεταλλικές περσίδες περιβάλλει τον κήπο. Το σπίτι συντέθηκε για να διαβάζεται εν κινήσει: από τον δρόμο αλλάζει με κάθε βήμα.",
        captions: {
          2: {
            kicker: "Σύνθεση",
            text: "Δύο ορθογώνιοι όγκοι, μετατοπισμένοι και σε πρόβολο, με τον φέροντα οργανισμό να γίνεται η ίδια η αρχιτεκτονική.",
          },
          3: {
            kicker: "Η γωνία",
            text: "Στη συμβολή δύο δρόμων το σπίτι δείχνει την πιο κοφτερή του ακμή, μια λευκή πλώρη πάνω από τη σκούρα περίφραξη.",
          },
          5: {
            kicker: "Φως και γυαλί",
            text: "Υαλοστάσια πλήρους ύψους διαλύουν το ισόγειο, αφήνοντας τον κήπο να κυλήσει κάτω από τον αιωρούμενο όροφο.",
          },
        },
      },
    },
  },
  {
    slug: "elaia-residences",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Elaia Garden Residences",
        location: "Ilia",
        type: "Residential",
        status: "Completed",
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
      },
      gr: {
        name: "Κατοικίες Ελαία",
        location: "Ηλεία",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Μια σειρά κατοικιών με κήπο που συνδυάζει εμφανή σκελετό σκυροδέματος με τοιχοποιίες από τοπική πέτρα. Κρεμαστή φύτευση ξεχειλίζει από τις πλάκες πάνω από βεράντες διπλού ύψους, και κάθε κατοικία αποσύρεται πίσω από τη δική της αυλή με πισίνα. Το σύνολο αποδεικνύει ότι η επαναλαμβανόμενη κατοικία μπορεί να μοιάζει χειροποίητη.",
        captions: {
          2: {
            kicker: "Ο κάνναβος",
            text: "Ο εμφανής κάνναβος σκυροδέματος δίνει στη σειρά την τάξη της· πέτρα, ξύλο και πράσινο δίνουν σε κάθε σπίτι τον χαρακτήρα του.",
          },
          3: {
            kicker: "Αυλές με πισίνα",
            text: "Ανάμεσα στον δρόμο και το καθιστικό, ένα ιδιωτικό τοπίο από νερό, λιθόστρωτο και μεσογειακή φύτευση.",
          },
          5: {
            kicker: "Πράσινες ακμές",
            text: "Η φύτευση που κατακρημνίζεται μαλακώνει κάθε ακμή πλάκας, δένοντας την αρχιτεκτονική με τον κήπο της.",
          },
        },
      },
    },
  },
  {
    slug: "kourouta-beach-villas",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "Kourouta Beach Villas",
        location: "Kourouta, Ilia",
        type: "Tourism",
        status: "Completed",
        services: "Design · Licensing · Construction",
        description:
          "Twin villas a few steps from the long sandy beach of Kourouta. Behind a rhythmic timber fence, the houses rise among palms and cycads: smooth white volumes with glazed corners and cantilevered canopies. The architecture is deliberately calm, letting the exuberant coastal garden carry the atmosphere.",
        captions: {
          2: {
            kicker: "Behind the fence",
            text: "A slatted timber boundary filters views from the beach road, revealing the villas gradually through the palms.",
          },
          3: {
            kicker: "Twin volumes",
            text: "Two mirrored houses share one composition, connected by a floating canopy over the entrance court.",
          },
          5: {
            kicker: "Coastal garden",
            text: "Dense subtropical planting turns the plot into an oasis, shading terraces through the long summer season.",
          },
        },
      },
      gr: {
        name: "Βίλες Κουρούτας",
        location: "Κουρούτα, Ηλεία",
        type: "Τουριστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Δίδυμες βίλες λίγα βήματα από τη μεγάλη αμμουδιά της Κουρούτας. Πίσω από μια ρυθμική ξύλινη περίφραξη, τα σπίτια υψώνονται ανάμεσα σε φοίνικες: λείοι λευκοί όγκοι με υαλωτές γωνίες και προβόλους στέγαστρα. Η αρχιτεκτονική είναι σκόπιμα ήρεμη, αφήνοντας τον πληθωρικό παραθαλάσσιο κήπο να δώσει την ατμόσφαιρα.",
        captions: {
          2: {
            kicker: "Πίσω από την περίφραξη",
            text: "Το ξύλινο πέτασμα φιλτράρει τις θέες από τον παραλιακό δρόμο, αποκαλύπτοντας σταδιακά τις βίλες μέσα από τους φοίνικες.",
          },
          3: {
            kicker: "Δίδυμοι όγκοι",
            text: "Δύο κατοπτρικά σπίτια μοιράζονται μία σύνθεση, ενωμένα με ένα αιωρούμενο στέγαστρο πάνω από την αυλή εισόδου.",
          },
          5: {
            kicker: "Παραθαλάσσιος κήπος",
            text: "Η πυκνή υποτροπική φύτευση μετατρέπει το οικόπεδο σε όαση, σκιάζοντας τις βεράντες όλο το μεγάλο καλοκαίρι.",
          },
        },
      },
    },
  },
  {
    slug: "cycladic-hillside",
    year: "2023",
    photoCount: 6,
    i18n: {
      en: {
        name: "Hillside Residences",
        location: "Cyclades",
        type: "Tourism",
        status: "Completed",
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
            text: "Whitewashed cubes and rough island masonry: the complex mediates between village and landscape.",
          },
          5: {
            kicker: "Thresholds",
            text: "Timber-railed balconies and stone stairs stitch the units together into one continuous promenade.",
          },
        },
      },
      gr: {
        name: "Κατοικίες στην Πλαγιά",
        location: "Κυκλάδες",
        type: "Τουριστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Ένα κλιμακωτό συγκρότημα λευκών και πέτρινων κατοικιών που κατεβαίνει μια βραχώδη νησιωτική πλαγιά. Οι ξερολιθιές αντιστήριξης συνεχίζουν την παράδοση των αγροτικών αναβαθμίδων που αντικαθιστούν, ενώ ξύλινα μπαλκόνια και πέργκολες κρέμονται από τους καθαρούς λευκούς όγκους. Η βουκαμβίλια σημαδεύει τα όρια ανάμεσα στο χτισμένο και το άγριο.",
        captions: {
          2: {
            kicker: "Στις αναβαθμίδες",
            text: "Τα κτίρια ακολουθούν τις παλιές πεζούλες, με κάθε επίπεδο να κερδίζει τη δική του θέα στο Αιγαίο.",
          },
          3: {
            kicker: "Δύο παραδόσεις",
            text: "Ασβεστωμένοι κύβοι και τραχιά νησιώτικη λιθοδομή: το συγκρότημα μεσολαβεί ανάμεσα σε χωριό και τοπίο.",
          },
          5: {
            kicker: "Κατώφλια",
            text: "Μπαλκόνια με ξύλινα κάγκελα και πέτρινες σκάλες ράβουν τις μονάδες σε έναν συνεχή περίπατο.",
          },
        },
      },
    },
  },
  {
    slug: "pyrgos-urban-residences",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Pyrgos Urban Residences",
        location: "Pyrgos, Ilia",
        type: "Residential",
        status: "Completed",
        services: "Architectural Study · Structural Study · Construction",
        description:
          "A contemporary apartment building that resets the standard for its street. Between two white frames, a dark glazed core steps back floor by floor behind continuous balconies. The pilotis level keeps the ground open for parking and planting, and the crowning slab throws deep shade over the roof terrace.",
        captions: {
          2: {
            kicker: "The frame",
            text: "A white perimeter frame holds the dark glass volume, a clear, legible diagram of structure and skin.",
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
      },
      gr: {
        name: "Αστικές Κατοικίες Πύργου",
        location: "Πύργος, Ηλεία",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Αρχιτεκτονική Μελέτη · Στατική Μελέτη · Κατασκευή",
        description:
          "Μια σύγχρονη πολυκατοικία που ανεβάζει τον πήχη για τον δρόμο της. Ανάμεσα σε δύο λευκά πλαίσια, ένας σκούρος υαλωτός πυρήνας αποσύρεται όροφο με όροφο πίσω από συνεχή μπαλκόνια. Η πυλωτή κρατά το ισόγειο ανοιχτό για στάθμευση και φύτευση, ενώ η πλάκα της απόληξης ρίχνει βαθιά σκιά στο δώμα.",
        captions: {
          2: {
            kicker: "Το πλαίσιο",
            text: "Ένα λευκό περιμετρικό πλαίσιο συγκρατεί τον σκούρο γυάλινο όγκο, ένα καθαρό, ευανάγνωστο διάγραμμα δομής και κελύφους.",
          },
          3: {
            kicker: "Στο πλαίσιό του",
            text: "Ανάμεσα στις ώχρες πολυκατοικίες του Πύργου, το κτίριο εκσυγχρονίζει τον δρόμο χωρίς να φωνάζει.",
          },
          5: {
            kicker: "Ανοιχτό ισόγειο",
            text: "Η πυλωτή διαλύει τη βάση στη σκιά, με αυτοκίνητα και κήπους να γλιστρούν κάτω από τους αιωρούμενους ορόφους.",
          },
        },
      },
    },
  },
  {
    slug: "olive-grove-villas",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "Olive Grove Villas",
        location: "Messinia",
        type: "Residential",
        status: "Completed",
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
      },
      gr: {
        name: "Βίλες στον Ελαιώνα",
        location: "Μεσσηνία",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Δύο βίλες από πέτρα και σκυρόδεμα, χωμένες σε μια πλαγιά με ελιές και λεβάντα. Βαθιές οριζόντιες πλάκες στέγης αιωρούνται πάνω από τοίχους χρυσαφένιας πέτρας, ενώ μια κοινή βεράντα με πισίνα γεφυρώνει τα δύο σπίτια. Ο σχεδιασμός του τοπίου αντιμετωπίζει τη ντόπια βλάστηση ως κήπο, ανοίγοντας μονοπάτια μέσα της αντί να την αντικαθιστά.",
        captions: {
          2: {
            kicker: "Αιωρούμενες στέγες",
            text: "Λεπτά επίπεδα σκυροδέματος πλανώνται πάνω από τους πέτρινους τοίχους, με τις σκιές τους να χαράζουν μεγάλες οριζόντιες.",
          },
          3: {
            kicker: "Χρυσαφένια πέτρα",
            text: "Πέτρα μαζεμένη από το ίδιο το οικόπεδο επιστρέφει στους τοίχους, δένοντας τα νέα σπίτια με το έδαφός τους.",
          },
          5: {
            kicker: "Η βεράντα της πισίνας",
            text: "Ένα κοινό δάπεδο από ανοιχτόχρωμη πέτρα κρατά το νερό ανάμεσα στα δύο σπίτια, στραμμένο στον απογευματινό ήλιο.",
          },
        },
      },
    },
  },
  {
    slug: "pyrgos-hilltop-villa",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Hilltop Villa",
        location: "Pyrgos, Ilia",
        type: "Residential",
        status: "Completed",
        services: "Architectural Study · Structural Study · Construction",
        description:
          "A panoramic villa on the heights above the city, looking over rooftops to the Ionian Sea. Two long horizontal slabs frame a glazed living level that opens on all sides to terraces, lawn and pool. The white perimeter wall creates a private plateau; inside it, only sky, water and the distant skyline.",
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
            text: "As the sun drops toward the Ionian, the glazed core turns lantern: the house glows from within.",
          },
        },
      },
      gr: {
        name: "Βίλα στον Λόφο",
        location: "Πύργος, Ηλεία",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Αρχιτεκτονική Μελέτη · Στατική Μελέτη · Κατασκευή",
        description:
          "Μια πανοραμική βίλα στα υψώματα πάνω από την πόλη, με θέα πάνω από τις στέγες ως το Ιόνιο. Δύο μακριές οριζόντιες πλάκες πλαισιώνουν ένα υαλωτό επίπεδο καθημερινής ζωής που ανοίγει από όλες τις πλευρές σε βεράντες, γκαζόν και πισίνα. Ο λευκός περιμετρικός τοίχος δημιουργεί ένα ιδιωτικό πλάτωμα· μέσα του, μόνο ουρανός, νερό και ο μακρινός ορίζοντας της πόλης.",
        captions: {
          2: {
            kicker: "Το πλάτωμα",
            text: "Σπίτι, γκαζόν και πισίνα μοιράζονται ένα τεχνητό έδαφος, κομμένο καθαρά στην κορυφή του λόφου.",
          },
          3: {
            kicker: "Οριζόντιες",
            text: "Δύο παράλληλες πλάκες συμπιέζουν τη θέα σε μια πλατιά κινηματογραφική ζώνη θάλασσας και πόλης.",
          },
          5: {
            kicker: "Απογευματινό φως",
            text: "Καθώς ο ήλιος πέφτει προς το Ιόνιο, ο υαλωτός πυρήνας γίνεται φανάρι: το σπίτι φωτίζεται από μέσα.",
          },
        },
      },
    },
  },
  {
    slug: "ilia-tourist-residences",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "Ilia Tourist Residences",
        location: "Ilia",
        type: "Tourism",
        status: "Completed",
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
            text: "Board-marked concrete frames sit on rough stone plinths, robust materials left honestly exposed.",
          },
          5: {
            kicker: "Water lines",
            text: "Long narrow pools echo the horizon line, doubling the sky at every level of the complex.",
          },
        },
      },
      gr: {
        name: "Τουριστικά Καταλύματα Ηλείας",
        location: "Ηλεία",
        type: "Τουριστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Μια νέα μονάδα τουριστικών καταλυμάτων κλιμακωμένη σε πλαγιά με ελιές. Εμφανές σκυρόδεμα με σανίδωμα, τοπική πέτρα και φυτεμένα δώματα αφήνουν τα κτίρια να χαθούν μέσα στον ελαιώνα, ενώ κάθε κατάλυμα κρατά ιδιωτική πισίνα ευθυγραμμισμένη με τον ορίζοντα της θάλασσας. Η τομή κάνει τη δουλειά: κάθε στέγη είναι ο κήπος της επόμενης αναβαθμίδας.",
        captions: {
          2: {
            kicker: "Μέσα στην πλαγιά",
            text: "Τα καταλύματα κλιμακώνονται με το έδαφος, με κάθε πλάκα να γίνεται φυτεμένο προσκήνιο για τη μονάδα από πάνω.",
          },
          3: {
            kicker: "Σκυρόδεμα και πέτρα",
            text: "Πλαίσια εμφανούς σκυροδέματος πατούν σε τραχιές πέτρινες βάσεις, στιβαρά υλικά αφημένα ειλικρινά εκτεθειμένα.",
          },
          5: {
            kicker: "Γραμμές νερού",
            text: "Μακριές στενές πισίνες αντηχούν τη γραμμή του ορίζοντα, διπλασιάζοντας τον ουρανό σε κάθε επίπεδο.",
          },
        },
      },
    },
  },
  {
    slug: "ilia-industrial-unit",
    year: "2023",
    photoCount: 6,
    i18n: {
      en: {
        name: "Ilia Industrial Unit",
        location: "Ilia",
        type: "Industrial",
        status: "Completed",
        services: "Structural Study · Licensing · Construction",
        description:
          "A steel-framed industrial building that takes its public face seriously. The long white envelope is cut by a single dark entrance volume, a folded canopy of angled glazing that signals the offices within. Generous landscaping and brick-paved forecourts make an industrial program feel like a corporate campus.",
        captions: {
          2: {
            kicker: "The cut",
            text: "One precise dark incision in the white envelope concentrates all the building's expression at the entrance.",
          },
          3: {
            kicker: "Steel logic",
            text: "A clear-span steel frame keeps the production floor free; the architecture lives in the envelope.",
          },
          5: {
            kicker: "The forecourt",
            text: "Brick paving, lavender and young trees receive visitors: dignity is part of the industrial brief.",
          },
        },
      },
      gr: {
        name: "Βιομηχανική Μονάδα Ηλείας",
        location: "Ηλεία",
        type: "Βιομηχανικό",
        status: "Ολοκληρωμένο",
        services: "Στατική Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Ένα μεταλλικό βιομηχανικό κτίριο που παίρνει στα σοβαρά τη δημόσια όψη του. Το μακρύ λευκό κέλυφος κόβεται από έναν σκούρο όγκο εισόδου, ένα διπλωμένο στέγαστρο με κεκλιμένα υαλοστάσια που σηματοδοτεί τα γραφεία. Η γενναιόδωρη φύτευση και τα λιθόστρωτα προαύλια κάνουν το βιομηχανικό πρόγραμμα να μοιάζει με εταιρικό campus.",
        captions: {
          2: {
            kicker: "Η τομή",
            text: "Μία ακριβής σκούρα χάραξη στο λευκό κέλυφος συγκεντρώνει όλη την έκφραση του κτιρίου στην είσοδο.",
          },
          3: {
            kicker: "Λογική χάλυβα",
            text: "Ένα μεταλλικό πλαίσιο ελεύθερου ανοίγματος κρατά τον χώρο παραγωγής ελεύθερο· η αρχιτεκτονική ζει στο κέλυφος.",
          },
          5: {
            kicker: "Το προαύλιο",
            text: "Λιθόστρωτο, λεβάντα και νεαρά δέντρα υποδέχονται τους επισκέπτες: η αξιοπρέπεια είναι μέρος του βιομηχανικού προγράμματος.",
          },
        },
      },
    },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

export const nextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
