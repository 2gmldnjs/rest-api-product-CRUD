const config = require("../config")[process.env.NODE_ENV];//config파일 사용
const mysql = require("mysql2");  //mysql2설치후 사용


function createDatabase() {
  let instance = null;
  return {
    getInstance: function () {
      if (instance == null) {
        const pool = mysql.createPool(config.DB);
        instance = pool.promise();
      }
      return instance;
    }
  };
}

module.exports = createDatabase().getInstance();
