//제품 curd

const config = require('./config')[process.env.NODE_ENV]; //./config에 있는 development설정으로 구동 
const express = require('express'); //express moduleimoprt 
const http = require('http');

const app = express();
const port = config.PORT;
const cors = require('cors');

//body parser
app.use(express.json());
app.use(express.urlencoded({extended : true }));

//cors
let corsOptions = {
	origin: '*', // 출처 허용 옵션
	credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(cors(corsOptions));

//autoRouter
const autoRoute = require('./autoRoute');
autoRoute('/api',app);

//server
const webServer = http.createServer(app);
webServer.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})