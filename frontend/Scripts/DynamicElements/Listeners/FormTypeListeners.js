import BreakManager from "../../Managers/BreakManager.js";
import DataManager from "../../Managers/DataManager.js";
import DateTimeManager from "../../Managers/DateTimeManger.js";
import FormManager from "../../Managers/FormManager.js";
import ContainerElement from "../Elements/ContainerElement.js";
import HolderElement from "../Elements/HolderElement.js";
import HtmlElement from "../Elements/HtmlElement.js";
import MenuElement from "../Elements/MenuElement.js";
import ObjectElement from "../Elements/ObjectElement.js";

export default class FormTypeListeners {
    static setFormHeaderListeners(elementForm) {
        const elementContainer =
            HtmlElement.getParentElement(elementForm, 'container');
        
        const closeBtn = elementForm.querySelector('.left-btn');
        if(closeBtn !== null) {
            closeBtn.addEventListener('click', () => {
                HtmlElement.unfocusContainer(elementContainer);                
                FormManager.clearFormDataset();
                ContainerElement.resetContainerElement(elementContainer);
                ObjectElement.buildObjects(elementContainer);
                if(MenuElement.tabType === 'break') {
                    BreakManager.onObjectBreak();
                }
            })
        }
        const rightBtn = elementForm.querySelector('.right-btn');
        if(rightBtn !== null) {
            rightBtn.addEventListener('click', async() => {
                const option = rightBtn.innerText;
                FormManager.packForm(elementContainer);
                const formDataset = FormManager.getFormDataset();
                const errors = FormManager.validateFormData(formDataset);
                if(errors.length === 0) {
                    HtmlElement.unfocusContainer(elementContainer);
                    if(option === 'Add') {
                        const inMenu = 
                            elementContainer.classList.contains('menu') === true;
                        if(inMenu === true) {
                            FormManager.pushDatasetToFormCollection(formDataset);
                            const elementHolderBody = document.getElementById('header');
                            HolderElement.mechanicHolder(elementHolderBody);
                        }
                        const formCollection = FormManager.getFormCollection();
                        try {
                            await DataManager.postLocalCollection(formDataset.route, formCollection)
                        }catch(error){
                            console.error(error);
                        }
                    }else if(option === 'Change') {
                        DataManager.patchLocalData(formDataset.route, formDataset._id, formDataset);
                        ContainerElement.resetContainerElement(elementContainer);
                    }
                    FormManager.clearFormDataset();//not need after patch has been reworked
                    if(MenuElement.tabType === 'break') {
                        BreakManager.onObjectBreak();
                    }
                    return;
                }else {
                    if(errors.includes('name')) {
                        const nameTextbox = elementContainer.querySelector('.name-title');
                        nameTextbox.classList.add('error');
                    }
                }
            })
        }
    }
    static setFormBodyListeners(elementForm) {
        const elementContainer =
            HtmlElement.getParentElement(elementForm, 'container');
        const formBtns = elementForm.querySelectorAll('.form-btn');
        for(const formBtn of formBtns) {
            formBtn.addEventListener('click', () => {
                FormManager.packForm(elementContainer);
                const formRadios = elementForm.querySelectorAll('.form-radio');
                const btnValue = formBtn.attributes.for.value;
                for(let i = 0; i < formBtns.length; i++) {
                    HtmlElement.removeActiveFromElement(formBtns[i]);
                    formRadios[i].checked = false;
                    const radioId = formRadios[i].classList[0];
                    if(btnValue === radioId) {
                        formRadios[i].checked = true;
                    }
                }
                HtmlElement.addActiveToElement(formBtn);
                const formDataset = FormManager.getFormDataset();
                if(formDataset.route === 'people') {
                    formDataset.role = btnValue;
                }else if(formDataset.route === 'positions') {
                    formDataset.meal = btnValue;
                }
                FormManager.populateForm(elementContainer, formDataset);
            })
        }

        const timeTable = elementForm.querySelector('.time-table');
        if(timeTable !== null) {
            const headerEnd = timeTable.querySelector('.head .end-data');
            headerEnd.addEventListener('click', () => {
                const formDataset = FormManager.getFormDataset();
                if(formDataset.route !== 'people') {
                    return;
                }
                FormManager.packForm(elementContainer);
                const labelEndHeader = headerEnd.querySelector('label');
                if(labelEndHeader.innerText !== 'Break') {
                    const elementsEndData = timeTable.querySelectorAll('.end-data');
                    for(const element of elementsEndData) {
                        HtmlElement.addBreakToElement(element);
                    }
                }else if(labelEndHeader.innerText === 'Break') {
                    const elementsEndData = timeTable.querySelectorAll('.end-data');
                    for(const element of elementsEndData) {
                        HtmlElement.removeBreakFromElement(element);
                    }
                }
                FormManager.populateForm(elementContainer, formDataset, formDataset.route);
            })

            const checkboxesDay = timeTable.querySelectorAll('.day-checkbox');
            for(const checkboxDay of checkboxesDay) {
                checkboxDay.addEventListener('click', () => {
                    const elementDataset = checkboxDay.parentNode.parentNode;
                    const elementTime = elementDataset.querySelector('.time');
                    const startTime = elementTime.querySelector('.start');
                    const endTime = elementTime.querySelector('.end');
                    startTime.value = '';
                    endTime.value = '';
                    const isChecked = checkboxDay.checked;
                    if(isChecked === true) {
                        HtmlElement.removeHideFromElement(startTime);
                        HtmlElement.removeHideFromElement(endTime);
                        return;
                    }
                    HtmlElement.addHideToElement(startTime);
                    HtmlElement.addHideToElement(endTime);                
                })
            }
        }
    }
    static setFormFooterListeners(elementForm) {
        const elementContainer =
            HtmlElement.getParentElement(elementForm, 'container');
        const btnCreate = elementForm.querySelector('.create');
        if(btnCreate !== null) {
            let createCounter = 0;
            btnCreate.addEventListener('click', () => {
                const submitBtn = elementForm.querySelector('.submit');
                FormManager.packForm(elementContainer);
                const formDataset = FormManager.getFormDataset();
                const errors = FormManager.validateFormData(formDataset);
                if(errors.length === 0) {
                    HtmlElement.addActiveToElement(btnCreate);
                    const btnsFooter = btnCreate.parentNode;
                    const btnSubmit = btnsFooter.querySelector('.submit');
                    HtmlElement.removeHideFromElement(btnSubmit);
                    submitBtn.innerText = 'Add';
                    createCounter++;
                    btnCreate.innerText = `Create (${createCounter})`;
                    FormManager.pushDatasetToFormCollection(formDataset);
                }else {
                    if(errors.includes('name')) {
                        const nameTextbox = elementContainer.querySelector('.name-title');
                        nameTextbox.classList.add('error');
                    }
                }
            })
        }
        const btnClose = elementForm.querySelector('.close');
        if(btnClose !== null) {
            btnClose.addEventListener('click', () => {
                HtmlElement.unfocusContainer(elementContainer);
                FormManager.clearFormDataset();
                FormManager.clearFormCollection();
                ContainerElement.resetContainerElement(elementContainer);
                ObjectElement.buildObjects(elementContainer);
                if(MenuElement.tabType === 'break') {
                    BreakManager.onObjectBreak();
                }
            })
        }
        const btnSubmit = elementForm.querySelector('.submit');
        if(btnSubmit !== null) {
            btnSubmit.addEventListener('click', async() => {
                const option = btnSubmit.innerText;
                FormManager.packForm(elementContainer);
                const formDataset = FormManager.getFormDataset();
                const errors = FormManager.validateFormData(formDataset);
                if(errors.length === 0) {
                    HtmlElement.unfocusContainer(elementContainer);
                    if(option === 'Add') {
                        const inMenu = 
                            elementContainer.classList.contains('menu') === true;
                        if(inMenu === true) {
                            FormManager.pushDatasetToFormCollection(formDataset);
                            const elementHolderBody = document.getElementById('header');
                            HolderElement.mechanicHolder(elementHolderBody);
                        }
                        const formCollection = FormManager.getFormCollection();
                        try{
                            await DataManager.postLocalCollection(formDataset.route, formCollection)
                        }catch(err) {
                            console.error({message: err});
                        }
                    }else if(option === 'Change') {
                        DataManager.patchLocalData(formDataset.route, formDataset._id, formDataset);
                        ContainerElement.resetContainerElement(elementContainer);
                        ObjectElement.buildObjects(elementContainer);
                    }
                    if(formDataset.route === 'positions') {
                        DateTimeManager.updateMealHours();
                    }
                    if(MenuElement.tabType === 'break') {
                        BreakManager.onObjectBreak();
                    }
                }else{
                    const nameTextbox = elementContainer.querySelector('.name-title');
                    nameTextbox.classList.remove('error');
                    if(errors.includes('name')) {
                        nameTextbox.classList.add('error');
                    }

                    const timeTable = elementContainer.querySelector('.time-table');
                    if(timeTable === null) {
                        return
                    }
                    timeTable.classList.remove('error');
                    if(errors.includes('time-table')) {
                        timeTable.classList.add('error');
                    }
                }
                
            })
        }

    }
}