const Users = require('../models/schema')
const moment = require('moment')

exports.userpost = async(req, res) =>{
    const file = req.file.filename;
    const { fname, lname, email, mobile, gender, location, Status } = req.body;

    if (!fname || !lname || !email || !mobile || !gender || !location || !Status){
        res.status(401).json({error: "please fill all the details"})
    }

    try {
        const Epreuser = await Users.findOne({email});
        const Mpreuser = await Users.findOne({mobile});
        if(Epreuser || Mpreuser){
            res.status(401).json({error:"This email or phone is already with us! please login"});
        }else{
            const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            const userData = new Users({
                fname, 
                lname, 
                email, 
                mobile, 
                gender, 
                location, 
                Status,
                profile: file,
                dateCreated 
            })

            userData.save()
            res.status(200).json(userData);

        }
    } catch (error) {
        res.status(500).json({"error":error})
        console.log("catch block error")
    }
}

exports.getAllUser = async(req, res) =>{
    try {
        const data =  await Users.find();
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"error":error});
        console.log(error)
    }
}