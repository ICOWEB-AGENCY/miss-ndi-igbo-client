import React,{useEffect,useState} from 'react'

export default function Error({category,error}) {
  const [display,setDisplay]=useState("flex")


    return (
     <div style={{backgroundColor:"#fff",padding:"20px 25px",borderRadius:"6px 0px 0px 6px",position:"fixed",right:-16,top:50,boxShadow:"0 2px 5px rgba(0, 0, 0, 0.05)",display:display}}>
<div>
<img src="./images/exclamation.svg" 
style={{marginRight:20}} />

</div>
<div>
<p>
{category}
</p>
<p style={{fontSize:12,color:"rgba(159, 135, 114, 1)"}}>
{error}
</p>

</div>
            </div>

    )
}
