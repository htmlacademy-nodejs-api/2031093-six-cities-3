import { argv } from 'process';

import CLIApplication from './app/cli-application';
import HelpCommand from './cli-command/help-command';
import VersionCommand from './cli-command/version-command';

const myManager = new CLIApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand
]);
myManager.processCommand(argv);
