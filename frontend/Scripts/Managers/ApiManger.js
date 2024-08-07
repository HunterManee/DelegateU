require('dotenv').config();

export default class ApiManager {
    static serverURL = process.env.HTTPS || 'http://localhost:3000'
    static idDiningGroup = undefined;

    static async _requestGetAll(route) {
        return fetch(`${this.serverURL}/${route}?groupId=${this.idDiningGroup}`)
                .then(result => {
                    if(!result.ok){
                        throw new Error('Network response was not ok')
                    }
                    return result.json()
                })
                .then(data => {
                    return data;
                })
                .catch(error => {
                    console.log(error);
                })
        
    }
    
    static async _requestPost(route, newData) {
        return fetch(`${this.serverURL}/${route}?groupId=${this.idDiningGroup}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(result => {
            if(!result.ok) {
                console.log('Problem');
                return
            }
    
            return result.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    static async _requestGetById(route, dataId) {
        return fetch(`${this.serverURL}/${route}/${dataId}?groupId=${this.idDiningGroup}`)
        .then(result => result.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    }

    static async _requestPatch(route, dataId, newData) {
        return fetch(`${this.serverURL}/${route}/${dataId}?groupId=${this.idDiningGroup}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(result => {
            if(!result.ok) {
                console.log('Problem');
                return
            }
    
            return result.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }
    static async _requestDelete(route, dataId) {
        return fetch(`${this.serverURL}/${route}/${dataId}?groupId=${this.idDiningGroup}`, {
            method: 'Delete'
        })
        .then(result => {
            if(!result.ok) {
                console.log('Problem');
                return
            }
    
            return result.json();
        })
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    }

    static async _requestLogIn(newData) {
        return fetch(`${this.serverURL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        .then(result => {
            if(!result.ok) {
                console.log('Problem');
                return
            }
    
            return result.json();
        })
        .then(data => {
            console.log('Success');
            if(data.Status === true) {
                this.idDiningGroup = data.groupId;
            }
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    }
    
}



