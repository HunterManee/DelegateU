import ContainerHtml from "../Html/Container/ContainerHtml.js";
import DisplayFooterHtml from "../Html/Display/DisplayFooterHtml.js"
import FormFooterHtml from "../Html/Form/FormFooterHtml.js";
import HtmlElement from "./HtmlElement.js";
import ContainerElement from "./ContainerElement.js";

export default class FormElement extends HtmlElement {
    static mechanicFooter(elementFooter, structureFooter) {
        ContainerElement.clearElementFromType(elementFooter);
        const footerType = structureFooter.type;
        const newTypeElement =
            this._elementFromHtml(ContainerHtml.getType(footerType));
        elementFooter.appendChild(newTypeElement);

        switch(footerType) {
            case 'display':
                this.#mechanicDisplay(newTypeElement, structureFooter);
                return;
            case 'form':
                this.#mechanicForm(newTypeElement, structureFooter);
                return;
        }
    }

    static #mechanicDisplay(elementType, structureFooter) {

        if(structureFooter['assign'] !== undefined) {
            const innerText = structureFooter['assign'];
            const newAssignBtn =
                this._elementFromHtml(DisplayFooterHtml.getAssignEventBtn(innerText));
            elementType.appendChild(newAssignBtn);
        }
    }

    static #mechanicForm(elementType, structureForm) {
        let btnsFormEvent
        if(structureForm['form-event-btns'] === true) {
            btnsFormEvent = 
                this._elementFromHtml(FormFooterHtml.getFormEventBtns());
            elementType.appendChild(btnsFormEvent);
        }
        if(structureForm['create'] === true) {
            const btnCreate =
                this._elementFromHtml(FormFooterHtml.getCreateBtn());
            btnsFormEvent.appendChild(btnCreate);
        }
        if(structureForm['close'] === true){
            const btnClose =
                this._elementFromHtml(FormFooterHtml.getCloseBtn());
            btnsFormEvent.appendChild(btnClose);
        }
        if(structureForm['submit'] !== undefined) {
            const innerText = structureForm['submit'];
            const btnSumbit =
                this._elementFromHtml(FormFooterHtml.getSubmitBtn(innerText));
            btnsFormEvent.appendChild(btnSumbit);
        }
    }  
}