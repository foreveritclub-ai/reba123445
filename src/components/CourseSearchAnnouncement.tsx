import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Megaphone, BookOpen, GraduationCap, Sparkles } from "lucide-react";

const COURSES = [
  {
    slug: "cybersecurity-certification",
    name: "Cybersecurity Professional Certification",
    blurb: "Hands-on training in network security, ethical hacking, and incident response — built for Rwandan IT teams.",
    tags: ["security", "ceh", "kigali", "cyber", "siem"],
  },
  {
    slug: "fullstack-web-development",
    name: "Full-Stack Web Development Mastery",
    blurb: "React, Node.js, databases and deployment — ship real projects you can publish to your portfolio.",
    tags: ["react", "node", "fullstack", "web", "javascript", "developer"],
  },
  {
    slug: "cloud-architecture",
    name: "Cloud Architecture with AWS & Azure",
    blurb: "Design resilient cloud systems, optimise costs and pass real architect-level interviews.",
    tags: ["aws", "azure", "cloud", "devops", "architecture"],
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning Fundamentals",
    blurb: "Practical machine learning — from data wrangling to model deployment for real African business problems.",
    tags: ["ai", "ml", "python", "data", "tensorflow", "rwanda"],
  },
  {
    slug: "mobile-app-development",
    name: "Mobile App Development (iOS & Android)",
    blurb: "Build cross-platform apps with React Native and ship them to Play Store and App Store.",
    tags: ["mobile", "android", "ios", "react-native", "flutter"],
  },
  {
    slug: "database-design",
    name: "Database Design & Management",
    blurb: "Master SQL, schema design, performance tuning and Postgres for production systems.",
    tags: ["sql", "postgres", "database", "data", "etl"],
  },
];

const CourseSearchAnnouncement = () => {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return COURSES;
    return COURSES.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.blurb.toLowerCase().includes(term) ||
        c.tags.some((t) => t.includes(term)),
    );
  }, [q]);

  return (
    <section
      id="course-announcements"
      aria-labelledby="course-search-heading"
      className="px-6 py-20 bg-gradient-to-b from-background via-card/30 to-background"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-4">
            <Megaphone className="w-3.5 h-3.5" />
            New courses live · Egreed Technology Kigali
          </div>
          <h2
            id="course-search-heading"
            className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Search Egreed Technology Courses
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Type a topic — cybersecurity, AI, cloud, mobile, web — and jump straight to the lesson dashboard.
          </p>
        </motion.div>

        {/* Search box */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="search"
            role="search"
            aria-label="Search Egreed Technology courses"
            placeholder="Search courses, e.g. AI, cloud, react…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border focus:border-primary outline-none text-base shadow-lg"
          />
          {q && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {filtered.length} match{filtered.length === 1 ? "" : "es"}
            </span>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No course matches “{q}”. Try cybersecurity, cloud, AI, mobile, web, or database.
          </p>
        ) : (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((c) => (
              <motion.li
                key={c.slug}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-primary transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-primary mb-2 font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  Egreed Technology Course
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {c.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{c.blurb}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <Link
                    to={`/courses/${c.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Course details
                  </Link>
                  <Link
                    to={`/learn/${c.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:border-primary"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    Start learning
                  </Link>
                </div>
                <p className="sr-only">
                  Tags: {c.tags.join(", ")}. Available online from Kigali, Rwanda.
                </p>
              </motion.li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default CourseSearchAnnouncement;
