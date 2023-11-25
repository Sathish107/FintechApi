const router=require('express').Router();
const {getBills,postBills,putBills,deleteBills}=require('../controllers/billControllers')
const protect=require('../middleware/authMiddleware')

router.route('/').get(protect,getBills).post(protect,postBills)
router.route('/:id').put(protect,putBills).delete(protect,deleteBills)

module.exports=router