import express from 'express';

import { signup, login, isAuth } from '../controllers/auth.js';

import {sendUsers} from '../controllers/UsersCommunicate.js';

import {testReq} from "../controllers/UsersCommunicate.js";

const router = express.Router();

router.post('/login', login);

router.post('/signup', signup);

router.get('/private', isAuth);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

router.get('/test', testReq);

router.get('/getFriends', sendUsers);

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

export default router;
