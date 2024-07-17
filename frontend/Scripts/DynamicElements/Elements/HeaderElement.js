import ContainerHtml from "../Html/Container/ContainerHtml.js";
import HeaderHtml from "../Html/Container/HeaderHtml.js";
import ContainerElement from "./ContainerElement.js";
import HtmlElement from "./HtmlElement.js";
import MenuElement from "./MenuElement.js";



export default class HeaderElement extends HtmlElement {

    static mechanicHeader(elementHeader, structureHeader = undefined) {
        ContainerElement.clearElementFromType(elementHeader);
        const headerType = structureHeader.type;
        const newTypeElement = 
            this._elementFromHtml(ContainerHtml.getType(headerType));
        elementHeader.appendChild(newTypeElement);
        
        
        if(structureHeader['left-btn'] !== undefined) {
            const newHeaderBtns =
                this._elementFromHtml(HeaderHtml.getHeaderBtns());
            newTypeElement.appendChild(newHeaderBtns);
            const innerText = structureHeader['left-btn'];
            const btnLeft = 
                this._elementFromHtml(HeaderHtml.getLeftBtn(innerText));
            newHeaderBtns.appendChild(btnLeft);
        }

        const includeNameLabel = Object.keys(structureHeader).includes('name-label');
        const includeTextbox = Object.keys(structureHeader).includes('textbox');
        let newTitleElement = undefined;
        if(includeNameLabel === true || includeTextbox === true) {
            newTitleElement =
            this._elementFromHtml(HeaderHtml.getTitle());
            newTypeElement.appendChild(newTitleElement);
        }
        switch(structureHeader.type) {
            case 'display':
                this.#mechanicDisplay(newTitleElement, structureHeader);
                break;
            case 'form':
                this.#mechanicForm(newTitleElement, structureHeader);
                break;
            default:
                MenuElement.mechanicMenu(elementHeader, structureHeader);
                return;
        }
        if(structureHeader['right-btn'] !== undefined) {
            const newHeaderBtns =
                this._elementFromHtml(HeaderHtml.getHeaderBtns());
            newTypeElement.appendChild(newHeaderBtns);
            const innerText = structureHeader['right-btn'];
            const btnRight =
                this._elementFromHtml(HeaderHtml.getRightBtn(innerText));
            newHeaderBtns.appendChild(btnRight);
        }
    }

    static #mechanicDisplay(elementTitle, structureHeader) {

        if(structureHeader['name-label'] !== undefined){
            const innerText = structureHeader['name-label'];
            const labelName = 
                this._elementFromHtml(HeaderHtml.getNameLabel(innerText));
            elementTitle.appendChild(labelName);
        }

        if(structureHeader['time-title'] !== undefined) {
            const dataset = structureHeader['time-title'];
            const titleTime =
                this._elementFromHtml(HeaderHtml.getTimeTitle(dataset));
            elementTitle.appendChild(titleTime);
        }
    }

    static #mechanicForm(elementTitle, structureHeader) {
        if(structureHeader['textbox'] !== undefined) {
            const route = structureHeader['textbox'];
            let textboxName = 
                this._elementFromHtml(HeaderHtml.getNameTextBox(route));
            elementTitle.appendChild(textboxName);
        }
    }


}