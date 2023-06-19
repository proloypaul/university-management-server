import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { logger, loggerError } from './shared/logger';
import { Server } from 'http';

// uncaughtException error handeling
process.on('uncaughtException', error => {
  loggerError.error(error);
  process.exit(1);
});
let server: Server;

async function main() {
  try {
    // await mongoose.connect('mongodb://127.0.0.1:27017/test');
    await mongoose.connect(config.database_url as string);

    logger.info('Database connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`University management server running port:  ${config.port}`);
    });
  } catch (err) {
    loggerError.error('Failed to connect database ', err);
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  // gracefully handle asyncronous error
  process.on('unhandledRejection', error => {
    console.log('unhandler rejection is detected. We are clossing our server');
    if (server) {
      server.close(() => {
        loggerError.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

// handle secterm error
process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
