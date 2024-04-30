module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: 'menu-scan-order-api',
      script: 'dist/main.js',
    },
  ],
};
