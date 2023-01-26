class Logger {
  log(message: string, data?: any) {
    return console.log(`[log]: ${message}`, data);
  }

  logDebug(message: string, data?: any) {
    const msg = `[debug]: ${message}`;
    return data ? console.debug(msg, data) : console.debug(msg);
  }

  logError(message: string, data?: any) {
    const msg = `[error]: ${message}`;
    return data ? console.debug(msg, data) : console.error(msg);
  }

  logInfo(message: string, data?: any) {
    const msg = `[info]: ${message}`;
    return data ? console.info(msg, data) : console.info(msg);
  }

  logWarning(message: string, data?: any) {
    const msg = `[warn]: ${message}`;
    return data ? console.warn(msg, data) : console.warn(msg);
  }
}

export default Logger;
