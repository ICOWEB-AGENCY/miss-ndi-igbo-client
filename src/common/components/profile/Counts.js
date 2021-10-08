import VotesAndShares from './VotesAndShares'

const Counts=({user})=>{
    return (
        <div style={{display:"flex",margin:"72px 0px 80px 0px",justifyContent:"center"}}>
<VotesAndShares 
text="LINK SHARES"
user={user}
/>
<div style={{width:1,height:88,backgroundColor:"rgba(196, 196, 196, 1)"}}>

</div>
<VotesAndShares
text="VOTES"
user={user}
 />

</div>
    )
}

export default Counts;