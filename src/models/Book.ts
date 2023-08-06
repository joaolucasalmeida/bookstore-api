import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    isbn: {
        type: String,
        unique: true,
        trim: true
    },
    publishedDate: {
        type: Date
    },
    pages: {
        type: Number,
        min: 1
    },
    genre: {
        type: String,
        enum: ['Fiction', 'Non-Fiction', 'Fantasy', 'Sci-Fi', 'Mystery', 'Biography', 'History', 'Other'],
        default: 'Other'
    },
    rentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
}, {
    timestamps: true 
});

export const Book = mongoose.model('Book', bookSchema);

