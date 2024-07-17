import HolderElement from "../Elements/HolderElement.js";

export default class ObjectStructure {
    static getObjectStructure(boolLeftBtn = true, boolRightBtn = true, dataset=undefined, strInfoKey = undefined, timeHeader = undefined) {
        let id = 'new';
        let name = 'New Person'
        if(dataset !== undefined) {
            id = dataset._id;
            name = dataset.name;            
        }
        if(strInfoKey === 'roles') {
            strInfoKey = 'positions';
        }else if(strInfoKey === 'positions') {
            strInfoKey = 'roles';
        }

        if(timeHeader === undefined) {timeHeader = dataset;}


        return {
            'id': id,
            'name-header': name,
            'time-header': timeHeader,
            'info-header': strInfoKey,
            'left-btn': boolLeftBtn,
            'right-btn': boolRightBtn
        }
    }
}