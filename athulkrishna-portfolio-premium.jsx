import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  Film,
  Scissors,
  Camera,
  Volume2,
  Image as ImageIcon,
  Megaphone,
  Sparkles,
  Mail,
  Phone,
  Copy,
  Check,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Play,
  X,
} from "lucide-react";

const Instagram = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Linkedin = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


/* ----------------------------------------------------------------------- */
/* Constants & Assets                                                       */
/* ----------------------------------------------------------------------- */

const PROFILE_IMG = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoGSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKSj/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWm5ybnJ2eoqOkpaanqKmqsrO0tba2uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlbaWmJ2eoqOkpaanqKmqsrO0tba2uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/KKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==";

const SOFTWARE_LOGOS = [
  { name: "CapCut", file: "vecteezy_capcut-logo-square-rounded-capcut-logo-capcut-logo-free_67065640.png", level: "Intermediate" },
  { name: "VN Editor", file: "vn.png", level: "Intermediate" },
  { name: "Canva", file: "vecteezy_canva-transparent-icon_48759334.png", level: "Intermediate" },
  { name: "PicsArt", file: "vecteezy_picsart-logo-on-a-transparent-background_52925023.png", level: "Intermediate" },
  { name: "Lightroom", file: "vecteezy_adobe-lightroom-icon_19016804.png", level: "Intermediate" },
  { name: "After Effects", file: "vecteezy_adobe-after-effects-icon_46437267.png", level: "Beginner" },
];

const VIDEOS = [
  { title: "slowmo cinematic edit", file: "first.mp4", category: "Cinematic slowmo Edits" },
  { title: "college event promo Reel", file: "fourth.mp4", category: "promo reels" },
  { title: "college freshers day reel", file: "second.mp4", category: "promo reels" },
  { title: "potrait edit", file: "third.mp4", category: "fast cuts" },
  { title: "Timeline  #1", file: "tm1.mp4", category: "Timeline Edits" },
  { title: "Timeline Showcase #2", file: "tm2.mp4", category: "Timeline Edits" },
];

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

const services = [
  { title: "Video Editing", icon: Scissors, desc: "Precise cuts, pacing and polish, tuned for every format." },
  { title: "Reels Editing", icon: Film, desc: "Punchy, trend-aware edits built to hold attention." },
  { title: "Short-form Content", icon: Sparkles, desc: "Concept-to-clip content made for social feeds." },
  { title: "Videography", icon: Camera, desc: "On-location shoots with a deliberate, cinematic eye." },
  { title: "Sound Design", icon: Volume2, desc: "Layered audio and mix work that gives scenes weight." },
  { title: "Poster Design", icon: ImageIcon, desc: "Bold key art for releases, events and campaigns." },
];

const sectionsMeta = [
  { id: "hero", label: "HERO", track: "cyan" },
  { id: "about", label: "ABOUT", track: "purple" },
  { id: "showreel", label: "SHOWREEL", track: "blue" },
  { id: "videos", label: "VIDEOS", track: "pink" },
  { id: "posters", label: "POSTERS", track: "cyan" },
  { id: "case-studies", label: "PROCESS", track: "purple" },
  { id: "skills", label: "SKILLS", track: "blue" },
  { id: "services", label: "SERVICES", track: "pink" },
  { id: "contact", label: "CONTACT", track: "cyan" },
];

