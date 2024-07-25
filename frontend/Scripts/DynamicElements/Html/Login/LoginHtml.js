
export default class LoginHtml {

    static Login() {
        return `
        <div id="login-background">
            <Label>Welcome to DelegateU</Label>
            <form id="login">
                <input type="text" id="username" placeholder="Username">
                <input type="password" id="password" placeholder="Password">
                <div id="login-btns">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
        `
    }

}