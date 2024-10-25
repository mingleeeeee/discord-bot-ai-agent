const emojiRegexp =
  /^[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F018}-\u{1F270}\u{1F300}-\u{1F5FF}\u{1F650}-\u{1F67F}\u{1F30D}-\u{1F30F}\u{1F315}\u{1F31C}\u{1F321}\u{1F324}-\u{1F393}\u{1F396}-\u{1F397}\u{1F399}-\u{1F39B}\u{1F39E}-\u{1F3F0}\u{1F3F3}-\u{1F3F5}\u{1F3F7}-\u{1F4FD}\u{1F4FF}-\u{1F53D}\u{1F549}-\u{1F54E}\u{1F550}-\u{1F567}\u{1F57A}\u{1F595}-\u{1F596}\u{1F5A4}\u{1F5FB}-\u{1F64F}\u{1F680}-\u{1F6D2}\u{1F6D5}-\u{1F6D7}\u{1F6D9}-\u{1F6DF}\u{1F6ED}-\u{1F6F3}\u{1F6F6}-\u{1F6F8}\u{1F910}-\u{1F93E}\u{1F940}-\u{1F970}\u{1F973}-\u{1F976}\u{1F97A}\u{1F97C}-\u{1F9A2}\u{1F9B0}-\u{1F9B9}\u{1F9C0}\u{1F9C1}-\u{1F9C2}\u{1F9E7}-\u{1F9FF}\u{1FA70}-\u{1FA73}\u{1FA78}-\u{1FA7A}\u{1FA80}-\u{1FA82}\u{1FA90}-\u{1FA95}]+$/gu;

// check if a string is an emoji
export const isEmoji = (str: string) => {
  return emojiRegexp.test(str);
};

// convert an emoji to its Unicode code point
export const emojiToUnicode = (emoji: string): string => {
  return emoji.codePointAt(0)?.toString(16) || "";
};

// convert a Unicode code point to an emoji
export const unicodeToEmoji = (code: string): string => {
  const codePoint = parseInt(code, 16);
  if (!isNaN(codePoint) && codePoint >= 0x1000) {
    return String.fromCodePoint(codePoint);
  } else {
    return code;
  }
};
