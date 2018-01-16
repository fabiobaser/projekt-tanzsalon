module.exports = {
  expressConfig: {
    PORT: 5000
  },

  // REMOTE VIA AmazonWebServices RDS
  // mysqlConfig: {
  //   host: "sae.cuw2bz4mkgfb.eu-central-1.rds.amazonaws.com", //localhost
  //   user: "root",
  //   password: "11100111", //11100111
  //   database: "clientServerApp", //webApp
  //   port: 3306
  // },
  // LOCAL VIA MAMP
  mysqlConfig: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "clientServerApp",
    socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock", //Added Socket to reduce MAMP related problems
    port: 3306
  }
};

/**
 * UNCOMMENT corresponding "mysqlConfig" for your needs
 */
