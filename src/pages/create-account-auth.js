import React,{useState} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import {useRouter} from 'next/router'
import InputGroup from '../common/components/form/InputGroup'
import Error from  '../common/components/Error'
import {putData} from '../utils/services/putServices'
import cookie from "js-cookie"
import constants from '../configs/constants'
import styles from '../styles/Create-account.module.css'

const log = console.log
export default function CreateAccountBio() {
       const router= useRouter()
    const [password,setPassword]=useState("")
          const [error,setError]=useState("")
     const [confirmPassword,setConfirmPassword]=useState("")

      const save= async(e)=>{
            e.preventDefault()
            const body = {password,confirmPassword}
              const _id= cookie.get("_id")
            const data = await putData(body,"auth/register/pass/"+_id)
         log(data)
            if(data.error){
              
                setError(data.error.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
                return 
            }
              cookie.set("token",data.token)
              cookie.set("refreshToken",data.refreshToken)
           router.push(constants.links.registrationSuccess)
        }
    return (
        <main>
        <div>
         <div style={{margin:"25px 0",display:"flex",justifyContent:"flex-end",position:"relative"}}>
        
           {
               error &&  <Error
               category="Error Creating Account"
               error={error}
                />
           }
       
       
 <img src="./images/cancel-white.svg" />
        </div>
        <PageHeader />

        <div>
            <form>
                <div>
                <InputGroup
                placeholder="Password" 
                type="password"
                  value={password} 
                     onChange={(e)=>setPassword(e.target.value)}
                 />
                   <InputGroup 
                     type="password"
                   value={confirmPassword} 
                     onChange={(e)=>setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"/>
                   <div style={{marginBottom:30}}>
                   <label>
ACCEPT TERMS
                   </label>
                   <input type="checkbox"  style={{marginLeft:30}}/>

                   </div>
                   <div className={styles.flexEnd}>
                   <button 
                   onClick={save}
                   
                   style={{color:"#fff",backgroundColor:"rgba(58, 33, 16, 1)",padding:"15px 45px",border:"1px solid rgba(159, 135, 114, 1)"}}
                   className={styles.flexEndButton}
                   >
Create Account
                   </button>
                   </div>

           


                 
              

                </div>
            </form>
        </div>

        </div>
        
            
        </main>
    )
}


