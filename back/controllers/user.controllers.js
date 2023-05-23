const User = require('../models/user.models');
const { 
    allCheck,
} = require('../utils/user.utils')
const {trimObjectValues} = require('../utils/utils')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require('jsonwebtoken');


// Register
signup = async (req, res) => {
    
    // use trim
    const dataTrim = trimObjectValues(req.body);

    // Checks inputs not null and not empty
    const checks = allCheck(false, dataTrim)
    if(!checks.checks){
        res.status(400).json({ error: checks.error });
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
login = async (req, res) => {
    const dataTrim = trimObjectValues(req.body);

    // Checks inputs are not null or empty
    const checks = allCheck(true, dataTrim)
    if(!checks.checks){
        res.status(400).json({ error: checks.error });
        return;
    }
    
    // Check that the email exists
    const user = await User.find({
        email: { $regex: new RegExp('^' + dataTrim.email, 'i') }
    });

    console.log("user  : ", user)
    if(user.length === 0){
        res.status(404).json({ error: "L'e-mail saisi n'a pas été trouvé dans notre système. Veuillez vérifier votre e-mail ou créer un nouveau compte."});
        return;
    }
    // Check password
    const compared = await bcrypt.compare(dataTrim.password, user[0].password);
    if(!compared) {
        console.log("here")
        res.status(404).json({ error: "Mot de passe incorrect. Veuillez réessayer."});
        return;
    } 

    // Create Token
    const payload = {email: dataTrim.email, id: user[0]._id};
    const token = jwt.sign(payload, process.env.SECRET);
    const infoUser = {...user[0]}
    delete infoUser.password;
    res.json({status:200, data: {token, user: infoUser}});

}



module.exports = {signup, login}