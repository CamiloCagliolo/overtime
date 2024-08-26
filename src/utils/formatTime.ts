export default function formatTime(value: string): string {
  if (
    isNaN(Number(value[value.length - 1])) &&
    value[value.length - 1] !== ":"
  ) {
    return value.slice(0, value.length - 1);
  }

  const parsedString = value.split(":");

  if (parsedString.length === 2) {
    let [left, right] = value.split(":");

    if (left.length > 2) {
      left = left.slice(0, 2);
    }

    if (left.length === 1) {
      left = `0${left}`;
    }

    if (right.length > 2) {
      right = right.slice(0, 2);
    }

    return `${left}:${right}`;
  } else if (parsedString.length === 1) {
    debugger;
    if (parsedString[0].length > 2) {
      return `${parsedString[0].slice(0, 2)}:`;
    }
  }

  if (value.length === 3) {
    if (value[2] !== ":") {
      return `${value[0]}${value[1]}:${value[2]}`;
    }
  }

  return value;
}
