import HeaderStructure from "./HeaderStructure.js";
import BodyStructure from "./BodyStructure.js";
import FooterStructure from "./FooterStructure.js";

import HolderElement from "../Elements/HolderElement.js";

export default class ContainerStructure {
    static getContainerStructure(
            structureHeader = undefined, structureBody = undefined,
            structureFooter = undefined, structurObject = undefined) {

        return {
            'header': structureHeader,
            'body': structureBody,
            'footer': structureFooter,
            'object': structurObject
        }
    }

    static getDisplayStructure(dataset = undefined, isActive = false) {
        const route = HolderElement.route;
        const strName = dataset.name
        let timeTitle = undefined;
        if(route === 'positions') {
            timeTitle = dataset;
            document.documentElement.style.setProperty('--header-min-height', '35px');
        }
        let strLeftBtn = undefined;
        let strRightBtn = undefined;
        if(isActive === false) {
            strLeftBtn = 'Delete';
            strRightBtn = 'Edit';
        }
        const structureHeader = 
        HeaderStructure.getDisplayStructure(
            strName, timeTitle, strLeftBtn, strRightBtn);
        const structureBody = 
        BodyStructure.getDisplayStructure(isActive);
        let strBtnText = 'ASSIGN PEOPLE';
        if(isActive === true) {
            strBtnText = 'DONE';
        }
        const structureFooter =
        FooterStructure.getDisplayStructure(strBtnText);
        const structureContainer =
        ContainerStructure.getContainerStructure(
            structureHeader, structureBody, structureFooter
        )
        return structureContainer;
    }

    static getFormStructure(route, id = undefined, activeTable = false, activateTable = false) {
        let structureHeader = undefined;
        let structureBody = undefined;
        let structureFooter = undefined;
        let structureObject = undefined;
        if(route === 'roles'){
            const strLeftBtn = 'Close';
            let strRightBtn = 'Change';
            if(id === undefined) {
                strRightBtn = 'Add';
            }
            structureHeader = 
                HeaderStructure.getFormStructure(route, strLeftBtn, strRightBtn);
        }else{
                structureHeader = 
                    HeaderStructure.getFormStructure(route);
                const mealBtns = route === 'positions';
                const roleBtns = route === 'people';
                const timeTable = activeTable;
                structureBody = 
                    BodyStructure.getFormStructure(mealBtns, roleBtns, timeTable, activateTable);
                const createBtn = route === 'positions';
                const closeBtn = true
                let submitBtn = 'Change';
                if(id === undefined) {
                    submitBtn = 'Add';
                }
                structureFooter = 
                    FooterStructure.getFormStructure(createBtn, closeBtn, submitBtn);
        }
        const structureContainer = 
        ContainerStructure.getContainerStructure(
            structureHeader, structureBody,
            structureFooter, structureObject);
        return structureContainer;
    }
}