const fs = require("fs");//라이브러리 불러옴
const path = require("path");


module.exports = function (root, app) {
  // /api
  const dir = fs.readdirSync(path.join(__dirname, root), {
    withFileTypes: true, // withFileTypes: 파일이 fs.Dirent 객체로 반환되는지 여부를 지정하는 부울 값입니다. 기본값은 '거짓'입니다.
  });
	//console.log('dir',dir);

  dir.forEach((p) => {//폴더명
		console.log(`p.name : .${root}/${p.name}`);
    if (p.isDirectory()) {
      // /api
      if (p.name != "_controller") { //controller가 아니면 재귀함수 타고 else이동후 app.use()적용 (라우터)
        arguments.callee(`${root}/${p.name}`, app); //재귀함수 /api/product, app
      }
    } else {
      let moduleName = '/'+ p.name.replace(/\.js/g, "");
      console.log(`moduleName: ${moduleName}`)
      if(moduleName == '/index'){
        moduleName="";
      }
			console.log(`p.name : ${root}${moduleName}`,`.${root}/${p.name}`);
      app.use(`${root}${moduleName}`, require(`.${root}/${p.name}`));
    }
  });
};