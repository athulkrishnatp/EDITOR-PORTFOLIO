// Portfolio script execution
// The configuration lists (PROFILE_IMAGE, VIDEOS, SOFTWARE_LOGOS, editingSkills, services) are loaded from portfolio-data.js


document.addEventListener("DOMContentLoaded", () => {
  initLoadingScreen();
  initDynamicRendering();
  initCustomCursor();
  initThreeJS();
  initScrollAndNav();
  initRevealOnScroll();
  initVideoModal();
  initContactForm();

  // Behance 2026 Interactive Features
  initShowreelVideo();
  initColorGradingSlider();
  initSoundStemsController();
  initVfxBreakdown();
  initPosterBook();
});

// ==========================================
// Loading Screen Animation
// ==========================================
function initLoadingScreen() {
  const loadingScreen = document.getElementById("loading-screen");
  const loadingBar = document.getElementById("loading-bar");
  const loadingPct = document.getElementById("loading-pct");

  let loadPct = 0;

  const interval = setInterval(() => {
    loadPct += 5 + Math.random() * 18;
    if (loadPct >= 100) {
      loadPct = 100;
      clearInterval(interval);
      setTimeout(() => {
        loadingScreen.classList.add("fade-out");
      }, 350);
    }

    loadingBar.style.width = `${loadPct}%`;
    loadingPct.textContent = `${String(Math.floor(loadPct)).padStart(3, "0")}%`;
  }, 120);
}

// ==========================================
// Custom Neon Cursor
// ==========================================
function initCustomCursor() {
  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  const isFinePointer = window.matchMedia("(pointer: fine)").matches;

  if (!isFinePointer) {
    cursor.style.display = "none";
    return;
  }

  // Hide normal cursor
  document.body.classList.add("hide-native-cursor");

  let posX = -100;
  let posY = -100;

  window.addEventListener("mousemove", (e) => {
    posX = e.clientX;
    posY = e.clientY;

    // Smooth frame movement using inline transform style
    cursor.style.transform = `translate(${posX}px, ${posY}px)`;
  });

  // Hover effect using event delegation
  document.addEventListener("mouseover", (e) => {
    const isInteractive = e.target.closest("button, a, input, textarea, .video-card, .contact-row-action, .nav-link");
    if (isInteractive) {
      cursor.classList.add("hover");
    } else {
      cursor.classList.remove("hover");
    }
  });
}


