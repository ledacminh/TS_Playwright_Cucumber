import { Page } from "@playwright/test";
import Assert from "../../helper/wrapper/assert";
import PlaywrightWrapper from "../../helper/wrapper/PlaywrightWrapper";
import { LoginUi } from "../ui/loginUI";

export default class LoginPage {
    private base: PlaywrightWrapper;
    private assert: Assert
    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.assert = new Assert(page);
    }

    async enterUsername(username: string) {
        await this.base.enterTextOnElement(LoginUi.username, username);
    }

    async enterPassword(password: string) {
        await this.base.enterTextOnElement(LoginUi.password, password);
    }

    async clickOnButtonLogin() {
        await this.base.clickOnElement(LoginUi.buttonLogin);
    }

    async clickOnLoginLink() {
        await this.base.clickOnElement(LoginUi.loginLink.toString());
    }

    async assertMessageLoginUnscucessfully() {
        const message = await this.base.getTextElement(LoginUi.messageLoginFaild);
        await this.assert.assertString(message, "Username or Password is incorrect");
    }

    async navigateToTheApplycation() {
        await this.base.goto(process.env.BASEURL);
    }
}
