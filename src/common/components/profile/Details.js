import React,{useState,useEffect} from 'react'
import PageHeader from '../headers/PageHeader'
import Link from 'next/link'
import ProfileHeader from './ProfileHeader'
import Button from '../form/Button'
import {getProtectedData} from '../../../utils/services/getServices'
import {useRouter} from 'next/router'
import Main from './Main'
import styles from './Details.module.css'

const log = console.log

export default   function Profile({user={}}) {
        const router= useRouter()
    console.log(user)
    const [firstName,setFirstName]=useState(user.firstName)
     const [eduQualification,setEduQualification]=useState(user.eduQualification)
     const [lastName,setLastName]=useState(user.lastName)
     const [email,setEmail]=useState(user.email)
    const [fathersName,setFathersName]=useState(user.fathersName)
        const [mothersName,setMothersName]=useState(user.mothersName)
      const [age,setAge]=useState(user.age)
       const [eyeColor,setEyeColor]=useState(user.eyeColor)
        const [hairColor,setHairColor]=useState(user.hairColor)
        const [address,setAddress]=useState(user.address)
           const [stateOfOrigin,setStateOfOrigin]=useState(user.stateOfOrigin)
               const [futurePlans,setFuturePlans]=useState(user.futurePlans)
             const [LGA,setLGA]=useState(user.LGA)
             const [hobbies,setHobbies]=useState(user.hobbies)
               const [schoolAttending,setSchoolAttending]=useState(user.schoolAttending)
                  const [schoolAttended,setSchoolAttended]=useState(user.schoolAttended)
   
    return (
        <main style={{minHeight:"100vh"}} className={styles.detailsMain}>
       {/* <ProfileHeader /> */}
       {/* <Button /> */}
<div style={{borderTop:"1px solid rgba(196, 196, 196, 1)"}}>




 <form>
 <div style={{backgroundColor:"#fff"}} className={styles.formWrapper}>
      <ProfileField
       title="First Name"
       type="text"
       value={firstName}
       onChange={(e)=>setFirstName(e.target.value)}
        />
       
       <ProfileField
       title="Last Name"
          value={lastName}
       onChange={(e)=>setLastName(e.target.value)}
        />
           <ProfileField
       title="Age"
         value={age}
       onChange={(e)=>setAge(e.target.value)}
        />
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",columnGap:20}}>
               <ProfileField
       title="Hair Color"
         value={hairColor}
       onChange={(e)=>setHairColor(e.target.value)}
        />

               <ProfileField
       title="Eye Color"
         value={eyeColor}
       onChange={(e)=>setEyeColor(e.target.value)}
        />
      </div>
                 <ProfileField
       title="Email Address"
         value={email}
       onChange={(e)=>setEmail(e.target.value)}
        />
            <ProfileField
       title="Residential Adress"
       type="text-area"
         val={address}
       onChange={(e)=>setAddress(e.target.value)}
   
        />
         </div>

         <div style={{backgroundColor:"#fff"}}
         className={styles.formWrapper}>

         <div className={styles.grid2}>
        <ProfileField
       title="LGA"
           value={LGA}
       onChange={(e)=>setLGA(e.target.value)}
        />
             <ProfileField
       title="State of Origin"
            value={stateOfOrigin}
       onChange={(e)=>setStateOfOrigin(e.target.value)}
        />
        </div>

          <div className={styles.grid2}>
                 <ProfileField
       title="Father's Name"
          value={fathersName}
       onChange={(e)=>setFathersName(e.target.value)}
        />
                   <ProfileField
       title="Mother's Name"
          value={mothersName}
       onChange={(e)=>setMothersName(e.target.value)}
        />
        </div>
          <div className={styles.grid2}>
                     <ProfileField
       title="School Attending"
                value={schoolAttending}
       onChange={(e)=>setSchoolAttending(e.target.value)}
        />
                           <ProfileField
       title="Education Qualification"
                  value={eduQualification}
       onChange={(e)=>setEduQualification(e.target.value)}
        />
        </div>
                                  <ProfileField
       title="School Attended"
             value={schoolAttended}
       onChange={(e)=>setSchoolAttended(e.target.value)}
        />
          <div className={styles.grid2}>
                                         <ProfileField
       title="Club/Organization"
        />
                                              <ProfileField
                                                  value={hobbies.join(",")}
       onChange={(e)=>setHobbies((e.target.value).split(",").map(item=>item.trim()))}
       title="Hobbies"
        />
        </div>
                                                     <ProfileField
       title="Future Plans"
             value={futurePlans}
       onChange={(e)=>setFuturePlans(e.target.value)}
        />

      </div>
 </form>
</div>

       
        
        
            
        </main>
    )
}
const ProfileField=({title,val,...rest})=>{
    console.log(rest.value)
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
{val}
              </textarea>: <input
    placeholder={title}
     type="text"  style={{padding:"14px 32px",width:"100%",borderRadius:4,backgroundColor:"rgba(255, 249, 244, 1)",border:"1px solid rgba(255, 249, 244, 1)"}} {...rest}/>

          }
   
       </div>
      

       </div>
    )
}
Profile.layout="profile"
