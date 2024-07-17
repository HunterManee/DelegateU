import HolderElement from "../DynamicElements/Elements/HolderElement.js";
import ClockManager from "./ClockManager.js";
import DataManager from "./DataManager.js";

export default class DateTimeManager {
    static #todayDate = new Date();
    static mealHours = {};
    static #weekdayMap = {};

    static updateTodayDate() {
        const newDate = new Date();
        if(newDate.getDate() !== this.#todayDate.getDate()) {
            this.setWeekdayMap();
            ClockManager.updateDayFilterCurrent();
        }
        if(newDate.getMinutes() !== this.#todayDate.getMinutes()) {
            ClockManager.updateMealFilterCurrent();
        }
        this.#todayDate = newDate;
    }

    static updateMealHours() {
        const dayFilter = HolderElement.dayFilter;
        this.mealHours = {};
        const codeDayFilter = this.getDayFilterCode();
        const meals = new Array('Breakfast', 'Brunch', 'Lunch', 'Dinner');
        const positions = DataManager.getLocalCollection('positions');
        for(const position of positions){
            for(const meal of meals) {
                const startDayMeal = position[`${dayFilter}${meal}Start`];
                const endDayMeal = position[`${dayFilter}${meal}End`];
                if(startDayMeal === undefined ||
                    startDayMeal === null || 
                    endDayMeal === undefined ||
                    endDayMeal === null) {
                    continue;
                }
                if(startDayMeal.includes(':') === false || 
                    endDayMeal.includes(':') === false) {
                    continue;
                }
                const startObject = new Date(codeDayFilter);
                const startArray = startDayMeal.split(':');
                startObject.setHours(startArray[0]);
                startObject.setMinutes(startArray[1]);
                const endObject = new Date(codeDayFilter);
                const endArray = endDayMeal.split(':');
                endObject.setHours(endArray[0]);
                endObject.setMinutes(endArray[1]);
                if((meal === 'Breakfast' || meal === 'Brunch') && startObject > endObject) {
                    const currentDay = startObject.getDate();
                    startObject.setDate(currentDay-1);
                } else if((meal === 'Lunch' || meal === 'Dinner') && startObject > endObject) {
                    const currentDay = startObject.getDate();
                    startObject.setDate(currentDay+1);
                }


                if(this.mealHours[meal] === undefined) {
                    const codeStart = startObject.toString().substring(4,21);
                    const codeEnd = endObject.toString().substring(4,21);
                    this.mealHours[meal] = `${codeStart}-${codeEnd}`
                }else {
                    const mealHoursCodeArray = this.mealHours[meal].split('-');
                    const startMealHoursCode = mealHoursCodeArray[0];
                    let newStartMealHourObject = new Date(startMealHoursCode);
                    if(startObject < newStartMealHourObject) {
                        newStartMealHourObject = startObject;
                    }
                    const endMealHoursCode = mealHoursCodeArray[1];
                    let newEndMealHourObject = new Date(endMealHoursCode);
                    if(endObject > newEndMealHourObject) {
                        newEndMealHourObject = endObject;
                    }
                    const codeStart = newStartMealHourObject.toString().substring(4,21);
                    const codeEnd = newEndMealHourObject.toString().substring(4,21);
                    this.mealHours[meal] = `${codeStart}-${codeEnd}`
                }
            }
        }
        for(const meal of meals) {
            if(this.mealHours[meal] === undefined) {
                continue;
            }
            if(this.mealHours['All'] === undefined) {
                this.mealHours['All'] = this.mealHours[meal];
            }else {
                const codeAllArray = this.mealHours['All'].split('-');
                const codeMealArray = this.mealHours[meal].split('-');
                const newCode = `${codeAllArray[0]}-${codeMealArray[1]}`;
                this.mealHours['All'] = newCode;
            }
        }
    }

    static setWeekdayMap() {
        const firstWeekdayIndex = 4;
        const lastWeekdayIndex = 3;
        const today = this.#todayDate.getDay();
        HolderElement.dayFilter = this.getWeekday(today);
        this.#weekdayMap[this.getWeekday(today)] = 0;
        for(let i = 1; i < 7; i++) {
            const weekdayIndex = this.#weekdayMod7(today + i);
            this.#weekdayMap[this.getWeekday(weekdayIndex)] = i;
            if(weekdayIndex === lastWeekdayIndex){
                break;
            }
            
        }
        for(let i = -1; i > -7; i--) {
            const weekdayIndex = this.#weekdayMod7(today + i);
            this.#weekdayMap[this.getWeekday(weekdayIndex)] = i;
            if(weekdayIndex === firstWeekdayIndex) {
                break;
            }
        }
    }

