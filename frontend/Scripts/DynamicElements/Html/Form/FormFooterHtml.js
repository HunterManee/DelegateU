
export default class FormFooter {
    //Form
    static getForm() {
        return `
            <div class="form">
            </div>
        `
    }

    static getFormEventBtns() {
        return `
            <div class="form-event-btns">
            </div>
        `
    }

    static getCreateBtn() {
        return `
            <button type="button" class="create form-btn">Create</button>
        `
    }

    static getCloseBtn() {
        return `
            <button type="button" class="close form-btn">Close</button>
        `
    }

    static getSubmitBtn(innerText) {
        return `
            <button type="button" class="submit form-btn hide">${innerText}</button>
        `
    }
}