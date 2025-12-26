
import { ReactNode } from 'react';

export interface FileSystem {
  [filename: string]: string;
}

export interface CommandHistory {
  id: string;
  command: string;
  output: ReactNode | string;
}

export enum CommandType {
  HELP = 'help',
  LS = 'ls',
  CAT = 'cat',
  WHOAMI = 'whoami',
  CLEAR = 'clear',
  SUDO = 'sudo',
  NEOFETCH = 'neofetch',
  THEME = 'theme',
}
