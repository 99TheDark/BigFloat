const validNumber = /^[0-9,\.]*$/g;
const period = /\./g;

// Problem from LeetCode
export function multiply(num1: string, num2: string): string {
    let sign = ((num1[0] == "-") == (num2[0] == "-")) ? "" : "-";
    if(num1[0] == "-") num1 = num1.substring(1);
    if(num2[0] == "-") num2 = num2.substring(1);

    if(num1 == "0" || num2 == "0") return "0";

    // Check the legality of the number
    if(
        // Empty string
        num1.length == 0 ||
        num2.length == 0 ||

        // Begins with 0 and isn't a decimal
        (num1[0] == "0" && num1[1] != ".") ||
        (num2[0] == "0" && num2[2] != ".") ||

        // Includes more than one decimal point
        (num1.match(period) ?? [0]).length != 1 ||
        (num2.match(period) ?? [0]).length != 1 ||

        // Contains anything besides numbers and a decimal point
        num1.match(validNumber) == null ||
        num2.match(validNumber) == null
    ) return "NaN";

    // Decimals
    let dec1 = num1.indexOf(".");
    let dec2 = num2.indexOf(".");
    dec1 = dec1 == -1 ? 0 : (num1.length - dec1 - 1);
    dec2 = dec2 == -1 ? 0 : (num2.length - dec2 - 1);

    let decimalShift = dec1 + dec2;

    num1 = num1.replace(".", "");
    num2 = num2.replace(".", "");

    let rows: string[] = [];
    let longest = 0;
    for(let j = num2.length - 1, k = 0; j >= 0; j--, k++) {
        let carry = 0;
        let row = "";
        for(let i = num1.length - 1; i >= 0; i--) {
            let prod = Number(num1[i]) * Number(num2[j]) + carry;
            row = prod % 10 + row;
            carry = Math.floor(prod / 10);
        }
        if(carry != 0) row = carry + row;
        row += "0".repeat(k);
        longest = Math.max(longest, row.length);
        rows.push(row);
    }
    let total = "";
    let carry = 0;
    for(let i = 0; i < longest; i++) {
        let sum = carry;
        rows.forEach(row => {
            let val = Number(row[row.length - 1 - i]);
            sum += isNaN(val) ? 0 : val;
        });
        carry = Math.floor(sum / 10);
        total = sum % 10 + total;
    }
    if(carry != 0) total = carry + total;

    let shift = total.length - decimalShift;
    if(decimalShift > 0) {
        let right = total.substring(shift);
        for(let i = right.length - 1; i >= 0; i--) if(right[i] == "0") {
            right = right.substring(0, right.length - 1);
        } else break;
        total = total.substring(0, shift) + "." + right;
    }

    return sign + total;
};