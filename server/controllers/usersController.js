const Users = require('../models/schema')
const moment = require('moment')

// user registration
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

// get all user
exports.getAllUser = async(req, res) =>{
    try {
        const data =  await Users.find();
        return res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"error":error});
        console.log(error)
    }
}

// get single user
exports.getSingleUser = async(req, res) =>{
    const _id = req.params.id;
    try {
        const data = await Users.findById({_id});
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);       
    }
}

// delete single user
exports.deleteSingleUser = async(req, res) => {
    const _id = req.params.id;
    try {
        const data = await Users.findByIdAndDelete({_id});
        console.log(data)
        if(!data){
            res.status(404).json({error: "User not found"})
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"erroyy": error});
    }
}

// updateuser

exports.updateuser = async(req, res) =>{
     const id = req.params.id;
     const { fname, lname, email, mobile, gender, location, Status, user_profile } = req.body;
     const file =  req.file ? req.file.filename: user_profile;
     const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
    try {
        const data = await Users.findByIdAndUpdate({_id: id},{
            fname, 
            lname,
            email,
            mobile,
            gender,
            location,
            Status,
            profile: file,
            dateUpdated
        },{
            new: true
        })

        await data.save(); 
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({"Bigerror":error})
    }
}

// search as user types
exports.Search = async(req, res) => {
    try {
        const search  = req.params.search
        console.log(search)
        const data = await Users.find({fname: {
            $regex: `^${search}`,
            $options: 'i'
        }})
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"error":error})
    }
}