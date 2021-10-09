import React,{useState,useEffect} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import cookie from "js-cookie"
import Error from  '../common/components/Error'
import constants from '../configs/constants'
import {putData} from '../utils/services/putServices'
import {useRouter} from 'next/router'
import styles from '../styles/Create-account.module.css'
import CreateNav from  '../common/components/nav/CreateNav'
const log= console.log

export default function CreateAccountBio() {
    const router= useRouter()
     const [error,setError]=useState("")
     const [LGA,setLGA]=useState("")
     const [stateOfOrigin,setStateOfOrigin]=useState("")
     const [fathersName,setFathersName]=useState("")
     const [mothersName,setMothersName]=useState("")
     const [schoolAttending,setSchoolAttending]=useState("")




      const save= async(e)=>{
            e.preventDefault()
            const body = {LGA,stateOfOrigin,mothersName,fathersName,schoolAttending}
            log(body)
        const _id= cookie.get("_id")
            const data = await putData(body,"auth/register/origin/"+_id)
        
           
            if(data.error){
              
                setError(data.error.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
                return
            }
            router.push(constants.links.createAccountEduAndAct)
        }
        useEffect(() => {
          const _id= cookie.get("_id")
          log(_id)
        }, [])
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
       
       
<Link href={constants.links.createAccountBio}>
 <img src="./images/cancel-white.svg" />

</Link>
        </div>
        <PageHeader />

        <div>
            <form>
                <div>
                <div className={styles.grid2}>
                <InputGroup
                placeholder="LGA" 
                 value={LGA} 
                     onChange={(e)=>setLGA(e.target.value)} 
                 />
                   <InputGroup  
                    value={stateOfOrigin} 
                     onChange={(e)=>setStateOfOrigin(e.target.value)} 
                   placeholder="State Of Origin"
                   />
                </div>
                   <div>
                    <h2 style={{color:"rgba(159, 135, 114, 1)",fontSize:14,fontWeight:"600",marginBottom:24,marginTop:40}}>
PARENT
                    </h2>
                   <InputGroup 
                    value={fathersName} 
                     onChange={(e)=>setFathersName(e.target.value)} 
                    placeholder="Father's Name"
                     extraStyle={{marginRight:16}}/>
                   <InputGroup 
                    value={mothersName} 
                     onChange={(e)=>setMothersName(e.target.value)} 
                    placeholder="Mother's Name"/>
                  
                   <InputGroup 
                    placeholder="School Attending"
                    type="email"
                    icon="message.svg"
                     value={schoolAttending} 
                     onChange={(e)=>setSchoolAttending(e.target.value)} 
                    />
                     </div>
           


               <CreateNav
                   save={save}
                    />
                    
              

                </div>
            </form>
        </div>

        </div>
        
            
        </main>
    )
}


const InputGroup=({icon="user.svg",extraStyle,...rest})=>{
    return (
        <div style={{display:"flex",borderRadius:4,marginBottom:24,width:"100%",...extraStyle}}>
                   
        <div style={{backgroundColor:"rgba(159, 135, 114, 1)",height:54,width:48,display:"flex",justifyContent:"center",alignItems:"center"}}>
<img src={"./images/"+icon} alt="icon of user" />
        </div>
        <input type="text"  placeholder="First Name" style ={{padding:"16px 14px",border:"1px solid rgba(159, 135, 114, 1)",width:"100%"}} {...rest}/>
    </div>
    )
}