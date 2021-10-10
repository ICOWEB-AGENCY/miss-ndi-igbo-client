import React,{useState} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import InputGroup from '../common/components/form/InputGroup'
import {postData} from '../utils/services/postServices'
import styles from '../styles/Create-account.module.css'
import Error from  '../common/components/Error'
import CreateNav from  '../common/components/nav/CreateNav'
import cookie from "js-cookie"
import {useRouter} from 'next/router'
import constants from '../configs/constants'
const log= console.log

export default function CreateAccountBio() {
    const router= useRouter()
    const [error,setError]=useState("")
    const [firstName,setFirstName]=useState("")
      const [lastName,setLastName]=useState("")
       const [age,setAge]=useState("")
        const [LGA,setLGA]=useState("")
        const [state,setState]=useState("")
        const [email,setEmail]=useState("")
        const [otherNames,setOtherNames]=useState("")
      

        const save= async(e)=>{
            e.preventDefault()
            const body = {firstName,lastName,otherNames,email,stateOfOrigin:state,LGA}
            console.log(body)
            const data = await postData(body,"auth/custom-reg")
            console.log(data)
         
            if(data.error){
              
                setError(data.error.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
                return 
            }
              cookie.set("_id",data._id)
           router.push("/registeration-success")
        }
    return (
        <main>
        <div style={{margin:"25px 0",display:"flex",justifyContent:"flex-end",position:"relative"}}>
        
           {
               error &&  <Error
               category="Error Creating Account"
               error={error}
                />
           }
       
       
 <img 
 src="./images/cancel-white.svg" 
 style={{cursor:"pointer"}}
 onClick={()=>router.back()}
  />
        </div>
         <PageHeader 
   />
            <form>
                <div>
                <div className={styles.names}>
               
                <InputGroup
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)
                }         
                className={styles.mr10}        />
            
                   <InputGroup 
                   required
                    value={lastName} 
                     onChange={(e)=>setLastName(e.target.value)}   
                   placeholder="Last Name"
                   />
                   
                  </div>
                      <InputGroup 
                   required
                    value={otherNames} 
                     onChange={(e)=>setOtherNames(e.target.value)}   
                   placeholder="Other Name(s)"
                   />
                            <InputGroup 
                   required
                    value={state} 
                     onChange={(e)=>setState(e.target.value)}   
                   placeholder="State"
                   />
                            <InputGroup 
                   required
                    value={LGA} 
                     onChange={(e)=>setLGA(e.target.value)}   
                   placeholder="LGA"
                   />
                   
                  
                  
                   
                     <InputGroup 
                    placeholder="Email Address"
                    type="email"
                    icon="message.svg"
                      value={email} 
                     onChange={(e)=>setEmail(e.target.value)}  
                    />
                         

                   <CreateNav
                   save={save}
                    />
              

                </div>
            </form>
      

    

        
        
            
        </main>
    )
}




