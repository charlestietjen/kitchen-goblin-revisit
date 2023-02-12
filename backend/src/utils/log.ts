import chalk from "chalk";

export const skullLog = (message: string) => {
  console.log(chalk.green(`💀 ${message} 💀`));
};
