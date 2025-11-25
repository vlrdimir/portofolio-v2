import Link from "next/link";
import { Github, Linkedin } from "lucide-react";
import AnimatedLink from "@/components/AnimatedLink";

export default function About() {
  return (
    <section>
      <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">
        About Me<span className="text-red-500">.</span>
      </h1>

      <div className="mb-12 space-y-6 leading-relaxed text-neutral-800">
        <p>
          My name is <strong>Dwi Okta Djoas</strong>. I enjoy building clean,
          efficient web applications and experimenting with new technologies.
          I&apos;m currently a Computer Science student at {""}
          <strong>Bina Sarana Informatika</strong>, balancing my studies with
          full-stack development projects.
        </p>

        <p>
          Here you&apos;ll find a collection of my projects, notes on what
          I&apos;m learning, and reflections on my coding adventures. This space
          helps me organize my thoughts, track my progress over time, and
          hopefully connect with others who share similar interests in software
          development.
        </p>

        <p>
          Beyond coding, I spend my time diving into competitive gaming,
          exploring emerging technologies, and staying updated with industry
          developments. I value continuous learning and finding inspiration from
          various sources in the tech world.
        </p>

        <p>
          I designed this space to be open and inviting. If you have any
          questions, want to collaborate, or just want to chat about tech, feel
          free to reach out via{" "}
          <Link
            href="https://t.me/repmybio"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-neutral-900 underline decoration-neutral-300 transition-colors hover:decoration-neutral-600"
          >
            Telegram.
          </Link>
        </p>

        <p>
          I appreciate you taking the time to explore my work and learn more
          about me.
        </p>
      </div>

      <div>
        <h2 className="mb-6 font-mono text-2xl font-bold">
          Connect<span className="text-red-500">.</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatedLink
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-sm"
          >
            <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
              <Github className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            </div>
            <div>
              <div className="text-foreground font-serif font-medium">
                GitHub
              </div>
              <div className="text-muted-foreground font-mono text-sm">
                Check my code
              </div>
            </div>
          </AnimatedLink>

          <AnimatedLink
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-sm"
          >
            <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
              <Linkedin className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
            </div>
            <div>
              <div className="text-foreground font-serif font-medium">
                LinkedIn
              </div>
              <div className="text-muted-foreground font-mono text-sm">
                Let&apos;s network
              </div>
            </div>
          </AnimatedLink>

          <AnimatedLink
            href="https://t.me/repmybio"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-sm"
          >
            <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
              <svg
                className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </div>
            <div>
              <div className="text-foreground font-serif font-medium">
                Telegram
              </div>
              <div className="text-muted-foreground font-mono text-sm">
                Get in touch
              </div>
            </div>
          </AnimatedLink>

          <AnimatedLink
            href="mailto:dwi@example.com"
            className="group border-border/50 bg-card hover:border-primary/40 hover:bg-secondary-hover/50 flex items-center gap-3 rounded-lg border p-4 transition-all hover:shadow-sm"
          >
            <div className="bg-secondary group-hover:bg-secondary-hover border-border/20 flex h-10 w-10 items-center justify-center rounded-full border transition-colors">
              <svg
                className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <div className="text-foreground font-serif font-medium">
                Email
              </div>
              <div className="text-muted-foreground font-mono text-sm">
                Send a message
              </div>
            </div>
          </AnimatedLink>
        </div>
      </div>
    </section>
  );
}
