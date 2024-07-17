
export default class FooterStructure {
    static getMenuStructure(footerType) {
        return {
            'type': footerType
        }
    }

    static getDisplayStructure(strBtnText = 'ASSIGN PEOPLE') {
        return {
            'type': 'display',
            'assign': strBtnText
        }
    }
    
    static getFormStructure(boolCreate = false, boolClose = false, strSubmit = undefined) {
        return {
            'type': 'form',
            'form-event-btns': true,
            'create': boolCreate,
            'close': boolClose,
            'submit': strSubmit
        }
    }

}