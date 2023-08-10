const Users = require('../models/schema')
const moment = require('moment')
const csv = require('fast-csv');
const fs = require('fs');
const users = require('../models/schema');

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
    const search = req.query.search || "";
    const gender = req.query.gender || "";
    const status = req.query.status || "";
    const order  = req.query.order  || "";
    const page   = Number(req.query.page)   || 1;
    
    // 2  ---> no. of page -1 * no. of documents
    const query = { 
        fname: {$regex:search, $options: "i"}
    }
    if(gender !== "All"){
        query.gender = gender
    }
    if(status !== "All"){
        query.Status = status
    }
    
    let limit = 4;
    let skip = (page - 1) * limit;

    try {
        let count = await Users.countDocuments(query);
        const Userdata =  await Users.find(query).sort({dateCreated: order === 'new'? -1: 1}).skip(skip).limit(limit);
        let pageCount = Math.ceil(count / limit) //no. of documents / no. of doc per page ++> to find total no of pages
        return res.status(200).json({pagination:{
            count, pageCount
        },Userdata});
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
        const data = await Users.find({fname: {
            $regex: `^${search}`,
            $options: 'i'
        }})
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({"error":error})
    }
}

exports.updatestatus = async(req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    try { 
        const response = await Users.findByIdAndUpdate({_id: id}, {Status: data},{new: true})
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error  );
    }
}

exports.userExport = async(req, res) => {
    try {
        const Usersdata = await Users.find({}); 
        const csvStream = csv.format({headers:true});

        if(!fs.existsSync("public/files/export")){
            if(!fs.existsSync("public/files")){
                fs.mkdirSync("public/files/")
            }
            if(!fs.existsSync("public/files/export")){
                fs.mkdirSync("public/files/export")
            }
        }
        
        const writableStream = fs.createWriteStream(
            "public/files/export/users.csv"
        )

        csvStream.pipe(writableStream);

        writableStream.on("finish", function(){
            res.json({
                downloadUrl: `http://localhost:5000/files/export/users.csv`
            })
        })

        if(Usersdata.length > 0 ){
            Usersdata.map((users) => {
                csvStream.write({
                    FirstName: users.fname ? users.fname : "-",
                    LastName: users.lname ? users.lname : '-',
                    Email: users.email ? users.email : '-',
                    Phone: users.mobile ? users.mobile : '-',
                    Gender: users.gender ? users.gender : '-',
                    Status: users.Status ? users.Status : '-',
                    Profile: users.profile ? users.profile : '-',
                    Location: users.location ? users.location : '-',
                    DateCreated: users.dateCreated ? users.dateCreated : '-',
                    DateUpdated: users.dateUpdated ? users.dateUpdated : '-',
                })
            })
        }

        csvStream.end();
        writableStream.end();

    } catch (error) {
        res.status(500).json(error);
    }
}