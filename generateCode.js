let string = ``;
const wantedString = "hello"
const repeat = 10;
const loopBack = true;
const colours = [1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const tiles = 4;
const length = repeat * wantedString.length;
const fullString = wantedString.repeat(repeat);
for (let i = 0; i < length; i += tiles) {
    const colour = i % 15;
    string += `color ${colours[colour]}
echo ${fullString.slice(0, i + 1)}
(PATHPING 127.0.0.1 -n -q 1 -p 15)>NUL
`;
};
if (loopBack) {
    for (let i = length; i >= 0; i -= tiles) {
        const colour = i % 15;
        string += `color ${colours[colour]}
echo ${fullString.slice(0, i + 1)}
(PATHPING 127.0.0.1 -n -q 1 -p 15)>NUL
    `;
    };
}
console.log(`@echo off
:loop
${string}
goto loop
`);