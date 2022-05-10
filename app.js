const express = require("express");
//当文件名是index时就不用再写

const router = require("./router/index");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const expressSession = require("express-session");
const app = express();

//引入数据库
mongoose.connect("mongodb://localhost/wedding");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
    console.log("已经连接数据库");
});
//配置静态资源目录
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use("/tools", express.static(path.join(__dirname, "tools")));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/router", express.static(path.join(__dirname, "router")));

//配置atr-template引擎
app.engine("html", require("express-art-template"));

//挂载body-parser 的中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//配置session
app.use(
    expressSession({
        name: "healer",
        secret: "secret",
        cookie: {
            maxAge: 1000 * 60 * 3,
        },
        resave: false,
        rolling: true,
        saveUninitialized: false,
    })
);
// app.use((req, res, next) => {
//   var path = req.path;
//   //用户是否已登录
//   var user = req.session.user;
//   //登录了   登录和注册页面不能访问
//   if (user) {
//     if (path.startsWith("/login") || path.startsWith("/register")) {
//       res.redirect("/index");
//     } else {
//       next();
//     }
//   }
//   //没有登录   topic/new  和 setting开头的路径不能访问
//   else {
//     if (path.startsWith("/topic/new") || path.startsWith("/settings")) {
//       res.redirect("/login");
//     } else {
//       next();
//     }
//   }
// });
//要写在body配置的后面
//挂载路由
app.use(router);


//配置全局错误处理

// 注意：404和500的错误处理中间件需要放在app.use(router)之后
// 配置一个处理 404 的中间件
//访问路径不存在的时候
app.get("*", function(req, res) {
    res.render("404.html", {
        title: "您要找的页面不存在",
    });
});

// 配置一个全局错误处理中间件
app.use((err, req, res, next) => {
    res.json({
        code: 2002,
        message: err.message,
    });
});
app.listen(3000, () => {
    console.log("3000端口已启用");
});