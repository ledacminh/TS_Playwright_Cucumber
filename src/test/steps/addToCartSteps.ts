
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, Page, Browser, expect } from '@playwright/test'
import { pageFixture } from '../../hook/pageFixture';

setDefaultTimeout(60 * 1000)

When('user search for a {string}', async function (book) {
    await pageFixture.page.waitForTimeout(3000);
    await pageFixture.page.locator("//input[@placeholder='Search books or authors']").type(book);
    await pageFixture.page.waitForTimeout(3000);
    await pageFixture.page.keyboard.press("Enter");
    await pageFixture.page.waitForTimeout(3000);

});


When('user add the book to the cart', async function () {
    await pageFixture.page.locator("//strong[text()='HP2']").click();
    await pageFixture.page.waitForTimeout(3000);
    await pageFixture.page.locator("//td[contains(text(),'HP2')]/parent::tr/parent::table//following-sibling::div//button[@color='primary']").click();
    await pageFixture.page.waitForTimeout(3000);

});



Then('the cart badge should get updated', async function () {
    await pageFixture.page.locator("(//mat-icon[@role='img'])[2]").click();
});
