
export default class MenuHtml {
    static getPageTabs() {
        return `
        <div class="page-tabs">
            <button id="upload" class="tab" value="upload">Upload</button>
            <button id="filter" class="tab" value="filter">Filters</button>
            <button id="attendance" class="tab" value="attendance">Attendance</button>
            <button id="break" class="tab" value="break">Break</button>
            <button id="new" class="tab" value="new">New</button>
        </div>
        `
    }

    static getHolder(holderName = '' ) {
        return `
        <div id="${holderName}" class="holder">
        </div>
        `
    }

    static getFilterType(strType) {
        return`
        <div id=${strType}>
        </div>
        `
    }

    static getFilterBtn(strBtnType, strBtnName = strBtnType) {
        return `
        <button id="${strBtnType}" value="${strBtnType}">${strBtnName}</button>
        `
    }
}