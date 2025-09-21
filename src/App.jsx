import React, { useMemo, useState } from "react";
import { Menu, X, Mail, Phone, MapPin, ExternalLink, PlayCircle, Instagram, Facebook, Filter } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";


// Minimalist, LEICHT-inspired one-page portfolio with image + video projects, filters, and a contact section.
// TailwindCSS is available. No external UI libs required. Just drop-in and customize the data arrays below.

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Videos", href: "#videos" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    title: "Alpine Apartment Kitchen",
    image: "/alpine-apartment.jpg",
    tags: ["Residential", "Interior", "Minimal"],
    link: "#",
  },
  {
    title: "Penthouse Living Space",
    image: "/penthouse.webp",
    tags: ["Residential", "Architecture"],
    link: "#",
  },
  {
    title: "Studio Loft Renovation",
    image: "/studio.jpg",
    tags: ["Commercial", "Interior"],
    link: "#",
  },
  {
    title: "Modern Office Lounge",
    image: "/office-lounge.webp",
    tags: ["Commercial", "Workspace", "Minimal"],
    link: "#",
  },
  {
    title: "Lakehouse Retreat",
    image: "/lakeside.webp",
    tags: ["Residential", "Architecture", "Nature"],
    link: "#",
  },
  {
    title: "Boutique Retail Fitout",
    image: "/retail-shop.jpg",
    tags: ["Commercial", "Retail"],
    link: "#",
  },
];

const VIDEOS = [
  {
    title: "Showroom Walkthrough",
    provider: "YouTube",
    // Replace URL with your own video
    url: "https://www.youtube.com/embed/4jnzf1yj48M",
    tags: ["Showreel"],
  },
  {
    title: "Luxury Penthouse Tour",
    provider: "YouTube",
    url: "https://www.youtube.com/embed/iL0pv2FpnqA",
    tags: ["Case Study", "Residential"],
  },
];

const TAGS = Array.from(new Set(PROJECTS.flatMap(p => p.tags))).sort();

