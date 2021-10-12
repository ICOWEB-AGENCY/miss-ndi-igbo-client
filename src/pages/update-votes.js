import React,{useState,useEffect} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import InputGroup from '../common/components/form/InputGroup'
import {getData} from '../utils/services/getServices'
import {postData} from '../utils/services/postServices'
import styles from '../styles/Create-account.module.css'
import Error from  '../common/components/Error'
import CreateNav from  '../common/components/nav/CreateNav'
import cookie from "js-cookie"
import {useRouter} from 'next/router'
import constants from '../configs/constants'
import Button from '../common/components/form/Button';
import { usePaystackPayment } from 'react-paystack';
import queryString  from 'query-string'
const log= console.log


export default function VoteContestant() {
 
    const router= useRouter()
    const [error,setError]=useState("")
    const [name,setName]=useState("")
        const [votes,setVotes]=useState("")
        const [email,setEmail]=useState("")
         const [amount,setAmount]=useState(0)
         const [total,setTotal]=useState("")
        const [phone,setPhone]=useState("")
        const [dontProceed,setDontProceed]=useState(true)
        const [success,setSuccess]=useState(false)
const [user,setUser]=useState({})
        const parsed = queryString.parse(router.asPath.split("?")[1])
        console.log(parsed)
       

    

    const onSuccess = async (e) => {
      e.preventDefault()
  const body ={reference:{reference:"None"},email,votes,contestant:user.username,phone,name:"admin",amount}
  console.log(body)

  const data = await postData(body,"transactions")
  console.log(data)
  setSuccess(true)
  setUser(data)

  };


useEffect(() => {
setAmount(votes*50)
setTotal(votes*50)
}, [votes])

useEffect(() => {

(async function(){
  console.log(parsed)
  try {
       const data = await getData("users/u/"+parsed.id)
       console.log(data)
  setUser(data)
  } catch (error) {
    console.log(error.response.data)
  }
 
})()


}, [])



const initiatePayment=(e)=>{
  setError("")
      e.preventDefault();
      if(!email){
        setError("Email field can not be  Empty")
        return
      }
        
               if(!phone){
        setError("Phone field can not be  Empty")
        return
      }
                  if(!votes){
        setError("Number of Votes Must be specified")
        return
      }
     initializePayment(onSuccess, onClose)
}

useEffect(() => {
if(email && phone && votes && name){
  setDontProceed(false)
}else{
  setDontProceed(true)
}
}, [email,phone,name.votes])
       
    return (
        <main>
        <div style={{margin:"25px 0",display:"flex",justifyContent:"flex-end",position:"relative"}}>
        
           {
               error &&  <Error
               category="Voting Error"
               error={error}
                />
           }
       
       
 <img 
 src="./images/cancel-white.svg" 
 style={{cursor:"pointer"}}
 onClick={()=>router.back()}
  />
        </div>
         <PageHeader 
         title={`Vote For Contestant ${parsed.id}`}
         text="Help your favourite contestant win"
   />
   {
     success && <div> Voted </div>
   }
            <form>
            <div style={{marginBottom:10,display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}}>
               <div style={{marginBottom:5,width:150,height:150,borderRadius:10}}>
                <img src={user.avatar} 
                style={{borderRadius:10,objectFit:"cover",width:"100%",height:"100%"}}
                alt="Contestant's Image"/>

                </div>
                <p style={{fontWeight:"600",fontSize:15}}>
                {user.firstName}{" "}{user.otherNames}

                </p>
                  <p style={{fontWeight:"600",fontSize:20}}>
                Votes:{" "}<span>{user.votes}</span>
                </p>
                
              </div>
                <div>
                
                <div className={styles.names}>
                    
                
                     <InputGroup 
                    placeholder="Email Address"
                    type="email"
                    icon="message.svg"
                      value={email} 
                     onChange={(e)=>setEmail(e.target.value)}  
                    />
                           <InputGroup 
                    placeholder="Phone"
                    type="tel"
                    icon="message.svg"
                      value={phone} 
                     onChange={(e)=>setPhone(e.target.value)}  
                    />
                     </div>
                   

                       <div className={styles.names}>
                          <InputGroup 
                    placeholder="Number of votes"
                    type="number"
                    icon="message.svg"
                      value={votes} 
                     onChange={(e)=>setVotes(e.target.value)}  
                    />
   

                      <InputGroup 
                    placeholder="Total Amount to be paid"
                    type="number"
                    icon="message.svg"
                      value={total===0?"":total} 
                     onChange={(e)=>setTotal(e.target.value)} 
                     disabled 
                    />
                    </div>

                {
                  total!==0 &&     <div>
                    <p style={{fontWeight:"700",fontSize:14}}>
                    Vote Amount: {amount} naira

                    </p>
                   
                   

                    </div>
                }



                  <Button
                   title="Continue"
                   onClick={onSuccess}
                  //  disabled={dontProceed}
                    />
              

                </div>
            </form>
      

    

        
        
            
        </main>
    )
}




