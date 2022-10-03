import express from 'express';

import { signup, login, isAuth } from '../controllers/auth.js';

import {sendFriends, findUser, sendReq, sendFriendsRequest} from '../controllers/UsersCommunicate.js';

//import {testReq} from "../controllers/UsersCommunicate.js";

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

router.get('/')

router.post('/getFriends', sendFriends);

router.post('/getFriendsRequest', sendFriendsRequest);

router.post('/acceptFriendsRequest', acceptFriendsRequest);

router.post('/findFriend',findUser);

router.post('/sendRequest' , sendReq);

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;
