export default function translateTime(v: string) {
    const parsedString = v.split(":");
    if (parsedString.length === 2) {
        let [left, right] = parsedString;
        const totalHours = parseInt(left) + parseInt(right) / 60;
        return totalHours;
    }
    return 0;
}