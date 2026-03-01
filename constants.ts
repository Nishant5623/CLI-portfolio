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
  'about.txt': `I am a third-year Computer Science student focused on building real-world software and DevOps projects. I enjoy solving practical problems and learning modern technologies through hands-on development.

I have experience working with Java, Data Structures, Linux, Git, and DevOps tools like Jenkins and Docker, and I am actively expanding my knowledge in cloud technologies and automation.

I believe in creating projects that demonstrate real impact rather than just theoretical knowledge. My goal is to develop scalable and efficient systems while continuously improving as a software engineer.`,
  
  'skills.txt': `SKILLS

[ Programming ]
- Java (OOP, Exception Handling, Collections)
- C/C++ (Basic)
- SQL

[ DevOps & Tools ]
- Git & GitHub
- Jenkins (CI/CD Pipelines)
- Docker (Containerization)
- Linux Commands & Shell Basics

[ Computer Science Fundamentals ]
- Data Structures & Algorithms
- Object-Oriented Programming
- Database Management Systems
- Operating Systems Basics
- Computer Networks Basics

[ Other Skills ]
- Problem Solving
- Debugging
- Software Development Practices`,
  
  'projects.txt': `🔹 Hospital Billing System

Language: Java

Description:
Developed a Java-based application to manage patient records and billing information. The system organizes patient details and calculates billing amounts using Object-Oriented Programming principles.

Key Features:
- Patient information management
- Billing calculation system
- Structured data handling
- Exception handling and validation

Skills Gained:
- Object-Oriented Programming
- Java Application Development
- Software Design Fundamentals

🔹 Cybersecurity Internship – NS3EDU

Focus: Network Security & Vulnerability Assessment

Description:
Completed a cybersecurity internship focused on understanding network vulnerabilities and security mechanisms. Learned how systems are attacked and how defensive measures protect data and networks.

Key Areas:
- Network Security Basics
- Vulnerability Assessment
- Security Protocols
- Threat Awareness

Skills Gained:
- Basic Cybersecurity Concepts
- Network Analysis
- Security Practices

🔹 Terminal Portfolio (In Progress)

Description:
Currently developing a terminal-style portfolio interface to present projects and technical skills. The project focuses on simulating command-line interaction using web technologies.

Key Features:
- Terminal-style interface
- Interactive commands
- Project navigation
- Clean UI design

Skills Gained:
- Frontend Development
- UI Design
- Web Development Basics

⭐ Very Important — Automated CI/CD Deployment Pipeline

Description:
Built a CI/CD pipeline using Jenkins to automate the process of building and deploying applications. The system automatically pulls code from GitHub and deploys it without manual steps.

Technologies:
- Jenkins
- GitHub
- Linux

Key Features:
- Automated deployment
- Continuous Integration
- Reduced manual work

Skills Gained:
- DevOps Fundamentals
- CI/CD Pipelines
- Automation`,
  
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