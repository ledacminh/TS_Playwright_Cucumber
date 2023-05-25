const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./test-results/",
  reportPath: "./",
  reportName: "Playwright Automation Report",
  pageTitle: "BookCart App test report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "113",
    },
    device: "Minh Le - PC",
    platform: {
      name: "Windown",
      version: "10",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Book Cart Application" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" }
    ],
  },
});