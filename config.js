const production = {//db 접근 설정
    PORT :3000,
    DB:{
        host:"localhost",
        user:'root',
        database:'product',
        password:'root',
        port:"3306",
        connectionLimit:20,
        connectTimeout: 5000,
    },
}
const development = {
    PORT :4000,
    DB:{
        host:"localhost",
        user:'root',
        database:'product',
        password:'root',
        port:"3306",
        connectionLimit:20,
        connectTimeout: 5000,
    },
}

module.exports = { production, development}