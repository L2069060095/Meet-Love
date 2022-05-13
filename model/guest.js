const mongoose = require("mongoose");

const guestScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, '姓名不能为空']
    },
    identity: {
        type: String,
        required: [true, '身份不能为空'],
    },
    guest: {
        type: String,
        required: [true, "参加人数不能为空"]
    },
    message: {
        type: String,
        required: [true, "祝福不能为空"]
    },
    // 头像
    avatar: {
        type: String,
        default: '../public/img/222.jpg'
    },
})

const Guest = new mongoose.model("guest", guestScheme, "guest")
module.exports = Guest;