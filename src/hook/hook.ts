import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from '@cucumber/cucumber';
import { chromium, Browser, Page, BrowserContext } from '@playwright/test';
import { createLogger } from 'winston';
import { getEnv } from '../helper/env/env';
import { options } from '../helper/util/logger';
import { invokeBrowser } from './browserManager';
import { fixture } from './pageFixture';
const fs = require("fs-extra");

let page: Page;
let browser: Browser;
let context: BrowserContext;


BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    const scenarioName = pickle.name + " " + pickle.id;
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/video",
        },
    });
    page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));
});

After(async function ({ pickle, result }) {
    let img: Buffer;
    let videoPath: string;
    if (result?.status == Status.FAILED) {
        img = await fixture.page.screenshot({ path: "./test-results/screenshots/" + pickle.name, type: "png" });
        videoPath = await fixture.page.video().path();
    }
    await fixture.page.close();
    await context.close();
    if (result?.status == Status.FAILED) {
        await this.attach(img, "image/png");
        await this.attach(
            fs.readFileSync(videoPath), 'video/webm'
        );
    }
});

AfterAll(async function () {
    await browser.close();
    fixture.logger.close();
});

