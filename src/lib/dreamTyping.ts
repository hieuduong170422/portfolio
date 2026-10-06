// Text bounds in the supplied 786 × 1704 PNG. Revealing the original pixels
// preserves the app's exact typeface and line breaks at every phone size.
export const dreamTyping = {
  width: 786,
  height: 1704,
  leadIn: 400,
  millisecondsPerCharacter: 13,
  lines: [
    { text: "Last night, I wandered into a silent library where", x: 28, y: 208, width: 701, height: 39 },
    { text: "hundreds of books floated weightlessly around", x: 28, y: 256, width: 696, height: 39 },
    { text: "me. Every time I tried to grab one, the pages", x: 28, y: 304, width: 652, height: 39 },
    { text: "fluttered open on their own—like they were", x: 26, y: 352, width: 620, height: 39 },
    { text: "whispering secrets I couldn’t fully hear", x: 26, y: 399, width: 570, height: 41 },
  ],
};

export const typingDuration = dreamTyping.leadIn + dreamTyping.lines.reduce(
  (total, line) => total + Array.from(line.text).length * dreamTyping.millisecondsPerCharacter, 0,
);
