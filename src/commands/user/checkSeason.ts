import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Command } from "@/commands/commands";
import { getLatestSeason } from "../tools/seasonTools";
import parseMilliseconds from "parse-ms";
import { getFirstReservation } from "../tools/reservationTools";
import { localeCommand, localeMessages } from "../language";
const data = new SlashCommandBuilder()
  .setName("check-season")
  .setDescription("check current season info")
  .setDescriptionLocalizations(localeCommand.checkSeason.comDes);

const execute: Command = async (interaction) => {
  const translate = localeMessages[interaction.locale] ?? localeMessages.en;

  //basic embed
  const replyEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Current Season Info")
    .setTimestamp();

  try {
    // if there is a season reservation, return the reservation info
    const getReservationData = (await getFirstReservation()) || [];

    if (
      getReservationData.length > 0 &&
      Number(getReservationData[0].startAt) > Date.now()
    ) {
      const remainingTime = Number(getReservationData[0].startAt) - Date.now();

      const remainingTimeParsed = parseMilliseconds(remainingTime);
      replyEmbed.addFields({
        name: `${translate.seasonWillStartIn}`,
        value: `${translate.seasonStartTime
          .replace("{days}", remainingTimeParsed.days.toString())
          .replace("{hours}", remainingTimeParsed.hours.toString())
          .replace("{minutes}", remainingTimeParsed.minutes.toString())
          .replace("{seconds}", remainingTimeParsed.seconds.toString())}`,
        inline: false,
      });

      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const getCurrentSeasonRes = (await getLatestSeason()) || [];

    if (
      !getCurrentSeasonRes.length ||
      getCurrentSeasonRes[0].status === "ended"
    ) {
      replyEmbed.addFields({
        name: `${translate.noSeason}`,
        value: "\n",
      });
      await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
      return;
    }

    const {
      id,
      name,
      startBalance,
      nextStartBalance,
      duration,
      // startAt,
      status,
      endAt,
    } = getCurrentSeasonRes[0];

    const now = Date.now();
    const remainingTime = parseMilliseconds(Number(endAt) - now);

    replyEmbed
      .addFields({
        name: translate.seasonId,
        value: `${id}`,
        inline: false,
      })
      .addFields({
        name: translate.seasonName,
        value: `${name}`,
        inline: false,
      })
      .addFields({
        name: translate.startBalance,
        value: `${startBalance}`,
        inline: false,
      })
      .addFields({
        name: translate.nextSeasonStartBalance,
        value: `${nextStartBalance}`,
        inline: false,
      })
      // duration is ms, convert to days
      .addFields({
        name: translate.duration,
        value: `${parseMilliseconds(Number(duration)).days} days`,
        inline: false,
      })
      .addFields({
        name: translate.remainingTime,
        value: `${remainingTime.days} days, ${remainingTime.hours} hours, ${remainingTime.minutes} minutes, ${remainingTime.seconds} seconds`,
        inline: false,
      })
      .addFields({
        name: translate.status,
        value: `${status}`,
        inline: false,
      });

    await interaction.reply({ embeds: [replyEmbed], ephemeral: true });

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

export const checkSeasonCommand = {
  data,
  execute,
};
