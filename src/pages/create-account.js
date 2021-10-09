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
        const [hairColor,setHairColor]=useState("")
        const [eyeColor,setEyeColor]=useState("")
        const [email,setEmail]=useState("")
        const [residentAddress,setResidentAddress]=useState("")

        const save= async(e)=>{
            e.preventDefault()
            const body = {firstName,lastName,age,hairColor,eyeColor,email,address:residentAddress}
            const data = await postData(body,"auth/register/bio")
         
            if(data.error){
              
                setError(data.error.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
                return 
            }
              cookie.set("_id",data._id)
           router.push(constants.links.createAccountOrigin)
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
       
       
<Link href="/">
 <img src="./images/cancel-white.svg"  style={{cursor:"pointer"}} />
</Link>
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
                   <div className={styles.grid2Or3}>
                   <InputGroup 
                    placeholder="Age"
                     extraStyle={{marginRight:16}}
                     type="number"
                       value={age} 
                     onChange={(e)=>setAge(e.target.value*1)}  
                     />
                   <InputGroup  
                   placeholder="Hair Color"
                     value={hairColor} 
                     onChange={(e)=>setHairColor(e.target.value)} 
                    
                   />
                  
                   <InputGroup 
                    placeholder="Eye Color"
                    type="text"
                    icon="message.svg"
                    className={styles.grid2Or3Item}
                      value={eyeColor} 
                     onChange={(e)=>setEyeColor(e.target.value)}  
                    />
                     </div>
                     <InputGroup 
                    placeholder="Email Address"
                    type="email"
                    icon="message.svg"
                      value={email} 
                     onChange={(e)=>setEmail(e.target.value)}  
                    />
                          <InputGroup 
                    placeholder="Residential Address"
                    type="text"
                    icon="message.svg"
                      value={residentAddress} 
                     onChange={(e)=>setResidentAddress(e.target.value)}  
                    />


                   <CreateNav
                   save={save}
                    />
              

                </div>
            </form>
      

    

        
        
            
        </main>
    )
}




