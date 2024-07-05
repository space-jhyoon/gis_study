import {noMap} from "@/assets/js/nameConfig.js";

function getControlSettings(mapType, btn1, btn2, check1, check2){ // 맵 바뀔 때 컨트롤 세팅 가져옴
    let setting = {}

    if(check1 === false){
        btn1 = false;
    }
    if(check2 === false){
        btn2 = false;
    }
    if(mapType === noMap){
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

function updateControlSettings(controlType, btn, check){ // 버튼, 체크박스 클릭으로 인한 업데이트
    let setting = {}
    switch (controlType){
        case "btn":
            btn = !btn;
            if(btn === false){
                check = false;
            }
            break;
        case "check":
            check = !check;
            if(check === true) {
                btn = true;
            }
    }
    setting.btn = btn
    setting.check = check
    return setting
}


export {getControlSettings, updateControlSettings}