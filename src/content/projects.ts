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

/** Ordered biggest project first, per client instruction. */
export const projects: Project[] = [
  {
    slug: "pyrgos-luxury-complex",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Luxury Residential Complex",
        location: "Pyrgos, Ilia",
        type: "Residential",
        status: "Under Construction",
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
        name: "Πολυτελές Συγκρότημα Κατοικιών",
        location: "Πύργος, Ηλεία",
        type: "Οικιστικό",
        status: "Υπό κατασκευή",
        services: "Αρχιτεκτονική Μελέτη · Στατική Μελέτη · Επίβλεψη",
        description:
          "Ένα πολυτελές συγκρότημα κατοικιών για το κέντρο του Πύργου. Βαθιά μπαλκόνια ντυμένα με σκούρο μέταλλο και ζεστές ξύλινες περσίδες δίνουν στο κτίριο τον οριζόντιο ρυθμό του, ενώ ένας φυτεμένος κήπος στο δώμα στέφει τη σύνθεση. Στο επίπεδο του δρόμου, μια είσοδος διπλού ύψους με φοίνικες προσφέρει απρόσμενη γενναιοδωρία στο αστικό μέτωπο.",
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
    slug: "agios-dimitrios-apartments",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Agios Dimitrios Apartments",
        location: "Agios Dimitrios, Attica",
        type: "Residential",
        status: "Completed",
        services: "Architectural Study · Structural Study · Construction",
        description:
          "A five-storey apartment building on a tree-lined corner in Agios Dimitrios. Continuous glass balustrades wrap the slabs so every living room borrows the green of the avenue, while the recessed top floor dissolves the building against the sky. The ground level holds a fully glazed commercial front behind the plane trees.",
        captions: {
          2: {
            kicker: "The corner",
            text: "Rounded slab edges carry the building around the junction in one continuous gesture.",
          },
          3: {
            kicker: "Glass line",
            text: "Frameless balustrades keep the facade light, a stack of transparent decks above the street.",
          },
          5: {
            kicker: "Among the trees",
            text: "The mature avenue becomes part of the architecture, filtering light and views for every floor.",
          },
        },
      },
      gr: {
        name: "Πολυκατοικία στον Άγιο Δημήτριο",
        location: "Άγιος Δημήτριος, Αττική",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Αρχιτεκτονική Μελέτη · Στατική Μελέτη · Κατασκευή",
        description:
          "Μια πενταώροφη πολυκατοικία σε δενδροφυτεμένη γωνία στον Άγιο Δημήτριο. Συνεχή γυάλινα στηθαία τυλίγουν τις πλάκες ώστε κάθε καθιστικό να δανείζεται το πράσινο της λεωφόρου, ενώ ο εσοχικός τελευταίος όροφος διαλύει το κτίριο στον ουρανό. Το ισόγειο φιλοξενεί πλήρως υαλωτό επαγγελματικό μέτωπο πίσω από τα πλατάνια.",
        captions: {
          2: {
            kicker: "Η γωνία",
            text: "Οι στρογγυλεμένες ακμές των πλακών οδηγούν το κτίριο γύρω από τη διασταύρωση με μία συνεχή κίνηση.",
          },
          3: {
            kicker: "Γραμμή γυαλιού",
            text: "Στηθαία χωρίς πλαίσιο κρατούν την όψη ανάλαφρη, μια στοίβα διάφανων καταστρωμάτων πάνω από τον δρόμο.",
          },
          5: {
            kicker: "Μέσα στα δέντρα",
            text: "Η ώριμη δενδροστοιχία γίνεται μέρος της αρχιτεκτονικής, φιλτράροντας φως και θέες για κάθε όροφο.",
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
        status: "Under Construction",
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
        status: "Υπό κατασκευή",
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
  {
    slug: "white-porticoes",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "The White Porticoes",
        location: "Corfu, Ionian Islands",
        type: "Residential",
        status: "Completed",
        services: "Design · Licensing · Construction",
        description:
          "An estate of monumental white villas stepping along a landscaped hillside above the sea. Each house is entered through a deep portico lined with dark timber, a shaded threshold between the bright street and the private gardens behind. Stone retaining walls and subtropical planting root the crisp volumes into the slope.",
        captions: {
          2: {
            kicker: "The portico",
            text: "A double-height shaded porch gives every villa a ceremonial entrance and a cool heart.",
          },
          3: {
            kicker: "Along the slope",
            text: "The villas repeat with variation, stepping with the hill so each keeps its own line to the sea.",
          },
          5: {
            kicker: "Stone and white",
            text: "Dark stone terraces anchor the white volumes, drawing the landscape up to the architecture.",
          },
        },
      },
      gr: {
        name: "Οι Λευκές Στοές",
        location: "Κέρκυρα, Ιόνιο",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Ένα συγκρότημα μνημειακών λευκών κατοικιών που κλιμακώνεται σε διαμορφωμένη πλαγιά πάνω από τη θάλασσα. Η είσοδος κάθε κατοικίας γίνεται μέσα από μια βαθιά στοά ντυμένη με σκούρο ξύλο, ένα σκιερό κατώφλι ανάμεσα στον φωτεινό δρόμο και τους ιδιωτικούς κήπους. Πέτρινοι τοίχοι αντιστήριξης και υποτροπική φύτευση ριζώνουν τους καθαρούς όγκους στην πλαγιά.",
        captions: {
          2: {
            kicker: "Η στοά",
            text: "Ένα σκιερό πρόπυλο διπλού ύψους δίνει σε κάθε κατοικία τελετουργική είσοδο και δροσερή καρδιά.",
          },
          3: {
            kicker: "Κατά μήκος της πλαγιάς",
            text: "Οι κατοικίες επαναλαμβάνονται με παραλλαγές, κλιμακώνονται με τον λόφο ώστε καθεμιά να κρατά τη δική της γραμμή προς τη θάλασσα.",
          },
          5: {
            kicker: "Πέτρα και λευκό",
            text: "Σκούρες πέτρινες αναβαθμίδες αγκυρώνουν τους λευκούς όγκους, ανεβάζοντας το τοπίο ως την αρχιτεκτονική.",
          },
        },
      },
    },
  },
  {
    slug: "kalamata-retreats",
    year: "2023",
    photoCount: 6,
    i18n: {
      en: {
        name: "Kalamata Seaside Retreats",
        location: "Kalamata, Messinia",
        type: "Tourism",
        status: "Completed",
        services: "Design · Licensing · Construction",
        description:
          "A cluster of self-catering tourist residences set among mature gardens near the coast of Kalamata. Timber pergolas and clay-tiled roofs shade private pools, while each unit opens onto its own landscaped court: a quiet, low-rise settlement that grows out of the olive landscape rather than sitting on top of it.",
        captions: {
          2: {
            kicker: "The settlement",
            text: "Seen from above, the residences read as a village: small roofs gathered around water, connected by garden paths.",
          },
          3: {
            kicker: "Private courts",
            text: "Every unit holds its own pool and terrace, framed by pergolas that filter the Messinian light.",
          },
          5: {
            kicker: "Materiality",
            text: "Clay tile, warm timber and rough stone, a palette drawn directly from the rural buildings of Messinia.",
          },
        },
      },
      gr: {
        name: "Παραθαλάσσια Καταλύματα Καλαμάτας",
        location: "Καλαμάτα, Μεσσηνία",
        type: "Τουριστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Ένα σύνολο αυτοεξυπηρετούμενων τουριστικών καταλυμάτων μέσα σε ώριμους κήπους κοντά στην ακτή της Καλαμάτας. Ξύλινες πέργκολες και κεραμοσκεπές σκιάζουν ιδιωτικές πισίνες, ενώ κάθε μονάδα ανοίγει στη δική της διαμορφωμένη αυλή: ένας ήσυχος, χαμηλός οικισμός που αναδύεται μέσα από το τοπίο της ελιάς.",
        captions: {
          2: {
            kicker: "Ο οικισμός",
            text: "Από ψηλά, τα καταλύματα διαβάζονται σαν χωριό: μικρές στέγες γύρω από το νερό, ενωμένες με μονοπάτια κήπου.",
          },
          3: {
            kicker: "Ιδιωτικές αυλές",
            text: "Κάθε μονάδα διαθέτει δική της πισίνα και βεράντα, πλαισιωμένη από πέργκολες που φιλτράρουν το μεσσηνιακό φως.",
          },
          5: {
            kicker: "Υλικότητα",
            text: "Κεραμίδι, ζεστό ξύλο και ακατέργαστη πέτρα, μια παλέτα βγαλμένη από τα αγροτικά κτίσματα της Μεσσηνίας.",
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
    slug: "katakolo-terraces",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "The Katakolo Terraces",
        location: "Katakolo, Ilia",
        type: "Tourism",
        status: "Under Construction",
        services: "Design · Licensing · Construction",
        description:
          "Three villas terraced into an olive-covered slope above Katakolo. Board-marked concrete, local stone and planted roofs let the buildings recede into the grove, while each villa keeps a private pool aligned with the sea horizon. The section does the work: every roof is the next terrace's garden.",
        captions: {
          2: {
            kicker: "Into the slope",
            text: "The villas step with the land, each roof slab becoming a planted foreground for the one above.",
          },
          3: {
            kicker: "Concrete and stone",
            text: "Board-marked concrete frames sit on rough stone plinths, robust materials left honestly exposed.",
          },
          5: {
            kicker: "Water lines",
            text: "Long narrow pools echo the horizon line, doubling the sky at every level of the site.",
          },
        },
      },
      gr: {
        name: "Αναβαθμίδες Κατακόλου",
        location: "Κατάκολο, Ηλεία",
        type: "Τουριστικό",
        status: "Υπό κατασκευή",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Τρεις βίλες κλιμακωμένες σε πλαγιά με ελιές πάνω από το Κατάκολο. Εμφανές σκυρόδεμα με σανίδωμα, τοπική πέτρα και φυτεμένα δώματα αφήνουν τα κτίρια να χαθούν μέσα στον ελαιώνα, ενώ κάθε βίλα κρατά ιδιωτική πισίνα ευθυγραμμισμένη με τον ορίζοντα της θάλασσας. Η τομή κάνει τη δουλειά: κάθε στέγη είναι ο κήπος της επόμενης αναβαθμίδας.",
        captions: {
          2: {
            kicker: "Μέσα στην πλαγιά",
            text: "Οι βίλες κλιμακώνονται με το έδαφος, με κάθε πλάκα να γίνεται φυτεμένο προσκήνιο για την επόμενη.",
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
    slug: "iroko-house",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "Iroko House",
        location: "Marousi, Attica",
        type: "Residential",
        status: "Completed",
        services: "Architectural Study · Structural Study · Construction",
        description:
          "A three-storey urban house on a quiet Athenian street, named for the warm iroko timber that lines its soffits and window reveals. Planted terraces step back floor by floor above a dark stone plinth, so the building reads as a stack of gardens rather than a block. A single vertical timber spine ties the composition together.",
        captions: {
          2: {
            kicker: "The spine",
            text: "One continuous band of iroko rises through the facade, linking entrance, balconies and roofline.",
          },
          3: {
            kicker: "Stacked gardens",
            text: "Each floor pulls back to plant its own terrace, softening the street with layers of green.",
          },
          5: {
            kicker: "The plinth",
            text: "Dark stone grounds the building, a quiet, solid base beneath the warm timber storeys.",
          },
        },
      },
      gr: {
        name: "Κατοικία Ιρόκο",
        location: "Μαρούσι, Αττική",
        type: "Οικιστικό",
        status: "Ολοκληρωμένο",
        services: "Αρχιτεκτονική Μελέτη · Στατική Μελέτη · Κατασκευή",
        description:
          "Μια τριώροφη αστική κατοικία σε ήσυχο αθηναϊκό δρόμο, με όνομα από το ζεστό ξύλο ιρόκο που ντύνει τις οροφές και τα ανοίγματά της. Φυτεμένες βεράντες αποσύρονται όροφο με όροφο πάνω από μια σκούρα πέτρινη βάση, ώστε το κτίριο να διαβάζεται ως στοίβα κήπων και όχι ως όγκος. Μία κατακόρυφη ξύλινη ραχοκοκαλιά δένει τη σύνθεση.",
        captions: {
          2: {
            kicker: "Η ραχοκοκαλιά",
            text: "Μία συνεχής ζώνη ιρόκο ανεβαίνει την όψη, ενώνοντας είσοδο, μπαλκόνια και απόληξη.",
          },
          3: {
            kicker: "Κήποι σε στοίβα",
            text: "Κάθε όροφος αποσύρεται για να φυτέψει τη δική του βεράντα, απαλύνοντας τον δρόμο με στρώσεις πρασίνου.",
          },
          5: {
            kicker: "Η βάση",
            text: "Η σκούρα πέτρα γειώνει το κτίριο, μια ήσυχη, στιβαρή βάση κάτω από τους ζεστούς ξύλινους ορόφους.",
          },
        },
      },
    },
  },
  {
    slug: "agios-ilias-homes",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Agios Ilias Homes",
        location: "Agios Ilias, Ilia",
        type: "Residential",
        status: "Under Construction",
        services: "Design · Licensing · Construction",
        description:
          "A row of garden homes at Agios Ilias that pairs exposed concrete frames with infill walls of local stone. Hanging planting spills from the roof slabs over double-height verandas, and each home steps back behind its own pool court along a quiet country road. The ensemble proves that repeatable housing can still feel individually crafted.",
        captions: {
          2: {
            kicker: "The frame",
            text: "An exposed concrete grid gives the row its order; stone, timber and greenery give each home its character.",
          },
          3: {
            kicker: "Pool courts",
            text: "Between the country road and the living room, a private landscape of water, stone paving and Mediterranean planting.",
          },
          5: {
            kicker: "Green edges",
            text: "Cascading planting softens every slab edge, knitting the architecture into its garden setting.",
          },
        },
      },
      gr: {
        name: "Κατοικίες Αγίου Ηλία",
        location: "Άγιος Ηλίας, Ηλεία",
        type: "Οικιστικό",
        status: "Υπό κατασκευή",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Μια σειρά κατοικιών με κήπο στον Άγιο Ηλία που συνδυάζει εμφανή σκελετό σκυροδέματος με τοιχοποιίες από τοπική πέτρα. Κρεμαστή φύτευση ξεχειλίζει από τις πλάκες πάνω από βεράντες διπλού ύψους, και κάθε κατοικία αποσύρεται πίσω από τη δική της αυλή με πισίνα, κατά μήκος ενός ήσυχου επαρχιακού δρόμου. Το σύνολο αποδεικνύει ότι η επαναλαμβανόμενη κατοικία μπορεί να μοιάζει χειροποίητη.",
        captions: {
          2: {
            kicker: "Ο κάνναβος",
            text: "Ο εμφανής κάνναβος σκυροδέματος δίνει στη σειρά την τάξη της· πέτρα, ξύλο και πράσινο δίνουν σε κάθε σπίτι τον χαρακτήρα του.",
          },
          3: {
            kicker: "Αυλές με πισίνα",
            text: "Ανάμεσα στον επαρχιακό δρόμο και το καθιστικό, ένα ιδιωτικό τοπίο από νερό, λιθόστρωτο και μεσογειακή φύτευση.",
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
    slug: "kourouta-beach-house",
    year: "2025",
    photoCount: 6,
    i18n: {
      en: {
        name: "Kourouta Beach House",
        location: "Kourouta, Ilia",
        type: "Residential",
        status: "Under Construction",
        services: "Design · Licensing · Construction",
        description:
          "A residential house a few steps from the long sandy beach of Kourouta. Behind a rhythmic timber fence, warm sand-toned volumes rise among palms and gardens, with a central band of slatted iroko marking the entrance. Deep balconies and planted setbacks keep every room in the shade of its own greenery.",
        captions: {
          2: {
            kicker: "Behind the fence",
            text: "A slatted timber boundary filters views from the beach road, revealing the house gradually through the palms.",
          },
          3: {
            kicker: "The entrance band",
            text: "A vertical strip of iroko slats runs the full height of the facade, guiding visitors to the door.",
          },
          5: {
            kicker: "Coastal garden",
            text: "Dense planting turns the plot into an oasis, shading terraces through the long summer season.",
          },
        },
      },
      gr: {
        name: "Παραθαλάσσια Κατοικία Κουρούτας",
        location: "Κουρούτα, Ηλεία",
        type: "Οικιστικό",
        status: "Υπό κατασκευή",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Μια κατοικία λίγα βήματα από τη μεγάλη αμμουδιά της Κουρούτας. Πίσω από μια ρυθμική ξύλινη περίφραξη, ζεστοί αμμώδεις όγκοι υψώνονται ανάμεσα σε φοίνικες και κήπους, με μια κεντρική ζώνη από περσίδες ιρόκο να σηματοδοτεί την είσοδο. Βαθιά μπαλκόνια και φυτεμένες εσοχές κρατούν κάθε δωμάτιο στη σκιά του δικού του πρασίνου.",
        captions: {
          2: {
            kicker: "Πίσω από την περίφραξη",
            text: "Το ξύλινο πέτασμα φιλτράρει τις θέες από τον παραλιακό δρόμο, αποκαλύπτοντας σταδιακά την κατοικία μέσα από τους φοίνικες.",
          },
          3: {
            kicker: "Η ζώνη εισόδου",
            text: "Μια κατακόρυφη λωρίδα από περσίδες ιρόκο διατρέχει όλο το ύψος της όψης, οδηγώντας στην πόρτα.",
          },
          5: {
            kicker: "Παραθαλάσσιος κήπος",
            text: "Η πυκνή φύτευση μετατρέπει το οικόπεδο σε όαση, σκιάζοντας τις βεράντες όλο το μεγάλο καλοκαίρι.",
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
          "A panoramic villa on the heights above the town, looking over low rooftops and olive groves to the Ionian Sea. Two long horizontal slabs frame a glazed living level that opens on all sides to terraces, lawn and pool. The white perimeter wall creates a private plateau; inside it, only sky, water and the distant coastline.",
        captions: {
          2: {
            kicker: "The plateau",
            text: "House, lawn and pool share one artificial ground, cut cleanly into the crown of the hill.",
          },
          3: {
            kicker: "Horizontals",
            text: "Two parallel slabs compress the view into a wide cinematic band of sea and landscape.",
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
          "Μια πανοραμική βίλα στα υψώματα πάνω από την πόλη, με θέα πάνω από χαμηλές στέγες και ελαιώνες ως το Ιόνιο. Δύο μακριές οριζόντιες πλάκες πλαισιώνουν ένα υαλωτό επίπεδο καθημερινής ζωής που ανοίγει από όλες τις πλευρές σε βεράντες, γκαζόν και πισίνα. Ο λευκός περιμετρικός τοίχος δημιουργεί ένα ιδιωτικό πλάτωμα· μέσα του, μόνο ουρανός, νερό και η μακρινή ακτογραμμή.",
        captions: {
          2: {
            kicker: "Το πλάτωμα",
            text: "Σπίτι, γκαζόν και πισίνα μοιράζονται ένα τεχνητό έδαφος, κομμένο καθαρά στην κορυφή του λόφου.",
          },
          3: {
            kicker: "Οριζόντιες",
            text: "Δύο παράλληλες πλάκες συμπιέζουν τη θέα σε μια πλατιά κινηματογραφική ζώνη θάλασσας και τοπίου.",
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
    slug: "chalandri-residence",
    year: "2023",
    photoCount: 6,
    i18n: {
      en: {
        name: "Chalandri Residence",
        location: "Chalandri, Attica",
        type: "Residential",
        status: "Under Construction",
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
        status: "Υπό κατασκευή",
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
    slug: "thalassa-bungalows",
    year: "2024",
    photoCount: 6,
    i18n: {
      en: {
        name: "Thalassa Bungalows",
        location: "Messinia",
        type: "Tourism",
        status: "Completed",
        services: "Design · Licensing · Construction",
        description:
          "Single-storey stone bungalows scattered through coastal gardens, each with its own long pool facing the sea breeze. Exposed timber beams carry deep roof overhangs that shade full-width glass walls, and rough golden masonry ties the low buildings to the dry landscape. Architecture reduced to essentials: stone, shade and water.",
        captions: {
          2: {
            kicker: "The overhang",
            text: "Dark timber beams project far beyond the glass line, drawing a cool zone of shade around each bungalow.",
          },
          3: {
            kicker: "Golden masonry",
            text: "Rough-cut local stone gives the low walls their texture, glowing warm through the afternoon.",
          },
          5: {
            kicker: "Pool gardens",
            text: "Each long pool sits inside its own planted court, palms and grasses screening one guest from the next.",
          },
        },
      },
      gr: {
        name: "Μπανγκαλόου Θάλασσα",
        location: "Μεσσηνία",
        type: "Τουριστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Ισόγεια πέτρινα μπανγκαλόου σκορπισμένα σε παραθαλάσσιους κήπους, καθένα με τη δική του μακριά πισίνα στραμμένη στο θαλασσινό αεράκι. Εμφανή ξύλινα δοκάρια κρατούν βαθιές προεξοχές στέγης που σκιάζουν υαλοστάσια πλήρους πλάτους, ενώ η τραχιά χρυσαφένια λιθοδομή δένει τα χαμηλά κτίσματα με το ξηρό τοπίο. Αρχιτεκτονική στα βασικά της: πέτρα, σκιά και νερό.",
        captions: {
          2: {
            kicker: "Η προεξοχή",
            text: "Σκούρα ξύλινα δοκάρια προβάλλουν πέρα από τη γραμμή του γυαλιού, χαράζοντας μια δροσερή ζώνη σκιάς γύρω από κάθε μπανγκαλόου.",
          },
          3: {
            kicker: "Χρυσαφένια λιθοδομή",
            text: "Η χοντροκομμένη τοπική πέτρα δίνει στους χαμηλούς τοίχους την υφή τους, λάμποντας ζεστή το απόγευμα.",
          },
          5: {
            kicker: "Κήποι με πισίνα",
            text: "Κάθε μακριά πισίνα κάθεται στη δική της φυτεμένη αυλή, με φοίνικες και αγριόχορτα να χωρίζουν τον έναν επισκέπτη από τον άλλο.",
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
        location: "Santorini",
        type: "Tourism",
        status: "Completed",
        services: "Design · Licensing · Construction",
        description:
          "A vaulted stone-and-plaster villa standing alone in the dry landscape of Santorini. The great arch of the upper floor recalls the island's chapels and cisterns, reinterpreted in exposed masonry and white render. An infinity pool stretches toward the horizon, separating the house from the endless line of the Aegean.",
        captions: {
          2: {
            kicker: "The arch",
            text: "A single monumental vault organises the whole house, holding the bedroom loggia above the shaded terrace.",
          },
          3: {
            kicker: "Stone and render",
            text: "Local dry stone meets smooth white plaster, the two materials of Santorini set in quiet opposition.",
          },
          5: {
            kicker: "Toward the sea",
            text: "The pool terrace is detailed as a continuation of the landscape, its edge dissolving into the horizon.",
          },
        },
      },
      gr: {
        name: "Βίλα Άρχος",
        location: "Σαντορίνη",
        type: "Τουριστικό",
        status: "Ολοκληρωμένο",
        services: "Μελέτη · Αδειοδότηση · Κατασκευή",
        description:
          "Μια θολωτή βίλα από πέτρα και σοβά, μόνη μέσα στο ξηρό τοπίο της Σαντορίνης. Η μεγάλη αψίδα του ορόφου θυμίζει τα ξωκλήσια και τις στέρνες του νησιού, ερμηνευμένη ξανά με εμφανή λιθοδομή και λευκό επίχρισμα. Μια πισίνα υπερχείλισης απλώνεται προς τον ορίζοντα, χωρίζοντας το σπίτι από την ατελείωτη γραμμή του Αιγαίου.",
        captions: {
          2: {
            kicker: "Η αψίδα",
            text: "Ένας μνημειακός θόλος οργανώνει όλο το σπίτι, κρατώντας τη λότζια του υπνοδωματίου πάνω από τη σκιερή βεράντα.",
          },
          3: {
            kicker: "Πέτρα και σοβάς",
            text: "Η τοπική ξερολιθιά συναντά το λείο λευκό επίχρισμα, τα δύο υλικά της Σαντορίνης σε ήσυχη αντίθεση.",
          },
          5: {
            kicker: "Προς τη θάλασσα",
            text: "Η βεράντα της πισίνας σχεδιάστηκε ως συνέχεια του τοπίου, με το χείλος της να χάνεται στον ορίζοντα.",
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
