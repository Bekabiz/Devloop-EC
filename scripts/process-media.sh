#!/usr/bin/env bash
# Develop EC — canonical media pipeline.
#
# Regenerates ALL of public/media from the clean sources in assets/source/.
# Requires ffmpeg. Run from anywhere:  bash scripts/process-media.sh
# To regenerate a single project:      bash scripts/process-media.sh <slug>
# To test into a scratch directory:    MEDIA_OUT=/tmp/media bash scripts/process-media.sh
#
# Source layout (per project): assets/source/projects/<slug>/01.png .. 06.png + video.mp4
# Output (per project): public/media/projects/<slug>/
#   01.webp..06.webp (1920w), 01-m..06-m.webp (960w), thumb.webp (1200x800),
#   video.mp4 (h264, muted, faststart, keyframe/sec), poster.jpg (exact first frame)
set -uo pipefail
cd "$(dirname "$0")/.."
OUT="${MEDIA_OUT:-public/media}"
SRC=assets/source
ONLY="${1:-}"

# grid thumbnails default to photo 01; per-client overrides go here
declare -A THUMB_SRC=( [katakolo-terraces]=03 )

vid() { ffmpeg -nostdin -y -loglevel error -i "$1" -c:v libx264 -crf 23 -preset medium \
  -vf "scale='min(1920,iw)':-2" -pix_fmt yuv420p -g 24 -keyint_min 24 -an -movflags +faststart "$2"; }
first_frame() { ffmpeg -nostdin -y -loglevel error -i "$1" -frames:v 1 -q:v 2 "$2"; }
webp() { ffmpeg -nostdin -y -loglevel error -i "$1" -vf "scale=$3:-2" -c:v libwebp -q:v "$4" "$2"; }
thumb() { ffmpeg -nostdin -y -loglevel error -i "$1" \
  -vf "scale=1200:800:force_original_aspect_ratio=increase,crop=1200:800" -c:v libwebp -q:v 80 "$2"; }

process_project() {
  local slug="$1" dir="$SRC/projects/$1" out="$OUT/projects/$1"
  mkdir -p "$out"
  local n
  for n in 01 02 03 04 05 06 07 08 09 10; do
    [ -f "$dir/$n.png" ] || continue
    webp "$dir/$n.png" "$out/$n.webp" 1920 82
    webp "$dir/$n.png" "$out/$n-m.webp" 960 78
  done
  thumb "$dir/${THUMB_SRC[$slug]:-01}.png" "$out/thumb.webp"
  if [ -f "$dir/video.mp4" ]; then
    vid "$dir/video.mp4" "$out/video.mp4"
    first_frame "$out/video.mp4" "$out/poster.jpg"
  fi
  echo "done: $slug"
}

if [ -n "$ONLY" ]; then
  process_project "$ONLY"
  exit 0
fi

mkdir -p "$OUT/hero" "$OUT/logo" "$OUT/cinematic/hd" "$OUT/team" "$OUT/og"

# ---- hero: desktop 1920w + sharp 9:16 mobile crop, first-frame posters ----
vid "$SRC/hero/hero-master.mp4" "$OUT/hero/hero.mp4"
ffmpeg -nostdin -y -loglevel error -i "$SRC/hero/hero-master.mp4" -c:v libx264 -crf 21 -preset slow \
  -vf "crop=ih*9/16:ih,scale=720:1280" -pix_fmt yuv420p -g 24 -keyint_min 24 -an -movflags +faststart \
  "$OUT/hero/hero-mobile.mp4"
first_frame "$OUT/hero/hero.mp4" "$OUT/hero/poster.jpg"
first_frame "$OUT/hero/hero-mobile.mp4" "$OUT/hero/poster-mobile.jpg"
echo "done: hero"

# ---- logos ----
cp "$SRC/logo/develop-ec-logo-horizontal-black.svg" "$OUT/logo/logo-black.svg"
cp "$SRC/logo/develop-ec-logo-horizontal-white.svg" "$OUT/logo/logo-white.svg"
cp "$SRC/logo/develop-ec-logo-mark-black.svg" "$OUT/logo/mark-black.svg"
cp "$SRC/logo/develop-ec-logo-mark-white.svg" "$OUT/logo/mark-white.svg"
cp "$SRC/logo/develop-ec-logo-horizontal-black-800px.png" "$OUT/logo/logo-black.png"
cp "$SRC/logo/develop-ec-logo-horizontal-white-800px.png" "$OUT/logo/logo-white.png"
cp "$SRC/logo/develop-ec-logo-mark-black-256px.png" "$OUT/logo/favicon.png"
echo "done: logos"

# ---- team portraits ----
webp "$SRC/team/georgios.jpg" "$OUT/team/georgios.webp" 1200 85
webp "$SRC/team/georgios.jpg" "$OUT/team/georgios-m.webp" 700 80
webp "$SRC/team/konstantina.png" "$OUT/team/konstantina.webp" 900 85
webp "$SRC/team/georgia.png" "$OUT/team/georgia.webp" 900 85
echo "done: team"

# ---- 3D/cinematic gallery: 30 photos, plus HD copies of the mobile subset ----
for f in "$SRC/construction-gallery"/*.png; do
  n=$(basename "$f" .png)
  webp "$f" "$OUT/cinematic/$n.webp" 1024 78
done
# the numbers here must match MOBILE_SEQ in src/components/home/Cinematic.tsx
for n in 11 07 04 09 14 16 10 02 19 21 23 27; do
  webp "$SRC/construction-gallery/$n.png" "$OUT/cinematic/hd/$n.webp" 1600 84
done
echo "done: cinematic"

# ---- projects ----
for dir in "$SRC/projects"/*/; do
  process_project "$(basename "$dir")"
done

# ---- social share image (1200x630 from the flagship project) ----
ffmpeg -nostdin -y -loglevel error -i "$OUT/projects/pyrgos-luxury-complex/01.webp" \
  -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" -q:v 3 "$OUT/og/og-home.jpg"
echo "ALL DONE -> $OUT"
