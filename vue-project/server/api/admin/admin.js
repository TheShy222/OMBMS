let db = require('../db/index.js')
//获取管理员列表
exports.get=(req,res)=>{
    let sql=`select * from loginInfo`
    db.query(sql,(err,data)=>{
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        code: 1,
        list:data
      })
    })
}