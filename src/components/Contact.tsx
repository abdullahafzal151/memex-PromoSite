import { motion } from "framer-motion";
import { MessageSquare, Mail } from "lucide-react"; // Removed Github and Linkedin imports

// Custom SVGs to bypass lucide-react brand icon missing errors
const LinkedInIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.4 13.4 0 0 0-7 0C6.2 2.7 5 3.1 5 3.1a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3.4 11c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.6-5-2.5-7-3"></path>
  </svg>
);

const contactLinks = [
  {
    name: "WhatsApp",
    description: "Let's chat directly",
    icon: MessageSquare,
    url: "https://wa.me/923047826634",
    label: "0304 7826634",
  },
  {
    name: "LinkedIn",
    description: "Professional network",
    icon: LinkedInIcon,
    url: "https://www.linkedin.com/in/abdullah-afzal-8724592a7/",
    label: "Abdullah Afzal",
  },
  {
    name: "GitHub",
    description: "Check out my code",
    icon: GitHubIcon,
    url: "https://github.com/abdullahafzal151",
    label: "@abdullahafzal151",
  },
  {
    name: "Email",
    description: "For longer inquiries",
    icon: Mail,
    url: "mailto:abdullahafzal1169@gmail.com",
    label: "Send an email",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 300, damping: 24 } 
  },
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-6 border-t border-border-subtle bg-canvas/50">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase mb-4">
            Get in touch
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">
            Want to collaborate? <br className="hidden sm:block" />
            <span className="text-ink-muted">Let's connect.</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {contactLinks.map((link) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.name}
                variants={itemVariants}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col p-6 rounded-2xl border border-border bg-canvas hover:bg-canvas-raised transition-all hover:border-border-subtle hover:shadow-[0_8px_30px_rgb(0,0,0/0.12)]"
              >
                <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-full bg-canvas-overlay border border-border-subtle text-ink-muted group-hover:text-ink group-hover:scale-110 transition-all duration-300">
                  <Icon size={18} />
                </div>
                
                <h3 className="text-base font-semibold text-ink mb-1">
                  {link.name}
                </h3>
                
                <p className="text-xs text-ink-muted mb-6 flex-grow">
                  {link.description}
                </p>
                
                <div className="mt-auto flex items-center text-xs font-medium text-ink-faint group-hover:text-accent transition-colors">
                  {link.label}
                  <svg className="w-3 h-3 ml-1.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}