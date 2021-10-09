import React from 'react'
import Link from 'next/link'

const HomeMenuCards=({src,action,text,href})=>{
    return (
        <Link href={href}>
      <a style={{display:"flex",borderRadius:9,border:"1px solid #3A2110",padding:"40px 30px",alignItems:"center",marginBottom:25,maxWidth:400}}>
      <div style={{marginRight:30}}>
      <img src= {"./images/"+src} />
  
      </div>
      <div>
        <h2 style={{fontSize:18,marginBottom:8}}>
       {action}
        </h2>
        <p style={{fontSize:10}}>
       {text}
        </p>
      </div>
    </a>
    </Link>
    )
  }

  export default HomeMenuCards