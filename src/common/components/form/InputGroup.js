const InputGroup=({icon="user.svg",extraStyle,hint,...rest})=>{
    return (
        <div style={{display:"flex",borderRadius:4,marginBottom:29,position:"relative",width:"100%",...extraStyle}}>
                   
        <div style={{backgroundColor:"rgba(159, 135, 114, 1)",height:54,width:48,display:"flex",justifyContent:"center",alignItems:"center"}}>
<img src={"./images/"+icon} alt="icon of user" />
        </div>
        <input type="text"  placeholder="First Name" style ={{padding:"16px 14px",border:"1px solid rgba(159, 135, 114, 1)",width:"100%"}} {...rest}/>
          {
              hint &&    <small style={{position:"absolute",bottom:-15}}>
1 votes is 50 naira
                    </small>
          }
                     
    </div>
   

    )
}


export default InputGroup