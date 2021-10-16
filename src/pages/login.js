import React,{useState} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import {useRouter} from 'next/router'
import InputGroup from '../common/components/form/InputGroup'
import {logUser} from "../utils/services/postServices"
import Error from '../common/components/Error'
import constants from '../configs/constants'
import cookie from "js-cookie"

export default function Login() {
    const router = useRouter()
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")

    const login =async(e)=>{
       
        try {
              e.preventDefault()
        const body ={email,password}
       const data =await logUser(body)
       console.log(data)

       if (data.error){
        //    console.log(data.error)
           setError(data.error.message)
           setTimeout(() => {
               setError("")
           }, 2000);
           return
       }
cookie.set("token",data.token)
cookie.set("refreshToken",data.refreshToken)
       router.push("/dashboard")
            
        } catch (error) {
            console.log(error)
        }
      
    }
    return (
        <main>

        <div style={{margin:"25px 0",display:"flex",justifyContent:"space-between",position:"relative"}}>
        
           {
               error &&  <Error
               category="Error Signing in"
               error={error}
                />
           }
       
      <img 
 src="./images/back-white.svg" 
 style={{cursor:"pointer"}}
 onClick={()=>router.back()}
  />
 <img 
 src="./images/cancel-white.svg" 
 style={{cursor:"pointer"}}
 onClick={()=>router.back()}
  />
        </div>
           <PageHeader
         title="Sign In"
         text="Sign Into your account"
       
         />

          <form>
           <InputGroup
             value={email}
                placeholder="Emal Address" 
                onChange={(e)=>setEmail(e.target.value.trim())}
                 />

                 <InputGroup  
                 placeholder="Password"
                 value={password}
                 type="password"
                 onChange={(e)=>setPassword(e.target.value)}
                 />
                       <button 
                   onClick={login}
                   style={{color:"#fff",width:"100%",backgroundColor:"rgba(159, 135, 114, 1)",padding:15,border:"1px solid rgba(159, 135, 114, 1)",marginTop:35}}>
Login
                   </button>

          </form>

        </main>

    )
}


