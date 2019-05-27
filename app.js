const emojiPaths = [
    "/emoji/food/avocado.png",
    "/emoji/food/banana.png",
    "/emoji/food/bone.png",
    "/emoji/food/candy.png",
    "/emoji/nature/bug.png",
]

const score = []
const solutionScore = [1,2,3,4]
const allSections = [];
let key = false;

function makeScrollSection() {
    const newDiv = document.createElement("div");
    newDiv.classList.add("scroll");
    newDiv.classList.add("dragscroll");
    let images = "";

    emojiPaths.forEach(el => {
        const img = document.createElement("div");
        img.classList.add("pic");
        img.innerHTML = `<img src="${el}" alt="avocado">`;
        newDiv.append(img);
    });

    return newDiv;
}

function checkScore() {
    let match = true;
    for(let i = 0; i < solutionScore.length; i++) {
        if(solutionScore[i] !== score[i]) {
            match = false;
        }
    }
    if(match) {
        key.classList.add("match");
    }   else {
        key.classList.remove("match");
    }
}

function setScore(section, num) {
    const index = allSections.indexOf(section);
    score[index] = num;
    console.log(score);

    checkScore()
}

function fixScroll(section){
    console.log("fixed");
    const y = section.scrollHeight/(emojiPaths.length)
    const approxSection = section.scrollTop/y;
    section.scrollTop = Math.round(approxSection)*y;
    setScore(section, Math.round(approxSection))
}

//When the page loads
(function(){
    const slotMachine = document.getElementById("slot-machine");
    let timer = null
    key = document.getElementById("key");

    for(let i = 0; i < 4; i++) {
        const section = makeScrollSection();
        allSections.push(section);
        slotMachine.appendChild(section);
        score.push(0);

        section.addEventListener("scroll", function(){
            console.log("scroll", section.scrollTop);
            clearTimeout(timer);
            timer = setTimeout(function(){
                fixScroll(section)
            }, 500);
        });
    }

})();