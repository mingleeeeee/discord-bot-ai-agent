export const getTweetIdFromUrl = (url: string): string | "" => {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : "";
};
