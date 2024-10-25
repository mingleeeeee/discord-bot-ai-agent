import {
  ButtonInteraction,
  ChatInputCommandInteraction,
  GuildMember,
} from "discord.js";
import { getTaskTargetRole } from "./taskTargetRoleTools";

export const checkAdmin = (
  interaction: ChatInputCommandInteraction
): boolean => {
  return (
    interaction.member instanceof GuildMember &&
    interaction.member.roles.cache.some(
      (role) =>
        role.name === process.env.DISCORD_ROLE_NAME_ADMIN ||
        role.name === process.env.DISCORD_ROLE_NAME_ADMINISTRATOR
    )
  );
};

export const checkRole = (
  interaction: ChatInputCommandInteraction,
  roleName: string
): boolean => {
  return (
    interaction.member instanceof GuildMember &&
    interaction.member.roles.cache.some((role) => role.name === roleName)
  );
};

// console.log(await checkUserRoles(interaction, 4));

export const checkUserRoles = async (
  interaction: ChatInputCommandInteraction | ButtonInteraction,
  taskTypeId: number
): Promise<boolean> => {
  const getTargetRoleData = (await getTaskTargetRole(taskTypeId)) || [];
  const targetRoleNames = getTargetRoleData.map((i) => i.role);

  return (
    // check if the user's role is in the targetRoleNames
    interaction.member instanceof GuildMember &&
    interaction.member.roles.cache.some((role) =>
      targetRoleNames.includes(role.name)
    )
  );
};
