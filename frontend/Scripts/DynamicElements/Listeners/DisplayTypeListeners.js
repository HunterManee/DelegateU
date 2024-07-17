import DataManager from "../../Managers/DataManager.js";
import FormManager from "../../Managers/FormManager.js";
import ContainerElement from "../Elements/ContainerElement.js";
import HolderElement from "../Elements/HolderElement.js";
import HtmlElement from "../Elements/HtmlElement.js";
import MenuElement from "../Elements/MenuElement.js";
import ObjectElement from "../Elements/ObjectElement.js";
import ContainerStructure from "../Structures/ContainerStructure.js";

export default class DisplayTypeListeners {

    static setDisplayHeaderListeners(elementDisplay) {
        const elementHeader = HtmlElement.getParentElement(elementDisplay, 'header');
        const elementContainer = HtmlElement.getParentElement(elementHeader, 'container');
        elementHeader.addEventListener('mouseenter', () => {
            const activeDisplay = elementContainer.querySelector('.unassigned') !== null;
            if(activeDisplay === false) {
                HtmlElement.addHoverToElement(elementHeader);
            }
        })
        elementHeader.addEventListener('mouseleave', () => {
            const activeDisplay = elementContainer.querySelector('.unassigned') !== null;
            if(activeDisplay === false) {
                HtmlElement.removeHoverFromElement(elementHeader);
            }
        })
        const activeDisplay = elementContainer.querySelector('.unassigned') !== null;
        if(activeDisplay === false) {
            const btnDelete = elementDisplay.querySelector('.left-btn');
            btnDelete.addEventListener('click', () => {
                const elementContainer = 
                    HtmlElement.getParentElement(btnDelete, 'container');
                const route = elementContainer.classList[0];
                const id = elementContainer.classList[1];
                DataManager.deleteLocalData(route, id);
                elementContainer.remove();
            })
            const btnEdit = elementDisplay.querySelector('.right-btn');
            btnEdit.addEventListener('click', () => {
                const elementContainer = 
                    HtmlElement.getParentElement(btnEdit, 'container');
                HtmlElement.focusContainer(elementContainer);
                const route = elementContainer.classList[0];
                const id = elementContainer.classList[1];
                const activeTable = false;
                const structureContainer =
                ContainerStructure.getFormStructure(route, id, activeTable);
                ContainerElement.updateContainer(elementContainer, structureContainer);
                const dataset = DataManager.getLocalDataset(route, id);
                FormManager.populateForm(elementContainer, dataset, route);
            })
        }
    }
    
    static setDisplayFooterListeners(elementDisplay) {
        const elementContainer = 
            HtmlElement.getParentElement(elementDisplay, 'container');
        elementContainer.addEventListener('mouseenter', () => {
            if(MenuElement.tabType !== 'break') {
                HtmlElement.addHoverToElement(elementContainer);
            }
        })
        elementContainer.addEventListener('mouseleave', () => {
            const activeDisplay = elementContainer.querySelector('.unassigned') !== null;
            if(activeDisplay === false) {
                HtmlElement.removeHoverFromElement(elementContainer);
            }
        })

        const btnAssign = elementDisplay.querySelector('.assign');
        btnAssign.addEventListener('click', () => {
            const btnInnerText = btnAssign.innerText;
            if(btnInnerText === 'ASSIGN PEOPLE') {
                HtmlElement.focusContainer(elementContainer);
                let dataset = undefined;
                const route = elementContainer.classList[0];
                const id = elementContainer.classList[1];
                dataset = DataManager.getLocalDataset(route, id);
                const isActive = true;
                const structureContainer =
                ContainerStructure.getDisplayStructure(dataset, isActive);
                ContainerElement.updateContainer(elementContainer, structureContainer);
                HtmlElement.stickContainer(elementContainer, structureContainer);
                ObjectElement.buildObjects(elementContainer);
                HtmlElement.addHoverToElement(elementContainer);

            }else if(btnInnerText === 'DONE'){
                HtmlElement.unfocusContainer(elementContainer);
                ContainerElement.resetContainerElement(elementContainer);
                ObjectElement.buildObjects(elementContainer);
                HtmlElement.removeHoverFromElement(elementContainer);
            }
            
        })
    }
}