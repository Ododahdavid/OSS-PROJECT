const mongoose = require('mongoose');

const PageSchema = new mongoose.Schema({
    title: { 
        type: String,
        required: true 
    },
    content: { 
        type: String,
        required: true 
    },
    document: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Document',
        required: true 
    },
    image: {
        src: String,
        public_id: String,
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
    versionHistory: [{
        version: Number,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedAt: { type: Date, default: Date.now },
        changes: String // Description of the changes
    }],
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Middleware to capture version history before updating a page
PageSchema.pre('findOneAndUpdate', async function(next) {
    const page = await this.model.findOne(this.getQuery());

    if (page) {
        const update = this.getUpdate();
        const changes = [];

        // Capture fields that are being updated
        if (update.title && update.title !== page.title) {
            changes.push(`Title updated from "${page.title}" to "${update.title}"`);
        }
        if (update.content && update.content !== page.content) {
            changes.push(`Content updated`);
        }

        // Only add version history if there are actual changes
        if (changes.length > 0) {
            const versionEntry = {
                version: page.versionHistory.length + 1,
                updatedBy: update.updatedBy, // Ensure updatedBy is passed in the update data
                updatedAt: new Date(),
                changes: changes.join('; ')
            };

            // Add the version entry to versionHistory
            this.findOneAndUpdate({}, {
                $push: { versionHistory: versionEntry },
                $set: { updatedAt: new Date() }
            });
        }
    }
    next();
});

module.exports = mongoose.model('Page', PageSchema);
