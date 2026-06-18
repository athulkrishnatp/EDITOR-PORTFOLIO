// Portfolio Content Configuration
// Edit this file to add or update your profile photo, videos, skills, software, and services.

// 1. Profile Picture Config
const PROFILE_IMAGE = "uploads/athulkrishna.jpg";

// 2. Edited Videos Showcase List
// Add your edited video files here (e.g. video files should be saved in the 'uploads/' folder).
const VIDEOS = [
  {
    title: "slowmo cinematic edit",
    file: "first.mp4",
    category: "Cinematic slowmo Edits"
  },
  {
    title: "college event promo Reel",
    file: "fourth.mp4",
    category: "promo reels"
  },
  {
    title: "college freshers day reel",
    file: "second.mp4",
    category: "promo reels"
  },
  {
    title: "potrait edit",
    file: "third.mp4",
    category: "fast cuts"
  },
  {
    title: "Timeline  #1",
    file: "tm1.mp4",
    category: "Timeline Edits"
  },
  {
    title: "Timeline Showcase #2",
    file: "tm2.mp4",
    category: "Timeline Edits"
  },
];

// 3. Software Tools List
const SOFTWARE_LOGOS = [
  {
    name: "CapCut",
    file: "vecteezy_capcut-logo-square-rounded-capcut-logo-capcut-logo-free_67065640.png",
    level: "Intermediate"
  },
  {
    name: "VN Editor",
    file: "vn.png",
    level: "Intermediate"
  },
  {
    name: "Canva",
    file: "vecteezy_canva-transparent-icon_48759334.png",
    level: "Intermediate"
  },
  {
    name: "PicsArt",
    file: "vecteezy_picsart-logo-on-a-transparent-background_52925023.png",
    level: "Intermediate"
  },
  {
    name: "Lightroom",
    file: "vecteezy_adobe-lightroom-icon_19016804.png",
    level: "Intermediate"
  },
  {
    name: "After Effects",
    file: "vecteezy_adobe-after-effects-icon_46437267.png",
    level: "Beginner"
  },
];

// 4. Tech Skills List
const editingSkills = [
  "Poster Making",
  "Sound Design",
  "Fast-Cut Editing",
  "Slow Motion Editing",
  "Cinematic Editing",
  "Social Media Content Editing",
  "Color Enhancement",
  "Reels Editing",
];

// 5. Professional Services Offered
const services = [
  {
    title: "Video Editing",
    icon: "scissors",
    desc: "Precise cuts, pacing and polish, tuned for every format."
  },
  {
    title: "Reels Editing",
    icon: "film",
    desc: "Punchy, trend-aware edits built to hold attention."
  },
  {
    title: "Short-form Content",
    icon: "sparkles",
    desc: "Concept-to-clip content made for social feeds."
  },
  {
    title: "Videography",
    icon: "camera",
    desc: "On-location shoots with a deliberate, cinematic eye."
  },
  {
    title: "Sound Design",
    icon: "volume-2",
    desc: "Layered audio and mix work that gives scenes weight."
  },
  {
    title: "Poster Design",
    icon: "image",
    desc: "Bold key art for releases, events and campaigns."
  },
];

// 6. Interactive Case Studies Data (Behance 2026 Style)
const COLOR_GRADING_CASES = [
  {
    title: "Cinematic Slowmo Grade",
    video: "uploads/first.mp4",
    desc: "Transforming flat Log profiles into moody, high-contrast cinematic visuals with customized orange-and-teal tones.",
    rawFilter: "saturate(0.3) contrast(0.8) brightness(1.1) sepia(0.1)",
    gradedFilter: "saturate(1.25) contrast(1.2) brightness(0.95) hue-rotate(-5deg)"
  },
  {
    title: "Vibrant Promo Reel Grade",
    video: "uploads/fourth.mp4",
    desc: "Boosting saturation and contrast for commercial pop, bringing out skin tones and architectural details.",
    rawFilter: "saturate(0.4) contrast(0.9) brightness(1.05)",
    gradedFilter: "saturate(1.4) contrast(1.1) brightness(1.0)"
  }
];

const SOUND_DESIGN_CASES = {
  video: "uploads/second.mp4",
  title: "College Event Promo Audio",
  desc: "A breakdown of the audio environment built for the Freshers Day reel, blending high-energy beats with environmental foley.",
  stems: [
    { id: "ambience", name: "Environmental Ambience", frequency: 120, waveSpeed: "1.2s", color: "var(--cyan)" },
    { id: "sfx", name: "Foley & Transition SFX", frequency: 350, waveSpeed: "0.6s", color: "var(--purple)" },
    { id: "music", name: "Cinematic Background Beat", frequency: 80, waveSpeed: "0.8s", color: "var(--pink)" }
  ]
};

const VFX_BREAKDOWN_CASES = [
  {
    title: "Cyberpunk Overlay Compositing",
    video: "uploads/third.mp4",
    desc: "Synthesizing vector motion graphics, tracking points, and glow effects onto raw portrait footage.",
    steps: [
      { id: "raw", label: "01. RAW PLATE", desc: "Straight out of the camera desaturated raw portrait.", overlayClass: "" },
      { id: "tracking", label: "02. TRACKING DATA", desc: "Camera solve and point tracking wireframe overlay.", overlayClass: "vfx-overlay-tracking" },
      { id: "compositing", label: "03. ELEMENT MASKING", desc: "Compositing vector layers and neon glow textures.", overlayClass: "vfx-overlay-compositing" },
      { id: "final", label: "04. FINAL COMPOUND", desc: "Color grading, grain matching, and vignette integration.", overlayClass: "vfx-overlay-final" }
    ]
  }
];

