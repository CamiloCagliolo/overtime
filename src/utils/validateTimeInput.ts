export default function validateTimeInput(value: string): string | true {
  if (value === "") return true;
  const parsedString = value.split(":");
  if (parsedString.length === 2) {
    let [left, right] = value.split(":");

    if (left.length > 2) {
      return "Invalid time format";
    }

    if (right.length != 2) {
      return "Invalid time format";
    }

    return true;
  }
  return "Invalid time format";
}
