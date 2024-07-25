import LoginHtml from "../Html/Login/LoginHtml.js";
import HolderElement from "./HolderElement.js";
import HtmlElement from "./HtmlElement.js";



export default class LoginElement extends HtmlElement{
    static mechanicLogin() {
        HolderElement.clearAll();
        const HtmlBody = document.querySelector('body');
        
        const elementLogin =
        HtmlElement._elementFromHtml(LoginHtml.Login());
        
        HtmlBody.appendChild(elementLogin);
    }
}