import HolderElement from '../DynamicElements/Elements/HolderElement.js';
import BreakManager from './BreakManager.js';
import DateTimeManager from './DateTimeManger.js';
import DataManager from './DateTimeManger.js';

export default class ClockManager {    
    static startClock() {
        this.updateDayFilterCurrent();
        this.updateMealFilterCurrent();
        BreakManager.updateBreakClock();
        BreakManager.getBreakStatus();
        setInterval(this.intervalFunction, 1000);

    }


    static intervalFunction() {
        DateTimeManager.updateTodayDate();
        BreakManager.updateBreakClock();
        BreakManager.getBreakStatus();
    }

    static updateDayFilterCurrent() {
        const currentDate = new Date();
        const currentWeekday = DateTimeManager.getWeekday(currentDate.getDay());
        const elementDays = document.getElementById('day');
        if(elementDays !== null) {
            for(const day of elementDays.childNodes) {
                if(day.id === undefined) {continue;}
                if(currentWeekday === day.id) {
                    day.classList.add('current');
                    continue;
                }
                day.classList.remove('current');
            }
        }
    }

    static updateMealFilterCurrent() {
        const currentDate = new Date();
        DateTimeManager.updateMealHours();
        const elementMeals = document.getElementById('meal');
        if(elementMeals !== null){ 
            for(const element of elementMeals.childNodes) {
                if(element.id === undefined) {continue;}
                element.classList.remove('current');
            }

            const meals = new Array('Breakfast', 'Brunch', 'Lunch', 'Dinner');
            for(const meal of meals) {
                const mealCode = DateTimeManager.mealHours[meal];
                if(mealCode === undefined) {continue;}
                const codeArray = mealCode.split('-');
                const codeStart = codeArray[0];
                const codeEnd = codeArray[1];
                const objectStart = new Date(codeStart);
                const objectEnd = new Date(codeEnd);
                if(objectStart <= currentDate && currentDate <= objectEnd) {
                    const elementMeal = document.getElementById(meal);
                    elementMeal.classList.add('current');
                    return;
                }
            }
        }
    }
}