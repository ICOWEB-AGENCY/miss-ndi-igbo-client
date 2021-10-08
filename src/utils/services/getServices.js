import axios from "axios" 
import baseURL from "../../configs/baseURL"

export const getProtectedData=async (path,tokens)=>{

    try {
        const response = await axios.get(`${baseURL}/${path}`,
            {
                headers:{
                    Authorization:`Bearer ${tokens.token}`
                }
            }
        )
console.log(response)
return response.data
        
    } catch (error) {
        console.log(error.response.data)
        return {error:error.response.data.error}
        
    }

}

export const getData=async (path)=>{

    try {
        const response = await axios.get(`${baseURL}/${path}`)
console.log(response)
return response.data
        
    } catch (error) {
        console.log(error.response.data)
        
    }

}

export const getOrders=async (limit,page)=>{

    try {
        const response = await axios.get(`${baseURL}/admin/orders`)
console.log(response)
return response.data
        
    } catch (error) {
        console.log(error.response.data)
        
    }

}

export const getLoggedUser=async (token)=>{

    try {
        const response = await axios.get(`${baseURL}/users/details`,
        {
            headers: {
              Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
           }
        )
console.log(response)
return response.data
        
    } catch (error) {
        console.log(error.response.data)
        
    }

}