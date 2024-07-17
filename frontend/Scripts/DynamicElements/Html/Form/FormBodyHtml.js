
export default class FormBody {
    static getFormMealPeriods() {
        return `
            <div class="meal-btns"> <!--POSITION-->
                <input type="radio" class="Breakfast form-radio" value="Breakfast">
                <button for="Breakfast" class="meal-btn form-btn" name="meal">Breakfast</button>
                <input type="radio" class="Brunch form-radio" value="Brunch">
                <button for="Brunch" class="meal-btn form-btn" name="meal">Brunch</button>
                <input type="radio" class="Lunch form-radio" value="Lunch">
                <button for="Lunch" class="meal-btn form-btn" name="meal">Lunch</button>
                <input type="radio" class="Dinner form-radio" value="Dinner">
                <button for="Dinner" class="meal-btn form-btn" name="meal">Dinner</button>
            </div>
        `
    }
    static getFormRoles() {
        return `
            <div class="role-btns">
            </div>
        `
    }

    static getFormRoleInput(dataset) {
        const id = dataset._id;

        return `
            <input type="radio" class="${id} form-radio" value="${id}">
        `
    }

    static getFormRoleBtn(dataset) {
        const name = dataset.name;
        const id = dataset._id;

        return `
            <button for="${id}" class="role-btn form-btn" name="role">${name}</button>
        `

    }

    static getFormTimes(boolActive = false, activate = false) {
        let strActive = '';
        if(boolActive === true) {
            strActive = 'active'
        }
        let strBreak = '';
        if(activate === true) {
            strBreak = 'break'
        }
        return `
            <div class="time-table hide">
                <div class="head dataset">
                    <div class="head day-label">
                        <label>DAY</label>
                    </div>
                    <div class="head time">
                        <div class="start-data">
                            <label>Start</label>
                        </div>
                        <div class="end-data ${strActive} ${strBreak}">
                            <label>End</label>
                        </div>
                    </div>
                </div>
                <div class="odd dataset">
                    <div class="day-label">
                        <input type="checkbox" class="day-checkbox" value="thu">
                        <label for="thu">Thursday</label>
                    </div>
                    <div class="thu-data time">
                        <div class="start-data">
                            <input type="time" class="start hide">
                        </div>
                        <div class="end-data ${strBreak}">
                            <input type="time" class="end hide">
                        </div>
                    </div>
                </div>
                <div class="even dataset">
                    <div class="day-label">
                        <input type="checkbox" class="day-checkbox" value="fri">
                        <label for="fri">Friday</label>
                    </div>
                    <div class="fri-data time">
                        <div class="start-data">
                            <input type="time" class="start hide">
                        </div>
                        <div class="end-data ${strBreak}">
                            <input type="time" class="end hide">
                        </div>
                    </div>
                </div>
                <div class="odd dataset">
                    <div class="day-label">
                        <input type="checkbox" class="day-checkbox" value="sat">
                        <label for="sat">Saturday</label>
                    </div>
                    <div class="sat-data time">
                        <div class="start-data">
                            <input type="time" class="start hide">
                        </div>
                        <div class="end-data ${strBreak}">
                            <input type="time" class="end hide">
                        </div>
                    </div>
                </div>
                <div class="even dataset">
                    <div class="day-label">
                        <input type="checkbox" class="day-checkbox" value="sun">
                        <label for="sun">Sunday</label>
                    </div>
                    <div class="sun-data time">
                        <div class="start-data">
                            <input type="time" class="start hide">
                        </div>
                        <div class="end-data ${strBreak}">
                            <input type="time" class="end hide">
                        </div>
                    </div>
                </div>
                <div class="odd dataset">
                    <div class="day-label">
                        <input type="checkbox" class="day-checkbox" value="mon">
                        <label for="mon">Monday</label>
                    </div>
                    <div class="mon-data time">
                        <div class="start-data">
                            <input type="time" class="start hide">
                        </div>
                        <div class="end-data ${strBreak}">
                            <input type="time" class="end hide">
                        </div>
                    </div>
                </div>
                <div class="even dataset">
                    <div class="day-label">
                        <input type="checkbox" class="day-checkbox" value="tue">
                        <label for="tue">Tuesday</label>
                    </div>
                    <div class="tue-data time">
                        <div class="start-data">
                            <input type="time" class="start hide">
                        </div>
                        <div class="end-data ${strBreak}">
                            <input type="time" class="end hide">
                        </div>
                    </div>
                </div>
                <div class="odd dataset">
                    <div class="day-label">
                        <input type="checkbox" class="day-checkbox" value="wed">
                        <label for="wed">Wednesday</label>
                    </div>
                    <div class="wed-data time">
                        <div class="start-data">
                            <input type="time" class="start hide">
                        </div>
                        <div class="end-data ${strBreak}">
                            <input type="time" class="end hide">
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}