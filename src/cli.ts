#!/usr/bin/env node

import { argv } from 'process';

import CLIApplication from './app/cli-application.js';
import HelpCommand from './cli-command/help-command.js';
import VersionCommand from './cli-command/version-command.js';
import ImportCommand from './cli-command/import-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand, new ImportCommand
]);
myManager.processCommand(argv);
