import React from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import constants from '../configs/constants'
import styles from '../styles/Create-account.module.css'

export default function CreateAccountBio() {
    return (
        <main style={{display:"flex",alignItems:"center",minHeight:"100vh",justifyContent:"center",backgroundColor:"rgba(255, 253, 251, 1)",padding:16}}>
        <div>
    

        <div>
           
                <div>

                <div style={{display:"flex",justifyContent:"center",marginBottom:42}}>
<img src="./images/successful.svg" />
                </div>

                <h1 style={{textAlign:"center",color:"rgba(58, 33, 16, 1)"}} className={styles.successText}>
Account Created Successfully
                </h1>
                <p style={{textAlign:"center",marginTop:20,color:"rgba(159, 135, 114, 1)",marginBottom:60 ,maxWidth:500}} className={styles.successContent}>
                You have successfully created your account, you’re now a part of the contestants. Please proceed to your profile page  and share your voting link. Good luck.

                </p>
                
            <div style={{display:"flex",justifyContent:"center"}}>

             <Link href={constants.links.profile}>

             <a style={{backgroundColor:"rgba(58, 33, 16, 1)",padding:15,display:"flex",justifyContent:"center",alignItems:"center",borderRadius:4,width:280}}>
             <span style={{color:"#fff",marginRight:20}}>
Proceed to profile page
             </span>
             <img src="./images/proceed-arrow-white.svg" style={{marginTop:5}}/>

             </a>

             </Link>
             </div>


              
              

                </div>
         
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
        <input type="text"  placeholder="First Name" style ={{padding:"16px 14px",border:"1px solid rgba(159, 135, 114, 1)",width:"100%"}} {...rest}/>
    </div>
    )
}