function showAlert(mapType, alertCompoRef){
    if(mapType === "nomap"){
        alertCompoRef.show();
        return true
    }
}

export {showAlert}