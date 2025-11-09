const data = require('./data')

function day1() {
    const strData = data.day1;
    const arrData = strData.split(/\s/).filter(s => s!=='').map(s => parseInt(s))
    const l = arrData.filter((c, i) => i%2===0).sort((x,y)=>(x-y));
    const r = arrData.filter((c, i) => i%2===1).sort((x,y)=>(x-y));

    const n = l.length;
    let s = 0;
    for (let i=0; i<n; i++) {
        s += Math.abs(l[i]-r[i]);
    }
    console.log(s)

    const appearances = {};
    for (const e of r) {
        if (e in appearances) 
            appearances[e]++;
        else 
            appearances[e] = 1;
    }



    const similarity = l.reduce((a, c) => a+c*(c in appearances?appearances[c]:0), 0);
    console.log(similarity)
}

function day2() {
    const strData = data.day2;
    const arrData = strData.split('\n');
    const arrData2d = arrData.map(s => s.split(' ').map(x => parseInt(x))).filter(r => !r.includes(NaN));
    const n1 = arrData2d.filter(r => {
        const l = r.length;
        const comp = r[1]>r[0]?(x,y)=>(x>y):(x,y)=>(x<y);
        for (let i=1; i<l; i++) {
            const dif = Math.abs(r[i]-r[i-1]);
            if (!comp(r[i],r[i-1]) || dif>3) {
                return false;
            }
        }
        return true;
    }).length;
    console.log(n1)
    const n2 = arrData2d.filter(r => {
        const checkSafe = (r) =>  {
            const l = r.length;
            const comp = r[1]>r[0]?(x,y)=>(x>y):(x,y)=>(x<y);
            for (let i=1; i<l; i++) { 
                const dif = Math.abs(r[i]-r[i-1]);
                if (!comp(r[i],r[i-1]) || dif>3) {
                    return false
                }
            }
            return true;
        }
        if (checkSafe(r)) return true;
        else {
            for (let i=0; i<r.length; i++) {
                if (checkSafe(r.toSpliced(i, 1))) return true;
            }
            return false;
        }
        
    }).length;
    console.log(n2)
}

function day3() {
    //mul\([0123456789]*,[0123456789]*\)
    const strData = data.day3;
    const arrData = strData.match(/mul\([0123456789]*,[0123456789]*\)|don't\(\)|do\(\)/g);
    let sum = 0;
    let dont = false;
    for (const s of arrData) {
        if (s == 'do()') {
            console.log("found do")
            dont =  false;
            continue;
        }
        if (dont) continue;
        if (s == 'don\'t()') {
            console.log("found don't")
            dont = true;
            continue;
        }
        const i = s.indexOf(',')
        const n1 = parseInt(s.slice(4, i));
        const n2 = parseInt(s.slice(i+1, s.indexOf(')', i)));
        sum += n1*n2;
    }
    console.log(sum);
}

function day4() {
    const strData = data.day4;
    const arrData = strData.split('\n');
    const rLen = arrData[1].length;
    // this is from using the built-in 
    // regex thing in codespaces. it saves
    // me a for loop.
    const horiz = 202+204;
    let vert = 0;
    for (let i=0; i<arrData.length-3; i++) {
        for (let j=0; j<rLen; j++) {
            const word = 
            arrData[i][j]
            + arrData[i+1][j] 
            + arrData[i+2][j]
            + arrData[i+3][j];
            if (word=="XMAS" || word =="SAMX") 
                vert++;
        }
    }
    let diagR = 0;
    for (let i=0; i<arrData.length-3; i++) {
        for (let j=0; j<rLen-3; j++) {
            const word = 
            arrData[i][j] +
            arrData[i+1][j+1] +
            arrData[i+2][j+2] +
            arrData[i+3][j+3];
            if (word == "XMAS" || word == "SAMX")
                diagR++;
        }
    }
    let diagL = 0;
    for (let i=0; i<arrData.length-3; i++) {
        for (let j=3; j<rLen; j++) {
            const word = 
            arrData[i][j] +
            arrData[i+1][j-1] +
            arrData[i+2][j-2] +
            arrData[i+3][j-3];
            if (word == "XMAS" || word == "SAMX")
                diagL++;
        }
    }
    console.log(diagR+diagL+horiz+vert)
    let part2 = 0;
    for (let i=0; i<arrData.length-2; i++) {
        for (let j=0; j<rLen-2; j++) {
            const lDiag = 
            arrData[i][j] + 
            arrData[i+1][j+1] +
            arrData[i+2][j+2];
            const rDiag = 
            arrData[i][j+2] + 
            arrData[i+1][j+1] +
            arrData[i+2][j];
            if (
                (lDiag == "SAM" || lDiag == "MAS")
                && (rDiag == "SAM" || rDiag == "MAS")
            ) part2++;
        }
    }
    console.log(part2);
}

function day5() {
    const strData = data.day5;
    const magicI = strData.indexOf('\n', strData.lastIndexOf('|'))
    const arrData1 = strData.substring(0, magicI).split('\n')
    .map(s => s.split('|').map(x => parseInt(x)));
    arrData1.splice(0,1);
    const arrData2 = strData.substring(magicI).split('\n')
    .map(s => s.split(/,/).map(x => parseInt(x))).filter(u => !u.includes(NaN));
    console.log(arrData2.filter(e => e.length<10))
    let s = 0;   
    for (const update of arrData2) {

    }
}

day5()