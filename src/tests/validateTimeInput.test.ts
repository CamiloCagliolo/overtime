import validateTimeInput from "../utils/validateTimeInput";

test("validateTimeInput", () => {
  expect(validateTimeInput("")).toBe(true);
  expect(validateTimeInput("12:34")).toBe(true);
  expect(validateTimeInput("1:34")).toBe(true);
  expect(validateTimeInput("12:3")).toBe("Invalid time format");
  expect(validateTimeInput("1234")).toBe("Invalid time format");
  expect(validateTimeInput("12:3")).toBe("Invalid time format");
  expect(validateTimeInput("123:45")).toBe("Invalid time format");
  expect(validateTimeInput("12:345")).toBe("Invalid time format");
  expect(validateTimeInput("12:3a")).toBe("Invalid time format");
  expect(validateTimeInput("12:a3")).toBe("Invalid time format");
  expect(validateTimeInput("12:3a4")).toBe("Invalid time format");
  expect(validateTimeInput("12:a34")).toBe("Invalid time format");
  expect(validateTimeInput("12:34a")).toBe("Invalid time format");
  expect(validateTimeInput("12:34a5")).toBe("Invalid time format");
  expect(validateTimeInput("12:34:56")).toBe("Invalid time format");
  expect(validateTimeInput("12:34:5")).toBe("Invalid time format");
  expect(validateTimeInput("12:34:5a")).toBe("Invalid time format");
  expect(validateTimeInput("12:34:a5")).toBe("Invalid time format");
  expect(validateTimeInput("12:34:56a")).toBe("Invalid time format");
});
