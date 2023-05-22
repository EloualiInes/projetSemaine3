const User = require('../models/user.models');
const {checkInputsSignUp, checkFormatEmail, checkFormatPassword} = require('../utils/user.utils')
const {trimObjectValues} = require('../utils/utils')
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = 'piti&chat!';

// Register
signup = async (req, res) => {
    
    // use trim
    const dataTrim = trimObjectValues(req.body);
    const checkInput = checkInputsSignUp(dataTrim);
    console.log("checkInput : ", checkInput)
    // Checks inputs not null and not empty
    if(!checkInput.check){
        res.status(400).json({ error: checkInput.err });
        return;
    }
    // Checks format email
    if(checkFormatEmail(dataTrim.email)){
        res.status(400).json({ error: "Veuillez écire un email valide" });
        return;
    }

    // Checks format password
    if(checkFormatPassword(dataTrim.password)){
        res.status(400).json({ error: "Veuillez écire un pseudo valide avec au moins 5 caractères, une minuscule, une majuscule et un chiffre " });
        return;
    }
   
    const hash = await bcrypt.hash(dataTrim.password, saltRounds);
    console.log(hash);
    const data = {
        firstName: dataTrim.firsName,
        lastName: dataTrim.lastName,
        nickName: dataTrim.nickName,
        email: dataTrim.email,
        password: hash,
        creationDate: new Date()
    }

    let user = new User(data);
    const result = await user.save();
    console.log(result);
    res.json({status:200, data: {result}});
    
}

// Login



module.exports = {signup}