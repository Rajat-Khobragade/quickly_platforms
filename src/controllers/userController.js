const {Parser} = require('json2csv');
const fs = require('fs');
const userModel = require('../models/userModel');

const register = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({ message: "All fields are required" })
        }
        const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/
        const emailValidation = emailRegex.test(email);
        if (!emailValidation) {
            return res.status(400).send({ message: "Invalid email format" });
        }
        const existingUser = await userModel.findOne({ email: email });

        if (existingUser) {
            return res.status(400).send({ message: `${email} Email already registerd,please login` });
        }
        const user = await userModel.create({email:email, password:password});
        return res.status(201).send({ message: "User Created Successfully", data: user });

    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ message: "All fields are required" });
        }
        const existingUser = await userModel.findOne({ email: email });

        if (!existingUser) {
            return res.status(400).send({ message: `${email} email Not found` });
        }
        const validPassword = existingUser.password;

        if(validPassword!=password){
            return res.status(400).send({ message: "Invalid credentials" });
        }
        return res.status(200).send({ message: "User Login Successfully" });
    }
    catch (error) {
        return res.status(500).send({ message: "Internal Server Error", error: error.message });
    }

}


const downloadCsvFile = async(req,res)=>{
try{
    const userData = await fetch('https://jsonplaceholder.typicode.com/users')
    const json = await userData.json();
    const fields = [
        "id",
        "name",
        "username",
        "email",
        "phone",
        "website",
    ];
    const json2csvParser  = new Parser({fields});
    const csv = json2csvParser.parse(json);
    fs.writeFile('usersData.csv',csv,function(error){
        if(error){
            return res.status(400).send({ message: error.message });
        }
        res.attachment("UserData.csv")
        res.status(200).send(csv);
    })

}catch(error){
    return res.status(500).send({ message: "Internal Server Error", error: error.message });
}
}

function test(req,res){
    res.status(200).send({message:"Success"})
}

module.exports={
    register,
    login,
    downloadCsvFile,
    test
}