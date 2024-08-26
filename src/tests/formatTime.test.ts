import formatTime from "../utils/formatTime";

test('formatTime with length greater than 5', () => {
    expect(formatTime("12:345")).toBe("12:34");
});

test('formatTime with non-numbers', () => {
    expect(formatTime("12:34a")).toBe("12:34");
    expect(formatTime("12:3a")).toBe("12:3");
    expect(formatTime("12:a")).toBe("12:");
    expect(formatTime("a")).toBe("");
});

test('formatTime with longer than 2 left side', () => {
    expect(formatTime("123:45")).toBe("12:45");
    expect(formatTime("1234:5")).toBe("12:5");
    expect(formatTime("12345:")).toBe("12:");
});