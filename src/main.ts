import Panel from "./components/Panel";
import TimeEntryBoard from "./components/TimeEntryBoard";
import "./style.css";
import PanelStore from "./store/panel";
import translateTime from "./utils/translateTime";

document.addEventListener("DOMContentLoaded", main);

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

  let key: keyof typeof PanelStore;

  for (key in PanelStore) {
    info.appendChild(PanelStore[key]);
  }

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
    PanelStore.hourCost.querySelector(".important")!.textContent = "-";
    return;
  }
  store.hourCost = hourCost;
  PanelStore.hourCost.querySelector(".important")!.textContent =
    hourCost.toFixed(2);
};

const rerenderTotalOvertime = () => {
  const total = Object.keys(localStorage).reduce((acc, key) => {
    if (key.includes("week-")) {
      acc += translateTime(localStorage.getItem(key)!);
    }
    return acc;
  }, 0);

  if(isNaN(total)) {
    store.total = 0.0;
    PanelStore.totalTime.querySelector(".important")!.textContent = "-";
    return;
  }

  store.total = total;

  PanelStore.totalTime.querySelector(".important")!.textContent =
    total.toFixed(2);
};

const rerenderTotalMoney = () => {
  const total = store.total * store.hourCost;

  PanelStore.totalMoney.querySelector(
    ".important"
  )!.textContent = `$${total.toFixed(2)}`;
};
