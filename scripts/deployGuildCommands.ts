import { REST, Routes } from "discord.js";
import { commands } from "@/commands/commands";

//registeer commands

const rest = new REST({ version: "10" }).setToken(
  process.env.DISCORD_TOKEN || "",
);
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

(async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands.map((it) => it.data.toJSON()),
    });
    console.log(`success, ${commands.length} commands registered`);
  } catch (error) {
    console.error(error);
  }
})();
