/**
 * Display order of /media/cinematic/NN.webp, by project hierarchy:
 * biggest built projects first, then smaller ones, construction reality last.
 * 11,12 luxury complex · 7,8 industrial · 4 Pyrgos retreats settlement · 9 Cycladic
 * complex · 14,15 Katakolo terraces · 16-18 hilltop villa · 10 Agios Ilias ·
 * 13 Kourouta · 2,1,5,6 small villas · 3 Chalandri · 19-30 construction.
 */
export const CINEMATIC_ORDER = [
  11, 12, 7, 8, 4, 9, 14, 15, 16, 17, 18, 10, 13, 2, 1, 5, 6, 3, 19, 20, 21, 22, 23, 24, 25,
  26, 27, 28, 29, 30,
]

export const cinematicUrl = (fileNum: number) =>
  `/media/cinematic/${String(fileNum).padStart(2, "0")}.webp`

/** 1600px encodes for the mobile sequence, sharp at devicePixelRatio 3. */
export const cinematicHdUrl = (fileNum: number) =>
  `/media/cinematic/hd/${String(fileNum).padStart(2, "0")}.webp`
