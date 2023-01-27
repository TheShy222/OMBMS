let db = require('../db/index.js')
exports.post = (req, res) => {
    let id=req.body.formData.id
    let name=req.body.formData.name
    let pass=req.body.formData.password
    let headimg=req.body.formData.headimg
    let sql=`insert into loginInfo values ('${name}','${pass}','${headimg}',${id})`
    db.query(sql,(err,data)=>{
      if (err) {
        return res.send('错误：' + err.message)
      }else{
        res.send({
          code: 1,
          msg: "添加数据成功"
        })
      }
    })
}