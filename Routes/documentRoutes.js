const express=require('express')
const docController=require('../Controller/documentPostController')
const authController=require('../Controller/authController')
const upload=require('../middleware/uploadMiddleware')
const router=express.Router()

 // Protect all routes below this line
router.use(authController.protect);
router
.route('/')
.get(docController.getAllDocuments)
router.post(
    '/documents',
    authController.protect,
    upload.single('image'), // Add middleware for single file upload with field name 'image'
    docController.createDocument
);

router
.route('/Documents/:id')
.get(docController.getDocument)
.patch(authController.restrictTo('admin'),docController.updateDocument)
.delete(authController.restrictTo('admin'),docController.deleteDocument);
module.exports=router