    static #weekdayMod7(weekdayIndex) {
        const mod = 7;
        if(weekdayIndex < 0) {
            return (-(weekdayIndex * mod) + weekdayIndex) % mod;
        }
        return weekdayIndex % mod
    }

    static getWeekday(intWeekdayIndex) {
        switch(intWeekdayIndex) {
            case 0:
                return 'sun'
                
            case 1:
                return 'mon'
                
            case 2:
                return 'tue'
                
            case 3:
                return 'wed'
                
            case 4:
                return 'thu'
                
            case 5:
                return 'fri'
                
            case 6:
                return 'sat'
                
            }
    }
    static getDayFilterCode() {
        const dayFilter = HolderElement.dayFilter;
        const year = this.#todayDate.getFullYear();
        const month = this.#todayDate.getMonth();
        const todayDay = this.#todayDate.getDate();
        const day = todayDay + this.#weekdayMap[dayFilter];
        return new Date(year, month, day).toString().substring(4,21);
    }

    static canWorkMeal(datasetPerson) {
        const mealFilter = HolderElement.mealFilter;
        const mealCode = this.mealHours[mealFilter];
        if(mealCode === undefined) {
            return false;
        }
        const mealArray = mealCode.split('-');
        const mealStart = new Date(mealArray[0]);
        const mealEnd = new Date(mealArray[1]);
        const dayFilter = HolderElement.dayFilter;
        if(datasetPerson[dayFilter] === true && 
            mealFilter === 'All' && HolderElement.route === 'roles') {
                return true;
        }
        const codeDayFilter = this.getDayFilterCode();
        const personStart = new Date(codeDayFilter);
        const startArray = datasetPerson[`${dayFilter}Start`].split(':');
        personStart.setHours(startArray[0]);
        personStart.setMinutes(startArray[1]);
        const personEnd = new Date(codeDayFilter);
        const endArray = datasetPerson[`${dayFilter}End`].split(':');
        personEnd.setHours(endArray[0]);
        personEnd.setMinutes(endArray[1]);

        if(personStart > personEnd) {
            const day = personEnd.getDate();
            personEnd.setDate(day + 1);
        }
        if(mealStart <= personStart && personStart < mealEnd) {
            return true;
        }
        if(mealStart < personEnd && personEnd < mealEnd) {
            return true;
        }
        if(personStart <= mealStart && mealStart < personEnd) {
            return true;
        }
        if(personStart < mealEnd && mealEnd < personStart) {
            return true;
        }
        return false;
        
    }
    //time code: 'mon dd yyyy hh:mm-mon dd yyyy hh:mm'
    static getStandardTimeRange(route, dataset) { 
        let timeStart = '';
        let timeEnd = '';
        const day = HolderElement.dayFilter;
        if(route === 'people') {
            timeStart = dataset[`${day}Start`];
            timeEnd = dataset[`${day}End`];
        }else if(route === 'positions') {
            const mealArray = 
                new Array('Breakfast', 'Brunch', 'Lunch', 'Dinner');
            for(const meal of mealArray) {
                let start = dataset[`${day}${meal}Start`];
                let end = dataset[`${day}${meal}End`];
                if(start === null || end === null ||
                    start === undefined || end === undefined) {
                        start = '';
                        end = '';
                }
                if( timeStart === '' && start !== '' &&
                    HolderElement.mealFilter === 'All') {
                        timeStart = start
                }
                if(end !== '' &&
                    HolderElement.mealFilter === 'All') {
                        timeEnd = end;
                }
                if(HolderElement.mealFilter === meal) {
                    timeStart = start;
                    timeEnd = end;
                    break;
                }
            }
        }
        if(timeStart === '' || timeEnd === '' ||
            timeStart === null || timeEnd === null ||
            timeStart === undefined || timeEnd === undefined
        ) {
            if(route === 'positions') {
                return 'Closed';
            }
            if(route === 'people') {
                return 'HH:MM AM/PM - HH:MM PM/AM'
            }
        }
        if(timeStart === timeEnd && 
            route === 'positions') {
            return '24 Hrs'
        } 
        const timeStartString = this.converMilitaryToStandard(timeStart);
        const timeEndString = this.converMilitaryToStandard(timeEnd);
        return `${timeStartString} - ${timeEndString}`;
    }

    static converMilitaryToStandard(militaryTime) {
        if(militaryTime === '') {return 'NaN'}
        const timeArray = militaryTime.split(':');
        let hr = parseInt(timeArray[0]);
        const min = parseInt(timeArray[1]);
        let timePeriod = 'AM';
        if(hr === 12){timePeriod = 'PM';}
        if(hr === 0){hr = 12;}
        if(hr > 12){hr -= 12; timePeriod = 'PM';}
        let hourText = `${hr}`;
        if(hr < 10) {
            hourText = `0${hourText}`;
        }
        let minText = `${min}`;
        if(min < 10) {
            minText = `0${minText}`;
        }
        return `${hourText}:${minText} ${timePeriod}`;
    }


}