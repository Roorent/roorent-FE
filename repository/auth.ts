import { http } from "#/utils/http"

const url = {
    login : () => '/auth/login',
    register: (role:any) => `/auth/register?role=${role}`,
    uploadKtp: () => '/biodatas/upload-ktp'
}

const manipulatedata = {
    login(data: any){
        return http.post(url.login()).send(data)
    },
    register(data:any,role:string){
        return http.post(url.register(role)).send(data)
    },
    uploadKtp(data:any){
        const formData = new FormData();
        formData.append('photo_ktp',data);
        return http.post(url.uploadKtp()).send(formData);
    }
}

export const authRepository = {
    url,
    manipulatedata
}