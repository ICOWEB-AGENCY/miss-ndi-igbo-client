 export default function({width,title,...rest}){
     return (
         <div style={{display:"flex",justifyContent:"center"}}>


         <button 
     
         style={{backgroundColor:"rgba(58, 33, 16, 1)",color:"#fff",fontWeight:"700",padding:"14px 40px",border:"1px solid rgba(58, 33, 16, 1)",borderRadius:4,width:width||"none",marginTop:20}} {...rest}>
{title||"Change Avatar"}
         </button>

         </div>
     )
 }