export default function PortfolioSite() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState([]);

  const toggleTag = (tag) => {
    setActiveTags((t) =>
      t.includes(tag) ? t.filter((x) => x !== tag) : [...t, tag]
    );
  };


  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => {
      const matchQuery = query
        ? p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
        : true;

      // ✅ if no tags selected → show all
      const matchTags =
        activeTags.length === 0 || activeTags.some(tag => p.tags.includes(tag));

      return matchQuery && matchTags;
    });
  }, [query, activeTags]);


  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <a href="#home" className="font-semibold tracking-wide text-xl">Bawa Business</a>
            <nav className="hidden md:flex items-center gap-8">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="text-sm hover:opacity-60 transition-opacity">
                  {n.label}
                </a>
              ))}
            </nav>
            <button className="md:hidden" onClick={() => setOpen(o => !o)} aria-label="Toggle menu">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {/* Mobile Nav */}
        {open && (
          <div className="md:hidden border-t border-neutral-200">
            <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-2">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} className="py-2" onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* Left side (Text) */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-semibold tracking-tight"
            >
              Contemporary interiors & visual stories
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 max-w-2xl text-neutral-600"
            >
              Minimal forms. Natural materials. Precision details. Explore a curated portfolio of spaces and films.
            </motion.p>
            <div className="mt-10 flex items-center gap-3">
              <a
                href="#projects"
                className="px-5 py-3 rounded-2xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-5 py-3 rounded-2xl border text-sm font-medium hover:bg-neutral-100 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Right side (Image sliding in) */}
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:block rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src="/modern-white-kitchen.jpg"
              alt="Modern Kitchen"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </section>


      {/* Projects */}
      <section id="projects" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h2>
              <p className="mt-2 text-neutral-600 max-w-xl">A selection of built work across residential, retail, and workspace.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-initial">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects"
                  className="w-full sm:w-64 rounded-2xl border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                />
                <span className="absolute right-3 top-2.5 opacity-60 text-xs"></span>
              </div>
              <div className="hidden sm:flex items-center gap-1">
                <Filter className="h-4 w-4 opacity-70" />
                {TAGS.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleTag(t)}
                    className={`px-3 py-1 rounded-full border text-xs transition-colors ${activeTags.includes(t) ? "bg-neutral-900 text-white border-neutral-900" : "hover:bg-neutral-100"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile tag pills */}
          <div className="mt-4 sm:hidden flex flex-wrap gap-2">
            {TAGS.map(t => (
              <button
                key={t}
                onClick={() => toggleTag(t)}
                className={`px-3 py-1 rounded-full border text-xs transition-colors ${activeTags.includes(t) ? "bg-neutral-900 text-white border-neutral-900" : "hover:bg-neutral-100"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredProjects.map((p, i) => (
                <motion.a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group rounded-3xl overflow-hidden border bg-white hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-medium">{p.title}</h3>
                      <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2 py-1 rounded-full bg-neutral-100 text-neutral-600"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Video Portfolio</h2>
              <p className="mt-2 text-neutral-600 max-w-xl">Case studies, walkthroughs, and behind-the-scenes films.</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {VIDEOS.map((v) => (
              <div key={v.title} className="rounded-3xl overflow-hidden border">
                <div className="aspect-video bg-black">
                  <iframe
                    src={v.url}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium flex items-center gap-2"><PlayCircle className="h-4 w-4" /> {v.title}</h3>
                  <p className="text-xs mt-1 text-neutral-500">{v.provider}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">About</h2>
              <p className="mt-4 text-neutral-700 leading-relaxed">
                We create refined, functional spaces with a focus on proportion, light, and material honesty. Our portfolio spans
                residential, retail, and workplace environments. From concept to completion, we partner closely with clients and collaborators.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <Stat k="+120" label="Completed Projects" />
                <Stat k="18" label="Cities" />
                <Stat k="12" label="Awards" />
                <Stat k="10+" label="Years" />
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden border bg-white">
              <img src="https://picsum.photos/seed/studio/1000/800" alt="Studio" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h2>
              <p className="mt-4 text-neutral-700">Have a project in mind? Let’s talk.</p>

              <div className="mt-6 space-y-3 text-sm">
                <a href="mailto:hello@example.com" className="flex items-center gap-3 group">
                  <Mail className="h-4 w-4 opacity-70 group-hover:opacity-100" /> hello@example.com
                </a>
                <a href="tel:+41000000000" className="flex items-center gap-3 group">
                  <Phone className="h-4 w-4 opacity-70 group-hover:opacity-100" /> +41 00 000 00 00
                </a>
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 opacity-70" /> Zug, Switzerland
                </p>
                <div className="flex items-center gap-4 pt-2 text-neutral-600">
                  <Instagram className="h-5 w-5" />
                  <Facebook className="h-5 w-5" />
                </div>

              </div>
            </div>

            {/* Contact form (no backend; ready to wire up) */}
            <form onSubmit={(e) => e.preventDefault()} className="rounded-3xl p-6 border bg-neutral-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-neutral-600">First name</label>
                  <input required className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                </div>
                <div>
                  <label className="text-xs text-neutral-600">Last name</label>
                  <input className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-600">Email</label>
                  <input type="email" required className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs text-neutral-600">Message</label>
                  <textarea rows={5} required className="mt-1 w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300" />
                </div>
              </div>
              <button className="mt-4 px-5 py-3 rounded-2xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition-colors">Send message</button>
              <p className="mt-2 text-xs text-neutral-500">This form is a demo. Hook it to your backend or a service like Formspree.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div>
              <a href="#home" className="font-semibold">Bawa Business</a>
              <p className="text-sm text-neutral-500 mt-2">© {new Date().getFullYear()} Bawa Business GmbH. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              {NAV.map(n => (
                <a key={n.href} href={n.href} className="hover:opacity-70">{n.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ k, label }) {
  return (
    <div className="rounded-2xl border bg-white p-5">
      <div className="text-2xl font-semibold">{k}</div>
      <div className="text-xs mt-1 text-neutral-500">{label}</div>
    </div>
  );
}
