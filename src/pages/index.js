import Head from 'next/head'
import styles from '../styles/Index.module.css'
import HomeMenuCards from '../common/components/home/HomeMenuTag'
import PageHeader from '../common/components/headers/PageHeader'
import Link from 'next/link'

export default function Home() {
  return (
 
<main style={{marginTop:60}}>
         <PageHeader 
   />
  <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap"}} >
        <HomeMenuCards 
        src="create-account.svg"
        action=" Create account and compete"
        text="Create an account to proceed to compete for the crown"
        href="/create-account"
         />
        <HomeMenuCards
        src="proceed-to-vote.svg"
        action="Proceed to vote"
        text="Click to proceed to the voting page and cast to your vote."
        href="/contestants"
         />
      </div>
         <div style={{marginTop:10}}>
           <p style={{fontSize:14}}>
           Already have an account?
           </p>
           <Link href="/sign-in">
           <a style={{display:"flex",alignItems:"center",marginTop:8}}>
         <span style={{fontSize:14,fontWeight:"900",marginRight:14}}>
         Log in
         </span>
         <img 
         src="./images/proceed.svg"

         />
           </a>

           </Link>
         </div>
  
    </main>
  )
}





