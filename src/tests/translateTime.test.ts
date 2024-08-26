import translateTime from "../utils/translateTime";

test("translateTime with 12:34", () => {
  expect(translateTime("12:30")).toBe(12.5);
});

test("translateTime with 1:30", () => {
  expect(translateTime("1:30")).toBe(1.5);
});

test("translateTime with 0:00", () => {
  expect(translateTime("0:00")).toBe(0);
});

test("translateTime with 0:30", () => {
  expect(translateTime("0:30")).toBe(0.5);
});

test("translateTime with 0:59", () => {
  expect(translateTime("0:59")).toBe(0.9833333333333333);
});

test("translateTime with 1:00", () => {
  expect(translateTime("1:00")).toBe(1);
});

test("translateTime with 1:01", () => {
  expect(translateTime("1:01")).toBe(1.0166666666666666);
});

test("translateTime with 1:59", () => {
  expect(translateTime("1:59")).toBe(1.9833333333333334);
});

test("translateTime with 2:00", () => {
  expect(translateTime("2:00")).toBe(2);
});

test("translateTime with 2:01", () => {
  expect(translateTime("2:01")).toBe(2.0166666666666666);
});

test("translateTime with bad input", () => {
  expect(translateTime("2:0")).toBe(2);
  expect(translateTime("2:")).toBe(0);
  expect(translateTime("2")).toBe(0);
  expect(translateTime("")).toBe(0);
  expect(translateTime("a")).toBe(0);
  expect(translateTime("a:")).toBe(0);
  expect(translateTime("a:0")).toBe(0);
  expect(translateTime("a:00")).toBe(0);
  expect(translateTime("a:01")).toBe(0);
  expect(translateTime("a:1")).toBe(0);
});
