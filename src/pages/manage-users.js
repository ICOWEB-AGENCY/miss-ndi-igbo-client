import React,{useState,useRef,useEffect} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import {getData} from '../utils/services/getServices'
import constants from '../configs/constants'
import styles from '../styles/Dashboard.module.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {useRouter } from 'next/router' 
import Button from "../common/components/form/Button";
import cookie from "js-cookie";
import axios from 'axios'
import queryString  from 'query-string'
import SectionedContestants from '../common/components/contestants/SectionedContestants'
 




 const NewMessage=()=>{
     return (
         <div style={{marginTop:48,backgroundImage:"radial-gradient(132.86% 9015.67% at 0.95% -15%, #9F8772 0%, #3A2110 100%)",borderRadius:10,padding:"0px 40px",display:"flex",justifyContent:"space-between",marginBottom:64}}
         className={styles.container}
         >
<div style={{marginTop:29}}>
<h3 style={{color:"rgba(238, 219, 201, 1)",fontFamily:"cabin"}}>
New Message
</h3>
<p className="cw" style={{fontSize:24,fontWeight:"700",color:"#fff",marginBottom:8,margintop:16}}>
10 Contestants could not qualify
</p>
<p style={{color:"rgba(255,255,255,0.6)",maxWidth:700}}>
10 Contestants could not qualify for the next round (Stage 2) Please confirm so the next round can commennce
</p>

</div>
         <div>
<img src="./images/new-message-image.svg" alt="hero image"/>
         </div>

         </div>
     )
 }

 const Summaries=()=>{
     return (
         <ul style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",columnGap:25}} className={styles.container}>
         {

      
         [1,2,3].map(summary=>{
             return (
<li style={{backgroundColor:"rgba(58, 33, 16, 1)",height:180,borderRadius:10}} 
className={styles.summaryCard}
>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
<div>
<h2 style={{color:"rgba(255, 255, 255, 0.7)",fontWeight:"400",fontFamily:"overpass",marginBottom:10}}>
CONTESTANTS
</h2>
<h3 style={{fontSize:40,fontWeight:"700",color:"#fff",fontFamily:"cabin"}}>
23.1k
</h3>

</div>

<div className={styles.cardimageWrapper}>
<img src="./images/user-group.svg" alt="card image"/>
</div>
</div>
<div style={{display:"flex",alignItems:"center"}}>
<img src="./images/arrow-inc.svg" style={{marginRight:2}}/>
<span style={{color:"rgba(112, 255, 172, 1)",marginRight:10,fontSize:12}}>
3.46%
</span>
<span style={{color:"rgba(255, 255, 255, 0.6)",fontSize:14}}>
Since last month
</span>
</div>

</li>
             )
         })
            }
         </ul>
     )
 } 

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



export default function Dashboard({contestants=[],error}) {
    const [selectedUser,setSelectedUser]=useState("")
    const [searchOpen,setSearchOpen]=useState(false)
    const [top,setTop]=useState(4)
      const [bottom,setBottom]=useState(4)
    const router=useRouter()
    
    const [votedModalOpen,setVotedModalOpen]=useState(false)

    const query= queryString.parse(router.asPath.split("?")[1])
    console.log(query)




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

     
        <div style={{paddingTop:40}}>
                
                <NewMessage />

                <SectionedContestants
                contestants={contestants.slice(0,top)}
                section="TOP CONTESTANTS"
                text="This Contestants are currently topping the list"
                 >
                 <select
                 value={top}
                 onChange={(e)=>setTop(e.target.value)}
                  style={{padding:10,backgroundColor:"transparent",borderRadius:5}}>
                        <option value={4}>
                        Top 4 Contestants
                        </option>
                         <option value={8}>
                        Top 8 Contestants
                        </option>
                           <option value={10}>
                        Top 10 Contestants
                        </option>
                           <option value={12}>
                        Top 12 Contestants
                        </option>
                 </select>
                 </SectionedContestants>
                <SectionedContestants
                contestants={contestants.slice(4,bottom)}
                section="OTHER CONTESTANTS"
                text={"Other Contestants excluding the filtered "+top}
                 >
                 <div style={{display:"flex"}}>
                      <button
                //  onClick={(e)=>setBottom(e.target.value)}
                  style={{padding:10,backgroundColor:"transparent",borderRadius:5,fontSize:14,display:"flex",alignItems:"center",marginRight:10,border:"1px solid "}}>
                  <img src="./images/x.svg" style={{marginRight:5}} />
                     <span>
Eliminate Contestants
                     </span>
                 </button>
                       <select
                 value={bottom}
                 onChange={(e)=>setBottom(e.target.value)}
                  style={{padding:10,backgroundColor:"transparent",borderRadius:5,border:"1px solid "}}>
                        <option value={4}>
                        Bottom-Top Contestants
                        </option>
                         <option value={8}>
                        Bottom 8 Contestants
                        </option>
                           <option value={10}>
                        Bottom 10 Contestants
                        </option>
                           <option value={12}>
                        Bottom 12 Contestants
                        </option>
                 </select>
                </div>
                 </SectionedContestants>
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
cookie.set("contestant",contestant._id)
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
        <div>
Votes: {contestant.votes}
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


Dashboard.layout="dashboard"