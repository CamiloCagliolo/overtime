export interface InputProps {
  labelText: string;
  name: string;
  type: HTMLInputElement["type"];
  onChange?: (...args: any[]) => void;
  formatter?: (value: string) => string;
  maxLength?: number;
  validation?: (value: string) => string | true;
}

export default function Input({
  labelText,
  name,
  type,
  maxLength,
  onChange,
  formatter,
  validation,
}: InputProps) {
  const label = document.createElement("label");
  label.classList.add("label");
  label.innerHTML = `<p>${labelText}</p>`;
  label.htmlFor = name;

  const input = document.createElement("input");
  input.classList.add("input");
  input.name = name;
  input.type = type;
  if (maxLength) input.maxLength = maxLength;

  if (type === "number") input.step = "0.01";

  if (localStorage.getItem(name)) {
    input.value = localStorage.getItem(name)!;
    label.classList.add("focused");
  }

  label.appendChild(input);

  const error = document.createElement("span");

  if (validation) {
    error.classList.add("error");
    label.appendChild(error);
  }

  const appendErrorMessage = (message: string) => {
    error.textContent = message;
  };

  const clearErrorMessage = () => {
    error.textContent = "";
  };

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
    if (onChange) onChange();
    if (validation) {
      const validated = validation(input.value);
      if (validated !== true) {
        appendErrorMessage(validated);
        return;
      } else {
        clearErrorMessage();
      }
    }
  });

  input.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      input.blur();
      const next = label.nextElementSibling?.querySelector("input");
      if (next) next.focus();
    }
  });

  input.addEventListener("input", () => {
    if (formatter) {
      input.value = formatter(input.value);
    }
  });

  return { component: label, innerInput: input };
}
