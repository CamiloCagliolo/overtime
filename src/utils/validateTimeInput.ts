export default function validateTimeInput(value: string): string | true {
  if (value === "") return true;
  const parsedString = value.split(":");
  if (parsedString.length === 2) {
    let [left, right] = value.split(":");

    if (left.length > 2 || isNaN(Number(left))) {
      return "Invalid time format";
    }

    if (right.length != 2 || isNaN(Number(right))) {
      return "Invalid time format";
    }

    return true;
  }
  return "Invalid time format";
}
