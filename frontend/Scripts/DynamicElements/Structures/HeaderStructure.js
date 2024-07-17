
export default class HeaderStructure {
    static getNewStructure(strRoute = undefined) {
        let strName = 'New Role';
        if(strRoute === 'positions') {
            strName = 'New Positions';
        }
        
        return {
            'type': 'new',
            'name-label': strName
        }
    }

    static getDisplayStructure(strName = undefined, datasetTime = undefined, strLeftBtn = undefined, strRightBtn = undefined) {        
        return {
            'type': 'display',
            'name-label': strName,
            'time-title': datasetTime,
            'left-btn': strLeftBtn,
            'right-btn': strRightBtn
        }
    }

    static getFormStructure(strRoute = undefined, strLeftBtn = undefined, strRightBtn = undefined) {
        
        return {
            'type': 'form',
            'textbox': strRoute,
            'left-btn': strLeftBtn,
            'right-btn': strRightBtn
        }
    }
}