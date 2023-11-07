import { Router } from "express";
const router = Router()
import {signup} from './controller/signup.js'
import {login} from './controller/login.js'
import { asyncErrorHandler } from "../../utils/errorHandling.js";
import { forgetPassword } from "./controller/forgetPassword.js";
import { resetPassword } from "./controller/resetPassword.js";
import { confirm } from "./controller/confirm.js";
import { generateConfirmation } from "./controller/generateConfirmation.js";


router.post('/signup',asyncErrorHandler(signup))
router.post('/login',asyncErrorHandler(login))
// router.post('/forget-password',asyncErrorHandler(forgetPassword))
// router.post('/reset-password',asyncErrorHandler(resetPassword))



router.post('/confirm',confirm)
router.post('/reset-password',confirm)
router.post('/changeEmail/confirm',confirm)
router.post('/newConfirm',generateConfirmation)
router.post('/forget-password',generateConfirmation)
router.post('/unsubscribe',generateConfirmation)

export default router