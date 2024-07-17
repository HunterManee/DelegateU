import DateTimeManager from "../../../Managers/DateTimeManger.js";
import HolderElement from "../../Elements/HolderElement.js";


export default class HeaderHtml {

    static getHeaderBtns() {
        return`
        <div class="header-btns">
        </div>
        `
    }

    static getLeftBtn(innerText = 'Delete') {
        return `
        <button type="button" class="left-btn header-btn">${innerText}</button> 
        `
    }

    static getTitle() {
        return `
        <div class="title">
        </div>
        `
    }

    static getNameLabel(innerText) {
        return `
        <div class="name-title">
            <label for="name" class="name-label">${innerText}</label>         
        </div>
        `
    }

    static getNameTextBox(route) {
        let placeholder;
        switch(route){
            case "positions":
                placeholder = 'Position';
                break;
            case "people":
                placeholder = 'Full';
                break;
            case "roles":
                placeholder = 'Role';
                break;
        }

        return `
        <div class="name-title">
            <input type="text" class="name" name="name" placeholder="${placeholder} Name">
        </div>
        `
    }

    static getTimeTitle(datasetPosition) {
        const route = HolderElement.route;
        const timeString =
                DateTimeManager.getStandardTimeRange(route, datasetPosition);
        return `
        <label class="time-title">${timeString}</label>
        `
    }


    static getRightBtn(innerText = "Edit") {
        return `
        <button type="button" class="right-btn header-btn">${innerText}</button>
        `
    }
}