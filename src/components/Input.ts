export interface InputProps {
  labelText: string;
  name: string;
  type: HTMLInputElement["type"];
  onChange?: (...args: any[]) => void;
}

export default function Input({ labelText, name, type, onChange }: InputProps) {
  const label = document.createElement("label");
  label.classList.add("label");
  label.innerHTML = `<p>${labelText}</p>`;
  label.htmlFor = name;

  const input = document.createElement("input");
  input.classList.add("input");
  input.name = name;
  input.type = type;
  if (type === "number") input.step = "0.01";

  if (localStorage.getItem(name)) {
    input.value = localStorage.getItem(name)!;
    label.classList.add("focused");
  }

  label.appendChild(input);

  input.addEventListener("focus", () => {
    label.classList.add("focused");
  });

  input.addEventListener("blur", () => {
    if (input.value === "") {
      label.classList.remove("focused");
    }
  });

  input.addEventListener("change", () => {
    localStorage.setItem(name, input.value);
    if(onChange) onChange();
  });

  return { component: label, innerInput: input };
}
