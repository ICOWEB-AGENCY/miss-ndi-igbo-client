import React from 'react'
import PageHeader from '../headers/PageHeader'
import Link from 'next/link'
import ProfileHeader from './ProfileHeader'
import Button from '../form/Button'
import InputGroup from '../form/InputGroup'
import HorizontalScroll from '../HorizontalScroll'
import Counts  from './Counts'

export default function Votes({user={}}) {
    return (
        <main style={{padding:"0px 260px 60px 260px",margin:23,backgroundColor:"#fff",height:"fit-content",borderRadius:8}}>
     


<div style={{padding:20}}>
<Counts user={user}/>

<div style={{display:"flex",justifyContent:"space-between",border:"1px solid #f3f3f3"}}>
  <div style={{width:54,height:54,backgroundColor:"rgba(58, 33, 16, 1)" ,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"6px 0 0 6px"}}>
 <img
  src="./images/url.svg" 
  />

  </div>
  <p style={{padding:16}}>
  {`https://adandiigbo-contest/${user.firstName}...`}
  </p>
   <div style={{width:91,height:54,backgroundColor:"rgba(58, 33, 16, 1)" ,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"0 6px 6px 0",color:"white"}}>
 Copy

  </div>


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





