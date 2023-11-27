function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function erstelleMatrix() {
    let matrix = [];
    for (let zeile = 0; zeile < 100; zeile++) {
        let z = [];
        for (let spalte = 0; spalte < 100; spalte++) {
            z.push(0);
        };
        matrix.push(z);
    };
    return matrix;
};

function zeichneMatrix() {
    for (let zeile = 0; zeile < matrix.length; zeile++) {
        for (let spalte = 0; spalte < matrix.length; spalte++) {
            //console.log(matrix[zeile][spalte])
            if (matrix[zeile][spalte] === 0) {
                fill("yellow");
            } else if (matrix[zeile][spalte] === 1) {
                fill("green");
            } else if (matrix[zeile][spalte] === 2) {
                fill("red");
            } else if (matrix[zeile][spalte] === 3) {
                fill("black");
            }
            rect(spalte * 10, zeile * 10, 10, 10);
            noStroke();
        };
    };
};


let matrix = erstelleMatrix();

let grasListe = [];
let grasFresserListe = [];
let fleischFresserListe = [];


let AnzahlFleischfresser = prompt("AnzahlFleischfresser")
let AnzahlGrasfresser = prompt("AnzahlGrasfresser")

for (let i = 0; i < 5; i++) {
    let zeile = randomNumber(0, matrix.length);
    let spalte = randomNumber(0, matrix.length);
    grasListe.push(new gras(zeile, spalte))
}

for (let i = 0; i < AnzahlGrasfresser; i++) {
    let zeile = randomNumber(0, matrix.length);
    let spalte = randomNumber(0, matrix.length);
    grasFresserListe.push(new grasFresser(zeile, spalte))
}

for (let i = 0; i < AnzahlFleischfresser; i++) {
    let zeile = randomNumber(0, matrix.length)
    let spalte = randomNumber(0, matrix.length)
    fleischFresserListe.push(new fleischFresser(zeile, spalte))
}



function setup() {
    createCanvas(1000, 1000);
    background("lightgrey");
    frameRate(10);

    for (let i = 0; i < grasListe.length; i++) {
        grasListe[i].platziereSelbstInMatrix();
    }

    for (let i = 0; i < grasFresserListe.length; i++) {
        grasFresserListe[i].platziereSelbstInMatrix();
    }

    for (let i = 0; i < fleischFresserListe.length; i++) {
        fleischFresserListe[i].platziereSelbstInMatrix();
    }

}

function draw() {
    for (let i = 0; i < fleischFresserListe.length; i++) {
        fleischFresserListe[i].gehNachVorne()
    }

    for (let i = 0; i < grasListe.length; i++) {
        grasListe[i].spielzug()
    }
    for (let i = 0; i < grasFresserListe.length; i++) {
        grasFresserListe[i].step()
    }
    zeichneMatrix();
    //console.log(grasListe.length)
    //console.log(fleischFresserListe.length)

}