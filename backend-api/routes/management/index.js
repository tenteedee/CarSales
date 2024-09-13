import express from "express";
import managementAuthRouter from "./Auth.js"
const router = express.Router();
router.get("/",(req,res) => {
    res.send("worked management api");
});
router.use('/auth', managementAuthRouter);


export default router;