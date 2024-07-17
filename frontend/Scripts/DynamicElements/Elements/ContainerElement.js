import ContainerHtml from "../Html/Container/ContainerHtml.js";
import ContainerStructure from "../Structures/ContainerStructure.js";
import HtmlElement from "./HtmlElement.js";
import HolderElement from "./HolderElement.js";
import HeaderElement from './HeaderElement.js';
import BodyElement from "./BodyElement.js";
import FooterElement from "./FooterElement.js"
import MenuElement from "./MenuElement.js";
import DataManager from "../../Managers/DataManager.js";

export default class ContainerElement extends HtmlElement{
    
    static appendContainer(elementHolder, id = undefined) {
        const route = HolderElement.route;

        const newContainer = 
            this._elementFromHtml(ContainerHtml.getContainer(route, id));
        elementHolder.appendChild(newContainer);
        if(elementHolder.id !== 'body') {
            MenuElement.resetMenuElement(elementHolder);
            return;
        }
        HtmlElement.containerElements[id] = newContainer;
        this.resetContainerElement(newContainer);
    }
    static resetContainerElement(elementContainer) {
        const route = elementContainer.classList[0];
        const id = elementContainer.classList[1];
        const dataset = DataManager.getLocalDataset(route, id);
        let structureContainer;
        if(dataset !== undefined) {
            const isActive = false;    
            structureContainer =
            ContainerStructure.getDisplayStructure(dataset, isActive);
            ContainerElement.updateContainer(elementContainer, structureContainer);
            return;
        }
        const elementHolder = elementContainer.parentNode;
        MenuElement.resetMenuElement(elementHolder);
    }

    static updateContainer(elementContainer, structureContainer) {
        HtmlElement.clearStylesFromContainer(elementContainer);
        const structureHeader = structureContainer['header'];
        if(structureHeader !== undefined) {
            const elementHeader = elementContainer.querySelector('.header');
            HeaderElement.mechanicHeader(elementHeader, structureHeader);
        }
        
        const structureBody = structureContainer['body'];
        if(structureBody !== undefined) {
            const elementBody = elementContainer.querySelector('.body');
            BodyElement.mechanicBody(elementBody, structureBody);
        }
        
        const structureFooter = structureContainer['footer'];
        if(structureFooter !== undefined) {
            const elementFooter = elementContainer.querySelector('.footer');
            FooterElement.mechanicFooter(elementFooter, structureFooter);
        }
    }

    static clearElementFromType(layoutElement) {
        const childNodes = layoutElement.childNodes;
        for(const node of childNodes) {
            HtmlElement.removeElement(node);
        }
    }
}


