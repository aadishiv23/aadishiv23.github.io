export default function ContactContent({ isDarkMode }) {
  return (
    <div
      className={`h-full p-6 flex flex-col gap-6 ${
        isDarkMode ? 'text-gray-100 bg-slate-900/80' : 'text-slate-900 bg-slate-50/80'
      }`}
    >
      <header>
        <h2 className="text-3xl font-semibold">Reach Out</h2>
        <p className="text-sm text-slate-500 dark:text-slate-300 mt-2">
          Connect regarding Apple platform engineering, research collaborations, or product feedback.
        </p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href="mailto:aadishiv@umich.edu"
          className="rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-4 shadow-sm hover:shadow-md transition-all"
        >
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Primary Email</p>
          <p className="text-lg font-medium">aadishiv@umich.edu</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Academic & research collaborations</p>
        </a>
        <a
          href="mailto:aadishiv@outlook.com"
          className="rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-4 shadow-sm hover:shadow-md transition-all"
        >
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Personal Inbox</p>
          <p className="text-lg font-medium">aadishiv@outlook.com</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Product feedback & personal projects</p>
        </a>
        <div className="rounded-xl border border-slate-300 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1">Phone</p>
          <p className="text-lg font-medium">
            <a href="tel:+12489069401" className="hover:underline">
              (248) 906-9401
            </a>
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Happy to chat about platform experiences</p>
        </div>
        <div className="rounded-xl border border-slate-300 dark:border-white/10 bg-gradient-to-br from-blue-500/10 via-blue-400/10 to-purple-400/20 px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-200 mb-2">Elsewhere</p>
          <div className="space-y-2 text-sm">
            <a
              href="https://github.com/aadishiv23"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <span>GitHub</span>
              <span className="text-xs text-slate-500 dark:text-slate-300">/aadishiv23</span>
            </a>
            <a
              href="https://www.linkedin.com/in/aadi-shiv-malhotra/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:underline"
            >
              <span>LinkedIn</span>
              <span className="text-xs text-slate-500 dark:text-slate-300">Proactive journeys & updates</span>
            </a>
          </div>
        </div>
      </div>
      <footer className="mt-auto rounded-xl border border-dashed border-slate-300 dark:border-white/10 px-4 py-3 text-xs text-slate-500 dark:text-slate-300">
        Birmingham, MI · Collaboration across Ann Arbor, Madison, and Cupertino time zones.
      </footer>
    </div>
  );
}
