import React,{useState} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import {getData} from '../utils/services/getServices'
import constants from '../configs/constants'


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
         <div style={{width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.2)",position:"fixed",zIndex:10,top:0,justifyContent:"center",display:"flex",alignItems:"center"}}>
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

export default function Contestants({contestants=[],error}) {
    const [selectedUser,setSelectedUser]=useState("")
    const [searchOpen,setSearchOpen]=useState(false)
    return (
        <>
        <header style={{padding:"16px 94px",backgroundColor:"rgba(238, 219, 201, 1)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div>
        <img src="./images/logo-big.png" />
        </div>
     <div style={{display:"flex",alignItems:"center"}}>
 {
     searchOpen &&     <form>
<input 
style={{padding:10,fontSize:20,backgroundColor:"transparent",border:"none",fontStyle:"italic",width:270}}
placeholder="Search by contestant name"
 />
     </form>
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

<ul style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
{
    contestants.map(contestant=>        <Contestant
    contestant={contestant}
    setSelectedUser={setSelectedUser}
    />)
}

</ul>


       
            

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
     src="./images/contestant-proceed.svg" />
    </div>

    </div>
        <div style={{width:290,height:237}}>
<img src="./images/contestant.svg" style={{width:"100%",borderRadius:"6px 6px 0 0"}}/>
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
Contestant <span style={{color:"rgba(58, 33, 16, 1)",fontWeight:"700"}}> 1</span>
        </span>
        <button style={{padding:"8px 34px",color:"#fff",backgroundColor:"rgba(58, 33, 16, 1)",borderRadius:4,border:"1px solid rgba(58, 33, 16, 1)",fontWeight:"700"}}>
        Vote
        </button>

        </div>

        </div>

        </li>
        )
}

Contestants.layout="profile"