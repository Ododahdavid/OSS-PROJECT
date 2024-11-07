const mongoose=require ('mongoose')
const PageSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true },
    content: { type: String,
                required: true },
    document: { type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true },
    author: { type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
    versionHistory: [{
        version: Number,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedAt: Date,
        changes: String // Description of changes
    }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model('Page',PageSchema);