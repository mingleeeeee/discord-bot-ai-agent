declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        DISCORD_TOKEN: string;
        CLIENT_ID: string;
        GUILD_ID: string;
      }
    }
  }
}
