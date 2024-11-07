const User =require('../Model/userModel')
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')

// @desc Get all users
exports.getAllUsers=catchAsync(async(req,res,next)=>{
    const users=await User.find()
    res.status(200).json({
        status:'success',
        results:users.length,
        data:users
    })
})

// @desc Get single user
exports.getOneUser=catchAsync(async(req,res,next)=>{
    const users=await User.findById(req.params)
    if(!users){
        return next(new AppError('No user found with that ID',404))
    }
    res.status(200).json({
        status:'success',
        data:users
    })
})
//@desc Update User
exports.updateMe = catchAsync(async (req, res, next) => {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        });
        if (!user) {
        return next(new AppError('User not found', 404));
        }
        res.status(200).json({
        status: 'success',
        data: user,
        });
});
//@desc delete user
exports.deleteUser=catchAsync(async(req,res,next)=>{
    const user=await User.findByIdAndDelete(req.params.id)
    if(!user){
        return next(new AppError('No user found with that ID',404))
    }
    res.status(204).json({
        status:'success',
        data:null
    })
})