const navItems = [
  { id: "about", label: "About" },
  { id: "showreel", label: "Showreel" },
  { id: "videos", label: "Work" },
  { id: "posters", label: "Posters" },
  { id: "case-studies", label: "Process" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

const trackColor = (t) => {
  const colors = {
    cyan: "var(--cyan)",
    purple: "var(--purple)",
    blue: "var(--blue)",
    pink: "var(--pink)",
  };
  return colors[t] || "var(--cyan)";
};

/* ----------------------------------------------------------------------- */
/* Hooks                                                                    */
/* ----------------------------------------------------------------------- */

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ----------------------------------------------------------------------- */
/* Neon Particle Field                                                      */
/* ----------------------------------------------------------------------- */

function NeonParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let particles = [];

    const init = () => {
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
    init();

    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(5,10,22,0.08)";
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.shadowColor = `rgba(${p.hue},${p.o})`;
        ctx.shadowBlur = 15;
        ctx.fillStyle = `rgba(${p.hue},${p.o})`;
        ctx.fill();

        if (!reduceMotion) {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -10) {
            p.y = h + 10;
            p.x = Math.random() * w;
          }
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => init();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}

/* ----------------------------------------------------------------------- */
/* Enhanced Three.js Lens                                                   */
/* ----------------------------------------------------------------------- */

function HoloLensScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = mount.clientWidth || 1;
    let height = mount.clientHeight || 1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();

    // Main rings with neon glow
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

    // Pulsing core
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

    // Orbital particles
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

    let targetTiltX = 0;
    const onMove = (e) => {
      const rect = mount.getBoundingClientRect();
      targetTiltX = ((e.clientY - rect.top) / rect.height - 0.5) * 0.6;
    };
    mount.addEventListener("mousemove", onMove);

    let raf;
    const animate = () => {
      if (!reduceMotion) {
        group.rotation.y += 0.003;
        rings[1].rotation.z += 0.004;
        rings[2].rotation.z -= 0.0025;
        core.rotation.x += 0.005;
        points.rotation.y -= 0.0012;
        group.rotation.x += (targetTiltX - group.rotation.x) * 0.05;

        // Pulsing effect
        const pulse = Math.sin(Date.now() * 0.003) * 0.15 + 0.85;
        core.material.opacity = pulse;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      width = mount.clientWidth || 1;
      height = mount.clientHeight || 1;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      mount.removeEventListener("mousemove", onMove);
      pGeo.dispose();
      pMat.dispose();
      rings.forEach((r) => {
        r.geometry.dispose();
        r.material.dispose();
      });
      core.geometry.dispose();
      core.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" />;
}

/* ----------------------------------------------------------------------- */
/* UI Components                                                            */
/* ----------------------------------------------------------------------- */

function Reveal({ children, className = "" }) {
  const [ref, inView] = useInView(0.15);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
    >
      {children}
    </div>
  );
}

function SectionEyebrow({ n, label }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs">
      <span style={{ color: "var(--cyan)" }}>SEQ_{n}/08</span>
      <span className="flex-1 h-px" style={{ background: "var(--border)" }} />
      <span style={{ color: "var(--muted)" }}>{label}</span>
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, hoverProps }) {
  return (
    <div
      {...hoverProps}
      className="glass rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-neon-blue"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
        style={{ background: "rgba(0,229,255,0.12)" }}
      >
        <Icon size={20} style={{ color: "var(--cyan)" }} />
      </div>
      <h3 className="font-display text-base sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {desc}
      </p>
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, copyValue, href, copied, onCopy, hoverProps }) {
  return (
    <div
      className="contact-row glass rounded-xl p-4 flex items-center gap-4"
      style={{ borderColor: "var(--border)" }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: "rgba(217,70,239,0.12)" }}
      >
        <Icon size={18} style={{ color: "var(--purple)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="font-mono text-2xs sm:text-xs uppercase tracking-wider"
          style={{ color: "var(--muted)" }}
        >
          {label}
        </div>
        <div className="truncate text-sm sm:text-base mt-0.5">{value}</div>
      </div>
      {copyValue && (
        <button
          {...hoverProps}
          onClick={onCopy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="icon-btn shrink-0 p-2 rounded-lg transition-colors"
        >
          {copied ? (
            <Check size={16} style={{ color: "var(--cyan)" }} />
          ) : (
            <Copy size={16} style={{ color: "var(--muted)" }} />
          )}
        </button>
      )}
      {href && (
        <a
          {...hoverProps}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${label.toLowerCase()}`}
          className="icon-btn shrink-0 p-2 rounded-lg transition-colors"
        >
          <ArrowUpRight size={16} style={{ color: "var(--muted)" }} />
        </a>
      )}
    </div>
  );
}

function VideoModal({ video, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,10,22,0.92)" }}
      onClick={onClose}
    >
      <div className="relative w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:text-cyan-400 transition-colors"
        >
          <X size={24} />
        </button>
        <video
          src={`uploads/${video.file}`}
          controls
          autoPlay
          className="w-full rounded-2xl border border-cyan-500/30"
          style={{ aspectRatio: "9 / 16", objectFit: "cover" }}
        />
        <div className="mt-4">
          <h3 className="font-display text-lg font-semibold">{video.title}</h3>
          <p style={{ color: "var(--muted)" }} className="text-sm mt-1">
            {video.category}
          </p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ video, onPlay, hoverProps }) {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      {...hoverProps}
      onMouseEnter={(e) => {
        handleMouseEnter();
        if (hoverProps?.onMouseEnter) hoverProps.onMouseEnter(e);
      }}
      onMouseLeave={(e) => {
        handleMouseLeave();
        if (hoverProps?.onMouseLeave) hoverProps.onMouseLeave(e);
      }}
      onClick={() => onPlay(video)}
      className="glass rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300 hover:shadow-neon-cyan"
      style={{
        borderColor: "var(--border)",
        aspectRatio: "9 / 16",
      }}
    >
      <div className="relative w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20 flex items-center justify-center">
        <video
          ref={videoRef}
          src={`uploads/${video.file}`}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          style={{ pointerEvents: "none" }}
        />
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all" />
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center transition-all group-hover:scale-90 group-hover:opacity-0 z-10"
          style={{
            background: "linear-gradient(135deg, var(--cyan), var(--purple))",
            boxShadow: "0 0 30px rgba(0,229,255,0.3)",
          }}
        >
          <Play size={24} fill="white" className="ml-1" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
          <h4 className="font-display text-sm font-semibold">{video.title}</h4>
          <p style={{ color: "var(--muted)" }} className="text-2xs">
            {video.category}
          </p>
        </div>
      </div>
    </div>
  );
}

function InstagramReelSection({ onPlay, hoverProps }) {
  const videoRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="featured-instagram-reel reveal glass mt-16 p-8 rounded-3xl flex flex-col gap-8 items-center border border-[var(--border)]">
      <div className="text-center max-w-lg">
        <h3 className="font-display text-xl sm:text-2xl font-bold mb-2">Latest Instagram Reel</h3>
        <p className="text-sm text-[var(--muted)]">
          Synchronized latest edit from{" "}
          <a
            href="https://www.instagram.com/k3.magic"
            target="_blank"
            rel="noreferrer"
            className="gradient-text font-semibold no-underline"
          >
            @k3.magic
          </a>
          . Hover to preview play.
        </p>
      </div>

      <div
        {...hoverProps}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() =>
          onPlay({
            title: "Instagram Reel Magic Edit",
            file: "fifth.mp4",
            category: "@k3.magic"
          })
        }
        className="instagram-reel-preview-card relative w-full max-w-[340px] aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer border border-[var(--border)] shadow-[0_0_30px_rgba(217,70,239,0.15)] group"
      >
        <video
          ref={videoRef}
          src="uploads/fifth.mp4"
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 transition-colors duration-300 pointer-events-none"
          style={{
            backgroundColor: hovered ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.3)"
          }}
        />
        <div
          className="video-play-btn absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300 group-hover:opacity-0 group-hover:scale-90"
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, var(--cyan), var(--purple))",
              boxShadow: "0 0 30px rgba(0,229,255,0.3)",
            }}
          >
            <Play size={24} fill="white" className="ml-1 text-white" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent z-10 flex flex-col gap-2 pointer-events-none">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-400"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <span className="font-mono text-2xs text-white">@k3.magic</span>
          </div>
          <p className="text-sm font-medium text-white">Latest Magic Edit</p>
        </div>

        <a
          href="https://www.instagram.com/reel/DPbeRHsk2_6/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
          target="_blank"
          rel="noreferrer"
          className="btn-ghost absolute top-4 right-4 px-3.5 py-2 text-2xs rounded-full no-underline z-20 flex items-center gap-1"
          style={{ borderColor: "var(--border)" }}
          onClick={(e) => e.stopPropagation()}
        >
          Watch <ArrowUpRight size={12} />
        </a>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------- */
/* Interactive Case Studies & Showreel Components                           */
/* ----------------------------------------------------------------------- */

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

function ShowreelSection() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progressPct, setProgressPct] = useState(0);
  const [timeText, setTimeText] = useState("00:00");

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => { });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgressPct((video.currentTime / video.duration) * 100);
    const mins = Math.floor(video.currentTime / 60);
    const secs = Math.floor(video.currentTime % 60);
    setTimeText(`${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`);
  };

  const handleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    video.currentTime = (clickX / width) * video.duration;
  };

  return (
    <div className="showreel-container reveal">
      <div className="showreel-header mb-8">
        <h2 className="font-display text-4xl sm:text-5xl font-bold">Cinematic Showreel 2026</h2>
        <p className="text-base mt-4 max-w-2xl text-[var(--muted)]">
          A high-impact collection of visual highlights showcasing motion design, video editing, pacing, and storytelling mastery.
        </p>
      </div>

      <div className="showreel-player-wrapper shadow-neon-cyan relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] bg-black group">
        <video ref={videoRef} src="uploads/sixth.mp4" loop playsinline className="w-full h-full object-cover cursor-pointer" onClick={togglePlay} onTimeUpdate={handleTimeUpdate}></video>

        {!isPlaying && (
          <div onClick={togglePlay} className="showreel-video-overlay absolute inset-0 bg-black/40 flex items-center justify-center z-10 cursor-pointer">
            <button className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--cyan)] to-[var(--purple)] border-none flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.5)] hover:scale-110 transition-transform">
              <Play size={32} fill="white" className="ml-1 text-white" />
            </button>
          </div>
        )}

        <div className="showreel-controls-bar absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex items-center gap-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={handleMute} className="background-transparent border-none text-white cursor-pointer">
            {isMuted ? <Volume2 size={18} className="text-red-400" /> : <Volume2 size={18} />}
          </button>
          <div onClick={handleProgressClick} className="timeline-bar-wrapper flex-1 h-1 bg-white/20 rounded cursor-pointer relative">
            <div className="timeline-progress h-full bg-gradient-to-r from-[var(--cyan)] to-[var(--purple)] rounded" style={{ width: `${progressPct}%` }}></div>
          </div>
          <span className="time-display font-mono text-2xs text-[var(--muted)]">{timeText}</span>
        </div>
      </div>
    </div>
  );
}

function ColorGradingCase() {
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);
  const [sliderPct, setSliderPct] = useState(50);
  const containerRef = useRef(null);
  const rawVideoRef = useRef(null);
  const gradedVideoRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const activeCase = COLOR_GRADING_CASES[activeCaseIdx];

  // Syncing playheads
  useEffect(() => {
    const raw = rawVideoRef.current;
    const graded = gradedVideoRef.current;
    if (!raw || !graded) return;

    const handleSync = () => {
      if (raw.paused !== graded.paused) {
        if (raw.paused) graded.pause();
        else graded.play().catch(() => { });
      }
      if (Math.abs(raw.currentTime - graded.currentTime) > 0.08) {
        graded.currentTime = raw.currentTime;
      }
    };

    raw.addEventListener("play", handleSync);
    raw.addEventListener("pause", handleSync);
    raw.addEventListener("seeking", handleSync);
    raw.addEventListener("seeked", handleSync);
    raw.addEventListener("timeupdate", handleSync);

    return () => {
      raw.removeEventListener("play", handleSync);
      raw.removeEventListener("pause", handleSync);
      raw.removeEventListener("seeking", handleSync);
      raw.removeEventListener("seeked", handleSync);
      raw.removeEventListener("timeupdate", handleSync);
    };
  }, [activeCaseIdx]);

  // Handle intersection play
  useEffect(() => {
    const raw = rawVideoRef.current;
    const graded = gradedVideoRef.current;
    if (!raw || !graded) return;

    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        raw.play().catch(() => { });
        graded.play().catch(() => { });
      } else {
        raw.pause();
        graded.pause();
      }
    }, { threshold: 0.25 });
    obs.observe(raw.parentElement);
    return () => obs.disconnect();
  }, [activeCaseIdx]);

  // Handle raw video width sync
  useEffect(() => {
    const syncWidth = () => {
      if (containerRef.current && rawVideoRef.current) {
        rawVideoRef.current.style.width = `${containerRef.current.clientWidth}px`;
      }
    };
    syncWidth();
    window.addEventListener("resize", syncWidth);
    return () => window.removeEventListener("resize", syncWidth);
  }, [activeCaseIdx]);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let x = clientX - rect.left;
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    setSliderPct((x / rect.width) * 100);
    if (rawVideoRef.current) {
      rawVideoRef.current.style.width = `${rect.width}px`;
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMove(e.clientX);
    rawVideoRef.current?.play().catch(() => { });
    gradedVideoRef.current?.play().catch(() => { });
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
    rawVideoRef.current?.play().catch(() => { });
    gradedVideoRef.current?.play().catch(() => { });
  };

  useEffect(() => {
    if (!isDragging) return;
    const move = (e) => handleMove(e.touches ? e.touches[0].clientX : e.clientX);
    const stop = () => setIsDragging(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", stop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };
  }, [isDragging]);

  useEffect(() => {
    const raw = rawVideoRef.current;
    const graded = gradedVideoRef.current;
    if (!raw || !graded) return;

    raw.load();
    graded.load();

    raw.play().then(() => {
      graded.play().catch(() => { });
    }).catch(() => { });
  }, [activeCaseIdx]);

  return (
    <div className="case-study-card reveal glass p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-[var(--border)]">
      <div className="grid lg:grid-cols-2 gap-10 align-middle items-center">
        <div ref={containerRef} className="grading-slider-container shadow-neon-cyan relative w-full rounded-2xl overflow-hidden border border-[var(--border)] select-none mx-auto" style={{ aspectRatio: '9/16', maxWidth: '340px' }}>
          <video ref={gradedVideoRef} src={activeCase.video} loop muted playsinline className="absolute inset-0 w-full h-full object-cover" style={{ filter: activeCase.gradedFilter }}></video>
          <div className="absolute inset-0 overflow-hidden border-r-2 border-[var(--cyan)] z-10" style={{ width: `${sliderPct}%` }}>
            <video ref={rawVideoRef} src={activeCase.video} loop muted playsinline className="absolute top-0 left-0 w-full h-full object-cover max-w-none" style={{ filter: activeCase.rawFilter }}></video>
          </div>
          <div className="absolute top-4 left-4 z-20 font-mono text-2xs bg-black/60 px-2 py-1 rounded text-white">RAW</div>
          <div className="absolute top-4 right-4 z-20 font-mono text-2xs bg-[var(--cyan)]/25 px-2 py-1 rounded text-[var(--cyan)] border border-[var(--cyan)]">GRADED</div>
          <div onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} className="absolute top-0 bottom-0 z-20 w-1 bg-[var(--cyan)] cursor-ew-resize flex items-center justify-center" style={{ left: `${sliderPct}%`, transform: 'translateX(-50%)' }}>
            <div className="w-8 h-8 rounded-full bg-[var(--cyan)] border-2 border-black flex items-center justify-center shadow-[0_0_15px_var(--cyan)]">
              <span className="text-black font-bold text-xs">↔</span>
            </div>
          </div>
        </div>

        <div className="case-study-info">
          <span className="text-2xs font-mono text-[var(--cyan)] tracking-widest uppercase">CASE_01 / COLOR GRADING</span>
          <h3 className="font-display text-2xl font-bold mt-2 mb-4">{activeCase.title}</h3>
          <p className="text-[var(--muted)] leading-relaxed mb-8">{activeCase.desc}</p>
          <div className="flex gap-2">
            <button onClick={() => setActiveCaseIdx(0)} className={`btn-ghost grading-tab-btn px-4 py-2 text-xs rounded-lg ${activeCaseIdx === 0 ? "active" : ""}`}>Slowmo Edit</button>
            <button onClick={() => setActiveCaseIdx(1)} className={`btn-ghost grading-tab-btn px-4 py-2 text-xs rounded-lg ${activeCaseIdx === 1 ? "active" : ""}`}>Promo Reel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SoundDesignCase() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [stems, setStems] = useState({
    ambience: true,
    sfx: true,
    music: true
  });

  const audioCtxRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const stemNodesRef = useRef({});

  const initAudioGraph = () => {
    const video = videoRef.current;
    if (!video || audioCtxRef.current) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Crucial: video must not be muted so audio flows to Web Audio API
      video.muted = false;

      const source = ctx.createMediaElementSource(video);
      sourceNodeRef.current = source;

      // Create filter bands for Stems simulation
      const lpFilter = ctx.createBiquadFilter();
      lpFilter.type = "lowpass";
      lpFilter.frequency.value = 350; // Bass/Kick/Beat

      const bpFilter = ctx.createBiquadFilter();
      bpFilter.type = "bandpass";
      bpFilter.frequency.value = 1500; // Foley/Impacts/Vocals
      bpFilter.Q.value = 0.8;

      const hpFilter = ctx.createBiquadFilter();
      hpFilter.type = "highpass";
      hpFilter.frequency.value = 3500; // Ambience/Highs/Sweeps

      // Create gains for toggling
      const gainAmb = ctx.createGain();
      const gainSfx = ctx.createGain();
      const gainMus = ctx.createGain();

      // Connect graph
      source.connect(lpFilter);
      source.connect(bpFilter);
      source.connect(hpFilter);

      lpFilter.connect(gainMus);
      bpFilter.connect(gainSfx);
      hpFilter.connect(gainAmb);

      gainMus.connect(ctx.destination);
      gainSfx.connect(ctx.destination);
      gainAmb.connect(ctx.destination);

      stemNodesRef.current = {
        ambience: gainAmb,
        sfx: gainSfx,
        music: gainMus
      };

      // Set initial volumes based on state
      gainAmb.gain.setValueAtTime(stems.ambience ? 1.0 : 0.0, ctx.currentTime);
      gainSfx.gain.setValueAtTime(stems.sfx ? 1.0 : 0.0, ctx.currentTime);
      gainMus.gain.setValueAtTime(stems.music ? 1.0 : 0.0, ctx.currentTime);

    } catch (err) {
      console.warn("Web Audio Context creation failed", err);
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().catch(() => { });
      setIsPlaying(true);

      initAudioGraph();
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } else {
      video.pause();
      setIsPlaying(false);

      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
    }
  };

  const toggleStem = (stemId) => {
    const nextVal = !stems[stemId];
    setStems(prev => ({ ...prev, [stemId]: nextVal }));

    const node = stemNodesRef.current[stemId];
    if (node && audioCtxRef.current) {
      node.gain.setValueAtTime(nextVal ? 1.0 : 0.0, audioCtxRef.current.currentTime);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) { }
      }
    };
  }, []);

  // Handle visibility pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && isPlaying) {
        video.pause();
        setIsPlaying(false);
        if (audioCtxRef.current && audioCtxRef.current.state === "running") {
          audioCtxRef.current.suspend();
        }
      }
    }, { threshold: 0.1 });
    obs.observe(video);
    return () => obs.disconnect();
  }, [isPlaying]);

  return (
    <div className="case-study-card reveal glass p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-[var(--border)]">
      <div className="grid lg:grid-cols-2 gap-10 align-middle items-center">
        <div className="flex flex-col gap-5 w-full">
          <div className="sound-video-container shadow-neon-blue relative w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-black mx-auto" style={{ aspectRatio: '9/16', maxWidth: '340px' }}>
            <video ref={videoRef} src="uploads/second.mp4" loop muted playsinline className="w-full h-full object-cover" onClick={togglePlay}></video>
            <div className="absolute bottom-4 left-4 font-mono text-2xs bg-black/60 px-2 py-1 rounded text-[var(--purple)]">AUDIO STEM BREAKDOWN</div>
            {!isPlaying && (
              <div onClick={togglePlay} className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity z-10">
                <button className="w-16 h-16 rounded-full bg-[var(--purple)] border-none flex items-center justify-center shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                  <Play size={24} fill="white" className="ml-1 text-white" />
                </button>
              </div>
            )}
          </div>

          <div className="timeline-tracks flex flex-col gap-3 bg-black/40 p-4 rounded-2xl border border-[var(--border)]">
            <div className={`timeline-track flex items-center gap-4 ${!stems.ambience ? "muted" : ""}`}>
              <span className="font-mono text-2xs w-[60px]" style={{ color: 'var(--cyan)' }}>AMBIENT</span>
              <div className="wave-container flex-1 h-5 relative overflow-hidden rounded bg-white/5">
                <div className={`wave-bar-pulse wave-ambience absolute inset-0 opacity-80`} style={{ background: 'repeating-linear-gradient(90deg, var(--cyan) 0px, var(--cyan) 2px, transparent 2px, transparent 6px)', transform: 'scaleY(0.6)', animation: isPlaying && stems.ambience ? 'scroll-wave 1.5s linear infinite' : 'none' }}></div>
              </div>
            </div>
            <div className={`timeline-track flex items-center gap-4 ${!stems.sfx ? "muted" : ""}`}>
              <span className="font-mono text-2xs w-[60px]" style={{ color: 'var(--purple)' }}>FOLEY/SFX</span>
              <div className="wave-container flex-1 h-5 relative overflow-hidden rounded bg-white/5">
                <div className={`wave-bar-pulse wave-sfx absolute inset-0 opacity-80`} style={{ background: 'repeating-linear-gradient(90deg, var(--purple) 0px, var(--purple) 2px, transparent 2px, transparent 6px)', transform: 'scaleY(0.8)', animation: isPlaying && stems.sfx ? 'scroll-wave 0.7s linear infinite' : 'none' }}></div>
              </div>
            </div>
            <div className={`timeline-track flex items-center gap-4 ${!stems.music ? "muted" : ""}`}>
              <span className="font-mono text-2xs w-[60px]" style={{ color: 'var(--pink)' }}>BEAT/MUSIC</span>
              <div className="wave-container flex-1 h-5 relative overflow-hidden rounded bg-white/5">
                <div className={`wave-bar-pulse wave-music absolute inset-0 opacity-80`} style={{ background: 'repeating-linear-gradient(90deg, var(--pink) 0px, var(--pink) 2px, transparent 2px, transparent 6px)', animation: isPlaying && stems.music ? 'scroll-wave 1.1s linear infinite' : 'none' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="case-study-info">
          <span className="text-2xs font-mono text-[var(--purple)] tracking-widest uppercase">CASE_02 / SOUND DESIGN</span>
          <h3 className="font-display text-2xl font-bold mt-2 mb-4">Sound Design & Foley Stems</h3>
          <p className="text-[var(--muted)] leading-relaxed mb-8">
            Toggle layers in real-time to hear how the acoustic environment of the promo reel is constructed. Blend atmosphere, foley, and music dynamically.
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => toggleStem("ambience")} className={`stem-toggle-btn active glass flex items-center justify-between px-5 py-3 rounded-xl ${stems.ambience ? "active" : ""}`} style={{ color: 'var(--cyan)' }}>
              <span>Ambience Layer</span>
              <span className="font-mono text-2xs">{stems.ambience ? "ON" : "OFF"}</span>
            </button>
            <button onClick={() => toggleStem("sfx")} className={`stem-toggle-btn active glass flex items-center justify-between px-5 py-3 rounded-xl ${stems.sfx ? "active" : ""}`} style={{ color: 'var(--purple)' }}>
              <span>Foley & Impacts</span>
              <span className="font-mono text-2xs">{stems.sfx ? "ON" : "OFF"}</span>
            </button>
            <button onClick={() => toggleStem("music")} className={`stem-toggle-btn active glass flex items-center justify-between px-5 py-3 rounded-xl ${stems.music ? "active" : ""}`} style={{ color: 'var(--pink)' }}>
              <span>Background Beat</span>
              <span className="font-mono text-2xs">{stems.music ? "ON" : "OFF"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function VfxBreakdownCase() {
    const [activeStep, setActiveStep] = useState("raw");
    const videoRef = useRef(null);

    const stepsData = {
      raw: {
        label: "Raw Plate",
        class: "step-raw",
        desc: "Straight out of the camera desaturated raw portrait footage.",
        showTracking: false,
        showComp: false,
        showGrade: false
      },
      tracking: {
        label: "Tracking Data",
        class: "step-tracking",
        desc: "High-precision 3D tracking point solve and grid mesh wireframe alignment.",
        showTracking: true,
        showComp: false,
        showGrade: false
      },
      compositing: {
        label: "Element Compositing",
        class: "step-compositing",
        desc: "Layering key visual elements, digital glows, masks, and graphic overlays.",
        showTracking: true,
        showComp: true,
        showGrade: false
      },
      final: {
        label: "Final Compound",
        class: "step-final",
        desc: "Final color grading, vignetting, cinematic film grain, and render output compilation.",
        showTracking: true,
        showComp: true,
        showGrade: true
      }
    };

    const stepInfo = stepsData[activeStep];

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { });
        } else {
          video.pause();
        }
      }, { threshold: 0.25 });
      obs.observe(video);
      return () => obs.disconnect();
    }, []);

    return (
      <div className="case-study-card reveal glass p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-[var(--border)]">
        <div className="grid lg:grid-cols-2 gap-10 align-middle items-center">
          <div className={`vfx-screen-container shadow-neon-blue relative w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-black select-none mx-auto ${stepInfo.class}`} style={{ aspectRatio: '9/16', maxWidth: '340px' }}>
            <video ref={videoRef} src="uploads/third.mp4" loop muted playsinline className="w-full h-full object-cover"></video>

            <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300" style={{ opacity: stepInfo.showTracking ? 1 : 0 }}>
              <svg width="100%" height="100%" className="absolute inset-0">
                <defs>
                  <pattern id="vfx-grid-react" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 229, 255, 0.25)" stroke-width="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#vfx-grid-react)" />
                <circle cx="20%" cy="30%" r="5" fill="none" stroke="var(--cyan)" stroke-width="1.5" />
                <line x1="20%" y1="20%" x2="20%" y2="40%" stroke="var(--cyan)" stroke-width="0.5" stroke-dasharray="2" />
                <line x1="10%" y1="30%" x2="30%" y2="30%" stroke="var(--cyan)" stroke-width="0.5" stroke-dasharray="2" />
                <circle cx="75%" cy="45%" r="5" fill="none" stroke="var(--cyan)" stroke-width="1.5" />
                <line x1="75%" y1="35%" x2="75%" y2="55%" stroke="var(--cyan)" stroke-width="0.5" stroke-dasharray="2" />
                <line x1="65%" y1="45%" x2="85%" y2="45%" stroke="var(--cyan)" stroke-width="0.5" stroke-dasharray="2" />
                <circle cx="50%" cy="70%" r="5" fill="none" stroke="var(--cyan)" stroke-width="1.5" />
                <line x1="50%" y1="60%" x2="50%" y2="80%" stroke="var(--cyan)" stroke-width="0.5" stroke-dasharray="2" />
                <line x1="40%" y1="70%" x2="60%" y2="70%" stroke="var(--cyan)" stroke-width="0.5" stroke-dasharray="2" />
              </svg>
            </div>

            <div className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300" style={{ opacity: stepInfo.showComp ? 1 : 0 }}>
              <div className="absolute top-[15%] left-[15%] border border-[var(--purple)] bg-[var(--purple)]/15 p-2 rounded text-2xs font-mono text-[var(--purple)] shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                COMPOSITE ELEMENT [CYBER_GLOW]
              </div>
              <div className="absolute bottom-[20%] right-[15%] border border-dashed border-[var(--cyan)] bg-[var(--cyan)]/8 w-[150px] h-[150px] rounded-full shadow-[inset_0_0_20px_rgba(0,229,255,0.4)] animate-pulse"></div>
            </div>

            <div className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] bg-[var(--cyan)]/2" style={{ opacity: stepInfo.showGrade ? 1 : 0 }}></div>

            <div className="absolute bottom-4 left-4 font-mono text-2xs bg-black/60 px-2 py-1 rounded text-[var(--pink)]">VFX BREAKDOWN</div>
          </div>

          <div className="case-study-info">
            <span className="text-2xs font-mono text-[var(--pink)] tracking-widest uppercase">CASE_03 / VFX BREAKDOWN</span>
            <h3 className="font-display text-2xl font-bold mt-2 mb-4">VFX Compositing Breakdown</h3>
            <p className="text-[var(--muted)] leading-relaxed mb-8">{stepInfo.desc}</p>
            <div className="flex flex-col gap-2">
              {Object.keys(stepsData).map((step, idx) => (
                <button key={step} onClick={() => setActiveStep(step)} className={`vfx-step-btn glass flex items-center gap-4 px-5 py-3 rounded-xl text-left font-mono text-xs ${activeStep === step ? "active" : ""}`}>
                  <span className="step-num text-xs">0{idx + 1}</span>
                  {stepsData[step].label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------------------------------- */
  /* Poster Book Section                                                      */
  /* ----------------------------------------------------------------------- */
  function PosterBookSection({ postersRef }) {
    const [flipped, setFlipped] = useState([false, false, false, false, false]);
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = 6; // Cover, Poster 1, Poster 2, Poster 3, Poster 4, Back Cover

    const adjustZIndex = (idx) => {
      if (flipped[idx]) {
        return idx;
      } else {
        return totalPages - idx;
      }
    };

    const handlePageClick = (idx) => {
      if (idx === totalPages - 1) return; // Static back cover doesn't flip

      const nextFlipped = [...flipped];
      if (flipped[idx]) {
        // Unflip this page and all pages after it
        for (let i = idx; i < flipped.length; i++) {
          nextFlipped[i] = false;
        }
        setFlipped(nextFlipped);
        setCurrentPage(idx);
      } else {
        // Flip this page and all pages before it
        for (let i = 0; i <= idx; i++) {
          nextFlipped[i] = true;
        }
        setFlipped(nextFlipped);
        setCurrentPage(idx + 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages - 1) {
        const nextFlipped = [...flipped];
        nextFlipped[currentPage] = true;
        setFlipped(nextFlipped);
        setCurrentPage(currentPage + 1);
      }
    };

    const handlePrev = () => {
      if (currentPage > 0) {
        const nextFlipped = [...flipped];
        nextFlipped[currentPage - 1] = false;
        setFlipped(nextFlipped);
        setCurrentPage(currentPage - 1);
      }
    };

    const handleReset = (e) => {
      e.stopPropagation();
      setFlipped([false, false, false, false, false]);
      setCurrentPage(0);
    };

    return (
      <section ref={postersRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28">
        <Reveal>
          <SectionEyebrow n="05" label="KEY ART ARCHIVE" />
        </Reveal>

        <Reveal className="mt-10">
          <h2 className="font-display text-4xl sm:text-5xl font-bold">Poster Design Collection</h2>
          <p className="text-base mt-4 max-w-2xl text-[var(--muted)]">
            Click the pages to flip through the interactive 3D portfolio book showcasing key art, event posters, and design concepts.
          </p>
        </Reveal>

        <div className="book-container-wrapper">
          {/* Desktop 3D Book */}
          <div className="book-container">
            <div className="book">

              {/* Page 1: COVER */}
              <div
                className={`book-page ${flipped[0] ? 'flipped' : ''}`}
                style={{ zIndex: adjustZIndex(0) }}
                onClick={() => handlePageClick(0)}
              >
                <div className="page-front book-cover-front">
                  <div className="font-mono text-2xs text-[var(--cyan)] tracking-[0.25em]">ATHULKRISHNA T P</div>
                  <h3 className="font-display text-4xl font-extrabold my-6 leading-[1.1] tracking-tight">POSTER<br /><span className="gradient-text">ARCHIVE</span></h3>
                  <div className="font-mono text-2xs text-[var(--muted)] border-t border-[var(--border)] pt-4 w-4/5">VISUAL DESIGNS &bull; 2026</div>
                  <p className="text-2xs text-[var(--cyan)] mt-8 animate-pulse">Click cover to open</p>
                </div>
                <div className="page-back book-cover-back">
                  <div className="page-details-content">
                    <div className="page-details-header">
                      <span className="font-mono text-2xs text-[var(--purple)]">INTRODUCTION</span>
                      <h4 className="page-details-title">Design Philosophy</h4>
                    </div>
                    <div className="page-details-body">
                      <p className="page-details-desc">
                        Every project requires a unique visual identity. This design archive collects promotional posters, custom key art, and experimental graphic work created to capture attention and deliver high-impact visual communication.
                      </p>
                      <p className="page-details-desc">
                        Leveraging industry-standard tools and a sharp eye for layout, typography, and color harmony.
                      </p>
                    </div>
                    <div className="font-mono text-2xs text-[var(--muted)] text-center">ATHULKRISHNA T P &copy; 2026</div>
                  </div>
                </div>
              </div>

              {/* Page 2: POSTER 1 */}
              <div
                className={`book-page ${flipped[1] ? 'flipped' : ''}`}
                style={{ zIndex: adjustZIndex(1) }}
                onClick={() => handlePageClick(1)}
              >
                <div className="page-front">
                  <img src="posters/poster1.jpeg" alt="Cinematic Poster 1" />
                </div>
                <div className="page-back">
                  <div className="page-details-content">
                    <div className="page-details-header">
                      <span className="font-mono text-2xs text-[var(--cyan)]">01 / KEY ART</span>
                      <h4 className="page-details-title">Cinematic Key Art</h4>
                    </div>
                    <div className="page-details-body">
                      <div className="page-details-spec">
                        <span className="page-details-spec-label">CLIENT / USE</span>
                        <span className="page-details-spec-value">Short Film Release</span>
                      </div>
                      <div className="page-details-spec">
                        <span className="page-details-spec-label">SOFTWARE</span>
                        <span class="page-details-spec-value">Lightroom & Photoshop</span>
                      </div>
                      <div className="page-details-spec">
                        <span className="page-details-spec-label">COLOR SPACE</span>
                        <span class="page-details-spec-value">Orange & Teal / sRGB</span>
                      </div>
                      <p className="page-details-desc">
                        A premium, moody film key art poster highlighting dramatic lighting, cinematic color grading, and heavy shadow manipulation to build suspense.
                      </p>
                    </div>
                    <div className="font-mono text-2xs text-[var(--muted)] text-center">FLIP FOR NEXT POSTER</div>
                  </div>
                </div>
              </div>

              {/* Page 3: POSTER 2 */}
              <div
                className={`book-page ${flipped[2] ? 'flipped' : ''}`}
                style={{ zIndex: adjustZIndex(2) }}
                onClick={() => handlePageClick(2)}
              >
                <div className="page-front">
                  <img src="posters/poster2.jpeg" alt="Event Poster 2" />
                </div>
                <div className="page-back">
                  <div className="page-details-content">
                    <div className="page-details-header">
                      <span className="font-mono text-2xs text-[var(--purple)]">02 / PROMOTIONAL</span>
                      <h4 className="page-details-title">College Freshers Event</h4>
                    </div>
                    <div className="page-details-body">
                      <div className="page-details-spec">
                        <span class="page-details-spec-label">CLIENT / USE</span>
                        <span class="page-details-spec-value">College Event Promotion</span>
                      </div>
                      <div className="page-details-spec">
                        <span class="page-details-spec-label">SOFTWARE</span>
                        <span class="page-details-spec-value">Canva & PicsArt</span>
                      </div>
                      <div className="page-details-spec">
                        <span class="page-details-spec-label">STYLE</span>
                        <span class="page-details-spec-value">Modern Neon / Vibrant</span>
                      </div>
                      <p className="page-details-desc">
                        High-energy promotional poster built for event marketing. Designed to grab immediate attention on Instagram with glowing neon vectors and clean typography hierarchy.
                      </p>
                    </div>
                    <div className="font-mono text-2xs text-[var(--muted)] text-center">FLIP FOR NEXT POSTER</div>
                  </div>
                </div>
              </div>

              {/* Page 4: POSTER 3 */}
              <div
                className={`book-page ${flipped[3] ? 'flipped' : ''}`}
                style={{ zIndex: adjustZIndex(3) }}
                onClick={() => handlePageClick(3)}
              >
                <div className="page-front">
                  <img src="posters/poster3.jpeg" alt="Poster 3" />
                </div>
                <div className="page-back">
                  <div className="page-details-content">
                    <div className="page-details-header">
                      <span className="font-mono text-2xs text-[var(--pink)]">03 / EDITORIAL</span>
                      <h4 className="page-details-title">Visual Storytelling Art</h4>
                    </div>
                    <div className="page-details-body">
                      <div className="page-details-spec">
                        <span class="page-details-spec-label">CLIENT / USE</span>
                        <span class="page-details-spec-value">Concept Art Study</span>
                      </div>
                      <div className="page-details-spec">
                        <span class="page-details-spec-label">SOFTWARE</span>
                        <span class="page-details-spec-value">Photoshop & Lightroom</span>
                      </div>
                      <div className="page-details-spec">
                        <span class="page-details-spec-label">TECHNIQUE</span>
                        <span class="page-details-spec-value">Image Compositing</span>
                      </div>
                      <p className="page-details-desc">
                        A visual study exploring texture blending, retro film grain overlays, and customized font designs to evoke nostalgic emotions.
                      </p>
                    </div>
                    <div className="font-mono text-2xs text-[var(--muted)] text-center">FLIP FOR NEXT POSTER</div>
                  </div>
                </div>
              </div>

              {/* Page 5: POSTER 4 */}
              <div
                className={`book-page ${flipped[4] ? 'flipped' : ''}`}
                style={{ zIndex: adjustZIndex(4) }}
                onClick={() => handlePageClick(4)}
              >
                <div className="page-front">
                  <img src="posters/poster4.jpeg" alt="Poster 4" />
                </div>
                <div className="page-back book-cover-back">
                  <div className="page-details-content">
                    <div className="page-details-header">
                      <span className="font-mono text-2xs text-[var(--cyan)]">04 / EXPERIMENTAL</span>
                      <h4 className="page-details-title">Cyberpunk Layout</h4>
                    </div>
                    <div className="page-details-body">
                      <div className="page-details-spec">
                        <span class="page-details-spec-label">TYPE</span>
                        <span class="page-details-spec-value">Social Media Graphic</span>
                      </div>
                      <div class="page-details-spec">
                        <span class="page-details-spec-label">SOFTWARE</span>
                        <span class="page-details-spec-value">PicsArt / After Effects</span>
                      </div>
                      <p className="page-details-desc">
                        A cyberpunk-inspired vertical frame layout incorporating high-contrast color tones and modern digital overlays.
                      </p>
                    </div>
                    <div className="font-mono text-2xs text-[var(--muted)] text-center">FLIP TO CLOSE BOOK</div>
                  </div>
                </div>
              </div>

              {/* Page 6: BACK COVER */}
              <div
                className="book-page"
                style={{ zIndex: 1 }}
              >
                <div className="page-front book-cover-front" style={{ border: '2px solid var(--purple)', borderLeft: 'none' }}>
                  <h3 className="font-display text-2xl font-bold mb-4">CREATIVE STUDIO</h3>
                  <p className="text-xs text-[var(--muted)]">Athulkrishna T P &bull; 2026</p>
                  <div className="mt-8">
                    <button onClick={handleReset} className="btn-ghost book-btn px-5 py-2.5 text-xs rounded-full border border-[var(--purple)]">Reset Book</button>
                  </div>
                </div>
                <div className="page-back"></div>
              </div>

            </div>
            <div className="book-spine"></div>
          </div>

          {/* Book Navigation controls */}
          <div className="book-controls">
            <button onClick={handlePrev} className="btn-ghost book-btn px-6 py-2.5 text-xs rounded-full flex items-center gap-2">
              &larr; Prev Page
            </button>
            <button onClick={handleNext} className="btn-ghost book-btn px-6 py-2.5 text-xs rounded-full flex items-center gap-2">
              Next Page &rarr;
            </button>
          </div>

          {/* Mobile Horizontal Scroll Slider */}
          <div className="mobile-poster-slider">
            <div className="mobile-poster-card glass">
              <div className="mobile-poster-img-wrapper">
                <img src="posters/poster1.jpeg" alt="Poster 1" />
              </div>
              <div className="mobile-poster-details">
                <span className="font-mono text-2xs text-[var(--cyan)]">01 / KEY ART</span>
                <h4 className="font-display font-bold text-lg">Cinematic Key Art</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">Moody film key art poster designed with dramatic shadows and cinematic grading.</p>
              </div>
            </div>
            <div className="mobile-poster-card glass">
              <div className="mobile-poster-img-wrapper">
                <img src="posters/poster2.jpeg" alt="Poster 2" />
              </div>
              <div className="mobile-poster-details">
                <span className="font-mono text-2xs text-[var(--purple)]">02 / EVENT</span>
                <h4 className="font-display font-bold text-lg">College Freshers Event</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">Vibrant event release poster featuring neon accents and strong visual hierarchy.</p>
              </div>
            </div>
            <div className="mobile-poster-card glass">
              <div className="mobile-poster-img-wrapper">
                <img src="posters/poster3.jpeg" alt="Poster 3" />
              </div>
              <div className="mobile-poster-details">
                <span className="font-mono text-2xs text-[var(--pink)]">03 / EDITORIAL</span>
                <h4 className="font-display font-bold text-lg">Visual Storytelling Art</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">Concept composition study utilizing retro grain textures and custom layouts.</p>
              </div>
            </div>
            <div className="mobile-poster-card glass">
              <div className="mobile-poster-img-wrapper">
                <img src="posters/poster4.jpeg" alt="Poster 4" />
              </div>
              <div className="mobile-poster-details">
                <span className="font-mono text-2xs text-[var(--cyan)]">04 / CYBERPUNK</span>
                <h4 className="font-display font-bold text-lg">Cyberpunk Layout</h4>
                <p className="text-xs text-[var(--muted)] leading-relaxed">High-contrast vertical design featuring modern tech overlays and aesthetic elements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ----------------------------------------------------------------------- */
  /* Main Portfolio                                                           */
  /* ----------------------------------------------------------------------- */

  export default function PremiumPortfolio() {
      const containerRef = useRef(null);
      const heroRef = useRef(null);
      const aboutRef = useRef(null);
      const showreelRef = useRef(null);
      const videosRef = useRef(null);
      const postersRef = useRef(null);
      const caseStudiesRef = useRef(null);
      const skillsRef = useRef(null);
      const servicesRef = useRef(null);
      const contactRef = useRef(null);

      const sectionRefs = {
        hero: heroRef,
        about: aboutRef,
        showreel: showreelRef,
        videos: videosRef,
        posters: postersRef,
        "case-studies": caseStudiesRef,
        skills: skillsRef,
        services: servicesRef,
        contact: contactRef,
      };

      const defaultBounds = sectionsMeta.map((s, i) => ({
        ...s,
        start: i / sectionsMeta.length,
        end: (i + 1) / sectionsMeta.length,
      }));

      const [progress, setProgress] = useState(0);
      const [bounds, setBounds] = useState(defaultBounds);
      const [activeId, setActiveId] = useState("hero");
      const [loading, setLoading] = useState(true);
      const [loadPct, setLoadPct] = useState(0);

      const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
      const [cursorHover, setCursorHover] = useState(false);
      const [fineCursor, setFineCursor] = useState(false);

      const [copied, setCopied] = useState(null);
      const [sent, setSent] = useState(false);
      const [form, setForm] = useState({ name: "", email: "", message: "" });
      const [selectedVideo, setSelectedVideo] = useState(null);
      const [videoFilter, setVideoFilter] = useState("all");

      /* Loading sequence */
      useEffect(() => {
        const t = setInterval(() => {
          setLoadPct((p) => {
            if (p >= 100) {
              clearInterval(t);
              setTimeout(() => setLoading(false), 350);
              return 100;
            }
            return Math.min(100, p + (5 + Math.random() * 18));
          });
        }, 120);
        return () => clearInterval(t);
      }, []);

      /* Measure sections */
      useEffect(() => {
        const measure = () => {
          const total = document.documentElement.scrollHeight;
          if (!total) return;
          const arr = sectionsMeta.map((s) => {
            const el = sectionRefs[s.id].current;
            const start = el ? el.offsetTop / total : 0;
            return { ...s, start };
          });
          for (let i = 0; i < arr.length; i++) {
            arr[i].end = i < arr.length - 1 ? arr[i + 1].start : 1;
          }
          setBounds(arr);
        };
        measure();
        const t1 = setTimeout(measure, 400);
        const t2 = setTimeout(measure, 1200);
        window.addEventListener("resize", measure);
        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          window.removeEventListener("resize", measure);
        };
      }, []);

      /* Cursor & Scroll Listener */
      useEffect(() => {
        setFineCursor(window.matchMedia("(pointer: fine)").matches);
        const move = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
        window.addEventListener("mousemove", move);

        const onScroll = () => {
          const scrollY = window.scrollY || document.documentElement.scrollTop;
          const viewportHeight = window.innerHeight;
          const total = document.documentElement.scrollHeight;
          const center = scrollY + viewportHeight / 2;
          const p = total > 0 ? Math.min(1, Math.max(0, center / total)) : 0;
          setProgress(p);
          const found = bounds.find((b) => p >= b.start && p < b.end);
          if (found) setActiveId(found.id);
          else if (p >= 0.999) setActiveId(sectionsMeta[sectionsMeta.length - 1].id);
        };

        window.addEventListener("scroll", onScroll);
        return () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("scroll", onScroll);
        };
      }, [bounds]);

      const scrollToSection = (id) => {
        const el = sectionRefs[id]?.current;
        if (el) {
          window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        }
      };

      const hoverProps = {
        onMouseEnter: () => setCursorHover(true),
        onMouseLeave: () => setCursorHover(false),
      };

      const copyToClipboard = async (text, id) => {
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand("copy");
          } catch {
            /* no-op */
          }
          document.body.removeChild(ta);
        }
        setCopied(id);
        setTimeout(() => setCopied(null), 1500);
      };

      const onSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;

        const googleFormUrl = "https://docs.google.com/forms/u/1/d/e/1FAIpQLSecIXQ4jKmQN8_T9mqzDQYDpqwmSHOmVjvACvblszBKbajmQg/formResponse";
        const formData = new FormData();
        formData.append("entry.575082474", form.name);
        formData.append("entry.241259942", form.email);
        formData.append("entry.111098357", form.message);

        fetch(googleFormUrl, {
          method: "POST",
          mode: "no-cors",
          body: formData
        })
          .then(() => setSent(true))
          .catch((err) => {
            console.error("Error submitting to Google Form", err);
            setSent(true);
          });
      };

      return (
        <div className={fineCursor && !selectedVideo ? "hide-native-cursor" : ""}>
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');

        :root {
          --bg: #050a16;
          --bg-deep: #020305;
          --panel: rgba(10,20,40,0.6);
          --border: rgba(0,229,255,0.15);
          --cyan: #00e5ff;
          --blue: #3b82f6;
          --purple: #d946ef;
          --pink: #ff64c8;
          --text: #f0f4ff;
          --muted: #94a3b8;
        }

        .ak-root, .ak-root * { box-sizing: border-box; }
        .ak-root {
          font-family: 'Inter', system-ui, sans-serif;
          color: var(--text);
          background: linear-gradient(135deg, var(--bg-deep) 0%, #0a1428 50%, #0d0a1a 100%);
        }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .text-2xs { font-size: 0.6875rem; line-height: 1rem; }

        .glass {
          background: var(--panel);
          border: 1px solid var(--border);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .gradient-text {
          background: linear-gradient(90deg, var(--cyan), var(--purple));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .shadow-neon-cyan {
          box-shadow: 0 0 30px rgba(0,229,255,0.25), inset 0 0 20px rgba(0,229,255,0.1);
        }
        .shadow-neon-blue {
          box-shadow: 0 0 30px rgba(59,130,246,0.25), inset 0 0 20px rgba(59,130,246,0.1);
        }

        .scroll-area {
          position: relative;
          width: 100%;
        }

        .hero-sec-wrap {
          min-height: 100vh;
          display: flex;
          flex-direction: column-reverse;
          justify-content: center;
          align-items: center;
          padding-top: 6rem;
          padding-bottom: 5rem;
          overflow: hidden;
          position: relative;
          text-align: center;
        }

        .hero-3d-wrap {
          position: relative;
          pointer-events: none;
          width: min(85vw, 360px);
          height: min(85vw, 360px);
          margin-bottom: 1.5rem;
          opacity: 0.85;
        }

        @media (min-width: 1024px) {
          .hero-sec-wrap {
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            text-align: left;
            padding-top: 6rem;
            padding-bottom: 7rem;
          }

          .hero-3d-wrap {
            position: absolute;
            top: 50%;
            right: -5%;
            transform: translateY(-50%);
            width: min(90vw, 580px);
            height: min(90vw, 580px);
            margin-bottom: 0;
            opacity: 0.9;
          }
        }

        @keyframes pulse-rec { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .rec-dot { animation: pulse-rec 1.4s ease-in-out infinite; }

        @keyframes float-y { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .float { animation: float-y 5s ease-in-out infinite; }

        @keyframes glow-pulse {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(0,229,255,0.4)); }
          50% { filter: drop-shadow(0 0 16px rgba(0,229,255,0.7)); }
        }
        .glow-animate { animation: glow-pulse 2s ease-in-out infinite; }

        .chip {
          transition: color 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
        }
        .chip:hover {
          color: var(--cyan);
          border-color: var(--cyan);
          box-shadow: 0 0 15px rgba(0,229,255,0.4);
          transform: translateY(-2px);
        }

        .nav-link { transition: color 0.2s, text-shadow 0.2s; }
        .nav-link:hover { color: var(--cyan) !important; text-shadow: 0 0 10px rgba(0,229,255,0.5); }

        .btn-primary {
          background: linear-gradient(90deg, var(--cyan), var(--purple));
          color: #050a16;
          box-shadow: 0 0 20px rgba(0,229,255,0.2);
          transition: transform 0.25s, box-shadow 0.25s;
        }
        .btn-primary:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 0 40px rgba(0,229,255,0.5);
        }

        .btn-ghost { transition: color 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s; }
        .btn-ghost:hover { 
          color: var(--cyan);
          border-color: var(--cyan);
          box-shadow: 0 0 15px rgba(0,229,255,0.25);
          transform: translateY(-2px);
        }

        .btn-text { transition: color 0.2s, gap 0.2s; }
        .btn-text:hover { color: var(--cyan) !important; }

        .contact-row { transition: border-color 0.25s, transform 0.25s, box-shadow 0.25s; }
        .contact-row:hover { 
          border-color: var(--purple);
          transform: translateX(2px);
          box-shadow: 0 0 20px rgba(217,70,239,0.15);
        }

        .icon-btn:hover { background: rgba(0,229,255,0.08); }

        .field {
          background: rgba(0,229,255,0.04);
          border: 1px solid var(--border);
          color: var(--text);
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
        }
        .field::placeholder { color: var(--muted); }
        .field:focus {
          outline: none;
          border-color: var(--cyan);
          background: rgba(0,229,255,0.08);
          box-shadow: 0 0 15px rgba(0,229,255,0.2);
        }

        .vf-corner { position: absolute; width: 20px; height: 20px; border-color: var(--cyan); }

        .hide-native-cursor, .hide-native-cursor * { cursor: none !important; }

        :focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }

        @media (prefers-reduced-motion: reduce) {
          .rec-dot, .float, .glow-animate { animation: none !important; }
          * { transition-duration: 0.01ms !important; }
        }
      `}</style>

          {/* Premium Neon Cursor */}
          {fineCursor && !selectedVideo && (
            <div
              className="fixed top-0 left-0 z-50 pointer-events-none transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${cursorPos.x - 20}px, ${cursorPos.y - 20}px) scale(${cursorHover ? 1.5 : 1
                  })`,
              }}
              aria-hidden="true"
            >
              <div className="relative">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "2px solid",
                    borderColor: cursorHover ? "var(--cyan)" : "rgba(0,229,255,0.4)",
                    boxShadow: cursorHover ? "0 0 20px var(--cyan)" : "0 0 10px rgba(0,229,255,0.2)",
                    transition: "all 0.2s ease-out",
                  }}
                />
                {/* Middle ring */}
                <div
                  className="absolute"
                  style={{
                    width: "28px",
                    height: "28px",
                    top: "6px",
                    left: "6px",
                    border: "1px solid",
                    borderColor: "rgba(217,70,239,0.3)",
                    borderRadius: "50%",
                    opacity: cursorHover ? 0.8 : 0.4,
                  }}
                />
                {/* Center dot */}
                <div
                  className="absolute"
                  style={{
                    width: "6px",
                    height: "6px",
                    top: "17px",
                    left: "17px",
                    background: cursorHover ? "var(--cyan)" : "rgba(0,229,255,0.6)",
                    borderRadius: "50%",
                    boxShadow: "0 0 8px currentColor",
                  }}
                />
                {/* Crosshair lines */}
                <div
                  className="absolute"
                  style={{
                    width: "12px",
                    height: "1px",
                    top: "19.5px",
                    left: "4px",
                    background: "rgba(0,229,255,0.3)",
                    opacity: cursorHover ? 1 : 0.5,
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: "12px",
                    height: "1px",
                    top: "19.5px",
                    right: "4px",
                    background: "rgba(0,229,255,0.3)",
                    opacity: cursorHover ? 1 : 0.5,
                  }}
                />
                <div
                  className="absolute"
                  style={{
                    width: "1px",
                    height: "12px",
                    top: "4px",
                    left: "19.5px",
                    background: "rgba(0,229,255,0.3)",
                    opacity: cursorHover ? 1 : 0.5,
                  }}
                />
              </div>
            </div>
          )}

          {/* Loading Screen */}
          {loading && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-6" style={{ background: "var(--bg-deep)" }}>
              <div className="text-center">
                <div
                  className="font-mono text-2xs sm:text-xs tracking-[0.3em] glow-animate"
                  style={{ color: "var(--cyan)" }}
                >
                  INITIALIZING STUDIO
                </div>
                <div className="font-display text-3xl sm:text-4xl font-bold mt-4 mb-8 gradient-text">
                  ATHULKRISHNA T P
                </div>
                <div className="w-56 sm:w-64 h-1.5 rounded-full overflow-hidden mx-auto" style={{ background: "rgba(0,229,255,0.1)" }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${loadPct}%`,
                      background: "linear-gradient(90deg, var(--cyan), var(--purple))",
                      transition: "width 0.12s ease-out",
                      boxShadow: "0 0 15px rgba(0,229,255,0.5)",
                    }}
                  />
                </div>
                <div className="font-mono text-2xs sm:text-xs mt-4" style={{ color: "var(--cyan)" }}>
                  {String(Math.floor(loadPct)).padStart(3, "0")}%
                </div>
              </div>
            </div>
          )}

          <div className="ak-root relative">
            <NeonParticleField />

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 glass border-b" style={{ borderColor: "var(--border)" }}>
              <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 h-16 flex items-center justify-between">
                <div className="font-display font-bold text-sm sm:text-base tracking-widest gradient-text">
                  AT <span style={{ color: "var(--cyan)" }}>•</span> P
                </div>
                <nav className="hidden sm:flex items-center gap-6 font-mono text-2xs uppercase tracking-[0.2em]">
                  {navItems.map((n) => (
                    <button
                      key={n.id}
                      {...hoverProps}
                      onClick={() => scrollToSection(n.id)}
                      className="nav-link"
                      style={{ color: "var(--muted)" }}
                    >
                      {n.label}
                    </button>
                  ))}
                </nav>
                <div className="font-mono text-2xs hidden sm:block glow-animate" style={{ color: "var(--cyan)" }}>
                  ● LIVE
                </div>
              </div>
            </header>

            {/* Scroll Container */}
            <div ref={containerRef} className="scroll-area relative w-full">
              {/* ========== HERO ========== */}
              <section ref={heroRef} className="hero-sec-wrap relative px-4 sm:px-8 lg:px-10">
                <div className="hero-3d-wrap">
                  <HoloLensScene />
                </div>

                <div className="hero-content relative z-10">
                  <div className="flex items-center gap-2 font-mono text-2xs sm:text-xs mb-8" style={{ color: "var(--muted)" }}>
                    <span className="w-2 h-2 rounded-full rec-dot" style={{ background: "var(--cyan)" }} />
                    <span style={{ color: "var(--cyan)" }}>●REC</span>
                    <span className="opacity-50">·</span>
                    <span>CAPTURING STORIES IN MOTION</span>
                  </div>

                  <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tighter mb-6">
                    Transforming <span className="gradient-text">Raw Footage</span> Into{" "}
                    <span className="gradient-text">Cinematic</span> Masterpieces
                  </h1>

                  <p className="font-mono text-xs sm:text-sm mt-8 tracking-[0.15em] uppercase" style={{ color: "var(--cyan)" }}>
                    Video Editor • Videographer • Content Creator
                  </p>

                  <p className="text-base sm:text-lg italic mt-8 max-w-xl leading-relaxed" style={{ color: "var(--muted)" }}>
                    "Every frame has a story. My mission is to make it unforgettable."
                  </p>

                  <div className="flex flex-wrap gap-3 sm:gap-4 mt-10">
                    <button
                      {...hoverProps}
                      onClick={() => scrollToSection("videos")}
                      className="btn-primary px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider"
                    >
                      View My Work
                    </button>
                    <button
                      {...hoverProps}
                      onClick={() => scrollToSection("contact")}
                      className="btn-ghost glass px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider"
                      style={{ borderColor: "var(--border)" }}
                    >
                      Get In Touch
                    </button>
                  </div>
                </div>
              </section>

              {/* ========== ABOUT ========== */}
              <section ref={aboutRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28">
                <Reveal>
                  <SectionEyebrow n="02" label="CREATOR PROFILE" />
                </Reveal>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mt-12 items-center relative z-10">
                  <Reveal>
                    <div
                      className="relative rounded-3xl glass overflow-hidden float"
                      style={{
                        aspectRatio: "3 / 4",
                        borderColor: "var(--border)",
                        boxShadow: "0 0 40px rgba(0,229,255,0.15)",
                      }}
                    >
                      <div className="vf-corner top-4 left-4 border-t-2 border-l-2 rounded-tl-lg" />
                      <div
                        className="vf-corner top-4 right-4 border-t-2 border-r-2 rounded-tr-lg"
                        style={{ borderColor: "var(--purple)" }}
                      />
                      <div
                        className="vf-corner bottom-4 left-4 border-b-2 border-l-2 rounded-bl-lg"
                        style={{ borderColor: "var(--purple)" }}
                      />
                      <div className="vf-corner bottom-4 right-4 border-b-2 border-r-2 rounded-br-lg" />

                      <img
                        src={`data:image/jpeg;base64,${PROFILE_IMG}`}
                        alt="Athulkrishna T P"
                        className="w-full h-full object-cover"
                      />

                      <div
                        className="absolute top-4 left-4 right-4 flex items-center justify-between font-mono text-2xs"
                        style={{ color: "var(--muted)" }}
                      >
                        <span className="flex items-center gap-1.5" style={{ color: "var(--cyan)" }}>
                          <span className="w-1.5 h-1.5 rounded-full rec-dot" style={{ background: "var(--cyan)" }} /> REC
                        </span>
                        <span>4K · 24fps</span>
                      </div>
                      <div
                        className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-2xs"
                        style={{ color: "var(--muted)" }}
                      >
                        <span>@i.krizhh</span>
                        <span style={{ color: "var(--cyan)" }}>EDITED</span>
                      </div>
                    </div>
                  </Reveal>

                  <Reveal>
                    <div>
                      <h2 className="font-display text-4xl sm:text-5xl font-bold mb-3">Athulkrishna T P</h2>
                      <p
                        className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase mb-8"
                        style={{ color: "var(--cyan)" }}
                      >
                        Age 19 • Kerala, India • Since 2006
                      </p>

                      <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
                        An aspiring creative visionary specializing in video editing, videography, and digital content creation.
                        I transform raw ideas into engaging visual experiences through cinematic editing, strategic sound design,
                        and compelling storytelling. Continuously evolving my craft to deliver premium-quality content that
                        resonates.
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-8">
                        {[
                          { label: "AGE", value: "19" },
                          { label: "EXPERIENCE", value: "3+ Yrs" },
                          { label: "PROJECTS", value: "50+" },
                        ].map((s) => (
                          <div
                            key={s.label}
                            className="glass rounded-xl p-4"
                            style={{ borderColor: "var(--border)" }}
                          >
                            <div className="font-mono text-2xs tracking-widest" style={{ color: "var(--muted)" }}>
                              {s.label}
                            </div>
                            <div className="font-display text-lg font-bold mt-2 gradient-text">{s.value}</div>
                          </div>
                        ))}
                      </div>

                      <button
                        {...hoverProps}
                        onClick={() => scrollToSection("contact")}
                        className="btn-text font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-2"
                        style={{ color: "var(--cyan)" }}
                      >
                        Start A Project <ArrowRight size={16} />
                      </button>
                    </div>
                  </Reveal>
                </div>
              </section>

              {/* ========== SHOWREEL ========== */}
              <section ref={showreelRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28">
                <Reveal>
                  <SectionEyebrow n="03" label="HIGHLIGHT REEL" />
                </Reveal>
                <ShowreelSection />
              </section>

              {/* ========== VIDEOS ========== */}
              <section ref={videosRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28">
                <Reveal>
                  <SectionEyebrow n="04" label="PORTFOLIO SHOWCASE" />
                </Reveal>

                <Reveal className="mt-10">
                  <h2 className="font-display text-4xl sm:text-5xl font-bold">My Work In Motion</h2>
                  <p className="text-base mt-4 max-w-2xl" style={{ color: "var(--muted)" }}>
                    Explore a curated selection of my best video edits, from cinematic pieces to fast-paced social content.
                  </p>
                </Reveal>

                <Reveal className="mt-8 relative z-10 flex flex-wrap gap-3">
                  {[
                    { id: "all", label: "All Work" },
                    { id: "promo reels", label: "Promo Reels" },
                    { id: "Cinematic slowmo Edits", label: "Cinematic Slowmo" },
                    { id: "Timeline Edits", label: "Timeline Edits" },
                    { id: "fast cuts", label: "Fast Cuts" }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      {...hoverProps}
                      onClick={() => setVideoFilter(tab.id)}
                      className={`btn-ghost px-5 py-2 text-xs rounded-full border ${videoFilter === tab.id
                        ? "border-[var(--cyan)] text-[var(--cyan)] shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                        : "border-[var(--border)] text-[var(--text)]"
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 relative z-10">
                  {VIDEOS.filter((video) => videoFilter === "all" || video.category === videoFilter).map((video, idx) => (
                    <Reveal key={idx}>
                      <VideoCard
                        video={video}
                        onPlay={setSelectedVideo}
                        hoverProps={hoverProps}
                      />
                    </Reveal>
                  ))}
                </div>

                <Reveal>
                  <InstagramReelSection onPlay={setSelectedVideo} hoverProps={hoverProps} />
                </Reveal>

                {selectedVideo && (
                  <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
                )}
              </section>

              {/* ========== POSTERS ========== */}
              <PosterBookSection postersRef={postersRef} />

              {/* ========== CASE STUDIES (PROCESS) ========== */}
              <section ref={caseStudiesRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28">
                <Reveal>
                  <SectionEyebrow n="06" label="PROCESS BREAKDOWNS" />
                </Reveal>
                <div className="case-studies-header reveal mb-16">
                  <h2 className="font-display text-4xl sm:text-5xl font-bold">Technical Case Studies</h2>
                  <p className="text-base mt-4 max-w-2xl text-[var(--muted)]">
                    Behind every edit is a calculated strategy. Drag, toggle, and click below to explore my workflow in action.
                  </p>
                </div>
                <div className="flex flex-col gap-24 mt-16 relative z-10">
                  <ColorGradingCase />
                  <SoundDesignCase />
                  <VfxBreakdownCase />
                </div>
              </section>

              {/* ========== SKILLS ========== */}
              <section ref={skillsRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28">
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "10%",
                    left: "-10%",
                    width: "380px",
                    height: "380px",
                    background: "radial-gradient(circle, rgba(217,70,239,0.1), transparent 70%)",
                    filter: "blur(50px)",
                  }}
                  aria-hidden="true"
                />
                <Reveal>
                  <SectionEyebrow n="07" label="TECHNICAL ARSENAL" />
                </Reveal>

                <Reveal className="mt-10">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">Editing Mastery</h2>
                  <p style={{ color: "var(--muted)" }} className="mb-8 max-w-xl">
                    Specialized techniques perfected over years of creation.
                  </p>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {editingSkills.map((s) => (
                      <div
                        key={s}
                        className="chip glass px-4 py-2.5 rounded-full font-mono text-2xs sm:text-xs"
                        style={{ borderColor: "var(--border)" }}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                </Reveal>

                <Reveal className="mt-16">
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-8">Software Tools</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {SOFTWARE_LOGOS.map((soft) => (
                      <div
                        key={soft.name}
                        className="glass rounded-2xl p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-neon-cyan"
                        style={{ borderColor: "var(--border)" }}
                      >
                        <img
                          src={`uploads/${soft.file}`}
                          alt={soft.name}
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23333' width='100' height='100'/%3E%3C/svg%3E";
                          }}
                        />
                        <div>
                          <h4 className="font-display text-sm sm:text-base font-semibold">{soft.name}</h4>
                          <p
                            className="font-mono text-2xs"
                            style={{
                              color: soft.level === "Intermediate" ? "var(--cyan)" : "var(--purple)",
                            }}
                          >
                            {soft.level}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </section>

              {/* ========== SERVICES ========== */}
              <section ref={servicesRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28">
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "5%",
                    right: "-8%",
                    width: "400px",
                    height: "400px",
                    background: "radial-gradient(circle, rgba(0,229,255,0.1), transparent 70%)",
                    filter: "blur(50px)",
                  }}
                  aria-hidden="true"
                />
                <Reveal>
                  <SectionEyebrow n="08" label="SERVICES OFFERED" />
                </Reveal>

                <Reveal>
                  <blockquote className="font-display text-3xl sm:text-4xl lg:text-5xl max-w-3xl mt-10 mb-16 leading-snug font-bold">
                    "Creativity is not about having <span className="gradient-text">ideas</span>. It's about bringing them to{" "}
                    <span className="gradient-text">life</span>."
                  </blockquote>
                </Reveal>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
                  {services.map((svc) => (
                    <Reveal key={svc.title}>
                      <ServiceCard {...svc} hoverProps={hoverProps} />
                    </Reveal>
                  ))}
                </div>
              </section>

              {/* ========== CONTACT ========== */}
              <section ref={contactRef} className="relative px-4 sm:px-8 lg:px-10 py-20 sm:py-28" style={{ paddingBottom: "8rem" }}>
                <Reveal>
                  <SectionEyebrow n="09" label="GET IN TOUCH" />
                </Reveal>

                <Reveal>
                  <h2 className="font-display text-4xl sm:text-5xl font-bold mt-8 max-w-2xl leading-tight">
                    Let's create something <span className="gradient-text">legendary</span> together.
                  </h2>
                </Reveal>

                <div className="grid md:grid-cols-2 gap-10 sm:gap-12 mt-14 relative z-10">
                  <Reveal className="space-y-4 sm:space-y-5">
                    <ContactRow
                      icon={Mail}
                      label="Email"
                      value="athulkrishnatp18@gmail.com"
                      copyValue="athulkrishnatp18@gmail.com"
                      copied={copied === "email"}
                      onCopy={() => copyToClipboard("athulkrishnatp18@gmail.com", "email")}
                      hoverProps={hoverProps}
                    />
                    <ContactRow
                      icon={Phone}
                      label="WhatsApp"
                      value="+91 7012351024"
                      href="https://wa.me/917012351024"
                      hoverProps={hoverProps}
                    />
                    <ContactRow
                      icon={MessageCircle}
                      label="Phone"
                      value="+91 7012351024"
                      copyValue="+917012351024"
                      copied={copied === "phone"}
                      onCopy={() => copyToClipboard("+917012351024", "phone")}
                      hoverProps={hoverProps}
                    />
                    <ContactRow
                      icon={Instagram}
                      label="Instagram"
                      value="@i.krizhh"
                      href="https://www.instagram.com/i.krizhh?igsh=d3hwbzV1NXhlenRo"
                      hoverProps={hoverProps}
                    />
                    <ContactRow
                      icon={Linkedin}
                      label="LinkedIn"
                      value="athul-designs"
                      href="https://www.linkedin.com/in/athul-designs"
                      hoverProps={hoverProps}
                    />
                  </Reveal>

                  <Reveal>
                    <div className="glass rounded-2xl p-6 sm:p-8" style={{ borderColor: "var(--border)" }}>
                      {!sent ? (
                        <form onSubmit={onSubmit} className="space-y-5">
                          <div>
                            <label className="font-mono text-2xs tracking-[0.2em] block mb-2" style={{ color: "var(--muted)" }}>
                              NAME *
                            </label>
                            <input
                              {...hoverProps}
                              required
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              placeholder="Your name"
                              className="field w-full rounded-lg px-4 py-3 text-sm"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-2xs tracking-[0.2em] block mb-2" style={{ color: "var(--muted)" }}>
                              EMAIL *
                            </label>
                            <input
                              {...hoverProps}
                              required
                              type="email"
                              value={form.email}
                              onChange={(e) => setForm({ ...form, email: e.target.value })}
                              placeholder="you@example.com"
                              className="field w-full rounded-lg px-4 py-3 text-sm"
                            />
                          </div>
                          <div>
                            <label className="font-mono text-2xs tracking-[0.2em] block mb-2" style={{ color: "var(--muted)" }}>
                              MESSAGE *
                            </label>
                            <textarea
                              {...hoverProps}
                              required
                              rows={4}
                              value={form.message}
                              onChange={(e) => setForm({ ...form, message: e.target.value })}
                              placeholder="Tell me about your vision..."
                              className="field w-full rounded-lg px-4 py-3 text-sm resize-none"
                            />
                          </div>
                          <button
                            {...hoverProps}
                            type="submit"
                            className="btn-primary w-full rounded-full font-mono text-xs sm:text-sm font-bold uppercase tracking-wider py-3"
                          >
                            Send Message
                          </button>
                        </form>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center py-12">
                          <div
                            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                            style={{ background: "rgba(0,229,255,0.12)" }}
                          >
                            <Check size={28} style={{ color: "var(--cyan)" }} />
                          </div>
                          <p className="font-display text-xl font-bold">Message Received</p>
                          <p className="text-sm mt-2" style={{ color: "var(--muted)" }}>
                            Thanks, {form.name.split(" ")[0]} — I'll get back to you within 24 hours.
                          </p>
                        </div>
                      )}
                    </div>
                  </Reveal>
                </div>
              </section>
            </div>
          </div>
        </div>
      );
    }