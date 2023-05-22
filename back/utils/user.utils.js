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

checkInputsLogin = (data) => {
    if(data.email!== null && data.email !== ''){
        if(data.password!== null && data.password !== ''){
            return {check : true, err :'' }
        }else return {check : false, err :'Le champ mot de passe est requis.' }
    }else return {check : false, err :'Le champ email est requis.' }
}

checkFormatEmail = (email) =>  /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
checkFormatPassword = (password) =>  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{5,15}$/.test(password)

allCheck = (login, data) => {
    const checkInput = login ? checkInputsLogin(data) : checkInputsSignUp(data)
     // Checks inputs not null and not empty
     if(!checkInput.check)
        return { checks: false, error: checkInput.err };

    // Checks format email
    if(!checkFormatEmail(data.email)) 
        return { checks: false, error: "Veuillez écire un email valide" };

    // Checks format password
    if(!checkFormatPassword(data.password))
        return { checks: false, error: "Veuillez écire un mot de passe valide avec au moins 5 caractères, une minuscule, une majuscule, un chiffre et un caractère spécial  " };
    
    return {checks : true};
}
module.exports = {checkInputsSignUp, allCheck}