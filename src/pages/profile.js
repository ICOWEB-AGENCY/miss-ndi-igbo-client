import React,{useState,useEffect} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import ProfileHeader from '../common/components/profile/ProfileHeader'
import Button from '../common/components/form/Button'
import {getProtectedData} from '../utils/services/getServices'
import {useRouter} from 'next/router'
import Main from '../common/components/profile/Main'
import Details from '../common/components/profile/Details'
import Settings from '../common/components/profile/Settings'
import Votes from '../common/components/profile/Votes'
import constants from '../configs/constants'

const log = console.log
export  async function getServerSideProps({req}){
try {
    const {token,refreshToken} = req.cookies
    const data = await getProtectedData("users/details",{token,refreshToken})
    console.log(data)
    if(data.error){
       
        return {
            props:{error:data}
        }
    }
    return {
        props:{user:data}
    }
} catch (error) {
    console.log(error)
    
}
}
export default   function Profile({user={}}) {

    const [active,setActive]=useState("Profile")
    return (
        <main>
        <header style={{padding:"16px 94px",display:"flex"}}>

        <div style={{marginRight:450}}>
        <Link href="/contestants" >
<img src="./images/logo.png" style={{cursor:"pointer"}} />
</Link>
        </div>
        <ul style={{display:"flex"}}>
{
    
        [{item:"Profile",img:"user"},{item:"Votes",img:"menu"},{item:"Account Settings",img:"settings"}].map(menuItem=>{
            return (
<li 
onClick={()=>setActive(menuItem.item)}
style={{marginRight:75,display:"flex",alignItems:"center",cursor:"pointer",position:"relative"}}>
       
   <img src={`./images/profile-${menuItem.img}.svg`}  style={{marginRight:17}}/>
        <span style={{color:active===menuItem.item?constants.colors.primary1:"rgba(159, 135, 114, 1)",fontWeight:"600"}}>

        {menuItem.item}
       
        
        </span>
      {
          active===menuItem.item &&   <div
        style={{height:5,width:"100%",backgroundColor:constants.colors.primary1,borderRadius:100,position:"absolute",bottom:-20}}
         />
      }

        </li>
            )
        })
}


        </ul>

        </header>
        <div style={{display:"grid",gridTemplateColumns:"1fr 3fr",backgroundColor:"#E5E5E5"}}>
<Main 
user={user}
/>

{
    active==="Profile" &&<Details
user={user}
 />
}

{
    active==="Account Settings" &&<Settings
user={user}
 />
}
{
    active==="Votes" &&<Votes
user={user}
 />
}
        

       </div>
       </main>

    )
       
    
}
Profile.layout="profile"
