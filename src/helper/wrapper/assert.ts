import { expect, Page } from "@playwright/test";



export default class Assert {
    constructor(private page: Page) { }

    async assertTitlePage(title: string) {
        await expect(this.page).toHaveTitle(title, { timeout: Number(process.env.TIMEOUT) });
    }

    async assertTitleContains(title, string) {
        const pageTitle = await this.page.title();
        await expect(pageTitle).toContain(title);
    }

    async assertURL(url: string) {
        await expect(this.page).toHaveURL(url, { timeout: Number(process.env.TIMEOUT) });
    }

    async assertString(actualString: string, expectString: string) {
        await expect(actualString).toBe(expectString);
    }

}