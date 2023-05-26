import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber'
import { chromium, Page, Browser, expect } from '@playwright/test'
import Assert from '../../helper/wrapper/assert';
import { fixture } from '../../hook/pageFixture';
import LoginPage from '../page/loginPage';


setDefaultTimeout(60 * 1000 * 2)

let loginPage: LoginPage;
let assert: Assert;

Given('User navigates to the application', async function () {
    loginPage = new LoginPage(fixture.page);
    await loginPage.navigateToTheApplycation();
    fixture.logger.info("Navigated to the application");

});


Given('User click on the login link', { timeout: 2 * 5000 }, async function () {
    loginPage.clickOnLoginLink();
    fixture.logger.info("User click on the login link");

});



Given('User enter the username as {string}', async function (username) {
    await loginPage.enterUsername(username);
});



Given('User enter the password as {string}', async function (password) {
    await loginPage.enterPassword(password);
});



When('User click on the login button', async function () {
    await loginPage.clickOnButtonLogin();
});


When('Login should fail', async function () {
    await loginPage.assertMessageLoginUnscucessfully();
    fixture.logger.info("User login failed!");

});

Then('Login should be success', async function () {
    fixture.logger.info("User login successully!");

});