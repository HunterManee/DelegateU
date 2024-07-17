import HtmlElement from "../DynamicElements/Elements/HtmlElement.js";
import HolderElement from "../DynamicElements/Elements/HolderElement.js";
import BreakManager from "./BreakManager.js";

export default class FormManager {
    static #formCollection = new Array();
    static #formDataset = {};

    static populateForm(elementContainer, dataset, route = undefined) {
        for(const key of Object.keys(dataset)) {
            this.#formDataset[`${key}`] = dataset[key];
        }

        if(this.#formDataset.route === undefined) {
            this.#formDataset.route = route;
        }


        const headerFormElement = elementContainer.querySelector('.header .form');
        this.#populateHeader(headerFormElement);
        const bodyFormElement = elementContainer.querySelector('.body .form');
        if(bodyFormElement !== null) {
            this.#populateBody(bodyFormElement, dataset);
        }
        const footerFormElement = elementContainer.querySelector('.footer .form');
        if(footerFormElement !== null) {
            this.#populateFooter(footerFormElement, dataset);
        }
    }

    static #populateHeader(elementForm) {
        const textboxName = elementForm.querySelector('.name');
        textboxName.value = this.#formDataset.name;
    }

    static #populateBody(elementForm) {
        let formType;
        let showTimeTable = false;
        const btnsRole = elementForm.querySelector('.role-btns');
        if(btnsRole !== null) {
            formType = 'people'
            showTimeTable = true;
        }
        const containerMealBtn = elementForm.querySelector('.meal-btns');
        if(containerMealBtn !== null) {
            formType = 'positions'
            if(this.#formDataset.meal === undefined) {
                this.#formDataset.meal = HolderElement.mealFilter;
            }
        }
        const elementContainer = elementForm.parentNode.parentNode;
        const containerId = elementContainer.classList[1];
        const formBtns = elementForm.querySelectorAll('.form-btn');
        for(const formBtn of formBtns) {
            const btnForValue = formBtn.attributes.for.value;
            if(formType === 'positions' &&
               HolderElement.mealFilter === btnForValue &&
               containerId !== 'menu') {
                HtmlElement.addCurrentToElement(formBtn);
            }

            if(this.#formDataset.meal === btnForValue ||
                this.#formDataset.role === btnForValue) {
                HtmlElement.addActiveToElement(formBtn);
                showTimeTable = true;
            }
        }
        const timeTable = elementForm.querySelector('.time-table');
        const labelsHeader = timeTable.querySelectorAll('.head.time label');
        const labelStart = labelsHeader[0];
        const labelEnd = labelsHeader[1];
        const elementEndData = labelEnd.parentNode;
        if(this.#formDataset.route === 'positions') {
            labelStart.innerText = 'Open';
            labelEnd.innerText = 'Close';
        }else if(this.#formDataset.route === 'people') {
            labelStart.innerText = 'In';
            if(elementEndData.classList.contains('break')) {
                labelEnd.innerText = 'Break';
            }else {
                labelEnd.innerText = 'Out';
            }
        }
        const checkboxesDay = timeTable.querySelectorAll('.day-checkbox');
        let meal = '';
        if(formType === 'positions') {
            meal = this.#formDataset.meal;
        }
        for(const checkbox of checkboxesDay) {
           const day = checkbox.value;
           const key = day + meal;
           checkbox.checked = this.#formDataset[key];
           const elementDataset = checkbox.parentNode.parentNode;
           HtmlElement.removeActiveFromElement(elementDataset);
           if(day === HolderElement.dayFilter && 
              meal === HolderElement.mealFilter &&
              containerId != 'menu') {
                HtmlElement.addActiveToElement(elementDataset);
           }
           if(day === HolderElement.dayFilter &&
              this.#formDataset.route === 'people' &&
              containerId != 'menu') {
                HtmlElement.addActiveToElement(elementDataset);
           }
           const elementTime = elementDataset.querySelector('.time');
           const elementStart = elementTime.querySelector('.start');
           const elementEnd = elementTime.querySelector('.end');
           if(checkbox.checked === true) {
                HtmlElement.removeHideFromElement(elementStart);
                HtmlElement.removeHideFromElement(elementEnd);
                elementStart.value = this.#formDataset[`${key}Start`];
                if(elementEndData.classList.contains('break')){
                    elementEnd.value = this.#formDataset[`${key}BreakTime`];
                    if(elementEnd.value === '') {
                        const breakTime = 
                             BreakManager.getBreakTime(elementStart.value);
                        elementEnd.value = breakTime;
                        this.#formDataset[`${key}BreakTime`] = breakTime
                    }
                    continue;

                }
                elementEnd.value = this.#formDataset[`${key}End`];
                continue;
           }
            HtmlElement.addHideToElement(elementStart);
            HtmlElement.addHideToElement(elementEnd);
        }


        if(showTimeTable === true) {
            HtmlElement.removeHideFromElement(timeTable);
        }
    }
    static #populateFooter(elementForm) {
        const elementContainer = elementForm.parentNode.parentNode;
        const timeTable = elementContainer.querySelector('.time-table');
        const isActive = timeTable.classList.contains('hide') === false;
        if(isActive === true) {
            const btnCreate = elementForm.querySelector('.create');
            HtmlElement.removeHideFromElement(btnCreate);
            const btnSubmit = elementForm.querySelector('.submit');
            HtmlElement.removeHideFromElement(btnSubmit);
        }
    }

    static packForm(elementContainer) {
        const route = this.#formDataset.route;
        const formInputs = elementContainer.querySelectorAll('input');

        for(const formInput of formInputs) {
            if(formInput.classList.contains('name')) {
                this.#formDataset.name = formInput.value;
            }
            if(formInput.classList.contains('form-radio')) {
                if(formInput.checked === true) {
                    if(route === 'people') {
                        this.#formDataset.role = formInput.value;
                    }
                }
            }
            if(formInput.classList.contains('day-checkbox')) {
                this.#checkboxValidator(formInput);
            }

            if(this.#formDataset.route === 'people') {
                BreakManager.validateBreakTimes(this.#formDataset);
            }
        }
    }

    static #checkboxValidator(dayInput) {
        const elementDataset = dayInput.parentNode.parentNode;
        const inputStart = elementDataset.querySelector('.start');
        const elementEndData = elementDataset.querySelector('.end-data');
        const typeBreak = elementEndData.classList.contains('break');
        const inputEnd = elementDataset.querySelector('.end');
        let dayChecked = dayInput.checked;
        let startTime = inputStart.value;
        let endTime = inputEnd.value;
        if(dayChecked === false ||
            startTime === '' ||
            (typeBreak === false && endTime === '')) {
            dayChecked = false;
            startTime = '';
            endTime = '';
        }
        const day = dayInput.value;
        let meal = '';
        if(this.#formDataset.route === 'positions') {
            meal = this.#formDataset.meal
        }
        const key = day + meal;
        this.#formDataset[key] = dayChecked;
        this.#formDataset[`${key}Start`] = startTime;
        let strEndData = 'End';
        if(typeBreak === true) {
            strEndData = 'BreakTime'
        }
        this.#formDataset[`${key}${strEndData}`] = endTime;
    }

    static getFormDataset() {
        return this.#formDataset;
    }

    static getEmptyFormDataset(dataElement) {
        const  elementRoute = dataElement.classList[0];
        const elementId = dataElement.classList[1];
        this.#formDataset = {
            'route': elementRoute,
            '_id': elementId,
            'name': '',
            'meal': undefined
        };
        return this.#formDataset;
    }

    static clearFormDataset() {
        this.#formDataset = {};
    }

    static validateFormData(formDataset) {
        const errors = new Array();
        if(formDataset.name === '') {
            errors.push('name');
        }

        return errors;
    }

    static pushDatasetToFormCollection(formDataset) {
        const dataset = {};
        const keys = Object.keys(formDataset);
        for(const key of keys) {
            dataset[key] = formDataset[key];
        }
        this.#formCollection.push(dataset);
    }

    static getFormCollection() {
        return this.#formCollection;
    }
    static clearFormCollection() {
        this.#formCollection = new Array();
    }


}

