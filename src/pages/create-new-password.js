import React,{useState} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import ProfileHeader from '../common/components/profile/ProfileHeader'
import Button from '../common/components/form/Button'
import InputGroup from '../common/components/form/InputGroup'
import cookie from "js-cookie"
import {putProtectedData} from '../utils/services/putServices'
import Error from  '../common/components/Error'
import {useRouter} from 'next/router'
import constants from '../configs/constants'

export default function CreateAccountBio() {
     const router= useRouter()
    const [oldPassword,setOldPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [confirmNewPassword,setConfirmNewPassword]=useState("")
    const [error,setError]=useState("")


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
            alert("Password has been updated!")
            router.push(constants.links.profile)
              
        }
    return (
        <main style={{minHeight:"100vh",width:"100vw",paddingBottom:30}}>
       <ProfileHeader />


<div style={{padding:20,borderTop:"1px solid rgba(196, 196, 196, 1)"}}>
   
   <PageHeader
       title="Create New Password"
       text="Update Password"
        />
  

<form>
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
         <Button 
         title="Update password"
         width="100%"
         onClick={save}
         />

</form>

<div>
<div style={{display:"flex",justifyContent:"center",marginTop:30}}>
<button
 style={{display:"flex",justifyContent:"center",alignItems:"center",backgroundColor:"transparent",padding:10,border:"none"}}>
<img src="./images/log-out.svg" style={{marginRight:26}} />
<span> 
Log out
</span>
</button>

</div>

</div>



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