// ==========================================
// Background Particles & Dynamic Grid Rendering
// ==========================================
function initDynamicRendering() {
  // Set Profile Image src
  const profileImg = document.getElementById("profile-img");
  if (profileImg && typeof PROFILE_IMAGE !== "undefined") {
    profileImg.src = PROFILE_IMAGE;
  }

  // 1. Particle Canvas Background
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let w = 0;
  let h = 0;
  let particles = [];

  const resizeCanvas = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(80, Math.floor((w * h) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.8 + 0.3,
      vy: -(Math.random() * 0.28 + 0.05),
      vx: (Math.random() - 0.5) * 0.08,
      o: Math.random() * 0.45 + 0.1,
      hue: Math.random() > 0.33 ? (Math.random() > 0.5 ? "0,229,255" : "200,150,255") : "255,100,200",
    }));
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  let mouseX = undefined;
  let mouseY = undefined;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!prefersReducedMotion) {
      for (let i = 0; i < 2; i++) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 8,
          y: mouseY + (Math.random() - 0.5) * 8,
          r: Math.random() * 2 + 0.6,
          vy: (Math.random() - 0.5) * 0.4 - 0.1,
          vx: (Math.random() - 0.5) * 0.4,
          o: 1.0,
          decay: Math.random() * 0.02 + 0.015,
          hue: Math.random() > 0.5 ? "0,229,255" : "217,70,239",
          isTrail: true
        });
      }
    }
  });

  window.addEventListener("mouseleave", () => {
    mouseX = undefined;
    mouseY = undefined;
  });

  let raf;
  const animateParticles = () => {
    ctx.clearRect(0, 0, w, h);

    // Filter out decayed trail particles
    particles = particles.filter(p => !p.isTrail || p.o > 0);

    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      if (p.isTrail) {
        ctx.shadowBlur = 0;
      } else {
        ctx.shadowColor = `rgba(${p.hue}, ${p.o})`;
        ctx.shadowBlur = 15;
      }
      ctx.fillStyle = `rgba(${p.hue}, ${p.o})`;
      ctx.fill();

      if (!prefersReducedMotion) {
        if (p.isTrail) {
          p.x += p.vx;
          p.y += p.vy;
          p.o -= p.decay;
        } else {
          // Interactive repulsion from mouse
          if (mouseX !== undefined && mouseY !== undefined) {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
              const force = (120 - dist) / 120;
              p.x += (dx / dist) * force * 1.8;
              p.y += (dy / dist) * force * 1.8;
            }
          }

          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
      }
    });
    raf = requestAnimationFrame(animateParticles);
  };
  animateParticles();

  // 2. Render Videos
  const videosGrid = document.getElementById("videos-grid");
  window.renderVideos = function (category = "all") {
    if (!videosGrid) return;
    videosGrid.innerHTML = "";
    const filteredVideos = category === "all"
      ? VIDEOS
      : VIDEOS.filter(vid => vid.category === category);

    filteredVideos.forEach((vid) => {
      const card = document.createElement("div");
      card.className = "video-card glass reveal";
      card.innerHTML = `
        <div class="video-card-inner">
          <video class="video-preview" src="uploads/${vid.file}" muted loop playsinline style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 1; pointer-events: none; z-index: 1;"></video>
          <div class="video-card-overlay" style="z-index: 2;"></div>
          <div class="video-play-btn" style="z-index: 3;">
            <i data-lucide="play" style="width: 24px; height: 24px;"></i>
          </div>
          <div class="video-card-text" style="z-index: 3;">
            <h4 class="video-title-text">${vid.title}</h4>
            <p class="video-category-text">${vid.category}</p>
          </div>
        </div>
      `;

      card.addEventListener("click", () => openVideoModal(vid));
      card.addEventListener("mouseenter", () => {
        const preview = card.querySelector(".video-preview");
        if (preview) {
          preview.play().catch(() => { });
        }
      });
      card.addEventListener("mouseleave", () => {
        const preview = card.querySelector(".video-preview");
        if (preview) {
          preview.pause();
          preview.currentTime = 0;
        }
      });
      videosGrid.appendChild(card);
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
    if (typeof initRevealOnScroll === "function") {
      initRevealOnScroll();
    }
  };

  // Initial videos rendering
  window.renderVideos("all");

  // Category Filtering Logic
  const filterContainer = document.getElementById("video-filters");
  if (filterContainer) {
    filterContainer.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter-btn");
      if (!btn) return;

      document.querySelectorAll(".filter-btn").forEach(b => {
        b.classList.remove("active");
        b.style.borderColor = "var(--border)";
        b.style.color = "var(--text)";
      });

      btn.classList.add("active");
      btn.style.borderColor = "var(--cyan)";
      btn.style.color = "var(--cyan)";

      const filter = btn.getAttribute("data-filter");
      window.renderVideos(filter);
    });
  }

  // 3. Render Technical Arsenal (Skills tags)
  const tagsContainer = document.getElementById("skills-tags-container");
  editingSkills.forEach((skill) => {
    const chip = document.createElement("div");
    chip.className = "chip glass reveal";
    chip.textContent = skill;
    tagsContainer.appendChild(chip);
  });

  // 4. Render Software Tools
  const softwareGrid = document.getElementById("software-grid");
  SOFTWARE_LOGOS.forEach((soft) => {
    const card = document.createElement("div");
    card.className = "software-card glass reveal";
    const levelClass = soft.level.toLowerCase();
    const targetPct = soft.level === "Intermediate" ? 75 : (soft.level === "Beginner" ? 40 : 50);
    card.innerHTML = `
      <img src="uploads/${soft.file}" alt="${soft.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Crect fill=\'%23333\' width=\'100\' height=\'100\'%27/%3E%3C/svg%3E'">
      <div>
        <h4 class="software-card-name">${soft.name}</h4>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.25rem;">
          <p class="software-card-level ${levelClass}" style="margin-top: 0;">${soft.level}</p>
          <span class="software-card-pct ${levelClass}" data-target="${targetPct}" style="font-family: var(--font-mono); font-size: 0.6875rem; font-weight: 600;">0%</span>
        </div>
        <div class="software-progress-track">
          <div class="software-progress-bar ${levelClass}"></div>
        </div>
      </div>
    `;
    softwareGrid.appendChild(card);
  });

  // 5. Render Services
  const servicesGrid = document.getElementById("services-grid");
  services.forEach((svc) => {
    const card = document.createElement("div");
    card.className = "service-card glass reveal";
    card.innerHTML = `
      <div class="service-card-icon-wrapper">
        <i data-lucide="${svc.icon}" style="width: 20px; height: 20px;"></i>
      </div>
      <h3 class="service-card-title">${svc.title}</h3>
      <p class="service-card-desc">${svc.desc}</p>
    `;
    servicesGrid.appendChild(card);
  });

  // 6. Render Contact details
  const contactRowsContainer = document.getElementById("contact-rows-container");
  const contactData = [
    { icon: "mail", label: "Email", value: "mail to", href: "mailto:athulkrishna20@outlook.in" },
    { icon: "phone", label: "WhatsApp", value: "message to", href: "https://wa.me/917012351024" },
    { icon: "message-circle", label: "Phone", value: "call to", copyValue: "+917012351024" },
    { icon: "github", label: "Github", value: "Follow", href: "https://github.com/athulkrishnatp" },
    { icon: "linkedin", label: "LinkedIn", value: "Follow", href: "https://www.linkedin.com/in/athulkrishnatp2006?utm_source=share_via&utm_content=profile&utm_medium=member_android" }
  ];

  contactData.forEach((contact) => {
    const row = document.createElement("div");
    row.className = "contact-row glass reveal";

    let actionElement = "";
    if (contact.copyValue) {
      actionElement = `
        <button class="contact-row-action" data-copy="${contact.copyValue}" aria-label="Copy ${contact.label}">
          <i data-lucide="copy" style="width: 16px; height: 16px;"></i>
        </button>
      `;
    } else if (contact.href) {
      actionElement = `
        <a href="${contact.href}" target="_blank" rel="noreferrer" class="contact-row-action" aria-label="Open ${contact.label}">
          <i data-lucide="arrow-up-right" style="width: 16px; height: 16px;"></i>
        </a>
      `;
    }

    row.innerHTML = `
      <div class="contact-row-icon">
        <i data-lucide="${contact.icon}" style="width: 18px; height: 18px;"></i>
      </div>
      <div class="contact-row-body">
        <div class="contact-row-label">${contact.label}</div>
        <div class="contact-row-value">${contact.value}</div>
      </div>
      ${actionElement}
    `;
    contactRowsContainer.appendChild(row);
  });

  // Re-run lucide icons parser for dynamic icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 7. Setup Instagram Reel Hover Playback
  const instagramCard = document.getElementById("instagram-reel-card");
  const instagramVideo = document.getElementById("instagram-reel-video");
  if (instagramCard && instagramVideo) {
    instagramCard.addEventListener("mouseenter", () => {
      const overlay = instagramCard.querySelector(".video-card-overlay");
      if (overlay) overlay.style.backgroundColor = "rgba(0, 0, 0, 0.15)";
      instagramVideo.play().catch(() => { });
    });
    instagramCard.addEventListener("mouseleave", () => {
      const overlay = instagramCard.querySelector(".video-card-overlay");
      if (overlay) overlay.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      instagramVideo.pause();
      instagramVideo.currentTime = 0;
    });

    instagramCard.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      openVideoModal({
        title: "Instagram Reel Magic Edit",
        file: "fifth.mp4",
        category: "@k3.magic"
      });
    });
  }
}

