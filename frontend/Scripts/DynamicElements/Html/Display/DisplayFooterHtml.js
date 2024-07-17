
export default class ContentFooter {
    static getContent() {
        return `
            <div class="content bucket">
            </div>
        `
    }

    static getAssignEventBtn(innerText) {
        return `
            <button type="button" class="assign">${innerText}</button>
        `
    }
}