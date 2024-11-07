const express=require('express')
const docController=require('../Controller/documentPostController')
const authController=require('../Controller/authController')
const router=express.Router()

 // Protect all routes below this line
router.use(authController.protect);
router
.route('/')
.get(docController.getAllDocuments)
.post(docController.createDocument);

router
.route('/Documents/:id')
.get(docController.getDocument)
.patch(authController.restrictTo('admin'),docController.updateDocument)
.delete(authController.restrictTo('admin'),docController.deleteDocument);
module.exports=router