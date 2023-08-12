import express from "express";
const router =express.Router();
import UserController from "../controller/userControl.mjs";
import checkUserAuth from "../middlewares/auth-middleware.mjs";

//Route Level Middleware -To protect Route
router.use('/changepassword',checkUserAuth)
router.use('/loggeduser',checkUserAuth)
//Public Routes
router.post('/register',UserController.userRegistration);
router.post('/login',UserController.UserLogin);
router.post('/send-reset-password-email', UserController.sendUserPasswordResetEmail)
router.post('/reset-password/:id/:token', UserController.userPasswordReset)

//protect Routes
router.post('/changepassword',UserController.UserchangePassword)
router.get('/loggeduser',UserController.loggeduser);
export default router;
