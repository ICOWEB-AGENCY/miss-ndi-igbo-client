import Head from 'next/head'
import styles from './Auth.module.css'
import HomeMenuCards from '../home/HomeMenuTag'
import PageHeader from '../headers/PageHeader'
import Link from 'next/link'

export default function AuthLayout({children}) {
  
  if(children.type.layout==="profile"){
    return (
      <>
{
  children
}
      </>
    )
  }
  return (
    <div 
    style={{minHeight:"100vh",backgroundColor:"rgba(255, 253, 251, 1)",overflow:"hidden"
    }}
    className={styles.layout}
    >

   <div className={styles.imageWrapper} style={{height:"100vh"}}>
       <img 
       src="./images/hero.png"
       style={{width:"100%",height:"100%",overflow:"hidden",objectFit:"cover"}}
        />
   </div>
   
    <div className={styles.autPadding}>
  {/* <PageHeader 
   /> */}

{children}

         
    </div>
    </div>
  )
}





