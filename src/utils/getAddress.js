export default function(user){

return user.address[0] ? `${user.address[0].address}${user.address[0].city && ","} ${user.address[0].city}, ${user.address[0].country}`:"Nil"
}