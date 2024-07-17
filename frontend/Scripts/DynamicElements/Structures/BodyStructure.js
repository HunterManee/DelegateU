
export default class BodyStructure {
    static getMenuStructure(bodyType) {
        return {
            'type': bodyType
        }
    }

    static getDisplayStructure(isActive = false) {
        return {
            'type': 'display',
            'content': true,
            'unassigned': isActive,
            'assigned': isActive
        }
    }

    static getFormStructure(boolMeal = false, boolRole = false, boolTime = false, boolActivate = false) {
        return {
            'type': 'form',
            'meal-btns': boolMeal,
            'role-btns': boolRole,
            'time-table': boolTime,
            'activate-table': boolActivate
        }
    }
}