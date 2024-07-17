import HolderElement from "../DynamicElements/Elements/HolderElement.js";
import HtmlElement from "../DynamicElements/Elements/HtmlElement.js";
import MenuElement from "../DynamicElements/Elements/MenuElement.js";
import ObjectStructure from "../DynamicElements/Structures/ObjectStructure.js";
import DataManager from "./DataManager.js";
import DateTimeManager from "./DateTimeManger.js";
import SortingManager from "./SortingManger.js";

export default class BreakManager {
    static structureBreakCollection(collectionBreak) {
        for(const dataset of collectionBreak) {
            dataset._id = dataset.personId;
        }
    }
    static getBreakTime(startValue) {
        const codeDateFilter = DateTimeManager.getDayFilterCode();
        const startDate = new Date(codeDateFilter);
        const startArray = startValue.split(':');
        const startHour = parseInt(startArray[0]);
        const startMins = parseInt(startArray[1]);
        startDate.setHours(startHour + this.#getFairBreakTime(), startMins);
        const breakHour =  startDate.getHours();
        let hourText = breakHour.toString();
        if(hourText.length === 1) {hourText = '0'+hourText};
        const breakMins = startDate.getMinutes();
        let minText = breakMins.toString();
        if(minText.length === 1) {minText = '0'+minText};
        const breakValue = `${hourText}:${minText}`;
        return  breakValue;
    }

    static #getFairBreakTime() {
        return 4;
    }

    static validateBreakTimes(formDataset) {
        const days = new Array('thu', 'fri', 'sat', 'sun', 'mon', 'tue', 'wed');
        for(const day of days) {
            const startValue = formDataset[`${day}Start`];
            if(startValue === '') {
                formDataset[`${day}BreakTime`] = '';
                continue;
            }
            const breakValue = formDataset[`${day}BreakTime`];
            if(breakValue !== '') {continue;}
            formDataset[`${day}BreakTime`] = this.getBreakTime(startValue);
        }
    }

    static updateBreakClock() {
        const elementTabBreak = document.getElementById('break');
        if(elementTabBreak.classList.contains('active') === false) {
            return;
        }
        const todayDate = new Date();
        const hours = todayDate.getHours();
        const mins = todayDate.getMinutes();
        let timeString = `${hours}:${mins}`;
        timeString = 
            DateTimeManager.converMilitaryToStandard(timeString);
        const elementMenu = document.querySelector('.menu');
        const labelClock = elementMenu.querySelector('.header .name-label');
        labelClock.innerText = timeString;
    }

    static mechanicBreak(elementObject) {
        const elementDisplay = HtmlElement.getParentElement(elementObject, 'display');
        if(elementDisplay !== undefined) {
            this.startObjectBreak(elementObject);
            return;
        }
        const elementBreak = HtmlElement.getParentElement(elementObject, 'break');
        if(elementBreak !== undefined) {
            this.endObjectBreak(elementObject);
            return;
        }
    }

    static async startObjectBreak(elementObject, minutesBreakLength = 1) {
        const objectId = elementObject.classList[1];
        const dayFilterCode = DateTimeManager.getDayFilterCode();
        const currentDayFilter = new Date(dayFilterCode);
        const now = new Date();
        const hrs = now.getHours();
        const mins = now.getMinutes();
        const secs = now.getSeconds();
        const breakStartDate = 
            new Date(currentDayFilter.setHours(hrs, mins, secs));
        const breakEndDate = 
            new Date(currentDayFilter.setHours(hrs, mins + minutesBreakLength, secs));
        const breakBody = {
            personId: objectId,
            start: breakStartDate.toString(),
            end: breakEndDate.toString()
        }
        const personBody = {}
        const day = HolderElement.dayFilter;
        personBody[`${day}BreakStatus`] = 'Break';
        try {
            await DataManager.postLocalData('breaks', breakBody);
            DataManager.patchLocalData('people', objectId, personBody);
        }catch(error) {
            console.error({message: error});
        }

        //Move element to break from container
        const bodyBreak = document.querySelector('.menu .body .break');
        this.#pullObjectIntoContainer(elementObject, bodyBreak)
    }

