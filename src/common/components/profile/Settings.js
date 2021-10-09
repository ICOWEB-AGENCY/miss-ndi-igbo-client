import React,{useState} from 'react'
import PageHeader from '../headers/PageHeader'
import Link from 'next/link'
import ProfileHeader from './ProfileHeader'
import Button from '../form/Button'
import InputGroup from '../form/InputGroup'
import cookie from "js-cookie"
import {putProtectedData} from '../../../utils/services/putServices'
import Error from  '../Error'
import {useRouter} from 'next/router'
import constants from '../../../configs/constants'

export default function Settings({user={},setActive}) {
     const router= useRouter()
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmNewPassword,setConfirmNewPassword]=useState("")
    const [error,setError]=useState("")
    const [updated,setUpdated]=useState(false)


       const save= async(e)=>{
            e.preventDefault()
            const body = {oldPassword,newPassword,confirmNewPassword}
           
const token = cookie.get("token")
const refreshToken = cookie.get("refreshToken")

const tokens = {token,refreshToken}
            const data = await putProtectedData(body,"auth/change-password",tokens)
         
            if(data.error){
              
                setError(data.error.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
                return 
            }
            setUpdated(true)
              
        }
        if(updated){
            return (
<main style={{backgroundColor:"#fff",borderRadius:8,margin:23,height:"fit-content",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",padding:"98px 20px"}}>
<div style={{width:100}}>
<img src="./images/success.png" style={{width:"100%"}} />

</div>
<p style={{fontSize:48,color:constants.colors.primary1,fontWeight:"700",marginTop:30}}>
Password Updated

</p>
<p style={{fontSize:20,marginTop:20,marginBottom:30}}>
Your password have been updated successfully
</p>
<Button
title="Continue"
onClick={()=>{setActive("Profile");setUpdated(false)}}
 />

</main>
            )
        }
    return (
        <main style={{minHeight:"100vh",paddingBottom:30,margin:23}}>


<div style={{padding:"98px 190px",borderTop:"1px solid rgba(196, 196, 196, 1)",backgroundColor:"#fff",borderRadius:8}}>
   
   <PageHeader
       title="Create New Password"
       text="Update Password"
        />
  

<form
>
<InputGroup
 type="password"
 placeholder="Old Password"
 value={oldPassword}
 onChange={(e)=>setOldPassword(e.target.value)}
  />
  <InputGroup
 type="password"
 placeholder="New Password"
  value={newPassword}
 onChange={(e)=>setNewPassword(e.target.value)}
  />
  <InputGroup
 type="password"
 placeholder="Confirm New Password"
  value={confirmNewPassword}
 onChange={(e)=>setConfirmNewPassword(e.target.value)}
  />
       <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
  <Button 
         title="Update password"
         width="100%"
         onClick={save}
         />
       </div>

</form>
</div>


<div style={{display:"flex",justifyContent:"center",marginTop:30,backgroundColor:"#fff",borderRadius:8,padding:"29px 190px"}}>
<button
 style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"transparent",padding:10,border:"1px solid ",borderRadius:4}}>
<img src="./images/log-out.svg" style={{marginRight:26}} />
<span> 
Log out
</span>
</button>

</div>






       
        
        <ErrorLog 
        error={error}
        category="Error Changing password"
        />
            
        </main>
    )
}
const ProfileField=({title,...rest})=>{
    return (
        <div style={{marginBottom:16}}>
       <div style={{marginBottom:8}}>
         <label style={{fontWeight:"600",color:"rgba(58, 33, 16, 1)"}}>
{title}
       </label>

       </div>
          <div>
          {
              rest.type==="text-area"?
              <textarea
placeholder={title}
               rows={5}
               style={{width:"100%",padding:"14px 32px",width:"100%",borderRadius:4,backgroundColor:"rgba(255, 249, 244, 1)",border:"1px solid rgba(255, 249, 244, 1)"}}>

              </textarea>: <input
    placeholder={title}
     type="text"  style={{padding:"14px 32px",width:"100%",borderRadius:4,backgroundColor:"rgba(255, 249, 244, 1)",border:"1px solid rgba(255, 249, 244, 1)"}} {...rest}/>

          }
   
       </div>
      

       </div>
    )
}


const ErrorLog=({error,category})=>{
    return (
         <div>
           <div style={{margin:"25px 0",display:"flex",justifyContent:"flex-end",position:"relative"}}>
        
           {
               error &&  <Error
               category={category}
               error={error}
                />
           }
           </div>

           </div>
    )
}

