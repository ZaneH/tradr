import chalk from 'chalk'

export const CConsole = {
  green: (text: string, uncolored?: any) =>
    console.log(chalk.green(text), uncolored),
  red: (text: string, uncolored?: any) =>
    console.log(chalk.red(text), uncolored),
  yellow: (text: string, uncolored?: any) =>
    console.log(chalk.yellow(text), uncolored),
}