// ==========================================
// ThreeJS Holo-Lens Scene
// ==========================================
function initThreeJS() {
  const mount = document.getElementById("holo-scene-mount");
  if (!mount) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let width = mount.clientWidth || 300;
  let height = mount.clientHeight || 300;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.z = 4.2;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  mount.appendChild(renderer.domElement);

  const group = new THREE.Group();

  // Main rings with neon colors
  const ringColors = [0x00e5ff, 0xd946ef, 0x3b82f6];
  const rings = [];

  [1.2, 1.65, 2.1].forEach((size, i) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(size, 0.012, 8, 100),
      new THREE.MeshBasicMaterial({
        color: ringColors[i],
        transparent: true,
        opacity: 0.8,
      })
    );
    if (i > 0) ring.rotation.x = (Math.PI / 3) * (i + 1);
    rings.push(ring);
    group.add(ring);
  });

  // Pulsing wireframe core
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.5, 2),
    new THREE.MeshBasicMaterial({
      color: 0xff64c8,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    })
  );
  group.add(core);

  // Orbital point particles
  const particleCount = 150;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    const r = 2.3 + Math.random() * 0.7;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0x00e5ff,
    size: 0.025,
    transparent: true,
    opacity: 0.6,
  });
  const points = new THREE.Points(pGeo, pMat);
  group.add(points);

  scene.add(group);

  // Mouse tilt interaction
  let targetTiltX = 0;
  mount.addEventListener("mousemove", (e) => {
    const rect = mount.getBoundingClientRect();
    targetTiltX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
  });

  let raf;
  const animateScene = () => {
    if (!prefersReducedMotion) {
      group.rotation.y += 0.003;
      rings[1].rotation.z += 0.004;
      rings[2].rotation.z -= 0.0025;
      core.rotation.x += 0.005;
      points.rotation.y -= 0.0012;
      group.rotation.x += (targetTiltX - group.rotation.x) * 0.05;

      const pulse = Math.sin(Date.now() * 0.003) * 0.15 + 0.85;
      core.material.opacity = pulse;
    }

    renderer.render(scene, camera);
    raf = requestAnimationFrame(animateScene);
  };
  animateScene();

  const handleResize = () => {
    width = mount.clientWidth || 300;
    height = mount.clientHeight || 300;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };
  window.addEventListener("resize", handleResize);
}

