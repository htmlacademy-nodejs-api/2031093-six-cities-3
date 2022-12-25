import chalk from 'chalk';

import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
        Программа для подготовки данных для REST API сервера.

        Пример:
        ${chalk.yellowBright('cli.ts ')}${chalk.yellowBright('--')}${chalk.green('<')}${chalk.yellowBright('command')}${chalk.green('> ')}${chalk.green('[')}${chalk.yellowBright('--arguments')}${chalk.green(']')}

        Команды:
            ${chalk.yellowBright('--version')}:                       # выводит номер версии
            ${chalk.yellowBright('--help')}:                          # печатает этот текст
            ${chalk.yellowBright('--import ')}${chalk.green('<')}${chalk.white('filepath')}${chalk.green('>')}:             # импортирует данные из TSV
            ${chalk.yellowBright('--generate ')}${chalk.green('<')}${chalk.blue('n')}${chalk.green('> <')}${chalk.white('filepath')}${chalk.green('> <')}${chalk.underline.blueBright('url')}${chalk.green('>')}  # генерирует произвольное количество тестовых данных
        `);
  }
}
