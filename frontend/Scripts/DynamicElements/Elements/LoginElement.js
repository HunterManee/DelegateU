import ApiManager from "../../Managers/ApiManger.js";
import ClockManager from "../../Managers/ClockManager.js";
import DataManager from "../../Managers/DataManager.js";
import DateTimeManager from "../../Managers/DateTimeManger.js";
import WebSocketManager from "../../Managers/WebSocketManager.js";
import LoginHtml from "../Html/Login/LoginHtml.js";
import HolderElement from "./HolderElement.js";
import HtmlElement from "./HtmlElement.js";
import MenuElement from "./MenuElement.js";



export default class LoginElement extends HtmlElement{
    static async mechanicLogin() {
        HolderElement.clearAll();
        const groupId = ApiManager.idDiningGroup;
        if(groupId !== null) {
            try{
                WebSocketManager.connect();
                await DataManager.getCollections();
                HolderElement.clearAll();
                MenuElement.setDefaultTab();
                DateTimeManager.setWeekdayMap();
                HolderElement.appendHolder('header', 1, 'menu');
                HolderElement.appendHolder('body');
                HolderElement.appendHolder('footer', 1, 'menu');
                ClockManager.startClock();
            }catch(error) {
                console.error({message: error});
            }
            return;
        }
        const HtmlBody = document.querySelector('body');
        const elementLogin =
        HtmlElement._elementFromHtml(LoginHtml.Login());
        HtmlBody.appendChild(elementLogin);
    }
}