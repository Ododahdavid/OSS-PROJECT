const mongoose = require ('mongoose')
const documentSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Enter a title']
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User',
        required:[true,'Enter an author']
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:[true,'Enter a project']
    },
    isDraft:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    }
})
const Document= mongoose.model('Document',documentSchema)
module.exports = Document