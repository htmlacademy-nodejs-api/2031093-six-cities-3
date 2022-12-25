import { CliCommandInterface } from './cli-command.interface';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public execute(filename: string): void {
    // Чтение файла
  }
}
