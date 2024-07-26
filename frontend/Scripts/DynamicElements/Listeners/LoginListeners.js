import ClockManager from "../../Managers/ClockManager.js";
import DataManager from "../../Managers/DataManager.js";
import DateTimeManager from "../../Managers/DateTimeManger.js";
import HolderElement from "../Elements/HolderElement.js";
import MenuElement from "../Elements/MenuElement.js";


export default class LoginListeners {
    static setLoginListeners(elementLogin) {
        const loginBtn = elementLogin.querySelector('button');
        loginBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username');
            const password = document.getElementById('password');
            const body = {};
            body['username'] = username.value;
            body['password'] = password.value;
            try {
                const data = await DataManager.postLogin(body);
                if(data.Status === true) {
                    HolderElement.clearAll();
                    MenuElement.setDefaultTab();
                    DateTimeManager.setWeekdayMap();
                    HolderElement.appendHolder('header', 1, 'menu');
                    HolderElement.appendHolder('body');
                    HolderElement.appendHolder('footer', 1, 'menu');
                    ClockManager.startClock();
                }
                else {
                    password.value = '';
                }
            }catch(error) {
                console.error({message: error});
            }

        })
    }
}