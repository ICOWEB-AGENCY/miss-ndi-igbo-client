import styles from './CreateNav.module.css'
import constants from '../../../configs/constants'

export default function CreateNav({save}){
  return (
     <div style={{display:"flex",alignItems:"center",marginTop:50}}
                    className={styles.progressWrapper}
                    >
                 
<div style={{height:4,backgroundColor:"rgba(236, 236, 236, 1)"}}
className={styles.progressBar}

>
<div style={{width:"25%",height:"100%",backgroundColor:constants.colors.primary1}}/>

</div>
                    <button
                    onClick={save}
                     style={{width:55,height:55,backgroundColor:"rgba(159, 135, 114, 1)",borderRadius:100,display:"flex",justifyContent:"center",alignItems:"center",border:"1px solid rgba(159, 135, 114, 1)"}}>
                    <img src="./images/proceed-arrow-white.svg" />

                    </button>
                   

                    </div>
  )
}