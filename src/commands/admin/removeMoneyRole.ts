import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { checkAdmin } from "@/commands/tools/checkRole";
import { updateMoney } from "@/commands/tools/updateMoney";
import { localeCommand, localeMessages } from "../language";

const data = new SlashCommandBuilder()
  .setName("remove-money-role")
  .setDescription("remove money from the role")
  .setDescriptionLocalizations(localeCommand.removeMoneyRole.comDes)
  .addRoleOption((option) =>
    option
      .setName("role")
      .setDescription("role to set")
      .setDescriptionLocalizations(localeCommand.removeMoneyRole.roleDes)
      .setRequired(true)
  )
  .addIntegerOption((option) =>
    option
      .setName("amount")
      .setDescription("amount to remove")
      .setDescriptionLocalizations(localeCommand.removeMoneyRole.amountDes)
      .setRequired(true)
      .setMinValue(0)
  );

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  const replyEmbed = new EmbedBuilder().setColor(0x0099ff).setTimestamp();

  try {
    // check if the user's role is admin
    if (!checkAdmin(interaction)) {
      replyEmbed.setTitle(`${translate.notAdmin}`);
      await interaction.reply({ embeds: [replyEmbed] });
      return;
    }

    const targetRole = interaction.options.getRole("role");
    const targetRoleId = targetRole?.id;
    const removeValue = Number(interaction.options.getInteger("amount"));
    const guild = interaction.guild;

    await guild?.members.fetch();
    const memberIds =
      guild?.roles.cache
        .get(targetRoleId || "")
        ?.members.map((m) => m.user.id) || [];

    // console.log("filter members:", memberIds);

    // Use Promise.all to run all updateMoney requests in parallel
    await Promise.all(
      memberIds.map((memberId) => updateMoney(memberId, -removeValue))
    );

    replyEmbed.setTitle(
      `${translate.removeMoneyRole.replace("{removeValue}", removeValue.toString()).replace("{targetRoleName}", targetRole?.name || "")}`
    );

    await interaction.reply({ embeds: [replyEmbed] });
    return;
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: translate.somethingWrong,
      ephemeral: true,
    });
    return;
  }
};

export const removeMoneyRoleCommand = {
  data,
  execute,
};
