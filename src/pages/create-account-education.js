import React,{useState} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import constants from '../configs/constants'
import {putData} from '../utils/services/putServices'
import cookie from "js-cookie"
import Error from  '../common/components/Error'
import {useRouter} from 'next/router'
import styles from '../styles/Create-account.module.css'

export default function CreateAccountBio() {
     const router= useRouter()
       const [error,setError]=useState("")
       const [eduQualification,setEduQualification]=useState("")
        const [schoolAttended,setSchoolAttended]=useState("")
            const [activities,setActivities]=useState([])
        const [hobbies,setHobbies]=useState([])
        const [futurePlans,setFuturePlans]=useState("")
         const [contestedBefore,setContestedBefore]=useState("")


          const save= async(e)=>{
            e.preventDefault()
            const body = {eduQualification,schoolAttended,activities,hobbies,futurePlans,contestedBefore}
            console.log(body)
           const _id= cookie.get("_id")
            const data = await putData(body,"auth/register/eduAndAct/"+_id)
         
            if(data.error){
              
                setError(data.error.message)
                setTimeout(() => {
                    setError("")
                }, 2000);
                return 
            }
              
           router.push(constants.links.createAccountPass)
        }
    return (
        <main >
        <div>
           <div style={{margin:"25px 0",display:"flex",justifyContent:"flex-end",position:"relative"}}>
        
           {
               error &&  <Error
               category="Error Creating Account"
               error={error}
                />
           }
       
       
 <img src="./images/cancel-white.svg" />
        </div>
        <PageHeader />

        <div>
            <form>
                <div>
                <div className={styles.grid2}>
                <InputGroup
                 value={eduQualification} 
                     onChange={(e)=>setEduQualification(e.target.value)} 
                placeholder="Education Qualification" 
                 />
                   <InputGroup 
                         value={schoolAttended} 
                     onChange={(e)=>setSchoolAttended(e.target.value)} 
                    placeholder="School Attended"/>
                </div>
                   <InputGroup 
                      value={activities} 
                     onChange={(e)=>setActivities((e.target.value).split(",").map(item=>item.trim()))} 
                    placeholder="Extracuricular activitites/Clubs/Ogranization your ‘re a part of" extraStyle={{fontSize:10}}/>
                   <div>
                   <div style={{marginBottom:15,marginTop:40}} className={styles.contestedBefore}>
                    <label style={{color:"rgba(159, 135, 114, 1)",fontSize:16,textTransform:"uppercase",marginBottom:10,display:"inline-block",marginRight:50}}>
Ever been in any beauty pageant?
                    </label>
                    <div>


<div style={{display:"flex"}}>
<div style={{marginRight:30}}>
 <Check 
 state={contestedBefore} 
 changeState={setContestedBefore}
  text="YES"
  />

</div>
          <Check 
          state={!contestedBefore}
          changeState={setContestedBefore} 
          text="NO"
          />

</div>
</div>
                   </div>
                  
                   <InputGroup 
                    placeholder="Hobbies"
                    type="text"
                    icon="message.svg"
                       value={hobbies} 
                     onChange={(e)=>setHobbies((e.target.value).split(",").map(item=>item.trim()))} 
                    />
                           <InputGroup 
                    placeholder="Future Plans"
                    type="text"
                    icon="message.svg"
                       value={futurePlans} 
                     onChange={(e)=>setFuturePlans(e.target.value)} 
                    />
                     </div>
           


                    <div style={{display:"flex",justifyContent:"center"}}>
                 <button
                    onClick={save}
                     style={{width:55,height:55,backgroundColor:"rgba(159, 135, 114, 1)",borderRadius:100,display:"flex",justifyContent:"center",alignItems:"center",border:"1px solid rgba(159, 135, 114, 1)"}}>
                    <img src="./images/proceed-arrow-white.svg" />

                    </button>

                    </div>
              

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
        <input type="text"  placeholder="First Name" style ={{padding:"16px 14px",border:"1px solid rgba(159, 135, 114, 1)",width:"100%",...extraStyle}} {...rest}/>
    </div>
    )
}

const Check=({state,changeState,style,text})=>{
    return (
            <div style={{display:"flex",alignItems:"center"}}>
              <div 
              onClick={()=>changeState(!state)}
               style={{marginRight:20,width:20,height:20,display:"inline-block",borderRadius:3,border:`2px solid ${state && "rgba(20,20,255,0.4)"}`,backgroundColor:state?constants.colors.primary1:"transparent"}}/>
                   <label style={{textTransform:"uppercase",marginRight:60}}>
{text}
                   </label>
     </div>
    )
}