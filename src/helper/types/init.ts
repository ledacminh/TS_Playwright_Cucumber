const fs = require("fs-extra");

try {
    fs.ensureDir("test-results");
    fs.emptyDir("test-results");

} catch (error) {
    throw new Error("Folder not created!");
}