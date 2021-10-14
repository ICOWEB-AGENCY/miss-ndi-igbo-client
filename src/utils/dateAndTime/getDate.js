export const getDate = (date) => {
    if (date === "just now") {
        return date
    }
    if (!date)
        return "N/A"
    date = new Date(date)
    let months = ["Jan", "Feb", "Mar", "Apr", "MAy", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let newDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    return newDate
}
export const getDate2 = (date) => {
    if (date === "just now") {
        return date
    }
    if (!date)
        return "N/A"
    date = new Date(date)
    let months = ["Jan", "Feb", "Mar", "Apr", "MAy", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    let newDate = `${date.getDate()}/${date.getMonth() + 1}/${(date.getFullYear()).toString().slice(2, 4)}`
    return newDate
}



export const getDateAndTime = (date) => {
    if (!date) {
        return "Just now"
    }
    date = new Date(date)
    let hr;
    if (date.getHours() === 0)
        hr = 12
    else if (date.getHours() >= 13)
        hr = date.getHours() - 12
    else
        hr = date.getHours()

    // let hr = date.getHours() >= 13 ? date.getHours() - 12 : date.getHours()
    let period = date.getHours() >= 12 ? "pm" : "am"
    return getDate(date) + ` ${hr}:${date.getMinutes()} ${period}`
}

export const getDateAndTime2 = (date) => {
    if (!date) {
        return "Just now"
    }
    date = new Date(date)
    let hr;
    if (date.getHours() === 0)
        hr = 12
    else if (date.getHours() >= 13)
        hr = date.getHours() - 12
    else
        hr = date.getHours()

    // let hr = date.getHours() >= 13 ? date.getHours() - 12 : date.getHours()
    let period = date.getHours() >= 12 ? "pm" : "am"
    return getDate2(date) + `, ${hr}:${date.getMinutes()} ${period}`
}

export const getTime=(date)=>{
    if (!date) {
        return "Just now"
    }
    date = new Date(date)
    let hr;
    if (date.getHours() === 0)
        hr = 12
    else if (date.getHours() >= 13)
        hr = date.getHours() - 12
    else
        hr = date.getHours()

    // let hr = date.getHours() >= 13 ? date.getHours() - 12 : date.getHours()
    let period = date.getHours() >= 12 ? "pm" : "am"
    return  `${hr}:${date.getMinutes()} ${period}`

}
