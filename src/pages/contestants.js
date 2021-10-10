import React,{useState,useRef,useEffect} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import {getData} from '../utils/services/getServices'
import constants from '../configs/constants'
import styles from '../styles/Contestants.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useRouter } from 'next/router' 
import Button from "../common/components/form/Button";
import cookie from "js-cookie";
import axios from 'axios'
import queryString  from 'query-string'
 

const log = console.log
export  async function getServerSideProps({req}){
try {
    const {token,refreshToken} = req.cookies
    const data = await getData("users")
    console.log(data)
    if(data.error){
       
        return {
            props:{error:data}
        }
    }
    return {
        props:{contestants:data}
    }
} catch (error) {
    console.log(error)
    
}
}

const ContestantProfileModal=({user,setSelectedUser})=>{
    return (
         <div style={{width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",position:"fixed",zIndex:10,top:0,justifyContent:"center",display:"flex",alignItems:"center"}}>
        <div style={{borderRadius:24,backgroundColor:"#fff",padding:20,margin:20,position:"relative"}}>
        <div 
        style={{position:"absolute",right:20,cursor:"pointer"}}>
            <img src="./images/cancel-pink.svg"
            onClick={()=>setSelectedUser("")}
             />
        </div>
        <div style={{display:"flex",alignItems:"center",marginBottom:15}}>
<div style={{marginRight:30, width:72,height:72,overflow:"hidden"}}>
{
    !user.avatar?<p style={{borderRadius:30,backgroundColor:"rgba(0,0,34)",width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontWeight:"700",fontSize:25}} >
   {`${user.lastName[0].toUpperCase()}${user.firstName[0].toUpperCase()}`}
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
<table>
    <thead style={{paddingBottom:30}}>
<th style={{paddingRight:40,fontSize:14,color:"rgba(159, 135, 114, 1)",fontWeight:"600",paddingBottom:10}}>
STATE OF ORIGIN
</th>
<th style={{paddingRight:20,fontSize:14,color:"rgba(159, 135, 114, 1)",fontWeight:"600",paddingBottom:10}}>
LGA
</th>
<th style={{paddingRight:20,fontSize:14,color:"rgba(159, 135, 114, 1)",fontWeight:"600",paddingBottom:10}}>
SCHOOL ATTENDED
</th>
<th style={{fontSize:14,color:"rgba(159, 135, 114, 1)",fontWeight:"600",paddingBottom:10}}>
AGE
</th>
    </thead>
    <tbody>
        <tr>
<td style={{paddingRight:40,color:constants.colors.primary1,fontWeight:"500"}}>
{user.stateOfOrigin}
</td>
<td style={{paddingRight:20,color:constants.colors.primary1,fontWeight:"500"}}>
{user.LGA}
</td>
<td style={{paddingRight:20,color:constants.colors.primary1,fontWeight:"500"}}>
{user.schoolAttended||"Nil"}
</td>
<td style={{color:constants.colors.primary1,fontWeight:"500"}}>
{user.age}
</td>
        </tr>

    </tbody>

</table>
        </div>

        </div>
    )
}
const VotingSuccessModal=({setVisible})=>{

    const router= useRouter()
    const parsed = queryString.parse(router.asPath.split("?")[1])
const [id,setId]=useState("")

const clearValues=()=>{
    cookie.remove("contestant")
    setVisible(false)
    router.push("/contestants")
}
    useEffect(() => {
     const contestantId=cookie.get("contestant")
     if(!contestantId){
         setVisible(false)
          router.push("/contestants")
     }
     setId(parsed.id)
    }, [])
    return (
         <div style={{width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",position:"fixed",zIndex:10,top:0,justifyContent:"center",display:"flex",alignItems:"center"}}>
       <main style={{backgroundColor:"#fff",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",borderRadius:24,padding:"56px 150px"}}
className={styles.updatePassword}
>
<div style={{width:100}}>
<img src="./images/success.png" style={{width:"100%"}} />

</div>
<p style={{color:constants.colors.primary1,fontWeight:"700",marginTop:30}}
className={styles.updatePasswordHeading}
>
Password Updated

</p>
<p style={{marginBottom:30,textAlign:"center"}}
className={styles.pText}
>
You have successfully voted for
<br/>
 CONTESTANT {id}, Thank you.
</p>
<Button
title="Continue"
onClick={clearValues}
 />

</main>

        </div>
    )
}


export default function Contestants({contestants=[],error}) {
    const [selectedUser,setSelectedUser]=useState("")
    const [searchOpen,setSearchOpen]=useState(false)
    const router=useRouter()
    
    const [votedModalOpen,setVotedModalOpen]=useState(false)
useEffect(() => {
    if(router.asPath.split("?")[1] && router.asPath.split("?")[1].split("=")[0]==="reference"){
        // if (querys[0]==="reference"){
                console.log("voted")
                setVotedModalOpen(true)
            // }
    }
    

}, [])




    return (
        <>
        <header style={{backgroundColor:"rgba(238, 219, 201, 1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}

        className={styles.header}
        >
        <div>
       <Link  href="/">
 <img src="./images/logo-big.png"  style={{cursor:"pointer"}} />
       </Link>
        </div>
     <div style={{display:"flex",alignItems:"center",position:"relative"}}>
 {
     false &&   <>  <form>
<input 
style={{padding:10,backgroundColor:"transparent",border:"none",fontStyle:"italic"}}

className={styles.searchBar}
placeholder="Search by contestant name"
 />
     </form>

</>
 }
        <img
        onClick={()=>setSearchOpen(!searchOpen)}
         src="./images/search.png"  style={{cursor:"pointer"}}/>
    </div>


        </header>
        <main style={{display:"flex",minHeight:"100vh",justifyContent:"center",backgroundColor:"rgba(255, 253, 251, 1)"}}>
{
    selectedUser &&   <ContestantProfileModal
       user={selectedUser}
       setSelectedUser={setSelectedUser}
        />
}
{
    votedModalOpen && <VotingSuccessModal 
    setVisible={setVotedModalOpen}
    />
}
     
        <div style={{paddingTop:40}}>
       <header>
  


       <h1 style={{color:"rgba(159, 135, 114, 1)",fontSize:16,textAlign:"center",fontWeight:"600",marginBottom:16}}>
VOTE YOU FAVOURITE CONTESTANT
       </h1>
       <h2 style={{color:"rgba(58, 33, 16, 1)",fontSize:16,fontWeight:"700",textAlign:"center",marginBottom:40}}>
Click “Vote” to help your favourite win
       </h2>
       <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:72}}>

       <div style={{width:70,height:57,backgroundColor:"rgba(238, 219, 201, 1)"}}>
       </div>
       <div style={{padding:"0 30px"}}>
       <span style={{fontWeight:"700",fontSize:24,color:"rgba(238, 219, 201, 1)"}}>
Stage{" "}
       </span>
       <span style={{fontWeight:"700",fontSize:24,color:"rgba(58, 33, 16, 1)"}}>
1
       </span>
       </div>
         <div style={{width:70,height:57,backgroundColor:"rgba(238, 219, 201, 1)"}}>
       </div>

       </div>

       </header>


       {
           contestants.length===0?<p style={{fontSize:48,display:"flex",height:"30vh",alignItems:"center",color:constants.colors.primary1,fontWeight:"500"}}>
           There are no registered Contestants yet

           </p>:<ul style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>


{
    contestants.map((contestant,idx)=>        <Contestant
    contestant={contestant}
    setSelectedUser={setSelectedUser}
    idx={idx}
    />)
}

</ul>

       }



       
            

        </div>
        
            
        </main>
        </>
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

const Contestant=({contestant,setSelectedUser})=>{
    var linkRef = useRef()
    const setValues=()=>{

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
<img src={contestant.avatar||"./images/placeholder.jpeg"} style={{width:"100%",borderRadius:"6px 6px 0 0",height:"100%",objectFit:"cover"}}/>
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
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span>
Contestant <span style={{color:"rgba(58, 33, 16, 1)",fontWeight:"700"}}> {contestant.contestantId}</span>
        </span>
        <Link href={`/vote-contestant?id=${(contestant.contestantId)}&contestant=${contestant.username}`}>
        <a 
     
        onClick={setValues}
        style={{padding:"8px 34px",color:"#fff",backgroundColor:"rgba(58, 33, 16, 1)",borderRadius:4,border:"1px solid rgba(58, 33, 16, 1)",fontWeight:"700"}}>
        Vote
        </a>
        </Link>

        </div>

        </div>
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


Contestants.layout="profile"