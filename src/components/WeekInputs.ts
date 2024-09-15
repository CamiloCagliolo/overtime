import Input from "./Input";
import days from "../constants/days";
import formatTime from "../utils/formatTime";
import validateTimeInput from "../utils/validateTimeInput";

export default function WeekInputs({
  weekNumber,
  onChange,
}: {
  weekNumber: number;
  onChange: () => void;
}) {
  const inputs = days.map((day) => {
    return Input({
      labelText: day,
      name: `week-${weekNumber}-${day.toLowerCase()}`,
      type: "text",
      maxLength: 6,
      onChange,
      formatter: formatTime,
      validation: validateTimeInput,
    });
  });

  return inputs;
}
