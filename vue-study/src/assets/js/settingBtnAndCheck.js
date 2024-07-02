function settingBtnAndCheck(mapType, btn1, btn2, check1, check2){
    let setting = {}

    if(check1 === false){
        btn1 = false;
    }
    if(check2 === false){
        btn2 = false;
    }
    if(mapType === "nomap"){
        btn1 = false;
        btn2 = false;
        check1 = false;
        check2 = false;
    }

    setting.btn1 = btn1
    setting.btn2 = btn2
    setting.check1 = check1
    setting.check2 = check2
    return setting
}

function clickBtnAndCheck(mapType, btn, check){
    let setting = {}
    btn = !btn;

    if(btn === false){
        check = false;
    }

    setting.btn = btn
    setting.check = check
    return setting
}

export {settingBtnAndCheck, clickBtnAndCheck}