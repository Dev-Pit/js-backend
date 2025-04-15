// logger.js
import chalk from "chalk";

// Dynamically determine the calling location
const getCallerLocation = () => {
  const err = new Error();
  const stack = err.stack.split("\n");

  // Skip the first few lines:
  // [0] Error
  // [1] at formatMessage (logger.js:...)
  // [2] at console.log (logger.js:...)
  // [3+] CALLER → we want this
  const callerLine = stack[4] || stack[3]; // Adjust based on depth
  const match =
    callerLine.match(/\((.*):(\d+):(\d+)\)/) ||
    callerLine.match(/at (.*):(\d+):(\d+)/);

  if (!match) return "unknown:0";
  const [, file, line] = match;
  const shortFile = file.split("/").slice(-2).join("/");
  return `${shortFile}:${line}`;
};

// Save original methods
const original = {
  log: console.log,
  info: console.info,
  warn: console.warn,
  error: console.error,
};

const formatMessage = (level, colorFn, args) => {
  const location = getCallerLocation();
  const levelTag = colorFn.bold(`[${level}]`);
  const locationTag = chalk.gray(`[${location}]`);
  return [levelTag, locationTag, ...args];
};

// Override console methods
console.log = (...args) =>
  original.log(...formatMessage("LOG", chalk.white, args));
console.info = (...args) =>
  original.info(...formatMessage("INFO", chalk.blue, args));
console.warn = (...args) =>
  original.warn(...formatMessage("WARN", chalk.yellow, args));
console.error = (...args) =>
  original.error(...formatMessage("ERROR", chalk.red, args));
