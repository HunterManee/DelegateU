import ApiManager from "./ApiManger.js"
import BreakManager from "./BreakManager.js";

export default class DataManager{
    static #collections = {}
        
    static async getCollections() {
        try{
            const positions = await ApiManager._requestGetAll('positions');
            const people = await ApiManager._requestGetAll('people');
            const roles = await ApiManager._requestGetAll('roles');
            const breaks = await ApiManager._requestGetAll('breaks');
            BreakManager.structureBreakCollection(breaks);
            this.#collections['positions'] = positions
            this.#collections['people'] = people;
            this.#collections['roles'] = roles;
            this.#collections['breaks'] = breaks;

        }catch(error) {
            console.error({message: error});
        }
    }

    static getLocalCollection(route) {
        return this.#collections[route];
    }

    static getLocalDataset(route, id) {
        if(id === 'undefined' || 
            id === undefined) {
            return undefined;
        }

        const collection = this.#collections[route];
        for(let i = collection.length-1; i >= 0; i--) {
            if(id === collection[i]._id) {
                return collection[i];
            }
        }

        return undefined;
    }


    static async postLocalCollection(route, formCollection){
        const collection = this.getLocalCollection(route);
        const newFormCollection = new Array();
        for(let i = 0; i < formCollection.length; i++) {
            let counter = 0;
            let name = formCollection[i].name;
            if(name.includes('_Copy(')) {
                name = name.split('_Copy(')[0];
            }
            for(let j = i - 1; j >= 0; j--) {
                let formName = formCollection[j].name;
                if(formName.includes('_Copy(')) {
                    formName = formName.split('_Copy(')[0];
                }
                if(name === formName) {
                    counter++;
                }
            }
            for(const dataset of collection) {
                let datasetName = dataset.name;
                if(datasetName.includes('_Copy(')) {
                    datasetName = datasetName.split('_Copy(')[0];
                }
                if(name === datasetName) {
                    counter++
                }
            }
            if(counter > 0) {
                formCollection[i].name = `${name}_Copy(${counter})`;
            }
            try{
                const data = await ApiManager._requestPost(route, formCollection[i]);
                if(data != undefined){
                    newFormCollection.push(data);
                }
            }catch(error){
                console.log({message: error});
            }
        }
       for(const dataset of newFormCollection){
            this.#collections[route].push(dataset);
        }
    }

    static async postLocalData(route, body) {
       try{ 
        const data = await ApiManager._requestPost(route, body);
        if(data != undefined) {
            this.#collections[route].push(data);
        }
       }catch(error) {
        console.log({message: error});
       }
    }
 
    static async patchLocalData(route, id, body){
        const dataset = this.getLocalDataset(route, id);

        for(const key of Object.keys(body)){
            dataset[key] = body[key];
        }

        ApiManager._requestPatch(route, id, body);
    }

    static async deleteLocalData(route, dataId){
        for(let i = this.#collections[route].length-1; i >= 0; i--){
            if(dataId === this.#collections[route][i]._id){
                this.#collections[route].splice(i,1);
                break;
            }
        }
        ApiManager._requestDelete(route, dataId);
    }

    static async postLogin() {

    }
}