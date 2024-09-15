export default function validateTimeInput(value: string): string | true {
  if (value === "") return true;
  if (/^-?(?:\d?\d):[0-5]\d$/.test(value)) return true;
  return 'Invalid time format';
}
