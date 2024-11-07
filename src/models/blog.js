"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
/*------------------------------------------------------- */


// mongoose 
const mongoose = require('mongoose');

// const SchemaName = new mongoose.Schema({ ...fields}, {...settings})

/*------------------------------------------------------- *

const SchemaName = new mongoose.Schema({

    // _id: ObjectId // hexadecimal format id

    fieldName: {
        type: Number,
        default: null, // if value not send
        trim: true,
        unique: true,
        // required: true
        required: [true, 'This required fieldname'],
        index: true, // to access data faster
        // enum: [1, 2, 3]
        // enum: ["1", "2", "3"],
        enum: [["1", "2", "3"], 'This is enum error msg'],
        // validate: (data) => true
        validate: [
            (data) => { return true },
            'This is validate error msg'
        ],
        get: (data) => data, // auto runs - to get the data from db
        set: (data) => data // auto runs - to save the data to db
    },

    fieldName: String // shorthand

}, {
    collection: 'tableName',
    timestamps: true
})

/*------------------------------------------------------- */

// Blog Category Schema
const BlogCategorySchema = new mongoose.Schema({

    // _id

    name: {
        type: String,
        trim: true,
        required: true
    }

}, {
    collection: 'BlogCategories', // Table name
    timestamps: true // creates -> createdAt & updatedAt
})

// const BlogCategory = mongoose.model('BlogCategory', BlogCategorySchema)

// Blog Post Schema

const BlogPostSchema = new mongoose.Schema({

    categoryId: { // Default relation is ManyToOne
        ref: "BlogCategory", // referncing it where this field comes.
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        // unique: true // Convert to OneToOne relation
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        trim: true,
        required: true
    },

    content: {
        type: String,
        trim: true,
        // required: true
        required: [true, 'Content is required!']
    },

    published: {
        type: Boolean,
        default: true
    }

    // updatedAt
    // createdAt

}, {
    collection: 'BlogPosts', // Table name
    timestamps: true // creates -> createdAt & updatedAt
})

// const BlogPost = mongoose.model('BlogPost', BlogPostSchema)

// module.exports = { BlogCategory, BlogPost }

module.exports = {
    BlogCategory: mongoose.model('BlogCategory', BlogCategorySchema),
    BlogPost: mongoose.model('BlogPost', BlogPostSchema)
}
