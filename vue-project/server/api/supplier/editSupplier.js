let db = require('../db/index.js')
//获取供应商列表
exports.put=(req,res)=>{
    let id=req.body.supplier.supplierid
    let name=req.body.supplier.name
    let phoneNumber=req.body.supplier.phoneNumber
    let address=req.body.supplier.address
    let mainbusiness=req.body.supplier.mainbusiness
    let ltt=req.body.supplier.ltt
    ltt=ltt.slice(0,10)
    let sql=`update supplier set name='${name}',phoneNumber='${phoneNumber}',address='${address}',mainbusiness='${mainbusiness}',ltt='${ltt}' where supplierid=${id}`
    db.query(sql,(err,data)=>{
      if (err) {
        return res.send('错误：' + err.message)
      }
      res.send({
        code: 1,
        msg:'success'
      })
    })
}