import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, Page, Browser, expect } from '@playwright/test'
import { fixture } from '../../hook/pageFixture';


setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {
    await fixture.page.goto(process.env.BASEURL);
    fixture.logger.info("Navigated to the application");

});


Given('User click on the login link', { timeout: 2 * 5000 }, async function () {
    await fixture.page.locator("//span[text()='Login']").click();
    fixture.logger.info("User click on the login link");

});



Given('User enter the username as {string}', async function (username) {
    await fixture.page.locator("//input[@id='mat-input-0']").type(username);
});



Given('User enter the password as {string}', async function (password) {
    await fixture.page.locator("//input[@id='mat-input-1']").type(password);
});



When('User click on the login button', async function () {
    await fixture.page.locator("(//span[text()='Login'])[2]").click();
});


When('Login should fail', async function () {
    const failureMessage = fixture.page.locator("//mat-error[text()='Username or Password is incorrect.']");
    await expect(failureMessage).toBeDisabled();
    await fixture.page.locator("(//span[text()='Login'])[2]").click();
    fixture.logger.info("User login failed!");

});

Then('Login should be success', async function () {
    const text = await fixture.page.locator("(//span[text()='Login'])[2]").textContent();
    fixture.logger.info("User login successully!");

});