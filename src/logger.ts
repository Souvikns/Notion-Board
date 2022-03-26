import chalk from 'chalk';

class Logger {
    info(message: string){
        console.log(chalk.green('[INFO]: ') + chalk.white(message));
    }
    
    warn(message: string) {
        console.log(chalk.yellowBright('[WARN]: ') + chalk.white(message));
    }

    error(message: string) {
        console.log('⛔️ ' + chalk.redBright('[ERROR]: ') + chalk.white(message));
    }
}

export const logger = new Logger();