import { Router } from "express";
import { getUser } from "./controller/getUser.js";
import { changePassword } from "./controller/changePassword.js";
import { changeEmail } from "./controller/changeEmail.js";
import { userEndPoint } from "./user.endPoint.js";
import { getAllUsers } from "./controller/getAllUsers.js";
import { auth } from "../../middleware/auth.js";
import { logout } from "./controller/logout.js";
import { updatePersonalInfo } from "./controller/updatePersonalInfo.js";
import { fileUpload, filesValidation } from "../../utils/multer.js";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"User Module"})
})

router.get('/getUser/:id',auth(userEndPoint.getUser),getUser)
router.get('/getAllUsers',auth(userEndPoint.getAllUser),getAllUsers)
router.patch('/changePassword',auth(userEndPoint.update),changePassword)
router.patch('/changeEmail',auth(userEndPoint.update),changeEmail)
router.patch('/logout',auth(userEndPoint.update),logout)
router.put('/updateInfo',auth(userEndPoint.update) ,fileUpload(filesValidation.image).single('image'),updatePersonalInfo)



export default router