import { argv } from 'process';

import CLIApplication from './app/cli-application';
import HelpCommand from './cli-command/help-command';
import VersionCommand from './cli-command/version-command';
import ImportCommand from './cli-command/import-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand, new ImportCommand
]);
myManager.processCommand(argv);
