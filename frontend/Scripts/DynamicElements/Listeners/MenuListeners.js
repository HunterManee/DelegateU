import ContainerStructure from "../Structures/ContainerStructure.js";
import HtmlElement from "../Elements/HtmlElement.js";
import ContainerElement from "../Elements/ContainerElement.js";
import FormManager from "../../Managers/FormManager.js";
import HolderElement from "../Elements/HolderElement.js";
import MenuElement from "../Elements/MenuElement.js";
import DateTimeManager from "../../Managers/DateTimeManger.js";
import ClockManager from "../../Managers/ClockManager.js";
import BreakManager from "../../Managers/BreakManager.js";


export default class MenuListeners {

    static setTabListeners(elementPageTabs) {
        const elementHolder = 
            HtmlElement.getParentElement(elementPageTabs, 'holder');
        elementPageTabs = elementPageTabs.querySelectorAll('.tab');
        for(const elementTab of elementPageTabs) {

            if(MenuElement.tabType === elementTab.value) {
                HtmlElement.addActiveToElement(elementTab);
            }
            elementTab.addEventListener('click', () => {
                HtmlElement.unfocusContainer();
                for(const element of elementPageTabs) {
                    HtmlElement.removeActiveFromElement(element);
                }
                if(elementTab.value === 'attendance' ||
                    elementTab.value === 'break') {
                        HtmlElement.clearStylesFromContainer(elementHolder);
                }
                HtmlElement.addActiveToElement(elementTab);
                MenuElement.tabType = elementTab.value;
                if(elementTab.value === 'upload') {
                    const elementContainer = elementHolder.querySelector('.container');
                    HtmlElement.focusContainer(elementContainer);
                }
                HolderElement.clearHolder(elementHolder);
                ContainerElement.appendContainer(elementHolder, 'menu');

                if(elementTab.value === 'filter') {
                    ClockManager.updateDayFilterCurrent();
                    ClockManager.updateMealFilterCurrent();
                }

                if(elementTab.value === 'upload') {
                    return;
                }
                
                const elementBodyHolder = document.getElementById('body');
                HolderElement.mechanicHolder(elementBodyHolder);

                if(elementTab.value === 'break') {
                    BreakManager.onObjectBreak();
                }
            })
        }
    }

    static setFilterListeners(elementMenu) {
        const elementDayFilter = elementMenu.querySelector('#day');
        const btnsDay = elementDayFilter.querySelectorAll('button');
        for(const btnDay of btnsDay) {
            if(btnDay.id === HolderElement.dayFilter) {
                HtmlElement.addActiveToElement(btnDay);
            }
            btnDay.addEventListener('click', () => {
                HolderElement.dayFilter = btnDay.value;
                for(const btn of btnsDay) {
                    HtmlElement.removeActiveFromElement(btn);
                }
                const elementHolderHeader = document.getElementById('header');
                MenuElement.resetMenuElement(elementHolderHeader);
                ClockManager.updateDayFilterCurrent();
                ClockManager.updateMealFilterCurrent();
                DateTimeManager.updateMealHours();
                const elementHolderBody = document.getElementById('body');
                HolderElement.mechanicHolder(elementHolderBody);
            }) 
        }

        const elementMealFilter = elementMenu.querySelector('#meal');
        const btnsMeal = elementMealFilter.querySelectorAll('button');
        for(const btnMeal of btnsMeal) {
            if(btnMeal.id === HolderElement.mealFilter) {
                HtmlElement.addActiveToElement(btnMeal);
            }
            btnMeal.addEventListener('click', () => {
                HolderElement.mealFilter = btnMeal.value;
                for(const btn of btnsMeal) {
                    HtmlElement.removeActiveFromElement(btn);
                }
                HtmlElement.addActiveToElement(btnMeal);
                const elementHolderBody = document.getElementById('body');
                HolderElement.mechanicHolder(elementHolderBody);
            })
        }
    }

    
    static setNewListeners(elementMenu) {
        const elementHeader = 
            HtmlElement.getParentElement(elementMenu, 'header');
        elementMenu.addEventListener('mouseenter', () => {
            HtmlElement.addHoverToElement(elementHeader);
        })
        elementMenu.addEventListener('mouseleave', () => {
            HtmlElement.removeHoverFromElement(elementHeader);
        })
        elementMenu.addEventListener('click', () => {
            const route = HolderElement.route;
            const structureContainer =
            ContainerStructure.getFormStructure(route);
            const elementContainer = elementHeader.parentNode;
            HtmlElement.focusContainer(elementContainer);
            ContainerElement.updateContainer(elementContainer, structureContainer);
            const formDataset = FormManager.getEmptyFormDataset(elementContainer);
            FormManager.populateForm(elementContainer, formDataset);
        })
    }

    static setRouteListeners(elementMenu) {
        const elementHeader = 
            HtmlElement.getParentElement(elementMenu, 'header');
        elementHeader.addEventListener('click', () => {
            const route = HolderElement.route;
            const labelName = elementMenu.querySelector('.name-label');
            if(route === 'roles') {
                HolderElement.route = 'positions';
                labelName.innerText = 'Schedule';
            }else if(route === 'positions') {
                HolderElement.route = 'roles';
                labelName.innerText = 'Delegate';
            }
            const holderMenuHeader = document.getElementById('header');
            HolderElement.clearHolder(holderMenuHeader);
            ContainerElement.appendContainer(holderMenuHeader, 'menu');
            const holderMenuBody = document.getElementById('body');
            HolderElement.mechanicHolder(holderMenuBody);
            if(MenuElement.tabType === 'break') {
                BreakManager.onObjectBreak();
            }
        })
    }
}