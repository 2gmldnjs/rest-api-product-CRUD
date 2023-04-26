const db = require("../../plugins/mysql");
const TABLE = require("../../util/TABLE");
const STATUS = require("../../util/STATUS");
const { resData, currentTime, isEmpty } = require("../../util/lib");
const moment = require("../../util/moment");

//전체 row 갯수
const getTotal = async () => {
  // const getTotal = async function () {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.PRODUCT}`;
    console.log('getTotal'+query);
    const [[{ cnt }]] = await db.execute(query);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

// row 존재유무
const getSelectOne = async (id) => {
  try {
    const query = `SELECT COUNT(*) AS cnt FROM ${TABLE.PRODUCT} WHERE id=?`;
    const values = [id];
    console.log('getSelectOne'+query);

    const [[{ cnt }]] = await db.execute(query, values);
    return cnt;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

// 페이징으로 가져오기
const getList = async (req) => {
  console.log('!getList1'+req);

  try {
    // 마지막 id, len 갯수
    const lastId = parseInt(req.query.lastId) || 0;
    const len = parseInt(req.query.len) || 10;
    let where = "";
    if (lastId) {
      // 0은 false
      where = `WHERE id < ${lastId}`;
      console.log(where)
    }
    const query = `SELECT * FROM ${TABLE.PRODUCT} ${where} order by id desc limit 0, ${len}`;
    
    console.log('q',query);
    const [rows] = await db.execute(query);
    
    return rows;
  } catch (e) {
    console.log(e.message);
    return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
  }
};

const productController = {
  // create
  create: async (req) => {
    const { prd_name, done } = req.body;
    if (isEmpty(prd_name) || isEmpty(done)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }

    try {
      const query = `INSERT INTO PRODUCT (prd_name, done) VALUES (?,?)`;
      const values = [prd_name, done];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format('LT'),
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
  },

  // list
  list: async (req) => {
    // 화살표함수는 es6문법 this접근안됨
    const totalCount = await getTotal();
    const list = await getList(req);
    console.log('list.length'+list.length);

    if (totalCount > 0 && list.length) {
      return resData(
        STATUS.S200.result,
        STATUS.S200.resultDesc,
        moment().format('LT'),
        { totalCount, list }
      );
    } else {
      return resData(STATUS.S201.result, STATUS.S201.resultDesc, moment().format('LT'));
    }
  },

  //update
  update: async (req) => {
    const { id } = req.params; // url /로 들어오는 파라미터
    const { prd_name, done } = req.body;
    if (isEmpty(id) || isEmpty(prd_name) || isEmpty(done)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }

    try {
      const query = `UPDATE ${TABLE.PRODUCT} SET prd_name =?, done=? WHERE id= ?`;
      const values = [prd_name, done, id];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format('LT')
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
    console.log('update')
  },

  //delete
  delete: async (req) => {
    const { id } = req.params; // url /로 들어오는 파라미터
    if (isEmpty(id)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }
    const cnt = await getSelectOne(id);
    try {
      if (!cnt) {
        return resData(
          STATUS.E100.result,
          STATUS.E100.resultDesc,
          moment().format('LT')
        );
      }
      const query = `DELETE FROM ${TABLE.PRODUCT} WHERE id = ?;`;
      const values = [id];
      const [rows] = await db.execute(query, values);
      if (rows.affectedRows == 1) {
        return resData(
          STATUS.S200.result,
          STATUS.S200.resultDesc,
          moment().format('LT')
        );
      }
    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }
    console.log('delete')
    return rows;
  },

  //reset //테이블 내용 삭제
  reset: async (req) => {
    const { prd_name, done } = req.body; // url /로 들어오는 파라미터
    console.log(prd_name,done)
    if (isEmpty(prd_name) || isEmpty(done)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }
    console.log(1)
    try {
      const query = `TRUNCATE TABLE ${TABLE.PRODUCT};`; 
      const values = [prd_name,done];
      const [rows] = await db.execute(query, values);

      if (rows.affectedRows==1) {
        return resData(
          STATUS.E100.result,
          STATUS.E100.resultDesc,
          moment().format('LT')
        );
      }

    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }

  },
  //turncate후 dummy 더미 데이터 추가
  dummy: async (req) => {
    const { prd_name, done, len } = req.body; // url /로 들어오는 파라미터
    console.log(prd_name,done, len)
    if (isEmpty(prd_name) || isEmpty(len) || isEmpty(done)) {
      return resData(STATUS.E100.result, STATUS.E100.resultDesc, moment().format('LT'));
    }
    console.log(1)
    try {
      const query = `TRUNCATE TABLE ${TABLE.PRODUCT};`; 
      const values = [prd_name,done,len];
      const [rows] = await db.execute(query, values);

      if (rows.affectedRows==1) {
        return resData(
          STATUS.E100.result,
          STATUS.E100.resultDesc,
          moment().format('LT')
        );
      }
      console.log(2)
      for(var i=0; i < len; i++) {
        console.log(i)
        const query = `INSERT INTO product (prd_name, done) VALUES (?,?)`;
        const values = [prd_name, done];
        db.execute(query, values);
      }

    } catch (e) {
      console.log(e.message);
      return resData(STATUS.E300.result, STATUS.E300.resultDesc, moment().format('LT'));
    }

},
  
};

module.exports = productController;