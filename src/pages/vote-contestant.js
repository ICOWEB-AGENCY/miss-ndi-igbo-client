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

export  async function getServerSideProps({req}){
try {
    const cookies= req.cookies
    console.log(cookies)

    const data = await getData("users/"+cookies.contestant)
    console.log(data)
    if(data.error){
       
        return {
            props:{error:data}
        }
    }
    return {
        props:{user:data}
    }
} catch (error) {
    console.log(error)
    
}
}




export default function VoteContestant({user={}}) {
  console.log(user)
    const router= useRouter()
    const [error,setError]=useState("")
    const [name,setName]=useState("")
        const [votes,setVotes]=useState("")
        const [email,setEmail]=useState("")
         const [amount,setAmount]=useState(0)
         const [total,setTotal]=useState(0)
        const [phone,setPhone]=useState("")
        const [dontProceed,setDontProceed]=useState(true)

        const parsed = queryString.parse(router.asPath.split("?")[1])
        console.log(parsed)
       

          const config = {
      reference: (new Date()).getTime().toString(),
      email: email,
      amount: 100*total,
      publicKey: "pk_live_b46762cf95f045b5d7b9e8ca27e7bc1d28d178be"
      // publicKey:process.NODE_ENV==="production"?"pk_live_b46762cf95f045b5d7b9e8ca27e7bc1d28d178be":'pk_test_b8241186ab1ccd92c2a4a302501be9066f4c452c'
  };


    const onSuccess = async (reference) => {
  const body ={reference,email,votes,contestant:parsed.contestant,phone,name,amount}

  const data = await postData(body,"transactions")
  console.log(data)
  router.push(`/contestants?reference=${parsed.contestant}&id=${parsed.id}`)

  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
const initializePayment = usePaystackPayment(config);
useEffect(() => {
setAmount(votes*50)
setTotal(votes*50+votes*(50*0.015))
}, [votes])

const initiatePayment=(e)=>{
  setError("")
      e.preventDefault();
      if(!email){
        setError("Email field can not be  Empty")
        return
      }
         if(!name){
        setError("Name field can not be  Empty")
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
               category="Error Creating Account"
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
   />
            <form>
            <div style={{marginBottom:0,display:"flex",justifyContent:"center"}}>
               <div style={{marginBottom:10,width:150,height:150,borderRadius:10}}>
                <img src={user.avatar} 
                style={{borderRadius:10,objectFit:"cover",width:"100%",height:"100%"}}
                alt="Contestant's Image"/>

                </div>
                
              </div>
                <div>
                
                <div className={styles.names}>
               
            
            
                   <InputGroup 
                   required
                    value={name} 
                     onChange={(e)=>setName(e.target.value)}   
                   placeholder="Enter your Name"
                   />
                  </div>
                
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
                          <InputGroup 
                    placeholder="Number of votes"
                    type="number"
                    hint={true}
                    icon="message.svg"
                      value={votes} 
                     onChange={(e)=>setVotes(e.target.value)}  
                    />
   

                      <InputGroup 
                    placeholder="Total Amount to be paid"
                    type="number"
                    icon="message.svg"
                      value={amount} 
                     onChange={(e)=>setVotes(e.target.value)} 
                     disabled 
                    />

                {
                  total!==0 &&     <div>
                    <p style={{fontWeight:"700",fontSize:14}}>
                    Vote Amount: {amount} naira

                    </p>
                        <p style={{fontWeight:"700",fontSize:14}}>
                    Charge: {amount*0.015} naira

                    </p>
                        <p style={{fontWeight:"700",fontSize:14}}>
                    Total Amount: {amount*0.015} +{amount}={total} naira

                    </p>

                    </div>
                }



                  <Button
                   title="Continue"
                   onClick={initiatePayment}
                  //  disabled={dontProceed}
                    />
              

                </div>
            </form>
      

    

        
        
            
        </main>
    )
}




