#!/usr/bin/env bash
# Develop EC round-2 media sync: renamed slugs, replaced photos/videos,
# 4 new projects, team portrait.
set -uo pipefail
cd "$(dirname "$0")/.."
OUT=public/media

vid() { ffmpeg -nostdin -y -loglevel error -i "$1" -c:v libx264 -crf 23 -preset medium -vf "scale='min(1920,iw)':-2" -an -movflags +faststart -pix_fmt yuv420p "$2"; }
poster() { ffmpeg -nostdin -y -loglevel error -i "$1" -ss "$3" -frames:v 1 -q:v 3 -vf "scale='min(1920,iw)':-2" "$2"; }
webp() { ffmpeg -nostdin -y -loglevel error -i "$1" -vf "scale=$3:-2" -c:v libwebp -q:v "$4" "$2"; }
thumb() { ffmpeg -nostdin -y -loglevel error -i "$1" -vf "scale=1200:800:force_original_aspect_ratio=increase,crop=1200:800" -c:v libwebp -q:v 80 "$2"; }
img_at() { # dir slug index file
  webp "$4" "$OUT/projects/$2/0$3.webp" 1920 82
  webp "$4" "$OUT/projects/$2/0$3-m.webp" 960 78
}

# ---- slug renames ----
[ -d "$OUT/projects/katakolo-retreats" ] && git mv "$OUT/projects/katakolo-retreats" "$OUT/projects/kalamata-retreats"
[ -d "$OUT/projects/ilia-tourist-residences" ] && git mv "$OUT/projects/ilia-tourist-residences" "$OUT/projects/katakolo-terraces"
[ -d "$OUT/projects/elaia-residences" ] && git mv "$OUT/projects/elaia-residences" "$OUT/projects/agios-ilias-homes"
[ -d "$OUT/projects/kourouta-beach-villas" ] && git mv "$OUT/projects/kourouta-beach-villas" "$OUT/projects/kourouta-beach-house"
[ -d "$OUT/projects/olive-grove-villas" ] && git rm -rq "$OUT/projects/olive-grove-villas"

# ---- agios-ilias-homes: replace photos 1-3 with the new "normal road" set ----
A="2 unkown on;y 1 pic -edit   Copy"
img_at "$A" agios-ilias-homes 1 "$A/ChatGPT Image Jul 31, 2026, 09_37_42 PM (1).png"
img_at "$A" agios-ilias-homes 2 "$A/ChatGPT Image Jul 31, 2026, 09_37_42 PM (2).png"
img_at "$A" agios-ilias-homes 3 "$A/ChatGPT Image Jul 31, 2026, 09_37_43 PM (3).png"
thumb "$A/ChatGPT Image Jul 31, 2026, 09_37_42 PM (1).png" "$OUT/projects/agios-ilias-homes/thumb.webp"
echo "done: agios-ilias-homes"

# ---- kourouta-beach-house: full new set ----
K="Κουρουτα edit   - Copy"
mkdir -p "$OUT/projects/kourouta-beach-house"
img_at "$K" kourouta-beach-house 1 "$K/ChatGPT Image Jul 31, 2026, 10_05_28 PM (1).png"
img_at "$K" kourouta-beach-house 2 "$K/ChatGPT Image Jul 31, 2026, 10_05_28 PM (2).png"
img_at "$K" kourouta-beach-house 3 "$K/ChatGPT Image Jul 31, 2026, 10_05_29 PM (3).png"
img_at "$K" kourouta-beach-house 4 "$K/ChatGPT Image Jul 31, 2026, 10_05_29 PM (4).png"
img_at "$K" kourouta-beach-house 5 "$K/ChatGPT Image Jul 31, 2026, 10_05_30 PM (5).png"
img_at "$K" kourouta-beach-house 6 "$K/ChatGPT Image Jul 31, 2026, 10_05_30 PM (6).png"
thumb "$K/ChatGPT Image Jul 31, 2026, 10_05_28 PM (1).png" "$OUT/projects/kourouta-beach-house/thumb.webp"
vid "$K/hf_20260731_204745_c33ced44-4361-418b-8ab7-dafe6da3ae92.mp4" "$OUT/projects/kourouta-beach-house/video.mp4"
poster "$K/hf_20260731_204745_c33ced44-4361-418b-8ab7-dafe6da3ae92.mp4" "$OUT/projects/kourouta-beach-house/poster.jpg" 2
echo "done: kourouta-beach-house"

# ---- pyrgos-hilltop-villa: new photos 1-3 + new video ----
H="ΠΥΡΓΟΣ ΗΛΕΙΑΣ -edit   Copy"
img_at "$H" pyrgos-hilltop-villa 1 "$H/ChatGPT Image Jul 31, 2026, 11_35_08 PM.png"
img_at "$H" pyrgos-hilltop-villa 2 "$H/ChatGPT Image Jul 31, 2026, 11_49_31 PM.png"
img_at "$H" pyrgos-hilltop-villa 3 "$H/ChatGPT Image Jul 31, 2026, 11_49_37 PM.png"
thumb "$H/ChatGPT Image Jul 31, 2026, 11_35_08 PM.png" "$OUT/projects/pyrgos-hilltop-villa/thumb.webp"
vid "$H/hf_20260731_203542_cd3144a5-e5cb-4187-a70c-0f1049553930.mp4" "$OUT/projects/pyrgos-hilltop-villa/video.mp4"
poster "$H/hf_20260731_203542_cd3144a5-e5cb-4187-a70c-0f1049553930.mp4" "$OUT/projects/pyrgos-hilltop-villa/poster.jpg" 2
echo "done: pyrgos-hilltop-villa"

# ---- four new projects ----
process_new() { # slug dir
  local slug="$1" dir="$2" n=1
  mkdir -p "$OUT/projects/$slug"
  while IFS= read -r img; do
    img_at "$dir" "$slug" $n "$img"
    if [ $n -eq 1 ]; then thumb "$img" "$OUT/projects/$slug/thumb.webp"; fi
    n=$((n+1))
  done < <(ls "$dir"/ChatGPT*.png)
  local v
  v=$(ls "$dir"/*.mp4 | head -1)
  vid "$v" "$OUT/projects/$slug/video.mp4"
  poster "$v" "$OUT/projects/$slug/poster.jpg" 2
  echo "done: $slug ($((n-1)) images)"
}
process_new agios-dimitrios-apartments "u nkown 12"
process_new iroko-house                "unkown 13"
process_new white-porticoes            "unkown 14"
process_new thalassa-bungalows         "unkown 15"

# ---- team portrait ----
mkdir -p "$OUT/team"
webp "viber_image_2026-07-25_12-54-39-401.jpg" "$OUT/team/georgios.webp" 1200 85
webp "viber_image_2026-07-25_12-54-39-401.jpg" "$OUT/team/georgios-m.webp" 700 80
echo "done: team"
echo "ALL DONE"
