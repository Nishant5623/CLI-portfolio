import { FileSystem } from './types';

export const USER_HOST = 'guest@nishant-portfolio:~$';

export const THEMES: Record<string, Record<string, string>> = {
  matrix: {
    '--color-bg': '#0a192f4d',
    '--color-text': '#00ff00',
    '--color-prompt': '#00ff00',
    '--color-link': '#60a5fa',
    '--color-error': '#ef4444',
    '--color-warning': '#facc15',
    '--color-selection-bg': '#00ff00',
    '--color-selection-text': '#000000',
    '--color-text-glow': 'rgba(0, 255, 0, 0.5)',
  },
  light: {
    '--color-bg': '#ffffff80',
    '--color-text': '#000000',
    '--color-prompt': '#000000',
    '--color-link': '#2563eb',
    '--color-error': '#dc2626',
    '--color-warning': '#d97706',
    '--color-selection-bg': '#000000',
    '--color-selection-text': '#ffffff',
    '--color-text-glow': 'none',
  },
  solarized: {
    '--color-bg': '#002b364d',
    '--color-text': '#839496',
    '--color-prompt': '#859900',
    '--color-link': '#268bd2',
    '--color-error': '#dc322f',
    '--color-warning': '#b58900',
    '--color-selection-bg': '#93a1a1',
    '--color-selection-text': '#002b36',
    '--color-text-glow': 'rgba(133, 153, 0, 0.2)',
  },
  monokai: {
    '--color-bg': '#2728224d',
    '--color-text': '#f8f8f2',
    '--color-prompt': '#a6e22e',
    '--color-link': '#66d9ef',
    '--color-error': '#f92672',
    '--color-warning': '#e6db74',
    '--color-selection-bg': '#f92672',
    '--color-selection-text': '#f8f8f2',
    '--color-text-glow': 'rgba(166, 226, 46, 0.2)',
  },
  dracula: {
    '--color-bg': '#282a364d',
    '--color-text': '#f8f8f2',
    '--color-prompt': '#50fa7b',
    '--color-link': '#8be9fd',
    '--color-error': '#ff5555',
    '--color-warning': '#f1fa8c',
    '--color-selection-bg': '#44475a',
    '--color-selection-text': '#f8f8f2',
    '--color-text-glow': 'rgba(80, 250, 123, 0.2)',
  }
};

export const INITIAL_FILES: FileSystem = {
  'about.txt': `Hello! I'm Nishant. I am a 3rd-year B.Tech Computer Science student. I’m a builder at heart—I prefer creating functional tools and systems over just solving abstract puzzles.

Core Interests: System Programming, Cybersecurity, and PC Architecture. 
Current Goal: Strengthening my web development skills while mastering backend logic. 
Off-duty: You’ll find me researching PC parts or gaming.`,
  
  'skills.txt': `[ Languages ]
- Java .................... [ Proficient ]
- Python / C .............. [ Proficient ]
- JavaScript / HTML / CSS . [ Basic / Learning ]

[ Cybersecurity & Systems ]
- Network Security (NS3EDU Internship)
- Linux System Administration
- Docker Basics

[ Tools ]
- Git / GitHub
- Wireshark / Metasploit
- VirtualBox / VMware`,
  
  'projects.txt': `01. Hospital Billing System
Language: Java
Description: A management application built to handle patient data, billing calculations, and record-keeping. My first deep dive into object-oriented logic.

02. Cybersecurity Internship (NS3EDU)
Focus: Network Security & Vulnerability Assessment.
Details: Worked with security protocols and tools to understand how systems are compromised and defended.

03. Terminal Portfolio
Status: In Progress
Description: This interface! I'm using it to learn how web frontends interact with "system-like" logic.`,
  
  'contact.txt': `Ready to collaborate on Web Dev or Security projects.

- Email    : nishantpal072@gmail.com
- GitHub   : github.com/Nishant5623
- LinkedIn : linkedin.com/in/nishant-pal-0505322b3/

Current Status: Studying for B.Tech Finals / Available for Internships.`,
};

export const HELP_MESSAGE = `Available commands:
  help            List all available commands
  ls              List files in the current directory
  cat [filename]  Display the content of a file
  whoami          Display the current user
  clear           Clear the terminal screen
  neofetch        Display system information
  theme [name]    Change the terminal theme
  sudo            Execute a command as a superuser`;