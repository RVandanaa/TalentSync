const express=require("express");

const router=express.Router();

const{

registerStudent,

registerCompany,

login

}=require("../controllers/auth.controller");

router.post(
"/student/register",
registerStudent
);

router.post(
"/company/register",
registerCompany
);

router.post(
"/login",
login
);

module.exports=router;