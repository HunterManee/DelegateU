
export default class ApiManager {
    static idDiningGroup = sessionStorage.getItem('groupId');

    static async _requestGetAll(route) {
        return fetch(`https://delegateubackend.azurewebsites.net/${route}?groupId=${this.idDiningGroup}`)
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
        return fetch(`https://delegateubackend.azurewebsites.net/${route}?groupId=${this.idDiningGroup}`, {
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
        return fetch(`https://delegateubackend.azurewebsites.net/${route}/${dataId}?groupId=${this.idDiningGroup}`)
        .then(result => result.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    }

    static async _requestPatch(route, dataId, newData) {
        return fetch(`https://delegateubackend.azurewebsites.net/${route}/${dataId}?groupId=${this.idDiningGroup}`, {
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
        return fetch(`https://delegateubackend.azurewebsites.net/${route}/${dataId}?groupId=${this.idDiningGroup}`, {
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
        return fetch(`https://delegateubackend.azurewebsites.net/`, {
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
                sessionStorage.setItem('groupId', this.idDiningGroup);
            }
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    }
    
}



