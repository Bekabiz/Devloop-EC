#!/usr/bin/env bash
# Develop EC — media pipeline
# Compresses videos (h264 CRF 23, no audio, faststart), extracts poster frames,
# and generates WebP images (desktop 1920w / mobile 960w / grid thumb 900w).
set -uo pipefail
cd "$(dirname "$0")/.."
OUT=public/media
mkdir -p "$OUT/hero" "$OUT/logo" "$OUT/cinematic"

vid() { # in out
  ffmpeg -nostdin -y -loglevel error -i "$1" \
    -c:v libx264 -crf 23 -preset medium -vf "scale='min(1920,iw)':-2" \
    -an -movflags +faststart -pix_fmt yuv420p "$2"
}
poster() { ffmpeg -nostdin -y -loglevel error -i "$1" -ss "$3" -frames:v 1 -q:v 3 -vf "scale='min(1920,iw)':-2" "$2"; }
webp() { ffmpeg -nostdin -y -loglevel error -i "$1" -vf "scale=$3:-2" -c:v libwebp -q:v "$4" "$2"; }

# ---- Hero video ----
vid "Hereo video.mp4" "$OUT/hero/hero.mp4"
poster "Hereo video.mp4" "$OUT/hero/poster.jpg" 1

# ---- Logos ----
cp develop_ec_logo_assets/develop-ec-logo-horizontal-black.svg "$OUT/logo/logo-black.svg"
cp develop_ec_logo_assets/develop-ec-logo-horizontal-white.svg "$OUT/logo/logo-white.svg"
cp develop_ec_logo_assets/develop-ec-logo-mark-black.svg "$OUT/logo/mark-black.svg"
cp develop_ec_logo_assets/develop-ec-logo-mark-white.svg "$OUT/logo/mark-white.svg"
cp develop_ec_logo_assets/develop-ec-logo-mark-black-256px.png "$OUT/logo/favicon.png"

# ---- Projects ----
process_project() { # slug, folder
  local slug="$1" dir="$2" n=1
  local pdir="$OUT/projects/$slug"
  mkdir -p "$pdir"
  local v
  v=$(ls "$dir"/*.mp4 2>/dev/null | head -1)
  if [ -n "$v" ]; then
    vid "$v" "$pdir/video.mp4"
    poster "$v" "$pdir/poster.jpg" 2
  fi
  while IFS= read -r img; do
    local nn
    nn=$(printf "%02d" $n)
    webp "$img" "$pdir/$nn.webp" 1920 82
    webp "$img" "$pdir/$nn-m.webp" 960 78
    if [ $n -eq 1 ]; then
      ffmpeg -nostdin -y -loglevel error -i "$img" -vf "scale=900:600:force_original_aspect_ratio=increase,crop=900:600" -c:v libwebp -q:v 78 "$pdir/thumb.webp"
    fi
    n=$((n+1))
  done < <(ls "$dir"/ChatGPT*.png 2>/dev/null)
  echo "done: $slug ($((n-1)) images)"
}

process_project katakolo-retreats      "Hero edit  section Το γραφείο μας ξεκινά τη κατασκευή Τουριστικών Αυτοεξυπηρετούμενων Καταλυμάτων στο Κατάκολο Ηλείας - Copy"
process_project elaia-residences       "2 unkown on;y 1 pic -edit   Copy"
process_project olive-grove-villas     "4 unkown edit  - Copy"
process_project archos-villa           "one pic edit   only u nkown - Copy"
process_project cycladic-hillside      "unkown 5 edit   only one photo - Copy"
process_project pyrgos-urban-residences "new project pyrgos edit   - Copy"
process_project kourouta-beach-villas  "Κουρουτα edit   - Copy"
process_project chalandri-residence    "Χαλάνδρι - edit  Copy"
process_project pyrgos-hilltop-villa   "ΠΥΡΓΟΣ ΗΛΕΙΑΣ -edit   Copy"
process_project ilia-tourist-residences "Ανέγερση edit   νέας μονάδας τουριστικών καταλυμάτων στην Ηλεία! - Copy"
process_project pyrgos-luxury-complex  "Μελέτη edit  πολυτελούς κτιριακού συγκροτήματος στον Πύργο Ηλείας από το Τεχνικό μας Γραφείο! - Copy"
process_project ilia-industrial-unit   "έα Μελέτη edit   Ανέγερσης Βιομηχανικής Μονάδας στην Ηλεία από το Τεχνικό μας Γραφείο! - Copy"

# ---- Cinematic 3D section: 30 photos ----
n=1
while IFS= read -r img; do
  nn=$(printf "%02d" $n)
  webp "$img" "$OUT/cinematic/$nn.webp" 1024 78
  n=$((n+1))
done < <(ls "in costraction and other 18 photo"/*.png)
echo "done: cinematic ($((n-1)) images)"
echo "ALL DONE"
du -sh "$OUT"
