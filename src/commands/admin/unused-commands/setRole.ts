import { Role, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";

const data = new SlashCommandBuilder()
  .setName("set-role")
  .setDescription("set a role to a user")
  .addUserOption((option) =>
    option
      .setName("user")
      .setDescription("The user to set the role to")
      .setRequired(true)
  )
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("The role to set to the user.")
      .setRequired(true)
  );

const execute: Command = async (interaction) => {
  const targetUser = interaction.options.getUser("user");
  const targetUserId = targetUser?.id;

  const guild = interaction.guild;
  await guild?.members.fetch();
  const member = guild?.members.cache.get(targetUserId || "");
  const role = interaction.options.getRole("role");

  try {
    if (role instanceof Role) {
      await member?.roles.add(role);
      await interaction.reply(
        `The role ${role?.name} has been added to ${member?.user.username}.`
      );
      return;
    } else {
      await interaction.reply("The role is not valid.");
      return;
    }
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
    return;
  }
};

export const setRole = {
  data,
  execute,
};
