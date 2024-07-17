import HolderElement from "../DynamicElements/Elements/HolderElement.js";
import HtmlElement from "../DynamicElements/Elements/HtmlElement.js";
import MenuElement from "../DynamicElements/Elements/MenuElement.js";
import ObjectElement from "../DynamicElements/Elements/ObjectElement.js";
import BreakManager from "./BreakManager.js";
import DataManager from "./DataManager.js";
import DateTimeManager from "./DateTimeManger.js";

export default class SortingManager {
    static getSortedCollection(collection) {
        let array = new Array();
        const relationObject = {};
        for(const dataset of collection) {
            relationObject[dataset.name] = dataset;
            array.push(dataset.name);
        }
        array = array.sort();
        for(let i = 0; i < array.length; i++) {
            array[i] = relationObject[array[i]];
        }
        return array;
    }

    static sortObjectsInContainer(elementObjectHolder, structureObject) {
        const objects = elementObjectHolder.querySelectorAll('.object');
        const elementsObject = {};
        for(const object of objects) {
            const objectId = object.classList[1];
            elementsObject[objectId] = object;
            object.remove();
        }
        const peopleCollection = DataManager.getLocalCollection('people');
        const sortedCollection = this.getSortedCollection(peopleCollection);
        for(const dataset of sortedCollection) {
            if(elementsObject[dataset._id] === undefined) {continue;}
            structureObject['id'] = dataset._id;
            structureObject['name-header'] = dataset.name;
            structureObject['time-header'] = dataset;
            const day = HolderElement.dayFilter;
            if(MenuElement.tabType === 'break') {
                const dayBreakTimeMilitary = dataset[`${day}BreakTime`];
                const dayBreakTime = 
                    DateTimeManager.converMilitaryToStandard(dayBreakTimeMilitary);
                structureObject['time-header'] = dayBreakTime;

                const dayBreakStatus = dataset[`${day}BreakStatus`];
                if(dayBreakStatus !== 'Needs') {
                    structureObject['time-header'] = 
                        BreakManager.getBreakInnerText(dataset._id);
                }
            }
            ObjectElement.mechanicObject(elementObjectHolder, structureObject, dataset);
            if(MenuElement.tabType === 'break') {
                const elementObject = HtmlElement.objectElements[dataset._id];
                const elementBreak = HtmlElement.getParentElement(elementObject, 'break');
                if(elementBreak === undefined && dataset[`${day}BreakStatus`] === 'Had') {
                    elementObject.classList.add('had')
                }
            }
        }
    }
}