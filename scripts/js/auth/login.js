import Modal from "../components/modal.js";

export default class Login {
    constructor(rootElement, buttonLoginElement) {
        this.rootElement = rootElement;
        this.buttonLogin = buttonLoginElement;
        this.modal = new Modal(this.rootElement, this.html());
        this.modal.animation = 1;
        this.eventhandler();
    }

    eventhandler() {
        this.buttonLogin?.addEventListener("click", () => {
            this.modal.showModal();
        });
    }

    html() {
        return `
        <div class="auth-modal">
            <h3 class="auth-title">Login</h3>
            <form class="auth-container auth-form">
                <div class="auth-input-group">
                    <label for="username">Username</label>
                    <input
                        type="text"
                        id="usename"
                        name="username"
                        placeholder="Enter username"
                        autocomplete="off"
                        required
                    />
                </div>
                <div class="auth-input-group">
                    <label for="password">Password</label>
                    <input
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        type="password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    class="button-auth-submit"
                >
                    Login
                </button>
                <div class="cannotlogin">
                    <a href="#">Forgot password</a>
                    <a href="#">Login with OTP</a>
                </div>
            </form>
            <div class="line">
                <span>or</span>
            </div>
            <div class="different-opiton-auth">
                <button class="auth-with-google">
                    <span>
                        <img src="../assets/google.png" alt="" />
                    </span>
                    <span>Login with google</span>
                </button>
                <button class="auth-with-apple">
                    <span>
                        <img src="../assets/apple.png" alt="" />
                    </span>
                    <span>Login with apple</span>
                </button>
            </div>
            <div class="dont-have-account">
                <p>Don't have an account yet?</p>
                <a href="" class = "to-register">Create one</a>
            </div>
        </div>
        
        
        `;
    }
}
