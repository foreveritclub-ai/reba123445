import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FileText, Download, ChevronDown, CheckCircle2, XCircle, Trophy } from "lucide-react";

/**
 * Shared syllabus PDFs available to every course on the Learn dashboard.
 * Each PDF ships with a short 5-question scored quiz so learners can
 * self-check after reading.
 */
const PDFS: { id: string; title: string; url: string; topic: string }[] = [
  { id: "p1", title: "Foundations of IT & Computer Systems", url: "https://drive.google.com/uc?export=download&id=1rP7eXNex5dz1I928bf4ch1QkogdWh1a6", topic: "IT Foundations" },
  { id: "p2", title: "Networking Essentials & TCP/IP", url: "https://drive.google.com/uc?export=download&id=1Fh2-DJX1CXnDyiEkKQz7caeHpuyRT993", topic: "Networking" },
  { id: "p3", title: "Cybersecurity Principles", url: "https://drive.google.com/uc?export=download&id=1PQh6PhEc0FghZAH_NcD8utlpbmbMNllX", topic: "Cybersecurity" },
  { id: "p4", title: "Cloud Computing & Virtualisation", url: "https://drive.google.com/uc?export=download&id=1TUYc42gJW-fzywSVdn5TjVngAiqL03Kr", topic: "Cloud" },
  { id: "p5", title: "Web Development Fundamentals", url: "https://drive.google.com/uc?export=download&id=1hkez0AXx9vVPdPo4mwUpgGndSYLLngcD", topic: "Web Development" },
  { id: "p6", title: "Databases & SQL", url: "https://drive.google.com/uc?export=download&id=1R-163gsfJSEDDVN-n90hEWSmD94rWKe2", topic: "Databases" },
  { id: "p7", title: "Programming Logic & Algorithms", url: "https://drive.google.com/uc?export=download&id=104pw1TGv0xoIZvAEU4bu7nOnTKx2iNDk", topic: "Programming" },
  { id: "p8", title: "Mobile Application Development", url: "https://drive.google.com/uc?export=download&id=1qlxHRFZd5swnZ4NyoB1PXhKkOzBsS7DC", topic: "Mobile Apps" },
  { id: "p9", title: "AI & Machine Learning Basics", url: "https://drive.google.com/uc?export=download&id=1ijrrjibuSaj_3cNw6Vq6KnqOBvzO9A4Y", topic: "AI / ML" },
  { id: "p10", title: "DevOps & Deployment", url: "https://drive.google.com/uc?export=download&id=1utyvO1m9OXqWVE_y5VE3tVwNrvDlo_6s", topic: "DevOps" },
  { id: "p11", title: "Project Management for Tech Teams", url: "https://drive.google.com/uc?export=download&id=1ttUXlEx95Y7PwEq7UNqa7UVRSVCWntnj", topic: "Project Management" },
];

interface QQ {
  q: string;
  options: string[];
  correct: number;
}

