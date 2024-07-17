import DataManager from "../../../Managers/DataManager.js";
import DateTimeManager from "../../../Managers/DateTimeManger.js";
import HolderElement from "../../Elements/HolderElement.js";
import MenuElement from "../../Elements/MenuElement.js";

export default class ContentObject {
    static getObject(id) {
        return `
        <div class="people ${id} object">
            <div class="object-btns">
            </div>
            <div class="object-header">
                
            </div>
            <div class="object-btns">
            </div>
        </div>
    `
    }

    static getNameHeader(name) {
        return `
            <div class="name-header">
                    <label class="object-name">${name}</label>
            </div>
        `
    }

    static getTimeHeader(datasetPerson) {
        let timeString = datasetPerson;
        if(typeof(datasetPerson) === 'object') {
            const route = 'people';
            if(MenuElement.tabType === 'break') {
                const day = HolderElement.dayFilter;
                const breakTime = datasetPerson[`${day}BreakTime`];
                timeString = DateTimeManager.converMilitaryToStandard(breakTime);
            }else {
                timeString = DateTimeManager.getStandardTimeRange(route, datasetPerson);
            }
        }

        return `
        <div class="time-header">
            <label class="object-time">${timeString}</label>
        <div>
        `
    }

    static getObjectRoleInfoHeader(dataset) {
        const roleId = dataset.role;
        let roleName;
        const roles = DataManager.getLocalCollection('roles');
        for(const role of roles){
            if(roleId === role._id) {
                roleName = role.name;
                break;
            }
        }
        return `
        <div class="info-header">
            <label class="object-info">${roleName}</label>
        <div>
        `
    }

    static getObjectPositionInfoHeader(dataset) {
        const dayPosition = `${HolderElement.dayFilter}Position`;
        const positionId = dataset[dayPosition];
        let positionName;
        const positions = DataManager.getLocalCollection('positions');
        for(const position of positions) {
            if(positionId === position._id) {
                positionName = position.name;
                break;
            }
        }
        return `
        <div class="info-header">
            <label class="object-info">${positionName}</label>
        <div>
        `
    }

    static getLeftBtn() {
        return `
            <button class="left-btn object-btn">Delete</button>
        `
    }

    static getRightBtn() {
        return `
            <button class="right-btn object-btn">Edit</button>
        `
    }

}