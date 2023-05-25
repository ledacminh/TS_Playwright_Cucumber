import { chromium, firefox, LaunchOptions } from "@playwright/test";


const option: LaunchOptions = {
    headless: false,
    args: ["--start-fullscreen"]
    //args: ["--start-maximized"]
}
export const invokeBrowser = () => {
    const browserType = process.env.BROWSER;

    switch (browserType) {
        case "chrome":
            return chromium.launch(option);
        case "firefox":
            return firefox.launch(option);
        default:
            throw new Error("Please set the proper browser!");
    }

}