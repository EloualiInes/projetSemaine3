checkInputsSignUp = (data) => {
    if(data.firstName !== null && data.firstName !== ''){
        if(data.lastName!== null && data.lastName !== ''){
            if(data.nickName!== null && data.nickName !== ''){
                if(data.email!== null && data.email !== ''){
                    if(data.password!== null && data.password !== ''){
                        return {check : true, err :'' }
                    }else return {check : false, err :'Le champ mot de passe est requis.' }
                }else return {check : false, err :'Le champ email est requis.' }
            }else return {check : false, err :'Le champ nickname est requis.' }
        } else return {check : false, err :'Le champ nom est requis.' }
    }else return {check : false, err :'Le champ prénom est requis.' }
}

checkFormatEmail = (email) =>  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
checkFormatPassword = (password) =>  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/.test(password)

module.exports = {checkInputsSignUp, checkFormatEmail, checkFormatPassword}