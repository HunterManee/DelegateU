import ContainerHtml from "../Html/Container/ContainerHtml.js"
import DisplayBodyHtml from "../Html/Display/DisplayBodyHtml.js";
import FormBodyHtml from "../Html/Form/FormBodyHtml.js"
import ContainerElement from "./ContainerElement.js";
import HtmlElement from "./HtmlElement.js";
import DataManager from "../../Managers/DataManager.js";
import SortingManager from "../../Managers/SortingManger.js";

export default class BodyElement extends HtmlElement{

    static mechanicBody(elementBody, structureBody) {
        ContainerElement.clearElementFromType(elementBody);
        const bodyType = structureBody.type;
        const newTypeElement =
            this._elementFromHtml(ContainerHtml.getType(bodyType));
        elementBody.appendChild(newTypeElement);

        switch (bodyType) {
            case 'display':
                this.#mechanicDisplay(newTypeElement, structureBody)
                return;
            case 'form':
                this.#mechanicForm(newTypeElement, structureBody)
                return;
        }

    }

    static #mechanicDisplay(elementType, structureBody) {
        if(structureBody['content'] === true) {
            const newContent = 
                this._elementFromHtml(DisplayBodyHtml.getContent());
            elementType.appendChild(newContent);
        }
        if(structureBody['unassigned'] === true) {
            const newUnassigned =
                this._elementFromHtml(DisplayBodyHtml.getUnassigned());
            elementType.appendChild(newUnassigned);
        }
        if(structureBody['assigned'] === true) {
            const newAssigned =
                this._elementFromHtml(DisplayBodyHtml.getAssigned());
            elementType.appendChild(newAssigned);
        }
    }

    static #mechanicForm(elementType, structureBody) {

        if(structureBody['role-btns'] === true) {
            const newRoles =
                this._elementFromHtml(FormBodyHtml.getFormRoles());            
            const roles = DataManager.getLocalCollection('roles');
            const sortedRoles = SortingManager.getSortedCollection(roles);
            for(const role of sortedRoles){
                const newRoleInput =
                    this._elementFromHtml(FormBodyHtml.getFormRoleInput(role));
                const newRoleBtn =
                    this._elementFromHtml(FormBodyHtml.getFormRoleBtn(role));

                newRoles.appendChild(newRoleInput);
                newRoles.appendChild(newRoleBtn);
            }
            elementType.appendChild(newRoles);
        }
        if(structureBody['meal-btns'] === true) {
            const newMealPeriods = 
                this._elementFromHtml(FormBodyHtml.getFormMealPeriods());
            elementType.appendChild(newMealPeriods);
        }
        const boolActive = structureBody['time-table']
        const boolActivate = structureBody['activate-table'];
        const newFormTimes =
            this._elementFromHtml(FormBodyHtml.getFormTimes(boolActive, boolActivate));
        elementType.appendChild(newFormTimes);
        
    }

    

}