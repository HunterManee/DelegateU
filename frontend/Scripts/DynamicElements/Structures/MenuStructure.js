import DateTimeManager from "../../Managers/DateTimeManger.js";
import HolderElement from "../Elements/HolderElement.js";
import BodyStructure from "./BodyStructure.js";
import ContainerStructure from "./ContainerStructure.js";
import FooterStructure from "./FooterStructure.js";
import ObjectStructure from "./ObjectStructure.js";

export default class MenuStructure {  
    static getMenuStructure(strMenuType) {
        let structureHeader;
        let structureObject = undefined;
        switch(strMenuType) {
            case 'new':
                structureHeader = this.#getNewStructureHeader();
                const boolLeftBtn = false;
                const boolRightBtn = false;
                structureObject =
                ObjectStructure.getObjectStructure(boolLeftBtn, boolRightBtn);        
                break;
            case 'route':
                structureHeader = this.#getRouteStructureHeader();
                break;
            case 'filter':
                structureHeader = this.#getFilterStructureHeader();
                break;
            case 'break':
                structureHeader = this.#getBreakStructureHeader();
                break;
            default:
                return ContainerStructure.getContainerStructure();
        }
        const structureBody = 
        BodyStructure.getMenuStructure(strMenuType);
        const structureFooter =
        FooterStructure.getMenuStructure(strMenuType);
        const structureContainer =
        ContainerStructure.getContainerStructure(
            structureHeader, structureBody,
            structureFooter, structureObject
        )
        return structureContainer;
    }
    static #getFilterStructureHeader() {
        const codeFilter = DateTimeManager.getDayFilterCode();
        const filterDate = new Date(codeFilter);
        const strDate = filterDate.toString().substring(4,15);
        const structureHeader = {
            'type': 'filter',
            'name-label': strDate
        }

        return structureHeader;
    }

    static #getBreakStructureHeader() {
        const todayDate = new Date();
        const hours = todayDate.getHours();
        const mins = todayDate.getMinutes();
        const timeString = 
            DateTimeManager.converMilitaryToStandard(`${hours}:${mins}`);
        const structureHeader = {
            'type': 'break',
            'name-label': timeString
        }
        return structureHeader;
    }

    static #getNewStructureHeader() {
        const route = HolderElement.route;
        let strName = 'New Role';
        if(route === 'positions') {
            strName = 'New Position';
        }
        const structureHeader = {
                'type': 'new',
                'name-label': strName
            
        }

        return structureHeader 
    }

    static #getRouteStructureHeader() {
        const route = HolderElement.route;
        let strName = 'Delegate';
        if(route === 'positions') {
            strName = 'Schedule';
        }
        const structureHeader = {
                'type': 'route',
                'name-label': strName
            
        }

        return structureHeader;
    }

}