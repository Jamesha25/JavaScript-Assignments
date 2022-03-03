function CanDrive(hasDrivingLiscence, isTired, isSober) {
    // Write you code here
    if(hasDrivingLiscence && !isTired && isSober){
        return "You can drive"
    }
    else if((hasDrivingLiscence && isTired && !isSober)||(hasDrivingLiscence && !isTired && !isSober)){
        return "You shouldn't drive"
    }
    else{
        return "You cannot drive"
    }
}

module.exports = CanDrive;
