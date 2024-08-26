interface IPanelStore {
  hourCost: HTMLHeadingElement;
  totalTime: HTMLHeadingElement;
  totalMoney: HTMLHeadingElement;
}

const PanelStore = {
  hourCost: document.createElement("h3"),
  totalTime: document.createElement("h3"),
  totalMoney: document.createElement("h3"),
};

let key: keyof IPanelStore;

for (key in PanelStore) {
  PanelStore[key].classList.add("ot-cost");
}

PanelStore.hourCost.innerHTML = `Overtime hour cost: <span class="important"></span>`;
PanelStore.totalTime.innerHTML = `Total overtime: <span class="important"></span>`;
PanelStore.totalMoney.innerHTML = `Total money: <span class="important"></span>`;

export default PanelStore;