// ==========================================
// Scroll Management & Navigation Highlight
// ==========================================
function initScrollAndNav() {
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
  const sections = document.querySelectorAll("main > section");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenuClose = document.getElementById("mobile-menu-close");

  // Open/Close mobile menu logic
  if (mobileMenuBtn && mobileMenuOverlay) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuOverlay.classList.add("open");
    });
  }

  if (mobileMenuClose && mobileMenuOverlay) {
    mobileMenuClose.addEventListener("click", () => {
      mobileMenuOverlay.classList.remove("open");
    });
  }

  // Highlight active link on scroll and update section visibility classes
  const updateScrollState = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const viewportHeight = window.innerHeight;
    const center = scrollY + viewportHeight / 2;
    let activeId = "hero";

    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.clientHeight;
      if (center >= top && center < top + height) {
        activeId = sec.id;
        sec.classList.add("section-active");
      } else {
        sec.classList.remove("section-active");
      }
    });

    navLinks.forEach((link) => {
      if (link.getAttribute("data-section") === activeId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    mobileNavLinks.forEach((link) => {
      if (link.getAttribute("data-section") === activeId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    // Update neon scroll progress bar
    const scrollHeight = document.documentElement.scrollHeight;
    const totalScrollable = scrollHeight - viewportHeight;
    const progressPct = totalScrollable > 0 ? (scrollY / totalScrollable) * 100 : 0;
    const progressBar = document.getElementById("scroll-progress-bar");
    if (progressBar) {
      progressBar.style.width = `${progressPct}%`;
    }
  };

  window.addEventListener("scroll", updateScrollState);
  updateScrollState(); // Initialize state on load

  // Scroll smooth to targeted section with slow, custom transition
  document.addEventListener("click", (e) => {
    // Standard desktop link or scroll trigger
    const btn = e.target.closest("[data-scroll], [data-section]");
    if (btn && !btn.classList.contains("mobile-nav-link")) {
      const targetId = btn.getAttribute("data-scroll") || btn.getAttribute("data-section");
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        smoothScrollTo(targetSec.offsetTop, 1400); // 1.4s slow smooth transition
      }
    }

    // Mobile nav link trigger (also closes the menu overlay)
    const mobileLink = e.target.closest(".mobile-nav-link");
    if (mobileLink) {
      const targetId = mobileLink.getAttribute("data-section");
      const targetSec = document.getElementById(targetId);
      if (targetSec) {
        if (mobileMenuOverlay) {
          mobileMenuOverlay.classList.remove("open");
        }
        smoothScrollTo(targetSec.offsetTop, 1400);
      }
    }
  });

  // Custom smooth scroll function with easing (easeInOutCubic)
  function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY || document.documentElement.scrollTop;
    const change = targetY - startY;
    const startTime = performance.now();
    let isCanceled = false;

    // Cancel dynamic scroll if user manually scrolls or touches the container
    const cancelScroll = () => {
      isCanceled = true;
      window.removeEventListener("wheel", cancelScroll);
      window.removeEventListener("touchmove", cancelScroll);
    };
    window.addEventListener("wheel", cancelScroll);
    window.addEventListener("touchmove", cancelScroll);

    function animateScroll(currentTime) {
      if (isCanceled) return;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing: easeInOutCubic
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startY + change * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      } else {
        window.removeEventListener("wheel", cancelScroll);
        window.removeEventListener("touchmove", cancelScroll);
      }
    }

    requestAnimationFrame(animateScroll);
  }
}

// ==========================================
// Reveal Animations on Scroll
// ==========================================
function initRevealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  if (reveals.length === 0) return;

  // Add CSS reveal styles inline if they are not in stylesheet
  const style = document.createElement("style");
  style.textContent = `
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.7s ease-out, transform 0.7s ease-out;
    }
    .reveal.in-view {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  const observerOptions = {
    root: null, // viewport
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");

        // Animate count up for percentage text in software cards
        if (entry.target.classList.contains("software-card")) {
          const pctEl = entry.target.querySelector(".software-card-pct");
          if (pctEl) {
            animatePercentCount(pctEl);
          }
        }

        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  function animatePercentCount(element) {
    const target = parseInt(element.getAttribute("data-target"), 10);
    let current = 0;
    const duration = 2000; // 2 seconds to match progress animation
    const startTime = performance.now();

    function updateCount(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      current = Math.floor(ease * target);
      element.textContent = `${current}%`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = `${target}%`;
      }
    }

    requestAnimationFrame(updateCount);
  }

  reveals.forEach((el) => observer.observe(el));
}

// ==========================================
// Video Showcase Modal Overlay
// ==========================================
function initVideoModal() {
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const modalTitle = document.getElementById("modal-video-title");
  const modalCategory = document.getElementById("modal-video-category");
  const modalCloseBtn = document.getElementById("modal-close-btn");

  window.openVideoModal = function (vid) {
    modalVideo.src = `uploads/${vid.file}`;
    modalTitle.textContent = vid.title;
    modalCategory.textContent = vid.category;
    modal.classList.add("open");
    modalVideo.play();

    // Disable custom cursor and restore native cursor when playing video
    document.body.classList.remove("hide-native-cursor");
    const customCursor = document.getElementById("custom-cursor");
    if (customCursor) {
      customCursor.style.display = "none";
    }
  };

  window.closeVideoModal = function () {
    modalVideo.pause();
    modalVideo.src = "";
    modal.classList.remove("open");

    // Restore custom cursor and hide native cursor when closing
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (isFinePointer) {
      document.body.classList.add("hide-native-cursor");
      const customCursor = document.getElementById("custom-cursor");
      if (customCursor) {
        customCursor.style.display = "block";
      }
    }
  };

  modalCloseBtn.addEventListener("click", window.closeVideoModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      window.closeVideoModal();
    }
  });
}

// ==========================================
// Copy Clipboards & Contact Form Submission
// ==========================================
function initContactForm() {
  // 1. Copy click listeners
  document.addEventListener("click", async (e) => {
    const copyBtn = e.target.closest("[data-copy]");
    if (copyBtn) {
      const text = copyBtn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        triggerCopySuccess(copyBtn);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          triggerCopySuccess(copyBtn);
        } catch (err) {
          console.error("Clipboard copy failed", err);
        }
        document.body.removeChild(ta);
      }
    }
  });

  function triggerCopySuccess(btn) {
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `<i data-lucide="check" style="width: 16px; height: 16px; color: var(--cyan);"></i>`;
    if (window.lucide) {
      window.lucide.createIcons();
    }
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 1500);
  }

  // 2. Submit simulator
  const contactForm = document.getElementById("contact-form");
  const formCardContainer = document.getElementById("form-card-container");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameVal = document.getElementById("form-name").value.trim();
      const emailVal = document.getElementById("form-email").value.trim();
      const messageVal = document.getElementById("form-message").value.trim();

      if (!nameVal || !emailVal || !messageVal) return;

      const googleFormUrl = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSecIXQ4jKmQN8_T9mqzDQYDpqwmSHOmVjvACvblszBKbajmQg/formResponse";
      const formData = new FormData();
      formData.append("entry.575082474", nameVal);
      formData.append("entry.241259942", emailVal);
      formData.append("entry.111098357", messageVal);

      fetch(googleFormUrl, {
        method: "POST",
        mode: "no-cors",
        body: formData
      }).catch(err => console.error("Error submitting to Google Form", err));

      const firstName = nameVal.split(" ")[0];

      formCardContainer.innerHTML = `
        <div class="form-success-wrapper">
          <div class="form-success-icon">
            <i data-lucide="check" style="width: 28px; height: 28px;"></i>
          </div>
          <p class="form-success-title">Message Received</p>
          <p class="form-success-desc">
            Thanks, ${firstName} — I'll get back to you within 24 hours.
          </p>
        </div>
      `;

      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  }
}

// ==========================================
// Showreel Video Player Control
// ==========================================
function initShowreelVideo() {
  const video = document.getElementById("main-showreel-video");
  const overlay = document.getElementById("showreel-video-overlay");
  const playBtn = document.getElementById("showreel-play-btn");
  const muteBtn = document.getElementById("showreel-mute-btn");
  const progress = document.getElementById("showreel-progress");
  const progressWrapper = document.querySelector(".showreel-player-wrapper .timeline-bar-wrapper");
  const timeDisplay = document.getElementById("showreel-time");
  const controls = document.getElementById("showreel-controls-bar");

  if (!video) return;

  const togglePlay = () => {
    if (video.paused) {
      video.play().catch(() => { });
      overlay.style.opacity = 0;
      overlay.style.pointerEvents = "none";
      playBtn.innerHTML = `<i data-lucide="pause" style="width: 32px; height: 32px; fill: white; color: white;"></i>`;
    } else {
      video.pause();
      overlay.style.opacity = 1;
      overlay.style.pointerEvents = "auto";
      playBtn.innerHTML = `<i data-lucide="play" style="width: 32px; height: 32px; fill: white; color: white; margin-left: 4px;"></i>`;
    }
    if (window.lucide) window.lucide.createIcons();
  };

  overlay.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);

  video.addEventListener("timeupdate", () => {
    if (!video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    if (progress) progress.style.width = `${pct}%`;

    const mins = Math.floor(video.currentTime / 60);
    const secs = Math.floor(video.currentTime % 60);
    if (timeDisplay) {
      timeDisplay.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  });

  if (muteBtn) {
    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
      muteBtn.innerHTML = video.muted
        ? `<i data-lucide="volume-x" style="width: 18px; height: 18px;"></i>`
        : `<i data-lucide="volume-2" style="width: 18px; height: 18px;"></i>`;
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (progressWrapper) {
    progressWrapper.addEventListener("click", (e) => {
      e.stopPropagation();
      const rect = progressWrapper.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newPct = clickX / width;
      video.currentTime = newPct * video.duration;
    });
  }

  // Hover states show control bar
  const wrapper = video.parentElement;
  if (wrapper && controls) {
    wrapper.addEventListener("mouseenter", () => {
      controls.style.transform = "translateY(0)";
    });
    wrapper.addEventListener("mouseleave", () => {
      if (!video.paused) {
        controls.style.transform = "translateY(100%)";
      }
    });
  }
}

// ==========================================
// Before/After Color Grading Comparison Slider
// ==========================================
function initColorGradingSlider() {
  const container = document.querySelector(".grading-slider-container");
  const handle = document.getElementById("grading-slider-handle");
  const rawWrapper = document.getElementById("grading-raw-wrapper");
  const rawVideo = document.getElementById("grading-video-raw");
  const gradedVideo = document.getElementById("grading-video-graded");
  const tabBtns = document.querySelectorAll(".grading-tab-btn");
  const caseTitle = document.getElementById("grading-case-title");
  const caseDesc = document.getElementById("grading-case-desc");

  if (!container || !handle || !rawWrapper || !rawVideo || !gradedVideo) return;

  // Syncing playheads
  const syncPlayback = () => {
    if (rawVideo.paused !== gradedVideo.paused) {
      if (rawVideo.paused) gradedVideo.pause();
      else gradedVideo.play().catch(() => { });
    }
    if (Math.abs(rawVideo.currentTime - gradedVideo.currentTime) > 0.08) {
      gradedVideo.currentTime = rawVideo.currentTime;
    }
  };

  rawVideo.addEventListener("play", syncPlayback);
  rawVideo.addEventListener("pause", syncPlayback);
  rawVideo.addEventListener("seeking", syncPlayback);
  rawVideo.addEventListener("seeked", syncPlayback);
  rawVideo.addEventListener("timeupdate", syncPlayback);

  // Apply default custom filters
  rawVideo.style.filter = COLOR_GRADING_CASES[0].rawFilter;
  gradedVideo.style.filter = COLOR_GRADING_CASES[0].gradedFilter;

  const syncVideoWidth = () => {
    const rect = container.getBoundingClientRect();
    rawVideo.style.width = `${rect.width}px`;
  };
  syncVideoWidth();
  window.addEventListener("resize", syncVideoWidth);

  // Drag logic
  let isDragging = false;

  const updateSliderPosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    const pct = (x / rect.width) * 100;

    handle.style.left = `${pct}%`;
    rawWrapper.style.width = `${pct}%`;
    rawVideo.style.width = `${rect.width}px`;
  };

  const startDrag = (e) => {
    isDragging = true;
    updateSliderPosition(e.touches ? e.touches[0].clientX : e.clientX);
    rawVideo.play().catch(() => { });
    gradedVideo.play().catch(() => { });
  };

  const stopDrag = () => {
    isDragging = false;
  };

  const doDrag = (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches ? e.touches[0].clientX : e.clientX);
  };

  handle.addEventListener("mousedown", startDrag);
  handle.addEventListener("touchstart", startDrag, { passive: true });
  window.addEventListener("mouseup", stopDrag);
  window.addEventListener("touchend", stopDrag);
  window.addEventListener("mousemove", doDrag);
  window.addEventListener("touchmove", doDrag, { passive: true });

  // Tab switching
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const idx = parseInt(btn.getAttribute("data-idx"), 10);
      const caseData = COLOR_GRADING_CASES[idx];
      if (caseData) {
        rawVideo.src = caseData.video;
        gradedVideo.src = caseData.video;
        rawVideo.style.filter = caseData.rawFilter;
        gradedVideo.style.filter = caseData.gradedFilter;
        if (caseTitle) caseTitle.textContent = caseData.title;
        if (caseDesc) caseDesc.textContent = caseData.desc;

        syncVideoWidth();

        // Restart play
        rawVideo.play().catch(() => { });
        gradedVideo.play().catch(() => { });
      }
    });
  });

  // Start playing automatically when scrolled into view
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rawVideo.play().catch(() => { });
        gradedVideo.play().catch(() => { });
      } else {
        rawVideo.pause();
        gradedVideo.pause();
      }
    });
  }, { threshold: 0.25 });
  obs.observe(container);
}

// ==========================================
// Sound Design Audio Stems Toggles
// ==========================================
function initSoundStemsController() {
  const video = document.getElementById("sound-video");
  const playOverlay = document.getElementById("sound-play-overlay");
  const toggleBtns = document.querySelectorAll(".stem-toggle-btn");

  if (!video) return;

  let audioCtx = null;
  let sourceNode = null;
  let stemsNode = {};

  function initAudioGraph() {
    if (audioCtx) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();

      // Crucial: video must not be muted so audio flows to Web Audio API
      video.muted = false;

      // Create source from the video element
      sourceNode = audioCtx.createMediaElementSource(video);

      // Create filter bands for Stems simulation
      const lpFilter = audioCtx.createBiquadFilter();
      lpFilter.type = "lowpass";
      lpFilter.frequency.value = 350; // Bass/Kick/Beat

      const bpFilter = audioCtx.createBiquadFilter();
      bpFilter.type = "bandpass";
      bpFilter.frequency.value = 1500; // Foley/Impacts/Vocals
      bpFilter.Q.value = 0.8;

      const hpFilter = audioCtx.createBiquadFilter();
      hpFilter.type = "highpass";
      hpFilter.frequency.value = 3500; // Ambience/Highs/Sweeps

      // Create gains for toggling
      const gainAmb = audioCtx.createGain();
      const gainSfx = audioCtx.createGain();
      const gainMus = audioCtx.createGain();

      // Connect graph
      sourceNode.connect(lpFilter);
      sourceNode.connect(bpFilter);
      sourceNode.connect(hpFilter);

      lpFilter.connect(gainMus);
      bpFilter.connect(gainSfx);
      hpFilter.connect(gainAmb);

      gainMus.connect(audioCtx.destination);
      gainSfx.connect(audioCtx.destination);
      gainAmb.connect(audioCtx.destination);

      stemsNode["ambience"] = gainAmb;
      stemsNode["sfx"] = gainSfx;
      stemsNode["music"] = gainMus;

      // Set initial volumes
      updateStemVolume("ambience", document.querySelector(".stem-toggle-btn[data-stem='ambience']").classList.contains("active") ? 1.0 : 0.0);
      updateStemVolume("sfx", document.querySelector(".stem-toggle-btn[data-stem='sfx']").classList.contains("active") ? 1.0 : 0.0);
      updateStemVolume("music", document.querySelector(".stem-toggle-btn[data-stem='music']").classList.contains("active") ? 1.0 : 0.0);

    } catch (e) {
      console.warn("Web Audio API error:", e);
    }
  }

  function updateStemVolume(stemId, volume) {
    if (stemsNode[stemId] && audioCtx) {
      stemsNode[stemId].gain.setValueAtTime(volume, audioCtx.currentTime);
    }
  }

  const togglePlay = () => {
    const tracksContainer = document.querySelector(".timeline-tracks");
    if (video.paused) {
      video.play().catch(() => { });
      if (playOverlay) playOverlay.style.opacity = 0;
      if (playOverlay) playOverlay.style.pointerEvents = "none";
      if (tracksContainer) tracksContainer.classList.add("playing");

      initAudioGraph();
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
    } else {
      video.pause();
      if (playOverlay) playOverlay.style.opacity = 1;
      if (playOverlay) playOverlay.style.pointerEvents = "auto";
      if (tracksContainer) tracksContainer.classList.remove("playing");

      if (audioCtx && audioCtx.state === "running") {
        audioCtx.suspend();
      }
    }
  };

  if (playOverlay) playOverlay.addEventListener("click", togglePlay);
  video.addEventListener("click", togglePlay);

  // Toggling stem tracks visually and musically
  toggleBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const stemId = btn.getAttribute("data-stem");
      const isActive = btn.classList.toggle("active");

      const statusText = btn.querySelector(".toggle-status");
      if (statusText) statusText.textContent = isActive ? "ON" : "OFF";

      const trackEl = document.getElementById(`track-${stemId}`);
      if (trackEl) {
        if (isActive) trackEl.classList.remove("muted");
        else trackEl.classList.add("muted");
      }

      // Real audio stem control
      updateStemVolume(stemId, isActive ? 1.0 : 0.0);
    });
  });

  // Handle visibility and page exit
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        video.pause();
        if (playOverlay) playOverlay.style.opacity = 1;
        if (playOverlay) playOverlay.style.pointerEvents = "auto";
        const tracksContainer = document.querySelector(".timeline-tracks");
        if (tracksContainer) tracksContainer.classList.remove("playing");
        if (audioCtx && audioCtx.state === "running") {
          audioCtx.suspend();
        }
      }
    });
  }, { threshold: 0.1 });
  obs.observe(video);
}

// ==========================================
// VFX Layer Compositing Breakdown
// ==========================================
function initVfxBreakdown() {
  const container = document.getElementById("vfx-screen-container");
  const video = document.getElementById("vfx-video");
  const stepBtns = document.querySelectorAll(".vfx-step-btn");
  const stepDesc = document.getElementById("vfx-step-desc");
  const trackingLayer = document.getElementById("vfx-tracking-layer");
  const compLayer = document.getElementById("vfx-comp-layer");
  const gradeLayer = document.getElementById("vfx-grade-layer");

  if (!container || !video) return;

  const stepsData = {
    raw: {
      class: "step-raw",
      desc: "Straight out of the camera desaturated raw portrait footage.",
      showTracking: false,
      showComp: false,
      showGrade: false
    },
    tracking: {
      class: "step-tracking",
      desc: "High-precision 3D tracking point solve and grid mesh wireframe alignment.",
      showTracking: true,
      showComp: false,
      showGrade: false
    },
    compositing: {
      class: "step-compositing",
      desc: "Layering key visual elements, digital glows, masks, and graphic overlays.",
      showTracking: true,
      showComp: true,
      showGrade: false
    },
    final: {
      class: "step-final",
      desc: "Final color grading, vignetting, cinematic film grain, and render output compilation.",
      showTracking: true,
      showComp: true,
      showGrade: true
    }
  };

  stepBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      stepBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const step = btn.getAttribute("data-step");
      const data = stepsData[step];

      if (data) {
        // Apply screen classes
        container.className = `vfx-screen-container shadow-neon-blue ${data.class}`;
        if (stepDesc) stepDesc.textContent = data.desc;

        // Toggle HUD overlay states
        if (trackingLayer) trackingLayer.style.opacity = data.showTracking ? 1 : 0;
        if (compLayer) compLayer.style.opacity = data.showComp ? 1 : 0;
        if (gradeLayer) gradeLayer.style.opacity = data.showGrade ? 1 : 0;
      }
    });
  });

  // Play video on scroll-in
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play().catch(() => { });
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.25 });
  obs.observe(container);
}

// ==========================================
// 3D Poster Book Interactive Slider
// ==========================================
function initPosterBook() {
  const book = document.getElementById("poster-book");
  const pages = document.querySelectorAll(".book-page");
  const prevBtn = document.getElementById("book-prev-btn");
  const nextBtn = document.getElementById("book-next-btn");
  const resetBtn = document.getElementById("book-reset-btn");
  const indicator = document.getElementById("book-page-indicator");

  if (!book || pages.length === 0) return;

  let currentPage = 0;
  const maxPages = pages.length;

  // Page names for HUD indicator
  const pageLabels = [
    "COVER",
    "01 / CINEMATIC KEY ART",
    "02 / FRESHERS EVENT",
    "03 / VISUAL STORYTELLING",
    "04 / CYBERPUNK LAYOUT",
    "ARCHIVE CLOSED"
  ];

  const updateIndicator = () => {
    if (!indicator) return;
    const total = maxPages - 1;
    const padded = String(currentPage + 1).padStart(2, "0");
    const label = pageLabels[currentPage] || `PAGE ${padded}`;
    indicator.textContent = `PAGE ${padded} / 0${total} \u2014 ${label}`;
  };

  const adjustZIndexes = () => {
    pages.forEach((page, index) => {
      if (page.classList.contains("flipped")) {
        page.style.zIndex = index;
      } else {
        page.style.zIndex = maxPages - index;
      }
    });
  };

  const flipPage = (index) => {
    if (index >= 0 && index < maxPages - 1) {
      pages[index].classList.add("flipped");
      adjustZIndexes();
    }
  };

  const unflipPage = (index) => {
    if (index >= 0 && index < maxPages - 1) {
      pages[index].classList.remove("flipped");
      adjustZIndexes();
    }
  };

  // Add click listeners to pages directly
  pages.forEach((page, index) => {
    if (index === maxPages - 1) return; // We don't flip the static back cover page 6

    page.addEventListener("click", () => {
      if (page.classList.contains("flipped")) {
        // Unflip this page and all pages after it
        for (let i = index; i < maxPages - 1; i++) {
          unflipPage(i);
        }
        currentPage = index;
      } else {
        // Flip this page and all pages before it
        for (let i = 0; i <= index; i++) {
          flipPage(i);
        }
        currentPage = index + 1;
      }
      updateIndicator();
    });
  });

  // Next page button helper
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (currentPage < maxPages - 1) {
        flipPage(currentPage);
        currentPage++;
        updateIndicator();
      }
    });
  }

  // Previous page button helper
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (currentPage > 0) {
        currentPage--;
        unflipPage(currentPage);
        updateIndicator();
      }
    });
  }

  // Reset book button on the back cover
  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Avoid triggering page click
      for (let i = maxPages - 2; i >= 0; i--) {
        unflipPage(i);
      }
      currentPage = 0;
      updateIndicator();
    });
  }

  // Initialize z-indexes and indicator on load
  adjustZIndexes();
  updateIndicator();
}


