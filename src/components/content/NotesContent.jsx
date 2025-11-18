import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'aadios-scratchpad';

export default function NotesContent({ isDarkMode }) {
  const [draft, setDraft] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setDraft(saved);
      setLastSaved(new Date());
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, draft);
    setLastSaved(new Date());
  }, [draft]);

  return (
    <div
      className={`h-full flex flex-col ${
        isDarkMode ? 'bg-[#1F1F1F]/90 text-gray-100' : 'bg-[#FFF9E6]/90 text-gray-800'
      }`}
    >
      <header
        className={`px-4 py-2 border-b text-xs uppercase tracking-wide ${
          isDarkMode ? 'border-white/10 text-gray-400' : 'border-black/10 text-gray-500'
        }`}
      >
        Scratchpad · synced to this device
      </header>
      <div className="flex-1 px-4 py-3">
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Drop ideas, reminder scripts, or WWDC wishlists…"
          className={`w-full h-full resize-none focus:outline-none text-sm leading-relaxed bg-transparent ${
            isDarkMode ? 'placeholder:text-gray-600' : 'placeholder:text-gray-400'
          } font-medium`}
        />
      </div>
      <footer
        className={`px-4 py-2 text-[11px] ${
          isDarkMode ? 'text-gray-500 border-t border-white/10' : 'text-gray-500 border-t border-black/10'
        } flex items-center justify-between`}
      >
        <span>⌘ + Return to add a new line</span>
        {lastSaved && (
          <span>
            Saved {lastSaved.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} · local storage only
          </span>
        )}
      </footer>
    </div>
  );
}
