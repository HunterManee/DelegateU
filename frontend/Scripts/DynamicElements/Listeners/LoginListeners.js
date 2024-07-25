import DataManager from "../../Managers/DataManager.js";


export default class LoginListeners {
    static setLoginListeners(elementLogin) {
        const loginBtn = elementLogin.querySelector('button');
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const username = document.getElementById('username');
            const password = document.getElementById('password');

            const body = {};
            body['username'] = username.value;
            body['password'] = password.value;

            // password.value = '';
            DataManager.postLogin(body);

        })
    }
}