import VotesAndShares from './VotesAndShares'

const Counts=({user})=>{
    return (
        <div style={{display:"flex",margin:"72px 0px 80px 0px",justifyContent:"center"}}>
<VotesAndShares 
text="LINK SHARES"
val={user.shareCount}
/>
<div style={{width:1,height:88,backgroundColor:"rgba(196, 196, 196, 1)"}}>

</div>
<VotesAndShares
text="VOTES"
val={user.votes}
 />

</div>
    )
}

export default Counts;