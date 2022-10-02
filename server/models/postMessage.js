import mongoose from 'mongoose';
//import stripTrailingSlashes from 'tar/lib/strip-trailing-slashes';

//using mongoose to create a model for our posts. 
//create a mongoose schema

//basically using mongoose we can specify that each post will need to have
//each of these things. 
const postSchema = mongoose.Schema({

    title: String,
    message: String,
    creator: String,
    tags: [String],
    
    //the tags are an array of strings.

    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },

    //the like count will be an object, and inside the type is number
    //with additional information


    createdAt: {

        type: Date,
        default: new Date()

    },

});

const PostMessage = mongoose.model('PostMessage', postSchema);
//turning the schema into a model, which provides the interface for the 
//database to basically CRUD

export default PostMessage;
//exporting amongoose model from the postMesasge File
