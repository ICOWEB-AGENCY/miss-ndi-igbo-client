import React,{useState} from 'react'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'
import InputGroup from '../common/components/form/InputGroup'
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
    const [firstName,setFirstName]=useState("")
      const [lastName,setLastName]=useState("")
       const [age,setAge]=useState("")
        const [hairColor,setHairColor]=useState("")
        const [votes,setVotes]=useState("")
        const [email,setEmail]=useState("")
        const [residentAddress,setResidentAddress]=useState("")

        const parsed = queryString.parse(router.asPath.split("?")[1])
       

          const config = {
      reference: (new Date()).getTime().toString(),
      email: email,
      amount: 5000*votes,
      publicKey: "pk_live_b46762cf95f045b5d7b9e8ca27e7bc1d28d178be"//'pk_test_b8241186ab1ccd92c2a4a302501be9066f4c452c',
  };

    const onSuccess = async (reference) => {
  const body ={reference,email,votes,contestant:parsed.contestant}

  const data = await postData(body,"transactions")
  console.log(data)
  router.push(`/contestants?reference=${parsed.contestant}&id=${parsed.id}`)

  };

  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log('closed')
  }
const initializePayment = usePaystackPayment(config);

       
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
                <div>
                <div className={styles.names}>
               
                <InputGroup
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)
                }         
                className={styles.mr10}        />
            
                   <InputGroup 
                   required
                    value={lastName} 
                     onChange={(e)=>setLastName(e.target.value)}   
                   placeholder="Last Name"
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
                    type="number"
                    icon="message.svg"
                      value={residentAddress} 
                     onChange={(e)=>setResidentAddress(e.target.value)}  
                    />
                          <InputGroup 
                    placeholder="Votes"
                    type="number"
                    icon="message.svg"
                      value={votes} 
                     onChange={(e)=>setVotes(e.target.value)}  
                    />



                  <Button
                   title="Continue"
                   onClick={(e) => {
                     e.preventDefault();
                initializePayment(onSuccess, onClose)
            }}
                    />
              

                </div>
            </form>
      

    

        
        
            
        </main>
    )
}




