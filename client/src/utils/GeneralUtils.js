export function getCurrentUser(){
    if(localStorage.QLoopJWT) {
        const user = {
            token: localStorage.QLoopJWT
        }
        return user
    }
    return null
}