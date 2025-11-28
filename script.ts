const data = require('./data');
const prnt = console.log;
// no way I'm gonna type 
// out 'string' every time.
type str = string;
type bool = boolean;
type num = number;

interface map<T> {
    [key: string]: T;
}

function day1() {
    const strData = data.day1;
    const arrData = strData.split(/\s/).filter((s: str) => s !== '').map((s: str) => parseInt(s))
    const l = arrData.filter((c: num, i: num) => i % 2 === 0).sort((x: num, y: num) => (x - y));
    const r = arrData.filter((c: num, i: num) => i % 2 === 1).sort((x: num, y: num) => (x - y));
    const n = l.length;
    let s = 0;
    for (let i = 0; i < n; i++) {
        s += Math.abs(l[i] - r[i]);
    }
    prnt(s)
    const appearances: map<num> = {};
    for (const e of r) {
        if (e in appearances)
            (appearances[e] as num)++;
        else
            appearances[e] = 1;
    }
    const similarity = l.reduce((a: num, c: num) =>
        a + c * ((String(c) in appearances) ? appearances[c] as num : 0), 0);
    prnt(similarity)
}

function day2() {
    const strData = data.day2;
    const arrData = strData.split('\n');
    const arrData2d = arrData.map((s: str) => s.split(' ').map(x => parseInt(x))).filter((r: any) => !r.includes(NaN));
    const n1 = arrData2d.filter((r: num[]) => {
        const l = r.length;
        const comp = (r[1] as num) > (r[0] as num) ? (x: num, y: num) => (x > y) : (x: num, y: num) => (x < y);
        for (let i = 1; i < l; i++) {
            const dif = Math.abs((r[i] as num) - (r[i - 1] as num));
            if (!comp(r[i] as num, r[i - 1] as num) || dif > 3) {
                return false;
            }
        }
        return true;
    }).length;
    prnt(n1)
    const n2 = arrData2d.filter((r: num[]) => {
        const checkSafe = (r: num[]) => {
            const l = r.length;
            const comp = (r[1] as num) > (r[0] as num) ? (x: num, y: num) => (x > y) : (x: num, y: num) => (x < y);
            for (let i = 1; i < l; i++) {
                const dif = Math.abs((r[i] as num) - (r[i - 1] as num));
                if (!comp(r[i] as num, r[i - 1] as num) || dif > 3) {
                    return false
                }
            }
            return true;
        }
        if (checkSafe(r)) return true;
        else {
            for (let i = 0; i < r.length; i++) {
                if (checkSafe([...r.slice(0, i), ...r.slice(i + 1)])) return true;
            }
            return false;
        }

    }).length;
    prnt(n2)
}

