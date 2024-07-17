

export default class ContainerHtml { 
    static getContainer(route, id) {
        return `
        <div class="${route} ${id} container">
            <div class="header layout">
            </div>
            <div class="body layout">
            </div>
            <div class="footer layout">
            </div>
        </div>
        `
    }

    static getType(strType) {
        return `
            <div class="${strType} type">
            </div>
        `
    }
        
}