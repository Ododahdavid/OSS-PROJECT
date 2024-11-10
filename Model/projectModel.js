const mongoose = require('mongoose');

const projectSchema=mongoose.Schema({
    title:{
        type:String,
        required:[true,'Enter your project title']
    },
    description:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        // required:[true,'Enter your project owner']
    },
    visibility:{
        type:String,
        enum:['public', 'private'],
        default:'public'
    },
    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
    }],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    tags:[String]
})
projectSchema.index({title:'text',tags:'text'})
const Project=mongoose.model('Project',projectSchema)
module.exports = Project