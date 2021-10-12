
import {useRouter } from 'next/router' 
import React,{useState,useRef,useEffect} from 'react'
import constants from '../../../configs/constants'
import Link from 'next/link'
const Contestant=({contestant,setSelectedUser,action="Vote"})=>{
    var linkRef = useRef()
    const setValues=()=>{
cookie.set("contestant",contestant._id)
    }

    const [openImageModal,setOpenImageModal]=useState(false)

    const openImage =()=>{
setOpenImageModal(true)
    }
   
    const [showCopyLinkModal,setShowCopyLinkModal]=useState(false)
        return (
                <li style={{border:"1px solid rgba(224, 202, 182, 1)",borderRadius:6,margin:"0 24px 40px 24px",position:"relative"}}>
    <div style={{position:"absolute",right:20,top:20}}>
    <div>
    <img 
    onClick={()=>setSelectedUser(contestant)}
    style={{cursor:"pointer"}}
    title="View Contestant's Profile"
    src="./images/contestant-circle.svg" />
    </div>
      <div>
    <img
        style={{cursor:"pointer"}}
        title="Copy voting link"
        onClick={()=>setShowCopyLinkModal(true)}
     src="./images/contestant-proceed.svg" />
    </div>
    
 

    </div>

        <div style={{width:290,height:237}}>
<img 
onClick={openImage}
title="Click to see Full Image of Contestant"
src={contestant.avatar||"./images/placeholder.jpeg"} style={{width:"100%",borderRadius:"6px 6px 0 0",height:"100%",objectFit:"cover",cursor:"pointer"}}/>
        </div>
        <div style={{padding:24}}>
        <div style={{marginBottom:20}}>
        <h2 style={{fontWeight:"700",fontStyle:"italic",textTransform:"uppercase",color:"rgba(58, 33, 16, 1)"}}>
{contestant.firstName}
        </h2>
        <h3 style={{fontWeight:"700",color:"rgba(58, 33, 16, 1)"}}>
{contestant.lastName}{" "}{contestant.otherNames} 
        </h3>

        </div>
                <div>
Votes: <span style={{fontWeight:"700",color:constants.colors.primary1}}>{contestant.votes} </span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span>
Contestant <span style={{color:"rgba(58, 33, 16, 1)",fontWeight:"700"}}> {contestant.contestantId}</span>
        </span>
        <Link  href={action==="Vote"?`/vote-contestant?id=${(contestant.contestantId)}&contestant=${contestant.username}`:`/manage-users?user=${contestant.contestantId}`}>
        <a 
     
        onClick={setValues}
        style={{padding:"8px 34px",color:"#fff",backgroundColor:"rgba(58, 33, 16, 1)",borderRadius:4,border:"1px solid rgba(58, 33, 16, 1)",fontWeight:"700"}}>
        {action}
        </a>
        </Link>

        </div>

        </div>

        {
            openImageModal && <div style={{position:"fixed",width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",top:0,left:0,zIndex:10,display:"flex",justifyContent:"center"}}>
           
<div
onClick={()=>setOpenImageModal(false)}
 style={{padding:15,boxSizing:"border-box",height:"100%",position:"relative",width:"fit-content"}}>
<img 
src={contestant.avatar} style={{borderRadius:10,width:"100%",height:"100%",objectFit:"cover"}} />
<span
onClick={()=>setOpenImageModal(false)}
 style={{position:"absolute",top:20,color:"white",right:20,cursor:"pointer",width:30,height:30,backgroundColor:"#000",justifyContent:"center",alignItems:"center",display:"flex",borderRadius:100}}
 className="fade"
 >
X
</span>
</div>

            </div>
        }
{
    showCopyLinkModal && <><div
    onClick={()=>setShowCopyLinkModal(false)}
     style={{width:"100vw",height:"100vh",position:"fixed",backgroundColor:"rgba(0,0,0,0.6)",top:0,left:0,zIndex:2}}>
</div>

  <CopyToClipboard text={`https://ndiigbounitedforum.vercel.app/vote-contestant?id=${contestant.contestantId}&contestant=`+contestant.username}
          onCopy={() =>setShowCopyLinkModal(false)}>
         <div style={{padding:"18px 56px",backgroundColor:"#fff",position:"absolute",zIndex:3,top:60,fontWeight:"500",color:constants.colors.primary1,borderRadius:8,cursor:"pointer"}}
className={styles.copyTextWrapper}
onClick={()=>{}}
>
Copy Link
</div>
        </CopyToClipboard>

</>
}
        </li>
        )
}

export default Contestant;
