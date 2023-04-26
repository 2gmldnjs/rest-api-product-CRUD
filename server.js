//제품 curd
//모든 플러그인은 app.use()로 설치해 사용한다. 


const config = require('./config').development; //./config에 있는 development설정으로 구동 
const express = require('express'); //express moduleimoprt 
const http = require('http'); //http 프로토콜  사용

const app = express();
const port = config.PORT; //devlep안에 port 사용
const cors = require('cors'); //netword 접근 허용

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
const autoRoute = require('./autoRoute');//router
autoRoute('/api',app);

//server
const webServer = http.createServer(app);
webServer.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})