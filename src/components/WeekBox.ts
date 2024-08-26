import days from "../constants/days";
import WeekInputs from "./WeekInputs";

export default function WeekBox({
  weekNumber,
  decreaseWeekNumber,
  cleanBoard,
  reconstructBoard,
  onChange,
}: {
  weekNumber: number;
  decreaseWeekNumber: () => void;
  cleanBoard: () => void;
  reconstructBoard: (board: HTMLDivElement) => void;
  onChange: () => void;
}) {
  const week = WeekInputs({ weekNumber, onChange });
  const weekBox = document.createElement("div");
  weekBox.innerHTML = `<h3>Week ${weekNumber + 1}</h3>`;

  const inputBox = document.createElement("div");
  for (const day of week) {
    inputBox.appendChild(day.component);
  }

  const removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("remove");
  removeButton.addEventListener("click", () => {
    weekBox.remove();
    const totalWeekNumber = parseInt(localStorage.getItem("weekNumber")!);
    rearrangeWeeks(totalWeekNumber, weekNumber);
    decreaseWeekNumber();
    cleanBoard();
    reconstructBoard(document.querySelector(".board")!);
    onChange();
  });

  weekBox.appendChild(inputBox);
  weekBox.classList.add("week-box");

  inputBox.appendChild(removeButton);

  return weekBox;
}

function rearrangeWeeks(weekNumber: number, removedWeek: number) {
  for (let i = removedWeek; i < weekNumber; i++) {
    for (const day of days) {
      const key = `week-${i}-${day.toLowerCase()}`;
      const nextKey = `week-${i + 1}-${day.toLowerCase()}`;
      const value = localStorage.getItem(nextKey);
      if (value) {
        localStorage.setItem(key, value!);
      } else {
        localStorage.removeItem(key);
      }
      
    }
  }
}
