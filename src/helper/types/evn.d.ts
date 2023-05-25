export { };

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER: "chrome" | "firefox",
            ENV: "staging", "prod", "test",
            BASEURL: string,
            HEAD: "true" | "false"
        }
    }
}