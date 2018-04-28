const COLORS = {
  GRAY: '#bababa',
  GREEN: '#31c438',
  RED: '#f90727',
  YELLOW: '#ffec5e'
};

class Logger {
  public log(...args) {
    window.console.log('%cLog', `color: ${COLORS.GRAY}`);
  }

  public error(...args) {
    window.console.log('%cLog', `color: ${COLORS.RED}`);
  }

  public warning(...args) {
    window.console.log('%cLog', `color: ${COLORS.YELLOW}`);
  }
};

export default Logger;
