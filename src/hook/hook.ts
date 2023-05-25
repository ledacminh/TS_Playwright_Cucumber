import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { getEnv } from '../helper/env/env';
import { invokeBrowser } from './browserManager';
import { pageFixture } from './pageFixture';

let page: Page;
let browser: Browser;
let context: BrowserContext;


BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;
});

After(async function ({ pickle, result }) {
    console.log("Status" + result?.status)
    if (result?.status == Status.FAILED) {
        const img = await pageFixture.page.screenshot({ path: "./test-results/screenshots/" + pickle.name, type: "png" });
        await this.attach(img, "image/png");
    }

    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});

