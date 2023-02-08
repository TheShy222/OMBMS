let express = require('express')
let router = express.Router()
const multer = require('multer')
const storage = multer.diskStorage({
	destination(req, res, cb) {
		cb(null, './public/uploads')//上传的地址
	},
	filename(req, file, cb) {
		cb(null, Date.now() + '.jpg')//定义上传文件的名称
	}
})
//登录模块
let login = require('./api/login/login.js')
router.post('/login', login.post)

let userLogin = require('./api/login/userlogin.js')
router.post('/userLogin', userLogin.post)
//用户模块
let user = require('./api/user/user.js')
router.get('/usersInfo', user.get)

let addUser = require('./api/user/addUser.js')
router.post('/addUser', addUser.post)

let editUser = require('./api/user/editUser.js')
router.post('/editUser', editUser.post)
//管理员模块
let admin = require('./api/admin/admin.js')
router.get('/adminsInfo', admin.get)

let addAdmin = require('./api/admin/addAdmin.js')
let uploadAddHeadimg = multer({ storage }).single('headimg')
router.post('/addAdmin', uploadAddHeadimg, addAdmin.post)

let deleAdmin = require('./api/admin/deleAdmin.js')
router.get('/deleAdmin', deleAdmin.get)

let changePass = require('./api/admin/changePass.js')
router.post('/changePass', changePass.post)

let editAdmin = require('./api/admin/editAdmin.js')
let uploadEditHeadimg = multer({ storage }).single('headimg')
router.post('/editAdmin', uploadEditHeadimg, editAdmin.post)

//商品模块
let goodsInfo = require('./api/goods/goodsInfo.js')
router.get('/goodsInfo', goodsInfo.get)

let getGoodsById = require('./api/goods/getGoodsById.js')
router.get('/getGoodsById', getGoodsById.get)

let goodsType = require('./api/goods/goodsType.js')
router.get('/goodsType', goodsType.get)

let addGoodsType = require('./api/goods/addGoodsType.js')
let uploadAddSample = multer({ storage }).single('sample')
router.post('/addGoodsType', uploadAddSample, addGoodsType.post)

let editGoodsType = require('./api/goods/editGoodsType.js')
let uploadEditSample = multer({ storage }).single('sample')
router.post('/editGoodsType', uploadEditSample, editGoodsType.post)

let deleteGoodsType = require('./api/goods/deleteGoodsType.js')
router.get('/deleteGoodsType', deleteGoodsType.get)

let goodsBrandType = require('./api/goods/goodsBrandType.js')
router.get('/goodsBrandType', goodsBrandType.get)

let goodsShow = require('./api/goods/goodsShow.js')
router.get('/goodsShow', goodsShow.get)

let goodsSizeType = require('./api/goods/goodsSizeType.js')
router.get('/goodsSizeType', goodsSizeType.get)

let addGoods = require('./api/goods/addGoods.js')
let uploadAddPicture = multer({ storage }).single('picture')
router.post('/addGoods', uploadAddPicture, addGoods.post)

let deleteGoods = require('./api/goods/deleteGoods.js')
router.get('/deleteGoods', deleteGoods.get)

let batchDeleteGoods = require('./api/goods/batchDeleteGoods.js')
router.get('/batchDeleteGoods', batchDeleteGoods.get)

let editGoods = require('./api/goods/editGoods.js')
let uploadEditPicture = multer({ storage }).single('picture')
router.post('/editGoods', uploadEditPicture, editGoods.post)
//订单模块
let issueOrder = require('./api/order/issueOrder.js')
router.get('/issueOrder', issueOrder.get)

let addIssueOrder = require('./api/order/addIssueOrder.js')
router.post('/addIssueOrder', addIssueOrder.post)

let getIssueOrderState = require('./api/order/getIssueOrderState.js')
router.get('/getIssueOrderState', getIssueOrderState.get)

let issueOrderStateChange = require('./api/order/issueOrderStateChange.js')
router.post('/issueOrderStateChange', issueOrderStateChange.post)

let editIssueOrder = require('./api/order/editIssueOrder.js')
router.post('/editIssueOrder', editIssueOrder.post)

let goodsNumberChange = require('./api/order/goodsNumberChange.js')
router.post('/goodsNumberChange', goodsNumberChange.post)

let getExpressType = require('./api/order/expressType.js')
router.get('/getExpressType', getExpressType.get)


let deleteOrder = require('./api/order/deleteOrder.js')
router.get('/deleteOrder', deleteOrder.get)

let getOrderByOrderNumber = require('./api/order/getOrderByOrderNumber.js')
router.get('/issueOrderByOrderNumber', getOrderByOrderNumber.get)

let orderSuccess = require('./api/order/orderSuccess.js')
router.get('/orderSuccess', orderSuccess.get)

let shippedOrder = require('./api/order/shippedOrder.js')
router.get('/shippedOrder', shippedOrder.get)
//轮播模块
let getCarousel = require('./api/carousel/carousel.js')
router.get('/getCarousel', getCarousel.get)

let addCarousel = require('./api/carousel/addCarousel.js')
let uploadAddUrl = multer({ storage }).single('url')
router.post('/addCarousel', uploadAddUrl,addCarousel.post)

let deleteCarousel = require('./api/carousel/deleteCarousel.js')
router.get('/deleteCarousel', deleteCarousel.get)

let editCarousel = require('./api/carousel/editCarousel.js')
let uploadEditUrl = multer({ storage }).single('url')
router.post('/editCarousel', uploadEditUrl,editCarousel.post)
//推荐模块
let getRecommend = require('./api/recommend/recommend.js')
router.get('/getRecommend', getRecommend.get)
//公告模块
let addFile = require('./api/notice/addFile.js')
router.post('/addFile',addFile.post)
//供应商模块
let getSupplier = require('./api/supplier/supplier.js')
router.get('/getSupplier',getSupplier.get)

let addSupplier = require('./api/supplier/addSupplier.js')
router.post('/addSupplier',addSupplier.post)

let deleteSupplier = require('./api/supplier/deleteSupplier.js')
router.delete('/deleteSupplier',deleteSupplier.delete)

let editSupplier = require('./api/supplier/editSupplier.js')
router.put('/editSupplier',editSupplier.put)
module.exports = router