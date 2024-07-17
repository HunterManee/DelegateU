
export default class HtmlElement {
    static containerElements = {};
    static objectElements = {};

    static _elementFromHtml(html){
        const template = document.createElement('template');
        template.innerHTML = html.trim();
        return template.content.firstElementChild;
    }
    static getParentElement(elementCurrent, elementName) {
        const elementParent = elementCurrent.parentNode;
        if(elementParent === null) {
            return undefined;
        }
        if(elementParent.classList.contains(elementName)) {
            return elementParent;
        }
        if(elementParent === document.body) {
            return undefined;
        }
        return this.getParentElement(elementParent, elementName);
    }
    static removeElement(element) {
        if(element !== null) {
            element.remove();
        }
    }
    static addHoverToElement(element) {
        if(element !== null) {
            element.classList.add('hover');
        }
    }
    static removeHoverFromElement(element) {
        if(element !== null) {
            element.classList.remove('hover');
        }   
    }
    static addActiveToElement(element) {
        if(element !== null) {
            element.classList.add('active');
        }
    }
    static removeActiveFromElement(element) {
        if(element !== null) {
            element.classList.remove('active');
        }
    }
    static addCurrentToElement(element) {
        if(element !== null) {
            element.classList.add('current');
        }
    }
    static removeCurrentFromElement(element) {
        if(element !== null) {
            element.classList.remove('current');
        }
    }
    static addHideToElement(element) {
        if(element !== null) {
            element.classList.add('hide');
        }
    }
    static removeHideFromElement(element) {
        if(element !== null) {
            element.classList.remove('hide');
        }    
    }
    static #addStickyToElement(element) {
        if(element !== null) {
            element.classList.add('sticky');
        }
    }
    static #removeStickyFromElement(element) {
        if(element !== null) {
            element.classList.remove('sticky');
        }
    }
    static stickContainer(elementContainer, structureContainer) {
        if(structureContainer['header'] !== undefined) { 
            const structureHeader = structureContainer['header'];
            if(structureHeader['type'] === 'filter' ||
                structureHeader['type'] === 'new'  ||
                structureHeader['type'] === 'route') {
                    this.#addStickyToElement(elementContainer);
                    return;
            } 
            
            if(structureHeader['type'] === 'display') {
                const elementHeader = elementContainer.querySelector('header');
                this.#addStickyToElement(elementHeader);
            }
            
        }
        if(structureContainer['body'] !== undefined) {
            const structureBody = structureContainer['body'];
            if(structureBody['unassigned'] === true) {
                const elementHeader = elementContainer.querySelector('.header');
                this.#addStickyToElement(elementHeader);
                const route = elementContainer.classList[0];
                if(route === 'positions') {
                    const elementContent = elementContainer.querySelector('.content');
                    this.#addStickyToElement(elementContent);
                }
                const elementFooter = elementContainer.querySelector('.footer');
                this.#addStickyToElement(elementFooter);
                return;
            }
        }

    }
    static clearStylesFromContainer(elementContainer) {
        if(elementContainer.classList.contains('sticky')) {
            this.#removeStickyFromElement(elementContainer)
        }
        const stickyElements = elementContainer.querySelectorAll('.sticky');
        for(const element of stickyElements) {
            this.#removeStickyFromElement(element);
        }
        if(elementContainer.classList.contains('active')) {
            elementContainer.classList.remove('active');
        }
        const activeElements = elementContainer.querySelectorAll('.active');
        for(const element of activeElements) {
            element.classList.remove('active');
        }
        if(elementContainer.classList.contains('hover')) {
            elementContainer.classList.remove('hover');
        }
        const hoverElements = elementContainer.querySelectorAll('.hover');
        for(const element of hoverElements) {
            element.classList.remove('hover');
        }
    }
    static #addFocusToHolder(elementHolder) {
        elementHolder.classList.add('focus');
    }
    static #removeFocusFromHolder(elementHolder) {
        elementHolder.classList.remove('focus');
    }
    static focusContainer(elementContainer) {
        const pageTabs = document.querySelector('.page-tabs');
        const activeElement = pageTabs.querySelector('.active');
        if(activeElement.value != 'upload') {
            this.addHideToElement(pageTabs);        
        }
        const id = elementContainer.classList[1];
        const elementsHolder = document.querySelectorAll('.holder');
        this.addHideToElement(elementsHolder[2]);
        if(id === 'menu'){
            this.#addFocusToHolder(elementsHolder[0]);
            this.addHideToElement(elementsHolder[1]);
            return;
        }
        this.addHideToElement(elementsHolder[0]);
        this.#addFocusToHolder(elementsHolder[1]);
        const elementsContainer = elementsHolder[1].querySelectorAll('.container');
        for(const element of elementsContainer) {
            const elementId = element.classList[1];
            if(elementId !== id) {
                this.addHideToElement(element);
            }
        }
    }
    static unfocusContainer() {
        const pageTabs = document.querySelector('.page-tabs');
        this.removeHideFromElement(pageTabs);

        const elementsHolder = document.querySelectorAll('.holder');
        for(const element of elementsHolder) {
            this.#removeFocusFromHolder(element);
            this.removeHideFromElement(element);
        }
        const elementsContainer = elementsHolder[1].querySelectorAll('.container');
        for(const element of elementsContainer) {
            this.removeHideFromElement(element);
        }
    }

    static addBreakToElement(element) {
        if(element !== null) {
            element.classList.add('break');
        }    
    }
    static removeBreakFromElement(element) {
        if(element !== null) {
            element.classList.remove('break');
        }    
    }
}