import ContainerElement from "../DynamicElements/Elements/ContainerElement.js";
import HolderElement from "../DynamicElements/Elements/HolderElement.js";
import HtmlElement from "../DynamicElements/Elements/HtmlElement.js";
import MenuElement from "../DynamicElements/Elements/MenuElement.js";
import ObjectElement from "../DynamicElements/Elements/ObjectElement.js";
import ObjectStructure from "../DynamicElements/Structures/ObjectStructure.js";
import DataManager from "./DataManager.js";
import DateTimeManager from "./DateTimeManger.js";

export default class BreakManager {
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
        if(MenuElement.tabType !== 'break') {return;}
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
            this.startPersonBreak(elementObject);
            return;
        }
        const elementBreak = HtmlElement.getParentElement(elementObject, 'break');
        if(elementBreak !== undefined) {
            this.endPersonBreak(elementObject);
            return;
        }
    }

    static async startPersonBreak(elementObject, breakLengthMin = 1) {
        const objectId = elementObject.classList[1];
        const personBody = {};
        const day = HolderElement.dayFilter;
        personBody[`${day}BreakStatus`] = 'Break';
        personBody[`break`] = 'start';
        personBody['breakLength'] = breakLengthMin;
        try {
            await DataManager.patchLocalData('people', objectId, personBody);
        }catch(error) {
            console.error({message: error});
        }
    }

    static onPersonBreak() {
        const elementBreakType = document.querySelector('.body .break');
        ContainerElement.clearElementFromType(elementBreakType);
        const breakCollection = DataManager.getLocalCollection('breaks');
        const incompleteBreakDatabases =
        breakCollection.filter(_break => _break.completed === false);
        for(const breakDataset of incompleteBreakDatabases) {
            const personDataset = DataManager.getLocalDataset('people', breakDataset.personId);
            const boolLeftBtn = false;
            const boolRightBtn = false;

            const breakStart = new Date(breakDataset.start);
            const startHours = breakStart.getHours();
            const startMins = breakStart.getMinutes();
            const startMilitary = `${startHours}:${startMins}`;
            const startStandard = DateTimeManager.converMilitaryToStandard(startMilitary);
            const breakEnd = new Date(breakDataset.end);
            const endHours = breakEnd.getHours();
            const endMinutes = breakEnd.getMinutes();
            const endMilitary = `${endHours}:${endMinutes}`;
            const endStandard = DateTimeManager.converMilitaryToStandard(endMilitary);
            const timeHeader = `${startStandard} - ${endStandard}`;
            
            const strInfoKey = HolderElement.route;
            const structureObject =
            ObjectStructure.getObjectStructure(boolLeftBtn, boolRightBtn, personDataset, strInfoKey, timeHeader);
            ObjectElement.mechanicObject(elementBreakType, structureObject, personDataset);
        }
    }

    static async endPersonBreak(elementObject) {
        const objectId = elementObject.classList[1];
        const personBody = {};
        const day = HolderElement.dayFilter;
        personBody[`${day}BreakStatus`] = 'Needs';
        const breakCollection = DataManager.getLocalCollection('breaks');
        const completedBreaks = breakCollection.filter(_break => _break.completed === true);
        const personBreaks = breakCollection.filter(_break => _break.personId === objectId);
        if(personBreaks.length > 0) {personBody[`${day}BreakStatus`] = 'Had'}
        personBody[`break`] = 'incomplete';
        try {
            await DataManager.patchLocalData('people', objectId, personBody);
        }catch(error) {
            console.error({message: error});
        }
    }
}