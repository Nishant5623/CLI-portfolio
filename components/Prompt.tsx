
import React, { useEffect, useRef, useState } from 'react';
import { USER_HOST, INITIAL_FILES, THEMES } from '../constants';
import { CommandType } from '../types';

interface PromptProps {
  onCommand: (command: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const Prompt: React.FC<PromptProps> = ({ onCommand, inputRef }) => {
  const [inputValue, setInputValue] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleTabCompletion = () => {
    if (!inputValue) return;
    
    const parts = inputValue.split(' ');
    
    // Command completion (first word)
    if (parts.length === 1) {
      const partialCmd = parts[0].toLowerCase();
      const commands = Object.values(CommandType);
      const matches = commands.filter(cmd => cmd.startsWith(partialCmd));
      
      if (matches.length === 1) {
        setInputValue(matches[0] + ' ');
      } else if (matches.length > 1) {
        let common: string = matches[0];
        for (const match of matches) {
          while (!match.startsWith(common)) {
            common = common.slice(0, -1);
          }
        }
        setInputValue(common);
      }
      return;
    }
    
    // Argument completion
    const cmd = parts[0].toLowerCase();
    const lastPart = parts[parts.length - 1];
    let possibilities: string[] = [];
    
    // Fix: Added tab completion support for both file viewing (CAT) and theme selection (THEME)
    if (cmd === CommandType.CAT) {
      possibilities = Object.keys(INITIAL_FILES);
    } else if (cmd === CommandType.THEME) {
      possibilities = Object.keys(THEMES);
    }
    
    if (possibilities.length > 0) {
      const matches = possibilities.filter(p => p.startsWith(lastPart));
      if (matches.length === 1) {
        const newParts = [...parts];
        newParts[newParts.length - 1] = matches[0];
        setInputValue(newParts.join(' '));
      } else if (matches.length > 1) {
        let common = matches[0];
        for (const match of matches) {
          while (!match.startsWith(common)) {
            common = common.slice(0, -1);
          }
        }
        const newParts = [...parts];
        newParts[newParts.length - 1] = common;
        setInputValue(newParts.join(' '));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      handleTabCompletion();
      return;
    }
    if (e.key === 'Enter') {
      onCommand(inputValue);
      setInputValue('');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex flex-row items-center w-full">
      <span className="text-[var(--color-prompt)] font-bold mr-2 whitespace-nowrap shrink-0">
        {USER_HOST}
      </span>
      <div className="relative flex-grow">
        <input
          ref={inputRef}
          type="text"
          className="bg-transparent border-none outline-none text-[var(--color-text)] w-full font-mono caret-transparent"
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          autoFocus
        />
        <div className="absolute top-0 left-0 pointer-events-none whitespace-pre font-mono">
            <span className="opacity-0">{inputValue}</span>
            <span className={`${cursorVisible ? 'opacity-100' : 'opacity-0'} bg-[var(--color-text)] text-[var(--color-bg)] inline-block w-[1ch] h-[1.2em] align-middle -mt-1 ml-0.5`}>&nbsp;</span>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
