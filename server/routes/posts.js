import express from 'express';

import {getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/posts.js'
//be sure to import "posts.js". In react we don't need to do this
//but in node we do. 

const router = express.Router();


//this route inside of posts is not reached by going to localhost:5000/
//but localhost:5000/posts
//this is because we added the prefix of posts to all the routes in here.

//because of line 3, instead of the code below we can just simply use the function.

/*
router.get('/', (req,res)=>{

    res.send('THIS WORKS!'); 

});

*/

router.get('/', getPosts);
//the post route runs the createPost function imported from the implementation in
//controllers
router.post('/', createPost);

//see separating the routes and contollers will allow us to create routes
//that are more clean using an external function in controllers. 


//the callback function runs which is request and response which executes
//when the user visits the route

router.patch('/:id', updatePost)
//patch is used for updating existing documents

//creating route for delete button for the backend
router.delete('/:id', deletePost);

//creating route for like
router.patch('/:id/likePost', likePost);
//it is a patch request because it is updating the number of likes the post has

export default router;