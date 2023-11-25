const router=require('express').Router()
const {registerUser,loginUser,getUser}=require('../controllers/userControllers')
const protect=require('../middleware/authMiddleware')

router.route('/').post(registerUser)
router.route('/login').post(loginUser)
router.route('/getme').get(protect,getUser)

module.exports=router