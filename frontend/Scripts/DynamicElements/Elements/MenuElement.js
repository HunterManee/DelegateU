import DataManager from "../../Managers/DataManager.js";
import HeaderHtml from "../Html/Container/HeaderHtml.js";
import MenuHtml from "../Html/Menu/MenuHtml.js";
import MenuStructure from "../Structures/MenuStructure.js";
import ContainerElement from "./ContainerElement.js";
import HtmlElement from "./HtmlElement.js";
import ObjectElement from "./ObjectElement.js";

export default class MenuElement extends HtmlElement{
    static tabType;

    static setDefaultTab() {
        this.tabType = 'filter';
        const roles = DataManager.getLocalCollection('roles');
        if(roles.length === 0) {this.tabType = 'new'}
    }

    static mechanicMenu(elementHeader, structureHeader) {
        switch(structureHeader.type) {
            case 'new':
            case 'break':
            case 'route':
                this.#mechanicNameLabel(elementHeader, structureHeader);
                return; 
            case 'filter':
                this.#mechanicFilter(elementHeader, structureHeader);
                return;
        }
    }
    static #mechanicNameLabel(elementHeader, structureHeader) {
        const elementTitle = elementHeader.querySelector('.title');
        if(structureHeader['name-label'] !== undefined){
            const innerText = structureHeader['name-label'];
            const newNameLabel = 
                this._elementFromHtml(HeaderHtml.getNameLabel(innerText));
            elementTitle.appendChild(newNameLabel);
        }
    }
    static #mechanicFilter(elementHeader, structureHeader) {
        const elementType = elementHeader.querySelector('.filter');
        const innerText = structureHeader['name-label'];
        const newNameLabel =
            this._elementFromHtml(HeaderHtml.getNameLabel(innerText));
        elementType.appendChild(newNameLabel);
        //Day
        const newDayFilter =
        this._elementFromHtml(MenuHtml.getFilterType('day'));
        elementType.appendChild(newDayFilter);
        const newThursdayBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('thu', 'Thu'));
        newDayFilter.appendChild(newThursdayBtn);
        const newFridayBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('fri', 'Fri'));
        newDayFilter.appendChild(newFridayBtn);
        const newSaturdayBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('sat', 'Sat'));
        newDayFilter.appendChild(newSaturdayBtn);
        const newSundayBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('sun', 'Sun'));
        newDayFilter.appendChild(newSundayBtn);
        const newMondayBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('mon', 'Mon'));
        newDayFilter.appendChild(newMondayBtn);
        const newTuesdayBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('tue', 'Tue'));
        newDayFilter.appendChild(newTuesdayBtn);
        const newWednesdayBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('wed', 'Wed'));
        newDayFilter.appendChild(newWednesdayBtn);
        //Meal
        const newMealFilter =
        this._elementFromHtml(MenuHtml.getFilterType('meal'));
        elementType.appendChild(newMealFilter);
        const newAllBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('All'));
        newMealFilter.appendChild(newAllBtn);
        const newBreakfastBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('Breakfast'));
        newMealFilter.appendChild(newBreakfastBtn);
        const newBrunchBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('Brunch'));
        newMealFilter.appendChild(newBrunchBtn);
        const newLunchBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('Lunch'));
        newMealFilter.appendChild(newLunchBtn);
        const newDinnerBtn =
        this._elementFromHtml(MenuHtml.getFilterBtn('Dinner'));
        newMealFilter.appendChild(newDinnerBtn);
    }
    static resetMenuElement(elementHolder) {
        const isMenuHeader = elementHolder.id === 'header';
        let type = 'route';
        if(isMenuHeader === true) {
            type = this.tabType;
        }
        const elementContainer = elementHolder.querySelector('.container');
        const structureContainer =
        MenuStructure.getMenuStructure(type);
        ContainerElement.updateContainer(elementContainer, structureContainer);
        if(structureContainer['object'] !== undefined) {
            const elementBodyFilter = elementContainer.querySelector('.body .new');
            ObjectElement.mechanicObject(elementBodyFilter, structureContainer['object'])
        }
        HtmlElement.stickContainer(elementHolder, structureContainer);
        
    }
}