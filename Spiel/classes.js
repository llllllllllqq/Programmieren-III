class gras {
    zeile;
    spalte;
    energie = 0;
    constructor(a, n) {
        this.zeile = a
        this.spalte = n
    }

    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 1;
    };

    istErde(koordinatenPaar) {
        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 0
        ) {
            return true;
        } else {
            return false;
        }
    };

    
    PflanzNeuesGrasObjekt() {
        let erdeFelder = this.erstelleErdefelderTabelle();
        if (erdeFelder.length > 0) {
            let gewähltesFeld = erdeFelder[randomNumber(0, erdeFelder.length)]
            let NeuesGrasObjekt = new gras(gewähltesFeld[0], gewähltesFeld[1])
            NeuesGrasObjekt.platziereSelbstInMatrix();
            grasListe.push(NeuesGrasObjekt);
        } 
        
    };

    erstelleErdefelderTabelle() {
        let benachbarteFelder = [
            [this.zeile - 1, this.spalte - 1],
            [this.zeile, this.spalte - 1],
            [this.zeile + 1, this.spalte - 1],
            [this.zeile - 1, this.spalte],
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte + 1],
            [this.zeile, this.spalte + 1],
            [this.zeile + 1, this.spalte + 1],
        ]
        return benachbarteFelder.filter(this.istErde);
    };

    spielzug() {
        if (this.energie > 1) {
            this.PflanzNeuesGrasObjekt();
            this.energie = 0
        } else {

           this.energie++
        }
    };

};

class grasFresser {
    zeile;
    spalte;
    energieLevel = 15;
    energieLevelErhoehung = 1
    energieLevelAbzug = 1
    energieLevelAbzugBeiVermehrung = 15;
    energieLevelZurFortpflanzung = 30;
    constructor(a, n) {
        this.zeile = a
        this.spalte = n
    }

    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 2;
    };


    step() {
        //console.log("EnergieLevel im Moment: " + this.energieLevel)
        if (this.energieLevel <= 0) {
            this.sterbeAus(this.zeile, this.spalte)
            //console.log("!!!")
            return 
        }

       // console.log("***")
        let grasFelder = this.erstelleGrasfelderTabelle()

        if (grasFelder.length > 0) {

            if (this.energieLevel > this.energieLevelZurFortpflanzung) {

                let gewähltesFeldZurFortpflanzung = grasFelder[randomNumber(0, grasFelder.length)];
                //console.log("vermehreDich!")
                this.loeschGrasObjekt(gewähltesFeldZurFortpflanzung[0], gewähltesFeldZurFortpflanzung[1])
                this.vermehreDich(gewähltesFeldZurFortpflanzung[0], gewähltesFeldZurFortpflanzung[1])

                return 
            }

        }

        //RasenDestroyer Fressen
        let potenzielleNahrung = this.erstelleGrasfelderTabelle()
        //console.log(potenzielleNahrung)
        //console.log(randomNumber(0,10))
        //console.log("***potenzielleNahrung= " + potenzielleNahrung.length)
        if (potenzielleNahrung.length > 0) {
            let gewaehlteNahrung = potenzielleNahrung[randomNumber(0, potenzielleNahrung.length)];
            //console.log("*gewaehlteNahrung= " + gewaehlteNahrung)
            this.loeschGrasObjekt(gewaehlteNahrung[0], gewaehlteNahrung[1])
            matrix[this.zeile][this.spalte] = 0
            this.zeile = gewaehlteNahrung[0]
            this.spalte = gewaehlteNahrung[1]
            matrix[this.zeile][this.spalte] = 2
            this.energieLevel = this.energieLevel + this.energieLevelErhoehung
        } else {
            this.energieLevel -= this.energieLevelAbzug
        }
    }
    
    vermehreDich(zeile, spalte) {
        grasFresserListe.push(new grasFresser(zeile, spalte))
        this.platziereSelbstInMatrix()
        this.energieLevel = this.energieLevel - this.energieLevelAbzugBeiVermehrung
    };

   
    loeschGrasObjekt(zeile, spalte) {
        let index = grasListe.findIndex(function (grasObjekt) {
            if (grasObjekt.zeile === zeile && grasObjekt.spalte === spalte) {
                return true;
            } else {
                return false
            }
        })
        grasListe.splice(index, 1);
    };


    erstelleFleischFresserfelderTabelle() {
        let benachbarteFelder = [
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile, this.spalte - 1],
        ]
        return benachbarteFelder.filter(this.istFleischFresser);
    };

    erstelleGrasfelderTabelle() {
        let benachbarteFelder = [
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile, this.spalte - 1],
        ]
        return benachbarteFelder.filter(this.istGras);
    };

    erstelleWüsteFelderTabelle() {
        let benachbarteWüstenFelder = [
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile, this.spalte - 1],
        ]
        return benachbarteWüstenFelder.filter(this.istWüste);
    };

    istFleischFresser(koordinatenPaar) {

        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] !== 3
        ) {
            return true;

        } else {
            return false;
        }


    };

    istGras(koordinatenPaar) {

        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 1
        ) {
            return true;

        } else {
            return false;
        }


    };

    istWüste(koordinatenPaar) {

        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 0
        ) {
            return true;

        } else {
            return false;
        }


    };

    sterbeAus(zeile, spalte) {
        let index = grasFresserListe.findIndex(function (grasFresserObjekt) {
            if (grasFresserObjekt.zeile === zeile && grasFresserObjekt.spalte === spalte) {
                return true;
            } else {
                return false;
            }
        })
        grasFresserListe.splice(index, 1);
        matrix[this.zeile][this.spalte] = 0
    };


};

