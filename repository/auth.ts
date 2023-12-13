import { http } from "#/utils/http"

const url = {
    login : () => '/auth/login'
}

const manipulatedata = {
    login(data: any){
        return http.post(url.login()).send(data)
    }   
}

export const authRepository = {
    url,
    manipulatedata
}