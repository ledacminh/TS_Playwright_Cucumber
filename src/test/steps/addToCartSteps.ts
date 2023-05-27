
import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, Page, Browser, expect } from '@playwright/test'
import { fixture } from '../../hook/pageFixture';

setDefaultTimeout(60 * 1000)

When('user search for a {string}', async function (book) {
    await fixture.page.waitForTimeout(3000);
    await fixture.page.locator("//input[@placeholder='Search books or authors']").type(book);
    await fixture.page.waitForTimeout(3000);
    await fixture.page.keyboard.press("Enter");
    await fixture.page.waitForTimeout(3000);
    fixture.logger.info("User search for " + book);

});

When('user add the book to the cart', async function () {
    await fixture.page.locator("//strong[text()='HP2']").click();
    await fixture.page.waitForTimeout(3000);
    await fixture.page.locator("//td[contains(text(),'HP2')]/parent::tr/parent::table//following-sibling::div//button[@color='primary']").click();
    await fixture.page.waitForTimeout(3000);
    fixture.logger.info("User add the book to the cart");

});

Then('the cart badge should get updated', async function () {
    await fixture.page.locator("(//mat-icon[@role='img'])[2]").click();
});
