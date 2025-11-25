export default function Now() {
  return (
    <section>
      <h1 className="mb-4 font-mono text-4xl font-bold md:text-5xl">
        What I&apos;m doing now<span className="text-red-500">.</span>
      </h1>

      <p className="mb-12 text-neutral-500">Updated: November 19, 2025</p>

      <div className="space-y-12">
        <ul className="ml-5 list-outside list-disc space-y-4 leading-relaxed text-neutral-800">
          <li>
            Unwinding with competitive games like <strong>Valorant</strong>{" "}
            during my free time to maintain a healthy work-life balance.
          </li>
          <li>
            Prioritizing my academic coursework at{" "}
            <strong>Bina Sarana Informatika</strong> and preparing for upcoming
            examinations.
          </li>
          <li>
            Exploring the <strong>Blockchain ecosystem</strong> and abusing
            airdrops for fun to learn about decentralized finance.
          </li>
          <li>
            Venturing into <strong>Game Development</strong>, currently learning
            the fundamentals and experimenting with game engines.
          </li>
          <li>
            Deep diving into <strong>DevOps</strong> practices, specifically
            focusing on GitHub Actions, CI/CD pipelines, and Docker
            containerization.
          </li>
        </ul>

        <div>
          <h2 className="mb-6 font-mono text-2xl font-bold">Tech Stack</h2>
          <p className="mb-6 text-neutral-800">
            Here are the technologies and tools I work with or am currently
            learning:
          </p>

          <ul className="ml-5 list-outside list-disc space-y-4 leading-relaxed text-neutral-800">
            <li>
              Working with <strong>Frontend</strong> technologies like Next.js,
              React, TypeScript, and Tailwind CSS to build modern web
              applications.
            </li>
            <li>
              Using <strong>ElysiaJS</strong> for backend development, still
              falling in love with <strong>Bun</strong>, along with{" "}
              <strong>Drizzle ORM</strong> and MySQL/Postgres databases.
            </li>
            <li>
              Running <strong>Arch Linux</strong> with <strong>Hyprland</strong>{" "}
              as my workspace environment.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
