const ValidationService = {
    validatePassword(password){
        if(password.length === 0){
            return 'Password is required'
        }
        else if(password.length < 3 || password.length > 50){
            return 'Password must be between 3 and 50 characters'
        } else if(!password.match(/[0-9]/)){
            return 'Password must contain at least one number'
        } else {
            return null
        }
    },
    validateEmail(email){
        if(email.length < 4 || email.length > 40){
            return 'Email must be between 4 and 40 characters'  
        } else {
            return null
        }
    }

}


export default ValidationService