class fleischFresser {
    energiePunkte = 1000;
    energiePunkteErhoehung = 100;
    energiePunkteZurFortpflanzung = 2000;
    energiePunkteAbzugVermehrung = 1000;
    energiePunkteAbzug = 4;
    zeile;
    spalte;

    constructor(b, n) {
        this.zeile = b
        this.spalte = n

    }

    platziereSelbstInMatrix() {
        matrix[this.zeile][this.spalte] = 3;
    };

    erstelleGrasfelderTabelle() {
        let benachbarteFelder = [
            [this.zeile - 1, this.spalte - 1],
            [this.zeile, this.spalte - 1],
            [this.zeile + 1, this.spalte - 1],
            [this.zeile - 1, this.spalte],
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte + 1],
            [this.zeile, this.spalte + 1],
            [this.zeile + 1, this.spalte + 1],
        ]
        return benachbarteFelder.filter(this.istGras);
    };

    erstelleRasenDestroyerTabelle() {
        let benachbarteFelder = [
            [this.zeile + 1, this.spalte],
            [this.zeile - 1, this.spalte],
            [this.zeile, this.spalte + 1],
            [this.zeile, this.spalte - 1],
        ]
        return benachbarteFelder.filter(this.istRasenDestroyer);
    };

    istGras(koordinatenPaar) {

        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 1
        ) {
            return true;

        } else {
            return false;
        }


    };

    istRasenDestroyer(koordinatenPaar) {

        let zeile = koordinatenPaar[0];
        let spalte = koordinatenPaar[1];
        let ret = false;

        if (zeile >= 0
            && spalte >= 0
            && zeile < matrix.length
            && spalte < matrix.length
            && matrix[zeile][spalte] === 2
        ) {
            ret = true;
        }


        return ret;
      
    };

    sterbeAus(zeile, spalte) {
        let index = fleischFresserListe.findIndex(function (fleischFresserObjekt) {
            if (fleischFresserObjekt.zeile === zeile && fleischFresserObjekt.spalte === spalte) {
                return true;
            } else {
                return false;
            }
        })
        fleischFresserListe.splice(index, 1);
        matrix[this.zeile][this.spalte] = 0
    };

    loeschGrasObjekt(zeile, spalte) {
        let index = grasListe.findIndex(function (grasObjekt) {
            if (grasObjekt.zeile === zeile && grasObjekt.spalte === spalte) {
                return true;
            } else {
                return false
            }
        })
        grasListe.splice(index, 1);
    };

    loeschRasenDestroyerObjekt(zeile, spalte) {
        let index = grasFresserListe.findIndex(function (rasenDestroyerObjekt) {
            if (rasenDestroyerObjekt.zeile === zeile && rasenDestroyerObjekt.spalte === spalte) {
                return true;
            } else {
                return false
            }
        })
        grasFresserListe.splice(index, 1);
    };

    vermehreDich(zeile, spalte) {
        fleischFresserListe.push(new fleischFresser(zeile, spalte))
        this.platziereSelbstInMatrix()
        this.energiePunkte = this.energiePunkte - this.energiePunkteAbzugVermehrung
    };

    gehNachVorne() {
        //console.log("Energiepunkte im Moment: " + this.energiePunkte)
        if (this.energiePunkte <= 0) {
            this.sterbeAus(this.zeile, this.spalte)
            //console.log("!!!")
            return 
        }

       // console.log("***")
        let grasFelder = this.erstelleGrasfelderTabelle()

        if (grasFelder.length > 0) {

            if (this.energiePunkte > this.energiePunkteZurFortpflanzung) {

                let gewähltesFeldZurFortpflanzung = grasFelder[randomNumber(0, grasFelder.length)];
                //console.log("vermehreDich!")
                this.loeschGrasObjekt(gewähltesFeldZurFortpflanzung[0], gewähltesFeldZurFortpflanzung[1])
                this.vermehreDich(gewähltesFeldZurFortpflanzung[0], gewähltesFeldZurFortpflanzung[1])

                return 
            }

        }

        //RasenDestroyer Fressen
        let potenzielleNahrung = this.erstelleRasenDestroyerTabelle()
        //console.log(potenzielleNahrung)
        //console.log(randomNumber(0,10))
        //console.log("***potenzielleNahrung= " + potenzielleNahrung.length)
        if (potenzielleNahrung.length > 0) {
            let gewaehlteNahrung = potenzielleNahrung[randomNumber(0, potenzielleNahrung.length)];
            //console.log("*gewaehlteNahrung= " + gewaehlteNahrung)
            this.loeschRasenDestroyerObjekt(gewaehlteNahrung[0], gewaehlteNahrung[1])
            matrix[this.zeile][this.spalte] = 0
            this.zeile = gewaehlteNahrung[0]
            this.spalte = gewaehlteNahrung[1]
            matrix[this.zeile][this.spalte] = 3
            this.energiePunkte = this.energiePunkte + this.energiePunkteErhoehung
        } else {
            this.energiePunkte -= this.energiePunkteAbzug
        }
    }
}