import Contestant from './Contestant'
import styles from './Styles.module.css'
import constants from '../../../configs/constants'

const SectionedContestants=({
    contestants=[],
    section,
    text,
    children
    })=>{
      
    return (
        <div className={styles.container} style={{marginBottom:80}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <h3 style={{fontSize:20,color:"rgba(159, 135, 114, 1)",fontFamily:"cabin",marginBottom:16}}>
{section}
        </h3>
        {
            children
        }
        </div>
          <h3 style={{fontSize:32,color:constants.colors.primary1,fontFamily:"cabin",marginBottom:40}}>
{text}
        </h3>
         {
           contestants.length===0?<p style={{fontSize:48,display:"flex",height:"20vh",alignItems:"center",color:constants.colors.primary1,fontWeight:"500",justifyContent:"center"}}>
           <div style={{padding:20,backgroundColor:"#455",borderRadius:10}}>
           There are no registered Contestants yet
           </div>

           </p>:<ul style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>


{
    contestants.map((contestant,idx)=>        <Contestant
    contestant={contestant}
    // setSelectedUser={setSelectedUser}
   action="View"
   

    />)
}

</ul>

       }
       </div>

    )
}

export default SectionedContestants;