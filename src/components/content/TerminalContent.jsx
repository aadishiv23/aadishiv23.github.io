import React, { useEffect, useMemo, useRef, useState } from 'react';

const PROMPT = 'aadishiv@AadiOS ~ %';

const introScript = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: 'Aadi Shiv Malhotra · iOS Engineer' },
  { type: 'command', text: 'open focus --app-intents' },
  { type: 'output', text: 'Shortcuts scaffolding bootstrapped successfully.' },
  { type: 'command', text: 'ls ./experiences' },
  { type: 'output', text: 'fetch-l3  apple-proactive  fetch-intern  henry-ford  ljungman-lab' },
  { type: 'command', text: 'say "hi from the macOS-inspired terminal"' },
  { type: 'output', text: '🖥️  Terminal whispers back: hello there 👋' },
  { type: 'output', text: 'Type help to discover hidden commands.' },
];

const COMMAND_HANDLERS = (onOpenApp, onInvokeSpotlight, onToggleTheme) => ({
  help: () => ({
    type: 'list',
    lines: [
      'open projects            → Launch the Projects window',
      'open fetch-l3           → Jump to current Fetch role',
      'open apple              → Open Apple internship window',
      'open fetch-intern       → Revisit Fetch internship notes',
      'open henry-ford         → Explore CrossWalk Buddy research',
      'open ljungman           → Review KLIPP therapy tooling',
      'open finder             → Return to Finder overview',
      'spotlight               → Toggle Spotlight overlay',
      'theme                   → Toggle appearance',
      'clear                   → Clear your terminal history',
      'exit                    → Close the terminal window',
    ],
  }),
  'open projects': () => {
    onOpenApp?.('projects');
    return { type: 'info', text: 'Opening Projects…' };
  },
  'open fetch-l3': () => {
    onOpenApp?.('experience_fetch-l3');
    return { type: 'info', text: 'Beaming into Fetch personalization systems.' };
  },
  'open apple': () => {
    onOpenApp?.('experience_apple-proactive');
    return { type: 'info', text: 'Spinning up Shortcuts engineering notes.' };
  },
  'open fetch-intern': () => {
    onOpenApp?.('experience_fetch-intern');
    return { type: 'info', text: 'Loading Fetch internship retrospectives.' };
  },
  'open henry-ford': () => {
    onOpenApp?.('experience_henry-ford');
    return { type: 'info', text: 'Booting CrossWalk Buddy lab notebook.' };
  },
  'open ljungman': () => {
    onOpenApp?.('experience_ljungman-lab');
    return { type: 'info', text: 'Switching contexts to KLIPP research tooling.' };
  },
  'open finder': () => {
    onOpenApp?.('finder');
    return { type: 'info', text: 'Finder relaunch initiated.' };
  },
  spotlight: () => {
    onInvokeSpotlight?.();
    return { type: 'info', text: 'Spotlight engaged. Search everything.' };
  },
  theme: () => {
    onToggleTheme?.();
    return { type: 'info', text: 'Display theme toggled via Terminal.' };
  },
});

export default function TerminalContent({ isDarkMode, onOpenApp, onInvokeSpotlight, onToggleTheme, onRequestClose }) {
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const commandHandlers = useMemo(
    () => COMMAND_HANDLERS(onOpenApp, onInvokeSpotlight, onToggleTheme),
    [onInvokeSpotlight, onOpenApp, onToggleTheme]
  );

  useEffect(() => {
    let index = 0;
    const pushNextLine = () => {
      setHistory((prev) => [...prev, introScript[index]]);
      index += 1;
      if (index < introScript.length) {
        const delay = introScript[index - 1].type === 'command' ? 750 : 900;
        setTimeout(pushNextLine, delay);
      }
    };

    const timer = setTimeout(pushNextLine, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;

    setHistory((prev) => [...prev, { type: 'command', text: command }]);
    setInput('');

    if (command === 'clear') {
      setTimeout(() => setHistory([]), 120);
      return;
    }
    if (command === 'exit') {
      onRequestClose?.();
      return;
    }

    const handler = commandHandlers[command.toLowerCase()];
    if (handler) {
      const result = handler();
      if (result?.type === 'list') {
        setHistory((prev) => [
          ...prev,
          ...result.lines.map((line) => ({ type: 'output', text: line })),
        ]);
      } else if (result?.type === 'info') {
        setHistory((prev) => [...prev, { type: 'output', text: result.text }]);
      }
      return;
    }

    setHistory((prev) => [
      ...prev,
      { type: 'output', text: `command not found: ${command}` },
      { type: 'output', text: 'Type help for available commands.' },
    ]);
  };

  return (
    <div
      className={`h-full flex flex-col font-mono text-sm ${
        isDarkMode ? 'bg-black text-emerald-200' : 'bg-[#0A0E14] text-emerald-100'
      }`}
    >
      <header className="px-4 py-2 border-b border-emerald-500/20 text-[11px] uppercase tracking-wide text-emerald-400/80">
        zsh · swiftc friendly shell
      </header>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
        {history.map((entry, index) => {
          if (entry.type === 'command') {
            return (
              <div key={`cmd-${index}`} className="flex gap-2">
                <span className="text-emerald-400">{PROMPT}</span>
                <span>{entry.text}</span>
              </div>
            );
          }
          return (
            <div key={`out-${index}`} className="pl-[10ch] text-emerald-200/80">
              {entry.text}
            </div>
          );
        })}
        <div className="flex gap-2 items-center">
          <span className="text-emerald-400">{PROMPT}</span>
          <form onSubmit={handleSubmit} className="flex-1">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              autoFocus
              className="bg-transparent border-none outline-none caret-emerald-300 text-emerald-100 w-full"
              placeholder="help"
            />
          </form>
        </div>
      </div>
      <footer className="px-4 py-2 border-t border-emerald-500/20 text-[11px] text-emerald-300/70 flex justify-between">
        <span>Try typing help or spotlight</span>
        <span>⌘ + K clears · exit closes</span>
      </footer>
    </div>
  );
}
