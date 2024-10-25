import { getLatestSeason } from "./seasonTools";

export const checkActiveSeason = async () => {
  // check if the current season is active. If not, return an error message
  const getCurrentSeasonRes = (await getLatestSeason()) || [];
  if (!getCurrentSeasonRes.length) {
    return false;
  }
  const currentSeason = getCurrentSeasonRes[0];
  if (currentSeason.status !== "active") {
    return false;
  }

  return true;
};
