import Panel from "./components/Panel";
import TimeEntryBoard from "./components/TimeEntryBoard";
import "./style.css";

document.addEventListener("DOMContentLoaded", main);

let hourCostResult: HTMLHeadingElement;
let totalTimeResult: HTMLHeadingElement;
let totalMoneyResult: HTMLHeadingElement;
let panelInputs: {
  component: HTMLLabelElement;
  innerInput: HTMLInputElement;
}[];
const store = {
  hourCost: 0.0,
  totalHours: 0.0,
  total: 0.0,
};

function main() {
  const appDiv = document.querySelector<HTMLDivElement>("#app")!;

  const inputProps = [
    {
      labelText: "Monthly income",
      name: "base",
      type: "number",
    },
    {
      labelText: "Daily amount of hours",
      name: "daily",
      type: "number",
    },
    {
      labelText: "How many days a week",
      name: "weekly",
      type: "number",
    },
    {
      labelText: "Overtime multiplier",
      name: "multiplier",
      type: "number",
    },
  ];

  const { panel, inputs } = Panel({
    inputProps,
    onChange: () => {
      rerenderCost();
      rerenderTotalOvertime();
      rerenderTotalMoney();
    },
  });

  panelInputs = inputs;
  const info = document.createElement("div");
  info.classList.add("info");

  hourCostResult = document.createElement("h3");
  hourCostResult.classList.add("ot-cost");
  hourCostResult.innerHTML = `Overtime hour cost: <span class="important"></span>`;
  info.appendChild(hourCostResult);

  totalTimeResult = document.createElement("h3");
  totalTimeResult.classList.add("ot-cost");
  totalTimeResult.innerHTML = `Total overtime: <span class="important"></span>`;
  info.appendChild(totalTimeResult);

  totalMoneyResult = document.createElement("h3");
  totalMoneyResult.classList.add("ot-cost");
  totalMoneyResult.innerHTML = `Total money: <span class="important"></span>`;
  info.appendChild(totalMoneyResult);

  appDiv.appendChild(panel);
  appDiv.appendChild(info);
  appDiv.appendChild(
    TimeEntryBoard({
      onChange: () => {
        rerenderTotalOvertime();
        rerenderTotalMoney();
      },
    })
  );

  rerenderCost();
  rerenderTotalOvertime();
  rerenderTotalMoney();
}

const rerenderCost = () => {
  const hourCost =
    (Number(panelInputs[0].innerInput.value) /
      (Number(panelInputs[1].innerInput.value) *
        Number(panelInputs[2].innerInput.value) *
        4)) *
    Number(panelInputs[3].innerInput.value);

  if (isNaN(hourCost)) {
    store.hourCost = 0.0;
    hourCostResult.querySelector(".important")!.textContent = "0.00";
    return;
  }
  store.hourCost = hourCost;
  hourCostResult.querySelector(".important")!.textContent = hourCost.toFixed(2);
};

const rerenderTotalOvertime = () => {
  const total = Object.keys(localStorage).reduce((acc, key) => {
    if (key.includes("week-")) {
      acc += Number(localStorage.getItem(key)!);
    }
    return acc;
  }, 0);

  store.total = total;
  totalTimeResult.querySelector(".important")!.textContent = total.toFixed(2);
};

const rerenderTotalMoney = () => {
  const total = store.total * store.hourCost;
  totalMoneyResult.querySelector(".important")!.textContent = `$${total.toFixed(2)}`;
};
