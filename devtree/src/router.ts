import { Router } from "express";

const router = Router();

/** Auth and registration */
router.post('/auth/register', (req, res) => {
    console.log('Auth endpoint hit');
    console.log('Request body:', req.body);
    res.send('Auth endpoint');
});

export default router;