import express from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
//this gives us access to our models we just created in postMessage. 

const router = express.Router();

//here we are going to create all the handlers for our routes.

export const getPosts = async (req,res)=>{

    try {
        //in the try we are going to retrieve all the posts in the database

        const postMessages = await PostMessage.find();
        //finding posts takes time, meaning it is asynchrounous. This makes
        //getPosts an async function.

        res.status(200).json(postMessages);
        //status 200 means everything is okay.
        //returns a json which is an array of all the messages we have.

    } catch (error) {

        res.status(404).json({message: error.message});
        //response status 404. Return an object, which is a message with an error. 

    }

}

//this is an arrow function which has a request and respond.
export const createPost = async (req, res) => {

    const post = req.body;
    //request.body for post requests?
    //don't have a way to send post requests yet. 

    const newPost = new PostMessage(post);
    //here we are passing values we are recieving through the request to body


        try {
            
            await newPost.save(); 
            
            res.status(201).json(newPost);
            //sending the newPost into the json.

        } catch (error) {

            res.status(409).json({message: error.message});
            
        }
}

//so we are creating a function that we can call back in the routes
//so it is not as complicated.

//in order to use it in posts.js in the routers we need to export it.


export const updatePost = async(req, res) => {

    const {id: _id} = req.params;
    //below is the updated post, snet from the front end.
    const post = req.body;

    //extracting id from req.params
        //our patch route is /:id, and if we make a requerst it is going to be something like
        //   /posts/123. Here 123 will be the id
    //renaming our id to _id

    //checking if _id is a mongoose id

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    
    //if id is valid, we update our post through the line below. 
    
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {new: true});
    //const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});
    
    
    //recall that our model is called postmessage.
    //await is needed because this is an asyncrhounous action
    //third paramter allows us to actually recieve the update from the post

    res.json(updatedPost);
    

}

export const deletePost = async (req, res) => {

    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    //checking if id is valid

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted successfully'});


}

export const likePost = async(req,res) => {

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);
    //this will return a post

    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true})
    //this is the post we fetch on line 114

    res.json(updatedPost);

}

export default router;