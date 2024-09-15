export default function formatTime(value: string): string {
  const newCharacter = value[value.length - 1];
  const isNumber = Number(newCharacter) >= 0 && Number(newCharacter) <= 9;
  const isColon = newCharacter === ":";
  const isValidDash = newCharacter === "-" && value.length === 1;

  if (isValidDash) {
    return value;
  }
  
  if (isNumber) {
    let [hours, minutes] = value.split(":");

    const isNegative = hours.startsWith("-");
    hours = hours.replace("-", "");

    if (!minutes) {
      if (hours.length > 2) {
        return `${isNegative ? "-" : ""}${hours.slice(0, 2)}:${hours.slice(2)}`;
      } else {
        return `${isNegative ? "-" : ""}${hours}`;
      }
    } else {
      if (hours.length > 2) {
        hours = hours.slice(0, 2);
      }
      if (minutes.length > 2) {
        minutes = minutes.slice(0, 2);
      }
      
      return `${isNegative ? "-" : ""}${hours.padStart(2, "0")}:${minutes}`;
    }
  }

  if (isColon) {
    const isNegative = value.startsWith("-");
    let hours = value.replace("-", "").replace(":", "");

    return `${isNegative ? "-" : ""}${hours.slice(0,2).padStart(2, "0")}:`;
  }

  return value.slice(0, value.length - 1);
}
