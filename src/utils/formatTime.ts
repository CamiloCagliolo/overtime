export default function formatTime(value: string): string {
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
  }

  if (value.length === 3) {
    if (value[2] !== ":") {
      return `${value[0]}${value[1]}:${value[2]}`;
    }
  }

  return value;
}
