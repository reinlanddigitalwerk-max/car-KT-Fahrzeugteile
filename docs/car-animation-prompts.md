# Auto-Animation – Prompts (Bild → Video → Scroll)

Bewegungsablauf (laut Skizze, Kamera **fest**): Start weit hinten oben rechts → fährt schnell nach links quer durchs Bild (linke Seite sichtbar, vor dem Text) → enge Wende links → fährt diagonal auf die Kamera zu nach unten rechts → stoppt als Front-rechts-3/4-Hero-Shot mit Xenon-Flare.

| Shot | Position im Bild (x / y) | Ansicht |
|---|---|---|
| 1 Start | 80% / 27% | klein, linke Seitenansicht, fährt nach links |
| 2 Vorbeifahrt | 50% / 37% | linke Seite, schnell, Motion Blur |
| 3 Wende | 34% / 47% | dreht zur Kamera, Front sichtbar |
| 4 Annäherung | 64% / 68% | Front-rechts 3/4, größer |
| 5 Ende | 86% / 83% | nah, Front-rechts 3/4, rechter Scheinwerfer scharf |

## Auto – Frontansicht wie auf der Website (Hero)
```
Photorealistic front view of a sleek modern black sports sedan, perfectly centered and symmetrical, camera at bumper height with a slight low angle. Glossy black paint, dark tinted windshield, wide hexagonal mesh grille with a thin chrome frame and a small round black badge with the letters "KT" in muted red in the center, German license plate reading "D-KT 129", thin muted red (#C2453E) lip line along the lower front bumper. Slim angular projector xenon headlights switched on, cool white-blue 6000K glow with a subtle horizontal anamorphic lens flare, thin LED daytime running light strips. Black tires clearly visible below the body, the car standing on a glossy black floor with soft reflections. Pure black studio background (#050506), light haze, high-contrast black, white and grey mood; the only colors are the blue-white headlights and the muted red details. No other logos, no people, no extra text. Automotive commercial photography, 50mm lens, 8k, 16:9.
```

## A – Auto (Referenzbild)
```
Photorealistic studio render of a sleek modern black four-door sports sedan, completely unbranded (no logos, no badges, no plate text), glossy black paint, dark tinted windows, 5-spoke silver alloy wheels with red brake calipers, slim projector xenon headlights glowing cool white-blue (6000K), thin red LED tail light bar. Pure black studio (#050506), glossy black floor with soft reflections, light haze, white rim lighting, high-contrast black-and-white mood; the only colors are the blue-white headlights and the red calipers and tail lights. Character sheet with three views: front-right 3/4, left side profile, rear 3/4. Automotive commercial photography, 35mm lens, 8k.
```

## B – Gemeinsamer Stil (an jeden Shot anhängen)
```
Same car as the reference image. Locked-off static camera at low height, 16:9 wide frame, pure black background (#050506) fading to black at the edges, glossy dark floor with reflections, thin haze, xenon headlights on (6000K) with subtle anamorphic lens flare, red brake calipers, photorealistic cinematic automotive commercial, no text, no logos, no people.
```
1. `Wide shot. The car is far away in the upper right of the frame (about 80% from left, 27% from top), small, left side profile, driving to the left, headlights on.`
2. `The car in the upper middle of the frame (50% / 37%), left side profile, driving fast to the left, motion blur on the wheels, headlight beams cutting through the haze.`
3. `The car on the left of the frame (34% / 47%) making a sharp U-turn towards the camera, front visible as it turns, slight tire smoke, headlights sweeping across the haze.`
4. `The car in the lower middle (64% / 68%), bigger, driving diagonally towards the camera and to the right, front-right three-quarter view, headlights bright.`
5. `Final hero frame. The car close to the camera in the lower right (86% / 83%), stopped, front-right three-quarter view, the right front xenon headlight in sharp focus with a strong anamorphic flare, right side and wheel with red caliper visible, reflections on the floor. Upper left of the frame stays empty dark space.`

## C – Video (Image-to-Video, Start-/Endbild)
Am besten in zwei Teilen: Shot 1 → 3 und Shot 3 → 5, danach zusammenschneiden.
```
Static locked-off camera, absolutely no camera movement. A sleek black unbranded sports sedan with glowing xenon headlights appears far away in the upper right, drives fast from right to left across the upper middle of the frame in left side profile, makes a sharp U-turn on the left side, then drives diagonally towards the camera to the lower right, slows down and stops in a front-right three-quarter hero pose with the right headlight flaring. Pure black studio, glossy reflective floor, light haze catching the headlight beams, photorealistic automotive commercial, realistic physics and wheel rotation, consistent car design, 24 fps, 8 seconds, 16:9.
```
Negative:
```
camera shake, camera pan, zoom, cuts, logos, brand badges, text, watermark, people, deformed or extra wheels, changing car shape, colored background, daylight, city street
```

## D – Für Scroll vorbereiten
```
ffmpeg -i car.mp4 -vf "scale=1920:-2" -c:v libx264 -g 1 -crf 22 -an -movflags +faststart car-scroll.mp4
ffmpeg -i car.mp4 -vf "fps=30,scale=1600:-2" -q:v 75 frames/%04d.webp
```