    static onObjectBreak() {
        const elementBodyHolder = document.getElementById('body');
        const elementsObject = elementBodyHolder.querySelectorAll('.object');
        const bodyBreak = document.querySelector('.menu .body .break');
        for(const elementObject of elementsObject) {
            const objectId = elementObject.classList[1];
            const datasetPerson = DataManager.getLocalDataset('people', objectId);
            const breaks = DataManager.getLocalCollection('breaks');
            const day = HolderElement.dayFilter;
            if(breaks.length === 0) {
                const personBody = {};
                personBody[`${day}BreakStatus`] = 'Needs';
                DataManager.patchLocalData('people', objectId, personBody)
            }
            const dayBreakStatus = datasetPerson[`${day}BreakStatus`];
            if(dayBreakStatus === 'Had') {
                elementObject.classList.add('had');
                const objectTime = elementObject.querySelector('.object-time');
                const innerText = this.getBreakInnerText(objectId);
                objectTime.innerText = innerText;
            }
            if(dayBreakStatus !== 'Break') {continue;}
            this.#pullObjectIntoContainer(elementObject, bodyBreak);
        }
    }

    static getBreakStatus() {
        const collectionBreak = DataManager.getLocalCollection('breaks');
        if(collectionBreak.length === 0) {return;}
        const breakMap = {};
        for(const datasetBreak of collectionBreak) {
            breakMap[datasetBreak.personId] = datasetBreak;
        }
        const now = new Date();
        const keys = Object.keys(breakMap);
        for(const key of keys) {
            const endDate = new Date(breakMap[key].end);
            if(now <= endDate) {continue;}
            const day = HolderElement.dayFilter;
            const dayBreakStatus = `${day}BreakStatus`
            const datasetPerson = DataManager.getLocalDataset('people', key);
            if(datasetPerson[dayBreakStatus] !== 'Break'){continue;}
            const personBody = {};
            personBody[dayBreakStatus] = 'Had';
            DataManager.patchLocalData('people', key, personBody);
            const tabType = MenuElement.tabType;
            if(tabType !== 'break') {continue;}
            const elementObject = HtmlElement.objectElements[key];
            const breakStatus = 'Had';
            this.endObjectBreak(elementObject, breakStatus);
        }
    }

    static endObjectBreak(elementObject, breakStatus = 'Needs') {
        //Move element to container from break
        const objectId = elementObject.classList[1];
        if(breakStatus === 'Needs') {
            DataManager.deleteLocalData('breaks', objectId);
            const savedBreak = DataManager.getLocalDataset('breaks', objectId);
            if(savedBreak !== undefined) {
                breakStatus = 'Had';
            }
        }
        const day = HolderElement.dayFilter;
        const personBody = {};
        personBody[`${day}BreakStatus`] = breakStatus;
        DataManager.patchLocalData('people', objectId, personBody);
        let key = 'role';
        const route = HolderElement.route;
        if(route === 'positions') {
            key = `${day}Position`;
        }
        const datasetPerson = DataManager.getLocalDataset('people', objectId);
        const containerId = datasetPerson[key];
        const elementContainer = HtmlElement.containerElements[containerId];
        const elementBodyContent = elementContainer.querySelector('.body .content');
        this.#pullObjectIntoContainer(elementObject, elementBodyContent);
    }

    static #pullObjectIntoContainer(elementObject, objectContainer) {
        const objectId = elementObject.classList[1];
        const btnLeft = objectContainer.classList.contains('break') === false;
        const btnRight = objectContainer.classList.contains('break') === false;
        const datasetPerson = DataManager.getLocalDataset('people', objectId);
        const infoKey = HolderElement.route;
        const day = HolderElement.dayFilter;
        const dayBreakTimeMilitary = datasetPerson[`${day}BreakTime`];
        const dayBreakTime = 
            DateTimeManager.converMilitaryToStandard(dayBreakTimeMilitary);
        let timeHeader = dayBreakTime;
        const dayBreakStatus = datasetPerson[`${day}BreakStatus`];
        if(dayBreakStatus !== 'Needs') {
            timeHeader = this.getBreakInnerText(objectId);
        }
        const structureObject = 
            ObjectStructure.getObjectStructure(
                btnLeft, btnRight, datasetPerson,
                    infoKey, timeHeader)
        objectContainer.appendChild(elementObject);
        SortingManager.sortObjectsInContainer(objectContainer, structureObject);
    }

    static getBreakInnerText(id) {
        const datasetBreak = DataManager.getLocalDataset('breaks', id);
        if(datasetBreak === undefined) {return undefined;}
        const breakStart = new Date(datasetBreak['start']);
        let hrs = breakStart.getHours();
        let mins = breakStart.getMinutes();
        const startTimeText = DateTimeManager.converMilitaryToStandard(`${hrs}:${mins}`)
        const breakEnd = new Date(datasetBreak['end']);
        hrs = breakEnd.getHours();
        mins = breakEnd.getMinutes();
        const endTimeText = DateTimeManager.converMilitaryToStandard(`${hrs}:${mins}`)
        const timeHeader = `${startTimeText}-${endTimeText}`;
        return timeHeader;
    }
}