import WeekBox from "./WeekBox";

let weekNumber = 0;
let globalOnChange: () => void;

export default function TimeEntryBoard({ onChange }: { onChange: () => void }) {
  globalOnChange = onChange;
  const board = document.createElement("div");
  board.classList.add("board");

  const addButton = document.createElement("button");
  addButton.innerText = "Add week";
  board.appendChild(addButton);

  if (localStorage.getItem("weekNumber")) {
    reconstructBoard(board);
  }

  addButton.addEventListener("click", () => {
    board.appendChild(
      WeekBox({
        weekNumber,
        decreaseWeekNumber,
        cleanBoard,
        reconstructBoard,
        onChange,
      })
    );
    increaseWeekNumber();
  });

  return board;
}

const decreaseWeekNumber = () => {
  weekNumber--;
  localStorage.setItem("weekNumber", weekNumber.toString());
};

const increaseWeekNumber = () => {
  weekNumber++;
  localStorage.setItem("weekNumber", weekNumber.toString());
};

const cleanBoard = () => {
  const weekBoxes = document.querySelectorAll(".board div");
  weekBoxes.forEach((weekBox) => {
    weekBox.remove();
  });
};

const reconstructBoard = (board: HTMLDivElement) => {
  weekNumber = parseInt(localStorage.getItem("weekNumber")!);
  for (let i = 0; i < weekNumber; i++) {
    board.appendChild(
      WeekBox({
        weekNumber: i,
        decreaseWeekNumber,
        cleanBoard,
        reconstructBoard,
        onChange: globalOnChange,
      })
    );
  }
};
