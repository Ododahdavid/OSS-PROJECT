const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter a title']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Enter an author']
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: [true, 'Enter a project']
    },
    content: [
        {
            type: {
                type: String,
                enum: ['h1', 'h2', 'h3', 'p'], // Allowed types of content blocks
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    ],
    isDraft: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Document', documentSchema);