const QUIZZES: Record<string, QQ[]> = {
  p1: [
    { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Unit", "Control Program Unit", "Core Processor Utility"], correct: 0 },
    { q: "Which is volatile memory?", options: ["HDD", "SSD", "RAM", "USB"], correct: 2 },
    { q: "An operating system is…", options: ["A web browser", "Software that manages hardware", "A text editor", "A file format"], correct: 1 },
    { q: "Binary uses which digits?", options: ["0–9", "0 and 1", "1–10", "A–F"], correct: 1 },
    { q: "BIOS stands for…", options: ["Basic Input/Output System", "Binary Internal Operating Source", "Boot Internal OS", "Binary Internal Output System"], correct: 0 },
  ],
  p2: [
    { q: "Which protocol delivers web pages?", options: ["FTP", "HTTP", "SMTP", "SSH"], correct: 1 },
    { q: "An IPv4 address has how many bits?", options: ["16", "32", "64", "128"], correct: 1 },
    { q: "DNS converts…", options: ["IPs to MACs", "Names to IPs", "Bits to bytes", "URLs to HTML"], correct: 1 },
    { q: "Which is a private IP range?", options: ["8.8.8.0", "192.168.0.0/16", "172.40.0.0", "200.0.0.0"], correct: 1 },
    { q: "TCP guarantees…", options: ["Speed only", "Order and delivery", "Encryption", "Compression"], correct: 1 },
  ],
  p3: [
    { q: "CIA in security stands for…", options: ["Confidentiality, Integrity, Availability", "Control, Internet, Access", "Crypto, ID, Audit", "Cipher, Integrity, Auth"], correct: 0 },
    { q: "Phishing is a type of…", options: ["Hardware fault", "Social engineering", "Encryption", "Backup"], correct: 1 },
    { q: "MFA adds…", options: ["A second factor of authentication", "Faster internet", "More storage", "Encryption keys"], correct: 0 },
    { q: "A firewall mainly…", options: ["Speeds the network", "Filters traffic by rules", "Stores passwords", "Compresses data"], correct: 1 },
    { q: "Which is strongest hashing?", options: ["MD5", "SHA-1", "SHA-256", "CRC32"], correct: 2 },
  ],
  p4: [
    { q: "IaaS provides…", options: ["Apps", "Platforms", "Raw infrastructure", "Email"], correct: 2 },
    { q: "Which is a public cloud?", options: ["AWS", "Local server", "USB", "Intranet"], correct: 0 },
    { q: "A virtual machine runs on…", options: ["A hypervisor", "A printer", "An ISP", "A router"], correct: 0 },
    { q: "Auto-scaling means…", options: ["Manual restart", "Automatic capacity adjustment", "Backup", "Load balancing only"], correct: 1 },
    { q: "S3 in AWS is…", options: ["Database", "Object storage", "VM", "DNS"], correct: 1 },
  ],
  p5: [
    { q: "HTML defines…", options: ["Style", "Structure", "Behaviour", "Database"], correct: 1 },
    { q: "CSS controls…", options: ["Logic", "Storage", "Style", "Routing"], correct: 2 },
    { q: "Which runs in the browser?", options: ["Python", "JavaScript", "C++", "PHP"], correct: 1 },
    { q: "REST APIs typically use…", options: ["HTTP", "FTP", "SSH", "SMTP"], correct: 0 },
    { q: "A 404 status means…", options: ["Server error", "Not found", "Created", "Redirect"], correct: 1 },
  ],
  p6: [
    { q: "SQL stands for…", options: ["Structured Query Language", "Strong Query Loop", "Server Query Lang", "Simple Quick Lang"], correct: 0 },
    { q: "PRIMARY KEY ensures…", options: ["Indexing only", "Uniqueness and not null", "Encryption", "Compression"], correct: 1 },
    { q: "JOIN combines…", options: ["Files", "Tables on related columns", "Indexes", "Schemas"], correct: 1 },
    { q: "Which is a NoSQL DB?", options: ["MongoDB", "MySQL", "Postgres", "Oracle"], correct: 0 },
    { q: "Normalization reduces…", options: ["Redundancy", "Speed", "Storage cost only", "Indexes"], correct: 0 },
  ],
  p7: [
    { q: "An algorithm is…", options: ["A bug", "A step-by-step procedure", "A device", "A language"], correct: 1 },
    { q: "Big-O measures…", options: ["Code length", "Performance complexity", "Lines per second", "Memory price"], correct: 1 },
    { q: "A loop that never ends is…", options: ["Recursion", "Infinite loop", "Branch", "Switch"], correct: 1 },
    { q: "Which sort is fastest on average?", options: ["Bubble", "Quicksort", "Selection", "Insertion"], correct: 1 },
    { q: "A variable holds…", options: ["A function", "A value", "A class only", "An IP"], correct: 1 },
  ],
  p8: [
    { q: "React Native targets…", options: ["Only iOS", "Only Android", "Both iOS and Android", "Only web"], correct: 2 },
    { q: "APK is the package format for…", options: ["iOS", "Windows", "Android", "Linux"], correct: 2 },
    { q: "Which language is used for native iOS?", options: ["Swift", "Java", "PHP", "Ruby"], correct: 0 },
    { q: "Push notifications need…", options: ["A token from the OS service", "Email server", "Database only", "DNS"], correct: 0 },
    { q: "Mobile responsive design adapts to…", options: ["Screen size", "Battery", "GPU", "Wi-Fi only"], correct: 0 },
  ],
  p9: [
    { q: "Supervised learning needs…", options: ["No data", "Labeled data", "Only images", "Only text"], correct: 1 },
    { q: "A neural network unit is…", options: ["A neuron", "A bit", "A pixel", "A loop"], correct: 0 },
    { q: "Overfitting means…", options: ["Model too simple", "Model memorises training data", "No data", "Slow training"], correct: 1 },
    { q: "Which is a Python ML library?", options: ["scikit-learn", "Excel", "Photoshop", "Notepad"], correct: 0 },
    { q: "Accuracy is calculated as…", options: ["Correct / total", "Errors only", "Loss × time", "Random"], correct: 0 },
  ],
  p10: [
    { q: "CI/CD stands for…", options: ["Continuous Integration / Continuous Delivery", "Code In / Code Down", "Cloud Init / Cloud Deploy", "Commit Inside / Commit Done"], correct: 0 },
    { q: "Docker packages apps as…", options: ["Containers", "VMs", "Folders", "Snapshots"], correct: 0 },
    { q: "Kubernetes orchestrates…", options: ["Containers", "Routers", "Databases only", "Cables"], correct: 0 },
    { q: "Git is a…", options: ["Version control system", "Database", "Cloud provider", "Editor"], correct: 0 },
    { q: "A rollback is…", options: ["A new feature", "Reverting to a previous version", "A backup format", "An encryption mode"], correct: 1 },
  ],
  p11: [
    { q: "Agile prioritises…", options: ["Big upfront design", "Working software and iteration", "Documentation only", "Solo work"], correct: 1 },
    { q: "A sprint usually lasts…", options: ["1–4 weeks", "6 months", "1 day", "1 hour"], correct: 0 },
    { q: "A scrum master…", options: ["Codes only", "Facilitates the team", "Fires people", "Sells products"], correct: 1 },
    { q: "Kanban boards show…", options: ["Salary", "Workflow stages", "Bugs only", "Customers"], correct: 1 },
    { q: "MVP stands for…", options: ["Most Valuable Player", "Minimum Viable Product", "Major Version Plan", "Multi-Vendor Pack"], correct: 1 },
  ],
};

interface PdfCardProps {
  pdf: (typeof PDFS)[number];
}

const PdfCard = ({ pdf }: PdfCardProps) => {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const quiz = QUIZZES[pdf.id] ?? [];

  const score = useMemo(() => {
    if (!submitted) return 0;
    return quiz.reduce((acc, q, i) => acc + (answers[i] === q.correct ? 1 : 0), 0);
  }, [submitted, answers, quiz]);

  const percent = quiz.length ? Math.round((score / quiz.length) * 100) : 0;
  const passed = percent >= 60;

  const reset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border border-border rounded-xl bg-card/60 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-card transition-colors"
      >
        <div className="flex items-start gap-3 min-w-0">
          <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="min-w-0">
            <p className="font-semibold text-foreground truncate">{pdf.title}</p>
            <p className="text-xs text-muted-foreground">
              {pdf.topic} · {quiz.length} quiz questions · scored
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="px-4 pb-5 pt-0 space-y-4">
          <a
            href={pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            Download PDF syllabus
          </a>

          {quiz.length > 0 && (
            <div className="border-t border-border pt-4 space-y-4">
              <p className="text-sm font-semibold">Quick check ({quiz.length} questions)</p>
              {quiz.map((q, qi) => (
                <fieldset key={qi} className="space-y-1.5">
                  <legend className="text-sm text-foreground/90 mb-1">
                    {qi + 1}. {q.q}
                  </legend>
                  {q.options.map((opt, oi) => {
                    const checked = answers[qi] === oi;
                    const isCorrect = submitted && oi === q.correct;
                    const isWrong = submitted && checked && oi !== q.correct;
                    return (
                      <label
                        key={oi}
                        className={`flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md border transition-colors ${
                          isCorrect
                            ? "border-green-500/50 bg-green-500/10 text-green-300"
                            : isWrong
                            ? "border-red-500/50 bg-red-500/10 text-red-300"
                            : checked
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`${pdf.id}-${qi}`}
                          className="accent-primary"
                          disabled={submitted}
                          checked={checked}
                          onChange={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                        />
                        <span>{opt}</span>
                        {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 ml-auto" />}
                        {isWrong && <XCircle className="w-3.5 h-3.5 ml-auto" />}
                      </label>
                    );
                  })}
                </fieldset>
              ))}

              {!submitted ? (
                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(answers).length !== quiz.length}
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold disabled:opacity-50"
                >
                  Submit & score
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
                      passed
                        ? "bg-green-500/15 text-green-300"
                        : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    Score: {score}/{quiz.length} ({percent}%) — {passed ? "Passed" : "Try again"}
                  </div>
                  <button
                    type="button"
                    onClick={reset}
                    className="px-3 py-1.5 text-sm rounded-lg border border-border hover:border-primary"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const SyllabusResources = () => (
  <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
    <div className="mb-5">
      <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        Learning Resources Library
      </h3>
      <p className="text-sm text-muted-foreground">
        Supplementary syllabus PDFs from Egreed Technology — open any topic, read it, then take the
        scored quick check to confirm you understood it.
      </p>
    </div>
    <div className="space-y-3">
      {PDFS.map((p) => (
        <PdfCard key={p.id} pdf={p} />
      ))}
    </div>
  </div>
);

export default SyllabusResources;
