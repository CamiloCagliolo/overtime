import Input from "./Input";
import days from "../store/days";

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
      type: "number",
      onChange,
    });
  });

  return inputs;
}
