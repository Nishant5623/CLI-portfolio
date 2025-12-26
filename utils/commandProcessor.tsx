import React from 'react';
import { FileSystem } from '../types';
import { HELP_MESSAGE, INITIAL_FILES, THEMES } from '../constants';

interface ProcessCommandResult {
  output: React.ReactNode | string;
  shouldClear?: boolean;
  newTheme?: string;
}

const START_TIME = new Date();

const getBrowser = (): string => {
  const userAgent = window.navigator.userAgent;
  if (userAgent.includes("Edg")) return "Microsoft Edge";
  if (userAgent.includes("Chrome")) return "Google Chrome";
  if (userAgent.includes("Firefox")) return "Mozilla Firefox";
  if (userAgent.includes("Safari")) return "Apple Safari";
  if (userAgent.includes("Opera") || userAgent.includes("OPR")) return "Opera";
  return "Unknown Browser";
};

const getUptime = (): string => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - START_TIME.getTime()) / 1000);
  const minutes = Math.floor(diffInSeconds / 60);
  const seconds = diffInSeconds % 60;
  return `${minutes}m ${seconds}s`;
};

/**
 * Utility to convert URLs and emails in a string into clickable React elements.
 */
const renderInteractiveText = (text: string) => {
  // Regex to match URLs (http/https or starting with github.com/linkedin.com/etc) and Emails
  const urlRegex = /(https?:\/\/[^\s]+|github\.com\/[^\s]+|linkedin\.com\/in\/[^\s]+|[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
  
  const parts = text.split(urlRegex);
  const matches = text.match(urlRegex);

  if (!matches) return text;

  return parts.map((part, i) => {
    const match = matches.find(m => m === part);
    if (match) {
      let href = match;
      // Ensure absolute URLs for domains
      if (match.startsWith('github.com') || match.startsWith('linkedin.com')) {
        href = `https://${match}`;
      } else if (match.includes('@') && !match.startsWith('http')) {
        href = `mailto:${match}`;
      }

      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-link)] underline decoration-dotted hover:decoration-solid hover:opacity-80 transition-all cursor-pointer"
        >
          {match}
        </a>
      );
    }
    return part;
  });
};

export const processCommand = (input: string): ProcessCommandResult => {
  const trimmedInput = input.trim();
  
  if (!trimmedInput) {
    return { output: '' };
  }

  const parts = trimmedInput.split(/\s+/);
  const command = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case 'help':
      return { output: <div className="whitespace-pre-wrap">{HELP_MESSAGE}</div> };

    case 'ls':
      return { 
        output: (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[var(--color-link)] font-bold">
            {Object.keys(INITIAL_FILES).map(file => (
              <span key={file}>{file}</span>
            ))}
          </div>
        )
      };

    case 'cat':
      if (args.length === 0) {
        return { output: <span className="text-[var(--color-error)]">Usage: cat [filename]</span> };
      }
      const filename = args[0];
      const content = INITIAL_FILES[filename];
      if (content) {
        return { 
          output: (
            <div className="whitespace-pre-wrap leading-relaxed">
              {renderInteractiveText(content)}
            </div>
          ) 
        };
      } else {
        return { output: <span className="text-[var(--color-error)]">cat: {filename}: No such file or directory</span> };
      }

    case 'whoami':
      return { output: 'guest_user' };

    case 'clear':
      return { output: '', shouldClear: true };
    
    case 'theme':
      if (args.length === 0) {
        return { 
          output: (
            <div className="flex flex-col">
              <span>Usage: theme [theme_name]</span>
              <span>Available themes: <span className="text-[var(--color-warning)]">{Object.keys(THEMES).join(', ')}</span></span>
            </div>
          )
        };
      }
      const requestedTheme = args[0].toLowerCase();
      if (THEMES[requestedTheme]) {
        return { 
          output: <span>Theme changed to <span className="font-bold uppercase text-[var(--color-link)]">{requestedTheme}</span></span>,
          newTheme: requestedTheme 
        };
      } else {
        return { output: <span className="text-[var(--color-error)]">Error: Theme '{requestedTheme}' not found.</span> };
      }
      
    case 'neofetch':
      const browser = getBrowser();
      const uptime = getUptime();
      
      return {
        output: (
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 my-2">
            <div className="text-[var(--color-prompt)] font-bold whitespace-pre leading-none hidden sm:block">
{`       _nnnn_
      dGGGGMMb
     @p~qp~~qMb
     M|@||@) M|
     @,----.JM|
    JS^\\__/  qKL
   dZP        qKRb
  dZP          qKKb
 fZP            SMMb
 HZM            MMMM
 FqM            MMMM
 __| ".        |\\dS"qML
 |    \`.       | \`' \\Zq
_)      \\.___.,|     .'
\\____   )MMMMMP|   .'
     \`-'       \`--'`}
            </div>
            <div className="text-[var(--color-prompt)] font-bold whitespace-pre leading-none sm:hidden">
{`    .--.
   |o_o |
   |:_/ |
  //   \\ \\
 (|     | )
/'\\_   _/\`\\
\\___)=(___/`}
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-[var(--color-prompt)] font-bold">guest@nishant-portfolio</span>
                <div className="border-b border-gray-600 w-full mb-2"></div>
              </div>
              <div><span className="text-[var(--color-prompt)] font-bold">OS</span>: Linux (Web Edition)</div>
              <div><span className="text-[var(--color-prompt)] font-bold">Host</span>: Static Terminal v1.0</div>
              <div><span className="text-[var(--color-prompt)] font-bold">Status</span>: <span className="text-green-400">Online (Static Build)</span></div>
              <div><span className="text-[var(--color-prompt)] font-bold">Kernel</span>: React v19.2.1</div>
              <div><span className="text-[var(--color-prompt)] font-bold">Uptime</span>: {uptime}</div>
              <div><span className="text-[var(--color-prompt)] font-bold">Browser</span>: {browser}</div>
              
              <div className="flex mt-2 gap-1">
                <div className="w-3 h-3 bg-[var(--color-bg)] border border-gray-700"></div>
                <div className="w-3 h-3 bg-[var(--color-error)]"></div>
                <div className="w-3 h-3 bg-[var(--color-prompt)]"></div>
                <div className="w-3 h-3 bg-[var(--color-warning)]"></div>
                <div className="w-3 h-3 bg-[var(--color-link)]"></div>
                <div className="w-3 h-3 bg-purple-500"></div>
                <div className="w-3 h-3 bg-cyan-500"></div>
                <div className="w-3 h-3 bg-[var(--color-text)]"></div>
              </div>
            </div>
          </div>
        )
      };

    case 'sudo':
      return { output: <span className="text-[var(--color-error)] font-bold">Permission Denied: You are not the admin. Nice try though.</span> };

    default:
      return { 
        output: (
          <span>
            Command not found: <span className="text-[var(--color-error)]">{command}</span>. Type <span className="text-[var(--color-warning)]">'help'</span> for a list of commands.
          </span>
        ) 
      };
  }
};