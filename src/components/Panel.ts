import Input, { InputProps } from "./Input";

export default function Panel({
  inputProps,
  onChange,
}: {
  inputProps: InputProps[];
  onChange: () => void;
}) {
  const panel = document.createElement("div");
  panel.classList.add("panel");

  panel.innerHTML = `
    <h2> Global settings </h2>`;

  const inputs = inputProps.map((props) =>
    Input({ ...props, onChange })
  );

  for (const input of inputs) {
    panel.appendChild(input.component);
  }

  return { panel, inputs };
}
