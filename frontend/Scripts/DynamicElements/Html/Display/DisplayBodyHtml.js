
export default class DisplayBodyHtml {
    static getContent() {
        return `
            <div class="content bucket">
            </div>
        `
    }
    static getUnassigned() {
       return `
            <div class="unassigned bucket">
            </div>
        `
    }
    static getAssigned() {
        return `
            <div class="assigned bucket">
            </div>
        `
    }
}