import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, Page, Browser, expect } from '@playwright/test'
import { pageFixture } from '../../hook/pageFixture';


setDefaultTimeout(60 * 1000 * 2)

Given('User navigates to the application', async function () {

    await pageFixture.page.goto(process.env.BASEURL);

});


Given('User click on the login link', { timeout: 2 * 5000 }, async function () {
    await pageFixture.page.locator("//span[text()='Login']").click();
});



Given('User enter the username as {string}', async function (username) {
    await pageFixture.page.locator("//input[@id='mat-input-0']").type(username);
});



Given('User enter the password as {string}', async function (password) {
    await pageFixture.page.locator("//input[@id='mat-input-1']").type(password);
});



When('User click on the login button', async function () {
    await pageFixture.page.locator("(//span[text()='Login'])[2]").click();
});


When('Login should fail', async function () {
    const failureMessage = pageFixture.page.locator("//mat-error[text()='Username or Password is incorrect.']");
    await expect(failureMessage).toBeDisabled();
    await pageFixture.page.locator("(//span[text()='Login'])[2]").click();
});

Then('Login should be success', async function () {
    const text = await pageFixture.page.locator("(//span[text()='Login'])[2]").textContent();
    console.log("Login successfully " + text);
});