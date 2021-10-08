import React,{useEffect,useRef,useState} from 'react'
import PageHeader from '..//headers/PageHeader'
import Link from 'next/link'
import ProfileHeader from './ProfileHeader'
import Button from '../form/Button'
import InputGroup from '../form/InputGroup'
import HorizontalScroll from '../HorizontalScroll'
import Counts  from './/Counts'
import {useRouter} from 'next/router'
import {getProtectedData} from '../../../utils/services/getServices'


export default function Profile({user={}}) {
const avatarRef=useRef()
const [avatarFile,setAvatarFile]=useState("")
console.log(avatarFile)
    const uploadPhoto=()=>{
        console.log("upload")
        avatarRef.current.click()
    }

    return (
        <main style={{paddingBottom:30,backgroundColor:"#fff",paddingTop:39}}>
       {/* <ProfileHeader /> */}
       <input
       ref={avatarRef}
    //    value={avatarFile}
       onChange={(e)=>setAvatarFile(e.target.files[0])}
        type="file"  style={{display:"none"}}/>


<div style={{borderTop:"1px solid rgba(196, 196, 196, 1)"}}>
<div style={{padding:"15px 32px",backgroundColor:"rgba(251, 246, 242, 1)",display:"flex",alignItems:"center"}}>
<div style={{marginRight:16, width:72,height:72,overflow:"hidden"}}>
{
    !user.avatar?<p style={{borderRadius:30,backgroundColor:"rgba(0,0,34)",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"700",fontSize:25}} >
    {`${user.lastName[0]}${user.firstName[0]}`}
    </p>:<img src={user.avatar}  style={{borderRadius:30,width:"100%",height:"100%",overflow:"hidden",objectFit:"cover"}} />
}

</div>
   <div>
        <h2 style={{fontWeight:"700",fontStyle:"italic",textTransform:"uppercase",color:"rgba(58, 33, 16, 1)"}}>
{user.firstName}
        </h2>
        <h3 style={{fontWeight:"700",color:"rgba(58, 33, 16, 1)"}}>
{user.lastName}{" "}{user.otherNames}
        </h3>

        </div>


</div>
<Button
onClick={uploadPhoto}
 />


<Counts user={user}/>

{/* gallerry */}
<div>

{/* <div style={{width:"100%",overFlow:"hidden",width:"fit-content"}}> */}
<HorizontalScroll>

<ul style={{marginBottom:40,display:"flex",width:"100%"}}>
{
[1].map(image=>{
    return (
          <div style={{width:200,height:200,border:"1px solid #f2f2f2",borderRadius:8,marginRight:8,overFlow:"hidden",position:"relative"}}>
         
<img src="./images/delete-gallery.svg" style={{position:"absolute",right:15,top:15}}/>
        
     <img src="./images/contestant.svg" style={{borderRadius:8,width:"100%",height:"100%",objectFit:"cover"}}/>

  </div>
    )
})
}
</ul>
</HorizontalScroll>

{/*</div> */}

   <div style={{display:"flex",justifyContent:"center",marginBottom:45}}>
<img src="./images/gallery-previous.svg"  style={{marginRight:24}}/>
<img src="./images/gallery-next.svg" />

</div>

</div>
<div style={{display:"flex",justifyContent:"center",marginTop:30}}>
<button style={{padding:"10px 25px",backgroundColor:"transparent",borderRadius:4}}>
Upload Photos
</button>

</div>
   
   
  






</div>

       
        
        
            
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