function day3() {
    //mul\([0123456789]*,[0123456789]*\)
    const strData = data.day3;
    const arrData = strData.match(/mul\([0123456789]*,[0123456789]*\)|don't\(\)|do\(\)/g);
    let sum = 0;
    let dont = false;
    for (const s of arrData) {
        if (s == 'do()') {
            prnt("found do")
            dont = false;
            continue;
        }
        if (dont) continue;
        if (s == 'don\'t()') {
            prnt("found don't")
            dont = true;
            continue;
        }
        const i = s.indexOf(',')
        const n1 = parseInt(s.slice(4, i));
        const n2 = parseInt(s.slice(i + 1, s.indexOf(')', i)));
        sum += n1 * n2;
    }
    prnt(sum);
}

function day4() {
    const strData = data.day4;
    const arrData = strData.split('\n');
    const rLen = arrData[1].length;
    // this is from using the built-in 
    // regex thing in codespaces. it saves
    // me a for loop.
    const horiz = 202 + 204;
    let vert = 0;
    for (let i = 0; i < arrData.length - 3; i++) {
        for (let j = 0; j < rLen; j++) {
            const word =
                arrData[i][j]
                + arrData[i + 1][j]
                + arrData[i + 2][j]
                + arrData[i + 3][j];
            if (word == "XMAS" || word == "SAMX")
                vert++;
        }
    }
    let diagR = 0;
    for (let i = 0; i < arrData.length - 3; i++) {
        for (let j = 0; j < rLen - 3; j++) {
            const word =
                arrData[i][j] +
                arrData[i + 1][j + 1] +
                arrData[i + 2][j + 2] +
                arrData[i + 3][j + 3];
            if (word == "XMAS" || word == "SAMX")
                diagR++;
        }
    }
    let diagL = 0;
    for (let i = 0; i < arrData.length - 3; i++) {
        for (let j = 3; j < rLen; j++) {
            const word =
                arrData[i][j] +
                arrData[i + 1][j - 1] +
                arrData[i + 2][j - 2] +
                arrData[i + 3][j - 3];
            if (word == "XMAS" || word == "SAMX")
                diagL++;
        }
    }
    prnt(diagR + diagL + horiz + vert)
    let part2 = 0;
    for (let i = 0; i < arrData.length - 2; i++) {
        for (let j = 0; j < rLen - 2; j++) {
            const lDiag =
                arrData[i][j] +
                arrData[i + 1][j + 1] +
                arrData[i + 2][j + 2];
            const rDiag =
                arrData[i][j + 2] +
                arrData[i + 1][j + 1] +
                arrData[i + 2][j];
            if (
                (lDiag == "SAM" || lDiag == "MAS")
                && (rDiag == "SAM" || rDiag == "MAS")
            ) part2++;
        }
    }
    prnt(part2);
}

function day5() {
    const strData = data.day5;
    const magicI = strData.indexOf('\n', strData.lastIndexOf('|'))
    const arrData1 = strData.substring(0, magicI).split('\n')
        .map((s: str) => s.split('|').map(x => parseInt(x)));
    arrData1.splice(0, 1);
    const arrData2 = strData.substring(magicI).split('\n')
        .map((s: str) => s.split(/,/).map(x => parseInt(x))).filter((u: any) => !u.includes(NaN));
    const unordered: any[][] = [];
    let s1 = 0;
    out: for (const update of arrData2) {
        for (const rule of arrData1) {
            const i1 = update.indexOf(rule[0]);
            const i2 = update.indexOf(rule[1]);
            if (i1 == -1 || i2 == -1) continue;
            if (i1 > i2) {
                unordered.push(update);
                continue out;
            }
        }
        s1 += update[(update.length - update.length % 2) / 2];
    }
    prnt(s1);
    for (const u of unordered) {
        const rules: any[][] = [];
        for (const rule of arrData1) {
            const i1 = u.indexOf(rule[0]);
            const i2 = u.indexOf(rule[1]);
            if (i1 == -1 || i2 == -1) continue;
            rules.push(rule);
        }
        u.sort((x, y) => {
            for (const r of rules) {
                if ((r[0] == x && r[1] == y))
                    return -1;
                if (r[0] == y && r[1] == x)
                    return 1;
            }
            return 0;
        });
    }
    let s2 = unordered.reduce((a, u) => a + u[(u.length - u.length % 2) / 2], 0);
    prnt(s2);
}

function day6() {
    let strData = data.day6;
    const arrData = strData.split('\n').filter((s: str) => s.length > 10)
        .map((s: str) => s.split(''));
    strData = strData.split('').filter((c: str) => c !== '\n');
    const rLen = arrData[0].length;
    const move: map<num[]> = {
        '^': [-1, 0],
        'v': [1, 0],
        '>': [0, 1],
        '<': [0, -1]
    };
    const turn: map<str> = {
        '^': '>',
        '>': 'v',
        'v': '<',
        '<': '^'
    };
    const p0 = strData.indexOf('^')
    let p = [Math.floor(p0 / rLen), p0 % rLen];
    let dir = '^';
    while (true) {
        arrData[p[0] as num][p[1] as num] = 'X';
        const next = [(p[0] as num) + ((move[dir as str] as num[])[0] as num), (p[1] as num) + ((move[dir as str] as num[])[1] as num)];
        if (next[0] == arrData.length || next[1] == rLen || next[0] == -1 || next[1] == -1)
            break;
        if (arrData[next[0] as num][next[1] as num] == '#')
            dir = turn[dir] as str;
        else
            p = next;
    }
    const pCount = arrData.reduce((acc: num, r: str[]) =>
        acc + r.reduce((a: num, p: str) => a + Number(p == 'X'), 0), 0);
    prnt(pCount);
}

function day7() {
    const strData = data.day7;
    const arrData = strData.split('\n')
        .map((s: str) => s.split(/\s+/).map((x: str) => parseInt(x)));
    const check: (exp: num[]) => (bool) = exp => {
        if (exp.length == 3) {
            return (exp[0] == ((exp[1] as num) + (exp[2] as num)))
                || (exp[0] == ((exp[1] as num) * (exp[2] as num)));
        }
        return check([exp[0] as num, (exp[1] as num) + (exp[2] as num), ...exp.slice(3)])
            || check([exp[0] as num, (exp[1] as num) * (exp[2] as num), ...exp.slice(3)]);
    }
    const n1 = arrData.reduce((a: num, e: any) => a + (check(e) ? e[0] : 0), 0);
    prnt(n1);
    // in hindsight, there was probably a
    // way to implement this using check.
    const checkC: ((exp: any) => bool) = exp => {
        if (exp.length == 3) {
            return (exp[0] == (exp[1] + exp[2]))
                || (exp[0] == (exp[1] * exp[2])) ||
                (exp[0] == parseInt(('' + exp[1] + exp[2])));
        }
        return checkC([exp[0], exp[1] + exp[2], ...exp.slice(3)])
            || checkC([exp[0], exp[1] * exp[2], ...exp.slice(3)])
            || checkC([exp[0], parseInt('' + exp[1] + exp[2]), ...exp.slice(3)]);
    }
    const n2 = arrData.reduce((a: num, e: any) => a + (checkC(e) ? e[0] : 0), 0);
    prnt(n2);
}

// day8 does not look good :(
function day9() {
    const strData = data.day9;
    let cur = -1;
    let dotCount = 0;
    type numDot = num | '.' | undefined;
    const arrData: numDot[] = strData.split('')
        .map((c: str, i: str) => {
            let arr = [];
            const ch = parseInt(i) & 1 ? (() => { dotCount++; return '.'; })() : ++cur;
            for (let j = 0; j < parseInt(c[0]); j++) {
                arr.push(ch);
            }
            return arr;
        }).flat(1);
    const lastNumIdx = (arr:numDot[]) => {
        for (let i=arr.length-1; i>=0; i--) {
            if (arr[i] !== '.') return i;
        }
        return -1; 
    }
    let n: num, d: num;
    while ((n = lastNumIdx(arrData)) > (d = arrData.indexOf('.'))) {
        const temp = arrData[n];
        arrData[n] = arrData[d];
        arrData[d] = temp;
    }
    const checksum = (arrData.slice(0, arrData.indexOf('.')) as num[]).map((c, i) => c*i).reduce((a, c)=>a+c, 0);
    prnt(checksum);
}

day9();