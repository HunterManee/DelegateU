
export default class ApiManager {
    static async _requestGetAll(route) {
        return fetch(`https://delegateubackend.azurewebsites.net/${route}`)
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
        return fetch(`https://delegateubackend.azurewebsites.net/${route}`, {
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
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    }

    static async _requestGetById(route, dataId) {
        fetch(`https://delegateubackend.azurewebsites.net/${route}/${dataId}`)
        .then(result => result.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    }

    static async _requestPatch(route, dataId, newData) {
        return fetch(`https://delegateubackend.azurewebsites.net/${route}/${dataId}`, {
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
            console.log('Success');
            return data;
        })
        .catch(error => {
            console.log(error);
        })
    }
    static async _requestDelete(route, dataId) {
        fetch(`https://delegateubackend.azurewebsites.net/${route}/${dataId}`, {
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
            console.log('Success');
        })
        .catch(error => {
            console.log(error);
        })
    }

    // static async _requestLogIn(newData) {
    //     return fetch(`http://localhost:3000/`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(newData)
    //     })
    //     .then(result => {
    //         if(!result.ok) {
    //             console.log('Problem');
    //             return
    //         }
    
    //         return result.json();
    //     })
    //     .then(data => {
    //         console.log('Success');
    //         return data;
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     })
    // }
    
}



