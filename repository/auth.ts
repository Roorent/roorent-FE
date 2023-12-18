import { http } from "#/utils/http"

const url = {
    login : () => '/auth/login',
    register : () => '/auth/register',
}

const manipulatedata = {
    login(data: any){
        return http.post(url.login()).send(data)
    },
    register(data: any){
        return http.post(url.register()).send(data)
    }
}

export const authRepository = {
    url,
    manipulatedata
}