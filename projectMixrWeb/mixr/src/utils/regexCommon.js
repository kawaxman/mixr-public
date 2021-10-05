export function isValidPassword(password){
    const matchNumber = password.match(/[0-9]+/)
    const matchUpper = password.match(/[A-Z]+/)
    const matchLower = password.match(/[a-z]+/)
    const matchSpace = password.match(/\s+/)
    if(matchNumber && matchUpper && matchLower && !matchSpace){
        return true
    }
    else {
        return false
    }
}

export function isValidUsername(username){
    const match = username.match(/\s+/)
    if(!match){
        return true
    }
    else {
        return false
    }
}

export function isValidEmail(email){
    const matchSpace = email.match(/\s+/)
    const matchAt = email.match(/[@]+/)
    const matchDomain = email.match(/[.]+/)
    if(!matchSpace && matchAt && matchDomain){
        return true
    }
    else {
        return false
    }
}