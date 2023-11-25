const router=require('express').Router();
const {getLoans,postLoans,putLoans,deleteLoans}=require('../controllers/loanControllers')
const protect=require('../middleware/authMiddleware')

router.route("/").get(protect,getLoans).post(protect,postLoans)
router.route("/:id").put(protect,putLoans).delete(protect,deleteLoans)

module.exports=router