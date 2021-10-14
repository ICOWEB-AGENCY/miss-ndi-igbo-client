export default function(date){
    const today = new Date()
    let when 
    const timeDifference =toTimeStamp(today)-toTimeStamp(date)
    if(timeDifference>=24*60*60*7){
        const weeks=Number.parseInt(timeDifference/(3600*24*7))
        when =`${weeks}hr ago`
    }else if(timeDifference>=24*60*60){
        const days=Number.parseInt(timeDifference/(3600*24))
        when =`${days}hr ago`
    }else if(timeDifference>=60*60){
        const hr=Number.parseInt(timeDifference/3600)
        when =`${hr}hr ago`
    
    }else if (timeDifference>=60){
        const min =Number.parseInt(timeDifference/60)
        when =`${min}m ago`
    }else if(timeDifference>=60){
        when =`${Number.parseInt(timeDifference)}s ago`
    }else{
        when ="Just now"
    }
    return when 
}


export const toTimeStamp=(date)=>{
    return Date.parse(date)/1000
}


 