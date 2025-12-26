import React, { useState, useRef, useEffect } from 'react';
import Prompt from './components/Prompt';
import { processCommand } from './utils/commandProcessor';
import { CommandHistory } from './types';
import { USER_HOST, THEMES } from './constants';

const App: React.FC = () => {
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      id: 'init',
      command: '',
      output: (
        <div className="mb-4">
          <p className="font-bold text-[1.125em] mb-2">Welcome to Nishant's Terminal Portfolio v1.0.0</p>
          <p>Type <span className="text-[var(--color-warning)]">'help'</span> to see a list of available commands.</p>
        </div>
      )
    }
  ]);
  const [currentTheme, setCurrentTheme] = useState('solarized');
  const [zoom, setZoom] = useState(1);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Apply theme variables to root element
  useEffect(() => {
    const root = document.documentElement;
    const theme = THEMES[currentTheme];
    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    }
  }, [currentTheme]);

  // Handle Zoom Events
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoom((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === '=' || e.key === '+' || e.key === 'Add') {
          e.preventDefault();
          setZoom((prev) => Math.min(prev + 0.1, 3));
        } else if (e.key === '-' || e.key === 'Subtract') {
          e.preventDefault();
          setZoom((prev) => Math.max(prev - 0.1, 0.5));
        } else if (e.key === '0') {
          e.preventDefault();
          setZoom(1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCommand = (command: string) => {
    const { output, shouldClear, newTheme } = processCommand(command);

    if (newTheme) {
      setCurrentTheme(newTheme);
    }

    if (shouldClear) {
      setHistory([]);
    } else {
      const newEntry: CommandHistory = {
        id: Date.now().toString(),
        command,
        output
      };
      setHistory((prev) => [...prev, newEntry]);
    }
  };

  // Always keep focus on input
  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Scroll to bottom when history changes
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  return (
    <div className="h-screen w-screen flex items-center justify-center overflow-hidden p-2 sm:p-4">
      {/* Terminal Card */}
      <div 
        className="relative w-full h-full bg-[var(--color-bg)] backdrop-blur-3xl rounded-[2rem] border border-white/5 shadow-2xl flex flex-col overflow-hidden transition-colors duration-300"
        onClick={handleContainerClick}
      >
        {/* Visual Effects contained within card */}
        <div className="scanlines"></div>
        <div className="crt-flicker"></div>
        
        {/* Theme Toggle Dropdown */}
        <div 
          className="absolute top-4 right-6 z-[60]"
          onClick={(e) => e.stopPropagation()}
        >
          <select 
            value={currentTheme}
            onChange={(e) => setCurrentTheme(e.target.value)}
            className="bg-black/20 text-[var(--color-text)] border border-[var(--color-text)]/30 rounded px-2 py-1 text-xs outline-none cursor-pointer backdrop-blur-md hover:bg-black/30 transition-colors uppercase font-bold tracking-wider"
          >
            <option value="matrix" className="bg-gray-900 text-gray-300">Green (Matrix)</option>
            <option value="light" className="bg-gray-900 text-gray-300">Black (Light)</option>
            <option value="solarized" className="bg-gray-900 text-gray-300">Solarized</option>
            <option value="monokai" className="bg-gray-900 text-gray-300">Monokai</option>
            <option value="dracula" className="bg-gray-900 text-gray-300">Dracula</option>
          </select>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar relative z-10">
          <div className="w-full text-glow flex flex-col" style={{ fontSize: `${zoom}rem` }}>
            
            {/* History Log */}
            <div className="space-y-2">
              {history.map((entry) => (
                <div key={entry.id} className="mb-2">
                  {entry.command && (
                    <div className="flex flex-row">
                      <span className="text-[var(--color-prompt)] font-bold mr-2 whitespace-nowrap">{USER_HOST}</span>
                      <span className="text-[var(--color-text)]">{entry.command}</span>
                    </div>
                  )}
                  <div className="text-[var(--color-text)] ml-0 leading-relaxed opacity-90">
                    {entry.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Active Input Line */}
            <div className="mt-2 shrink-0">
                <Prompt onCommand={handleCommand} inputRef={inputRef} />
            </div>

            {/* Spacer for auto-scroll */}
            <div ref={bottomRef} className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;