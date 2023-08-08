exports.currentDay = function(){
    const today = new Date();
    const option = {
    weekday:"long",
    month:"long",
    day:"numeric"
    }
    return today.toLocaleString("en-in",option)
}
