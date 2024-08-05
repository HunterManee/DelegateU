
import HtmlElement from "./HtmlElement.js";
import MenuHtml from "../Html/Menu/MenuHtml.js";

import ContainerElement from "./ContainerElement.js";
import DataManager from "../../Managers/DataManager.js";
import DateTimeManager from "../../Managers/DateTimeManger.js";
import ObjectElement from "./ObjectElement.js";
import ObjectStructure from "../Structures/ObjectStructure.js";
import SortingManager from "../../Managers/SortingManger.js";
import MenuElement from "./MenuElement.js";

export default class HolderElement extends HtmlElement {
    static route = 'roles';
    static dayFilter;
    static mealFilter = 'All';

    static appendHolder(holderName, intEmptyContainers = 0, type = 'new') {
        const newHolder =
            this._elementFromHtml(MenuHtml.getHolder(holderName));
        document.body.appendChild(newHolder);

        if(holderName === 'body') {
            this.mechanicHolder(newHolder);
            return;
        }

        if(holderName === 'header') {
            DateTimeManager.updateMealHours();
            const newTabs = 
                this._elementFromHtml(MenuHtml.getPageTabs());
            newHolder.appendChild(newTabs);
        }

        for(let i = 0 ; i < intEmptyContainers; i++) {
            ContainerElement.appendContainer(newHolder, type);
        }
    }

    static mechanicHolder(elementHolder) {
        this.clearHolder(elementHolder);
        if(elementHolder.id === 'body') {
            const route = this.route;
            const collectionContainer = DataManager.getLocalCollection(route);
            const sortedCollectionContainer = 
                SortingManager.getSortedCollection(collectionContainer);
            const collectionObject = DataManager.getLocalCollection('people');
            const sortedCollectionObject = 
                SortingManager.getSortedCollection(collectionObject);

            const collection = {};
            for(const datasetContainer of sortedCollectionContainer) {
                collection[datasetContainer._id] = new Array();
            }
            let key = 'role';
            const day = this.dayFilter;
            if(this.route === 'positions') {
                key = `${day}Position`;
            }
            for(const datasetObject of sortedCollectionObject) {
                if(datasetObject[key] === 'unassigned') {
                    continue;
                }
                if(MenuElement.tabType === 'break' && 
                    datasetObject[`${day}BreakStatus`] === 'Break') {
                    continue;
                }

                if(this.mealFilter === 'All' && 
                    datasetObject[this.dayFilter] === true) {
                    collection[datasetObject[key]].push(datasetObject);
                    continue;
                }

                const canWork = DateTimeManager.canWorkMeal(datasetObject);
                if(canWork === true) {
                    collection[datasetObject[key]].push(datasetObject)
                }
            }
            let strInfoKey = HolderElement.route;
            const boolLeftBtn = true;
            const boolRightBtn = true;
            for(const containerId of Object.keys(collection)) {
                ContainerElement.appendContainer(elementHolder, containerId);
                const elementsContainer = elementHolder.querySelectorAll('.container');
                const elementContainer = elementsContainer[elementsContainer.length - 1];
                const contentBucket = elementContainer.querySelector('.content');
                for(const datasetPerson of collection[containerId]) {
                    let timeHeader = datasetPerson;
                    const breakCollection = DataManager.getLocalCollection('breaks')
                        const completedBreaks = breakCollection.filter(_break => _break.completed === true );
                        const personBreaks = completedBreaks.filter(_break => _break.personId === datasetPerson._id);
                    if(MenuElement.tabType === 'break' &&
                        personBreaks.length > 0) {
                            const breakStart = new Date(personBreaks[personBreaks.length - 1].start);
                            const startHours = breakStart.getHours();
                            const startMin = breakStart.getMinutes();
                            const startMilitary = `${startHours}:${startMin}`;
                            const startStandard = DateTimeManager.converMilitaryToStandard(startMilitary);
                            const breakEnd = new Date(personBreaks[personBreaks.length - 1].end);
                            const endHours = breakEnd.getHours();
                            const endMinutes = breakEnd.getMinutes();
                            const endMilitary = `${endHours}:${endMinutes}`;
                            const endStandard = DateTimeManager.converMilitaryToStandard(endMilitary);
                            timeHeader = `${startStandard} - ${endStandard}`;
                    }
                    const structureObject = 
                    ObjectStructure.getObjectStructure(boolLeftBtn, boolRightBtn, datasetPerson, strInfoKey, timeHeader);
                    const elementObject = 
                    ObjectElement.mechanicObject(contentBucket, structureObject, datasetPerson);
                    if(MenuElement.tabType === 'break' &&
                        personBreaks.length > 0){
                        elementObject.classList.add('had');
                    }
                }
                
            }
            return;
        }
        ContainerElement.appendContainer(elementHolder, 'menu');

    }

    static clearHolder(elementHolder) {
        this.containerElements = {};
        this.objectElements = {};
        const elementsContainer = elementHolder.querySelectorAll('.container');
        for(const element of elementsContainer) {
            element.remove();
        }
    }

    static clearAll() {
        const HtmlBody = document.querySelector('body')
        const elementsHolder = HtmlBody.querySelectorAll('.holder');
        for(const element of elementsHolder) {
            element.remove();
        }
        const elementLogin = document.getElementById('login-background');
        if(elementLogin !== null) {
            elementLogin.remove();
        }
    }
}