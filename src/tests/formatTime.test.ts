import formatTime from "../utils/formatTime";

test("formatTime with length greater than 5", () => {
  expect(formatTime("12:345")).toBe("12:34");
});

test("formatTime with non-numbers", () => {
  expect(formatTime("12:34a")).toBe("12:34");
  expect(formatTime("12:3a")).toBe("12:3");
  expect(formatTime("12:a")).toBe("12:");
  expect(formatTime("a")).toBe("");
});

test("formatTime with longer than 2 left side", () => {
  expect(formatTime("123:45")).toBe("12:45");
  expect(formatTime("1234:5")).toBe("12:5");
  expect(formatTime("12345:")).toBe("12:");
});

test("formatTime with negative sign", () => {
  expect(formatTime("-12:34")).toBe("-12:34");
  expect(formatTime("-1:34")).toBe("-01:34");
  expect(formatTime("-1:3")).toBe("-01:3");
  expect(formatTime("-1:")).toBe("-01:");
  expect(formatTime("-1")).toBe("-1");
});

test("formatTime one character at a time", () => {
  expect(formatTime("1")).toBe("1");
  expect(formatTime("1:")).toBe("01:");
  expect(formatTime("01:2")).toBe("01:2");
  expect(formatTime("01:23")).toBe("01:23");
  expect(formatTime("01:234")).toBe("01:23");
  expect(formatTime("2")).toBe("2");
  expect(formatTime("21")).toBe("21");
  expect(formatTime("21:")).toBe("21:");
  expect(formatTime("21:3")).toBe("21:3");
  expect(formatTime("21:34")).toBe("21:34");
  expect(formatTime("21:345")).toBe("21:34");
  expect(formatTime("3")).toBe("3");
  expect(formatTime("3a")).toBe("3");
  expect(formatTime("3:")).toBe("03:");
  expect(formatTime("03:4")).toBe("03:4");
  expect(formatTime("03:45")).toBe("03:45");
  expect(formatTime("-")).toBe("-");
  expect(formatTime("-1")).toBe("-1");
  expect(formatTime("-1:")).toBe("-01:");
  expect(formatTime("-01:2")).toBe("-01:2");
  expect(formatTime("-01:23")).toBe("-01:23");
})