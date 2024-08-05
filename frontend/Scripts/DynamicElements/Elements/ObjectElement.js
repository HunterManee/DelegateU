import ObjectHtml from "../Html/Object/ObjectHtml.js";
import ObjectStructure from "../Structures/ObjectStructure.js";
import HtmlElement from "./HtmlElement.js";
import HolderElement from "./HolderElement.js";
import DataManager from "../../Managers/DataManager.js";
import DateTimeManager from "../../Managers/DateTimeManger.js";
import SortingManager from "../../Managers/SortingManger.js";
import MenuElement from "./MenuElement.js";

export default class ObjectElement extends HtmlElement {
    
        static buildObjects(elementContainer) {
            const collection = DataManager.getLocalCollection('people');
            const sortedCollection = SortingManager.getSortedCollection(collection);
            let strInfoKey = HolderElement.route;
            const boolLeftBtn = true;
            const boolRightBtn = true;
            for(const dataset of sortedCollection) {
                const structureObject = 
                ObjectStructure.getObjectStructure(boolLeftBtn, boolRightBtn, dataset, strInfoKey);
                const canWork = DateTimeManager.canWorkMeal(dataset);        
                if(canWork === true){
                    this.#categorizeObject(elementContainer, structureObject, dataset);
                }
            }
        }

        static #categorizeObject(elementContainer, structureObject, dataset) {
            const containerRoute = elementContainer.classList[0];
            const containerId = elementContainer.classList[1];
            let key;
            if(containerRoute === 'positions') {
                const day = HolderElement.dayFilter;
                key = `${day}Position`
            }else if(containerRoute === 'roles') {
                key = 'role';
            }

            const elementContent = elementContainer.querySelector('.content');
            const elementUnassigned = elementContainer.querySelector('.unassigned');
            const elementAssigned = elementContainer.querySelector('.assigned');
            if(dataset[key] === containerId && elementContent !== null) {
                this.mechanicObject(elementContent, structureObject, dataset);
            }else if(dataset[key] === 'unassigned' && elementUnassigned !== null) {
                this.mechanicObject(elementUnassigned, structureObject, dataset);
            }else if(dataset[key] !== containerId && elementAssigned !== null) {
                this.mechanicObject(elementAssigned, structureObject, dataset);
            }
        }

        static mechanicObject(elementBucket, structureObject, dataset = undefined) {
            const objectId = structureObject.id;
            const newObject =
                this._elementFromHtml(ObjectHtml.getObject(objectId));
            elementBucket.appendChild(newObject);
            HtmlElement.objectElements[objectId] = newObject;
            const elementObjectHeader = newObject.querySelector('.object-header');
            if(structureObject['name-header'] !== undefined) {
                const objectName = structureObject['name-header'];
                const newNameHeader =
                    this._elementFromHtml(ObjectHtml.getNameHeader(objectName));
                elementObjectHeader.appendChild(newNameHeader);
            }
            if(structureObject['time-header'] !== undefined) {
                const datasetPerson = structureObject['time-header'];
                const newTimeHeader =
                    this._elementFromHtml(ObjectHtml.getTimeHeader(datasetPerson));
                elementObjectHeader.appendChild(newTimeHeader);
            }
            if(structureObject['info-header'] !== undefined) {
                let infoHeader = structureObject['info-header']
                const elementAssigned = HtmlElement.getParentElement(newObject, 'assigned');
                if(elementAssigned !== undefined) {
                    if(infoHeader === 'roles') {
                        infoHeader = 'positions';
                    }else if(infoHeader === 'positions') {
                        infoHeader = 'roles';
                    }
                }
                let newObjectInfo
                if(infoHeader === 'roles') {
                    newObjectInfo =
                        this._elementFromHtml(ObjectHtml.getObjectRoleInfoHeader(dataset));
                }else if(infoHeader === 'positions') {
                    newObjectInfo =
                        this._elementFromHtml(ObjectHtml.getObjectPositionInfoHeader(dataset));
                }
                elementObjectHeader.appendChild(newObjectInfo);
            }

            const btnsObject = newObject.querySelectorAll('.object-btns');
            if(structureObject['left-btn'] === true) {
                const btnLeft = 
                    this._elementFromHtml(ObjectHtml.getLeftBtn());
                btnsObject[0].appendChild(btnLeft);
            }
            if(structureObject['right-btn'] === true) {
                const btnRight =
                    this._elementFromHtml(ObjectHtml.getRightBtn());
                btnsObject[1].appendChild(btnRight);
            }

            return newObject;
        }
        static moveObject(object) {
            const currentBucketElement = object.parentNode;
            const bucketType = currentBucketElement.classList[0];

            const elementContainer = 
                currentBucketElement.parentNode.parentNode.parentNode;
            const containerRoute = elementContainer.classList[0];
            const containerId = elementContainer.classList[1];
            const body = {};            
            const elementDisplay = currentBucketElement.parentNode;
            let newBucketElement;
            if(bucketType === 'content') {
                newBucketElement = elementDisplay.querySelector('.unassigned');
                if(containerRoute === 'roles') {
                    body['role'] = 'unassigned';
                }else {
                    const day = HolderElement.dayFilter;
                    body[`${day}Position`] = 'unassigned';
                }
            }else {
                newBucketElement = elementDisplay.querySelector('.content');
                if(containerRoute === 'roles') {
                    body['role'] = containerId;
                }else {
                    const day = HolderElement.dayFilter;
                    body[`${day}Position`] = containerId;
                }

                if(bucketType === 'assigned') {
                    const elementHolder = elementContainer.parentNode;
                    const elementsContainer = elementHolder.querySelectorAll('.container');
                    for(const container of elementsContainer) {
                        if(containerId === container.classList[1]) {
                            continue;
                        }
                        const content = container.querySelector('.content');
                        const objects = content.querySelectorAll('.object');
                        const id = object.classList[1];
                        let found = false;
                        for(const o of objects) {
                            if(id === o.classList[1]) {
                                o.remove();
                                found = true;
                                break;
                            }
                        }
                        if(found === true) {
                            break;
                        }
                    }
                }
            }
            const objectRoute = object.classList[0];
            const objectId = object.classList[1];
            DataManager.patchLocalData(objectRoute, objectId, body)
            const boolLeftBtn = true;
            const boolRightBtn = true;
            const datasetObject =
            DataManager.getLocalDataset(objectRoute, objectId);
            const structureObject =
            ObjectStructure.getObjectStructure(boolLeftBtn, boolRightBtn, datasetObject, containerRoute);
            object.remove();
            this.mechanicObject(newBucketElement, structureObject, datasetObject);
        }
}