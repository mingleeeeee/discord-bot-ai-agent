import toMilliseconds from "@sindresorhus/to-milliseconds";
import parseMilliseconds from "parse-ms";

//default is 24 hours
export const getTotalMsWithDefault = (
  day: number,
  hour: number,
  minute: number,
  second: number
) => {
  return toMilliseconds({
    days: day,
    hours: hour,
    minutes: minute,
    seconds: second,
  }) == 0
    ? toMilliseconds({
        hours: 24,
      })
    : toMilliseconds({
        days: day,
        hours: hour,
        minutes: minute,
        seconds: second,
      });
};

export const isValidDate = (dateString: string) => {
  // Check if the format is YYYY-MM-DD
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  // Parse the date parts
  const parts = dateString.split("-");
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  console.log(year, month, day);
  // Check the ranges of month and year
  if (year < 1000 || year > 3000 || month <= 0 || month > 12) return false;

  const monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  console.log("monthLength[month - 1]");
  // Adjust for leap years
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
    monthLength[1] = 29;
  console.log("222");

  // Check the range of the day
  return day > 0 && day <= monthLength[month - 1];
};

export const parseMsToTime = (ms: number) => {
  const time = parseMilliseconds(ms);
  return `${time.days}d ${time.hours}h ${time.minutes}m ${time.seconds}s`;
};

export const parseMsToDate = (ms: number) => {
  const date = new Date(ms);
  const dateArray = date.toISOString().split("T");
  return dateArray[0] + " " + dateArray[1].split(".")[0];
};

export const jstToUtc0 = (dateString: string) => {
  // Parse the input string as a date in JST (UTC+9)
  const date = new Date(dateString + "Z");

  // Convert the date to UTC by subtracting 9 hours
  date.setHours(date.getHours() - 9);

  // Format the date back to a string in the desired format
  console.log(date.toISOString().replace("T", " ").substring(0, 19));
  return date.toISOString().replace("T", " ").substring(0, 19);
};
