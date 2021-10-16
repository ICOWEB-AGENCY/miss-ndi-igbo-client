import axios from "axios" 
import baseURL from "../../configs/baseURL"
import cookie from 'js-cookie'

export const logUser=async (data)=>{

    try {
        const response = await axios.post(`${baseURL}/auth/login`,data)

return response.data
        
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
        
    }

}


export const postData=async (data,path)=>{

    try {
        const response = await axios.post(`${baseURL}/`+path,data)

return response.data
        
    } catch (error) {
        console.log(error.response.data)
        return error.response.data
        
    }

}
export const postProtectedData = async (data, path, tokens) => {
    const token = cookie.get("token")
 try {
        const response = await axios.post(`${baseURL}/${path}`,
        data,
            {
                headers:{
                    Authorization:`Bearer ${token||token.token}`
                }
            }
        )
return response.data
        
    } catch (error) {
        console.log(error.message)
        return error.response.data
        
    }
}





