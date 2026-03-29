export default function Footer() {
  return (
    <footer className="py-10 border-t border-[var(--border-color)]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <a
            href="#hero"
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="text-[var(--accent)]">&lt;</span>
            Bare&apos;S
            <span className="text-[var(--accent)]"> /&gt;</span>
          </a>
          <div className="flex gap-4">
            <a
              href="https://github.com/devnetechn"
              target="_blank"
              className="w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] flex items-center justify-center text-lg text-[var(--text-secondary)] transition-all duration-300 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-white"
            >
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
        <div className="text-center text-[0.85rem] text-[var(--text-muted)]">
          <p>&copy; 2026 Bare&apos;S. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
