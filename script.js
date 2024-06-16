var sequence = {}
var seqList = []
var count  = 0
var sleepTime = 300
var intervalTime = 500
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function randomiseSequence(n) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let seq = []
    for (let i = 0; i < 30; i++) {
	let alphIndex = Math.floor(Math.random() * 26)
	seq.push(alphabet[alphIndex])
    }
    return seq
}
function getRandomNumberRange(min, max) {
    let output = 1
    if (max > 0) {
	    min = Math.floor(min)

	    max = Math.floor(max)

	    output = Math.random(Math.random() * (max - min + 1)) + min
    }
    return output
}
function getRandomNumber(bound) {
    let output = 1
    if (bound > 0) {
	    bound = Math.floor(bound)
	    output = Math.random(Math.random() * bound)
    }
    return output
}

function generateSequence(n) {
    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let seq = []
    // at least 3 letters, places twice so list cant be more than 24 chars
    // We will have 3 random letters that will be duped
    // n steps apart
    // at a random point we can initialise the n counter
    // where we throw in a letter then after n we throw in another
    let rseq = []
    for (let r = 0; r < 24; r ++) {
	let alphIndex = Math.floor(Math.random() * 26)
	rseq.push(alphabet[alphIndex])
    }
    // because we need to insert n steps apart, we check from n -> end of list size
    console.log(rseq)
    let place = getRandomNumberRange(n, 24)
    let letter = getRandomNumber(26)
    console.log(place)
    console.log(letter)
    rseq.splice(place, 0, letter)
    rseq.splice(place-n, 0, letter)
    console.log(rseq)
    place = getRandomNumberRange(n, 24)
    letter = alphabet[getRandomNumber(26)]
    console.log(place)
    console.log(letter)
    let n2 = rseq.splice(getRandomNumberRange(n, 26), 0, alphabet[getRandomNumber(26)])
    let n3 = rseq.splice(getRandomNumberRange(n, 28), 0, alphabet[getRandomNumber(26)])
    return rseq
}

async function initBoard() {
    let board = document.getElementById("game-board");

    for (let i = 0; i < 3; i++) {
        let row = document.createElement("div")
        row.className = "letter-row-".concat(i.toString())
        
        for (let j = 0; j < 3; j++) {
            let box = document.createElement("div")
            box.className = "letter-box-".concat(j.toString())
            row.appendChild(box)
        }

        board.appendChild(row)
    }
    return
}

async function animation() {
    const blackB = {
	border: "2px solid gray"
    }
    const redB = {
	border: "2px solid red"
    }
    let coords = seqList[count]
    let className = "letter-row-".concat(coords[0].toString())
    console.log(className)
    let divBox = document.getElementsByClassName(className)[0].children[coords[1]]
    console.log(divBox)
    Object.assign(divBox.style,redB)
    await sleep(sleepTime);
    Object.assign(divBox.style,blackB)
    console.log(coords[0], coords[1]);
}

function resetSquares() {
    const blackB = {
	border: "2px solid gray"
    }
    for (let i = 0; i < 3; i ++) {
	for (let j = 0; j < 3; j++) {
	    let className = "letter-row-".concat(i.toString())
	    console.log(className)
	    let divBox = document.getElementsByClassName(className)[0].children[j]
	    console.log(divBox)
	    Object.assign(divBox.style,blackB)
	}
    }
}

function randomiseTiles(seq) {
    for (let i = 0; i < 30; i++) {
	let coords = [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]
	seq.push(coords)
    }
    return seq
}

async function wrapper() {
    await initBoard()
    generateSequence(2)
    seqList = randomiseTiles(seqList)
    let animationInterval;
    document.getElementsByClassName("initiate")[0].children[0].addEventListener("click", function() {
	setTimeout(function (){
	    if (animationInterval != null) {
		clearInterval(animationInterval)
	    }
	    console.log("stopping interval")
	    resetSquares()
	    seqList = []
	    seqList = randomiseTiles(seqList)
	    count = 0
	    animationInterval = setInterval( function () {
		animation()
		count ++; 
		if (count >= 30){
		    clearInterval(animationInterval)
		}
	    }, intervalTime)
	}, 0)
    })
}

wrapper()
