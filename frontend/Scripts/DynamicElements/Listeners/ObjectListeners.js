import ContainerStructure from "../Structures/ContainerStructure.js";
import HtmlElement from "../Elements/HtmlElement.js";
import ContainerElement from "../Elements/ContainerElement.js";
import ObjectElement from "../Elements/ObjectElement.js";
import FormManager from "../../Managers/FormManager.js";
import DataManager from "../../Managers/DataManager.js";
import MenuElement from "../Elements/MenuElement.js";
import BreakManager from "../../Managers/BreakManager.js";
export default class ObjectListeners {
    static setObjectListeners(elementObject) {
        const objectId = elementObject.classList[1];
        if(objectId === 'new') {
            elementObject.addEventListener('click', () => {
                const route = elementObject.classList[0];
                const activeTable = true;
                const structureContainer =
                ContainerStructure.getFormStructure(route, undefined, activeTable);
                const elementContainer =
                    HtmlElement.getParentElement(elementObject, 'container');
                HtmlElement.focusContainer(elementContainer);
                ContainerElement.updateContainer(elementContainer, structureContainer);
                const formDataset = FormManager.getEmptyFormDataset(elementObject);
                FormManager.populateForm(elementContainer, formDataset);
            })   
            return;
        }
        elementObject.addEventListener('mouseenter', () => {
            HtmlElement.addHoverToElement(elementObject);
        })
        elementObject.addEventListener('mouseleave', () => {
            HtmlElement.removeHoverFromElement(elementObject);
        })
        elementObject.addEventListener('click', () => {
            const elementDisplay = HtmlElement.getParentElement(elementObject, 'display');
            if(elementDisplay === undefined) {return;}
            const collection = DataManager.getLocalCollection('people');
            const objectId = elementObject.classList[1];
            let inCollection = false;
            for(const person of collection) {
                if(objectId  === person._id) {
                    inCollection = true;
                    break;
                }
            }
            if(inCollection === false) {
                return;
            }
            const activeDisplay = elementDisplay.querySelector('.unassigned') !== null;
            if(activeDisplay === true) {
                ObjectElement.moveObject(elementObject);
            }
        })
        const btnDelete = elementObject.querySelector('.left-btn');
        if(btnDelete !== null){
            btnDelete.addEventListener('click', () => {
                const elementObject = 
                    HtmlElement.getParentElement(btnDelete, 'object');
                const route = elementObject.classList[0];
                const id = elementObject.classList[1];
                DataManager.deleteLocalData(route, id);
                elementObject.remove();
            })
        }
        const btnEdit = elementObject.querySelector('.right-btn');
        if(btnEdit !== null){    
            btnEdit.addEventListener('click', () => {
                const route = elementObject.classList[0];
                const id = elementObject.classList[1];
                const activeTable = true;
                const activateTable = MenuElement.tabType === 'break';
                const structureContainer =
                ContainerStructure.getFormStructure(route, id, activeTable, activateTable);
                const elementContainer =
                    HtmlElement.getParentElement(elementObject, 'container');
                HtmlElement.focusContainer(elementContainer);
                ContainerElement.updateContainer(elementContainer, structureContainer);
                const dataset = DataManager.getLocalDataset(route, id);
                FormManager.populateForm(elementContainer, dataset, route);
            })
        }
        const elementHeader = elementObject.querySelector('.object-header');
        elementHeader.addEventListener('click', () => {
            const tab = MenuElement.tabType;
            if(tab !== 'break') {return;}
            BreakManager.mechanicBreak(elementObject);
        })
    }
    
}