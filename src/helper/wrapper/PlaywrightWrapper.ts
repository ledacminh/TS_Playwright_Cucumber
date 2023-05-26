import { Page } from "@playwright/test";

export default class PlaywrightWrapper {
    constructor(private page: Page) { }

    async goto(url: string) {
        await this.page.goto(url, {
            waitUntil: "domcontentloaded"
        })
    }

    async getElement(locator: string) {
        return this.page.locator(locator);
    }
    async waitForElementVisible(locator: string) {
        const element = await this.getElement(locator);
        await element.waitFor({
            state: "visible",
            timeout: Number(process.env.TIMEOUT)
        });
    }

    async waitForElementInvisible(locator: string) {
        const element = await this.getElement(locator);
        await element.waitFor({
            state: "hidden",
            timeout: Number(process.env.TIMEOUT)
        });
    }

    async clickOnElement(locator: string) {
        const element = await this.getElement(locator);
        this.waitForElementVisible(locator);
        await element.click();
    }

    async enterTextOnElement(locator: string, text: string) {
        const element = await this.getElement(locator);
        this.waitForElementVisible(locator);
        await element.type(text);
    }

    async getTextElement(locator: string) {
        const element = await this.getElement(locator);
        this.waitForElementVisible(locator);
        return (await element.textContent()).trim();
    }
}