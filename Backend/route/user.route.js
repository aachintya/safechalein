import express from "express"
import {Signup} from "../controller/user.controller.js"
import { login } from "../controller/user.controller.js"
const router=express.Router()

router.post("/Signup",Signup)
router.post("/login",login)

export default router;