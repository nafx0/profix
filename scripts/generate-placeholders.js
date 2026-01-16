/**
 * Generate Placeholder Sequence Script
 *
 * This script creates placeholder WebP frames for development.
 * In production, replace these with actual car animation frames.
 *
 * Usage: node scripts/generate-placeholders.js
 *
 * Requirements: Node.js 18+ with built-in fetch
 */

const fs = require("fs");
const path = require("path");

const SEQUENCE_DIR = path.join(__dirname, "..", "public", "sequence");
const TOTAL_FRAMES = 120;

// SVG template for placeholder frames
function createPlaceholderSVG(frameIndex) {
  const progress = frameIndex / TOTAL_FRAMES;
  const hue = Math.round(progress * 60); // 0-60 (red to yellow gradient)
  const rotation = Math.round(progress * 360);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <rect fill="#050505" width="1920" height="1080"/>
  
  <!-- Grid pattern -->
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1920" height="1080" fill="url(#grid)"/>
  
  <!-- Animated car silhouette (simplified) -->
  <g transform="translate(960, 540)">
    <g transform="rotate(${rotation * 0.1})">
      <!-- Car body outline -->
      <ellipse cx="0" cy="0" rx="${200 + progress * 100}" ry="${
    80 + progress * 40
  }" 
               fill="none" stroke="rgba(255,255,255,${
                 0.1 + progress * 0.2
               })" stroke-width="2"/>
      <ellipse cx="0" cy="0" rx="${150 + progress * 80}" ry="${
    60 + progress * 30
  }" 
               fill="none" stroke="rgba(255,255,255,${
                 0.15 + progress * 0.15
               })" stroke-width="1"/>
      
      <!-- Exploding parts simulation -->
      ${generateExplodingParts(progress)}
    </g>
  </g>
  
  <!-- Frame indicator -->
  <text x="1880" y="1050" text-anchor="end" font-family="Inter, sans-serif" font-size="14" fill="rgba(255,255,255,0.2)">
    Frame ${String(frameIndex).padStart(4, "0")} / ${TOTAL_FRAMES}
  </text>
  
  <!-- Progress bar -->
  <rect x="40" y="1050" width="200" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
  <rect x="40" y="1050" width="${
    200 * progress
  }" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
  
  <!-- Center text for development -->
  <text x="960" y="520" text-anchor="middle" font-family="Inter, sans-serif" font-size="24" fill="rgba(255,255,255,0.15)">
    PLACEHOLDER FRAME
  </text>
  <text x="960" y="560" text-anchor="middle" font-family="Inter, sans-serif" font-size="16" fill="rgba(255,255,255,0.1)">
    Replace with actual car animation sequence
  </text>
</svg>`;
}

function generateExplodingParts(progress) {
  const parts = [];
  const numParts = 12;

  for (let i = 0; i < numParts; i++) {
    const angle = (i / numParts) * Math.PI * 2;
    const distance = 50 + progress * 200;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance * 0.5; // Flatten for perspective
    const opacity = 0.1 + (1 - progress) * 0.3;
    const size = 10 + progress * 20;

    parts.push(`
      <rect x="${x - size / 2}" y="${
      y - size / 2
    }" width="${size}" height="${size}" 
            fill="none" stroke="rgba(255,255,255,${opacity})" stroke-width="1"
            transform="rotate(${(angle * 180) / Math.PI + progress * 90})"/>
    `);
  }

  return parts.join("");
}

async function generateFrames() {
  console.log("Generating placeholder frames...\n");

  // Ensure directory exists
  if (!fs.existsSync(SEQUENCE_DIR)) {
    fs.mkdirSync(SEQUENCE_DIR, { recursive: true });
  }

  // Generate poster first
  const posterSVG = createPlaceholderSVG(1);
  fs.writeFileSync(path.join(SEQUENCE_DIR, "poster.svg"), posterSVG);
  console.log("✓ Created poster.svg");

  // Generate frames (as SVG for simplicity - in production use WebP)
  for (let i = 0; i <= TOTAL_FRAMES; i++) {
    const filename = `frame_${String(i).padStart(4, "0")}_delay-0.066s.svg`;
    const svg = createPlaceholderSVG(i);
    fs.writeFileSync(path.join(SEQUENCE_DIR, filename), svg);

    if (i % 20 === 0) {
      console.log(`✓ Created frame ${i}/${TOTAL_FRAMES}`);
    }
  }

  console.log("\n✅ All placeholder frames generated!");
  console.log("\n⚠️  Note: These are SVG placeholders for development.");
  console.log("   For production, replace with actual WebP frames.");
  console.log("\n   To convert SVG to WebP, use:");
  console.log(
    '   npx sharp-cli --input "public/sequence/*.svg" --output public/sequence/ --format webp'
  );
}

generateFrames().catch(console.error);
