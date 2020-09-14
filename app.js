    let human;
    let dinoObjects = [];
    // Create Dino Constructor
    /**
     *
     * @param {String} species
     * @param {Number} weight
     * @param {Number} height
     * @param {String} diet
     * @param {String} where
     * @param {String} when
     * @param {String} fact
     * @constructor
     */
    function Dino({species, weight, height, diet, where, when, fact}) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    };
    /**
     * Uses this as the Dino instance to get facts from
     */
    Dino.prototype.getRandomFacts = function() {
        const dinoFacts = Object.keys(this).slice(4);
        let newRandomFacts = [];
        const randomLength = Math.ceil(Math.random()*3);
        while(newRandomFacts.length < randomLength) {
            const randNum = Math.floor(Math.random()*3);
            console.log("Random Number",randNum);
            const newFact = dinoFacts[randNum];
            if(newRandomFacts.indexOf(newFact) === -1) {
                newRandomFacts.push(newFact);
            }
        }
        newRandomFacts = newRandomFacts.map(newRandFact => ({ type: newRandFact, value: this[newRandFact] }));
        console.log(newRandomFacts);
        return newRandomFacts;
    };
    /**
     * Constructs the image url
     * @returns {string}
     */
    Dino.prototype.getImageURL = function() {
        const imagePrefix = this.species;
        const imageSuffix = ".png";
        console.log(imagePrefix.toLowerCase()+imageSuffix);
        return imagePrefix.toLowerCase()+imageSuffix;
    };
    // Create Dino Objects
    /**
     * Gets the dinosaur objects from async functions
     * @type {[Dino]}
     */
     (function () {
        const request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        let dinoData = [];
        /**
         *
         * @returns {Promise<* | void>}
         */
        const getDinosaurData = function() {
            return fetch('dino.json', request)
                .then(response => response.ok ? response.json() : false)
                .then(jsonResponse => jsonResponse)
                .catch(e => alert("Dinosaur Data not found"));
        }
        getDinosaurData().then(data => {
            dinoData = data["Dinos"].map(dino => new Dino(dino));
            dinoData[0].getRandomFacts();
            dinoData[1].getImageURL();
            dinoObjects = dinoData;
        }).catch(e => {
            alert("Can't create dinosaur objects");
            return []
        });
    })();
    // Create Human Object
    /**
     *
     * @param {String} name
     * @param {Number} height
     * @param {Number}weight
     * @param {String} diet
     * @constructor
     */
    function Human(name, height, weight, diet) {
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.diet = diet;
        this.imageUrl = "human.png";
    };
    // Use IIFE to get human data from form
    function getHumanDataFromForm() {
        const name = document.getElementById("name").value;
        const heightFeet = document.getElementById("feet").value;
        const heightInches = document.getElementById("inches").value;
        const weight = document.getElementById("weight").value;
        const diet = document.getElementById("diet").value;
        /**
         *
         * @returns {Number}
         */
        const convertHeightAllToInches = () => {
            return (+heightFeet*12) + (+heightInches);
        }
        human = new Human(name, convertHeightAllToInches(), +weight, diet);
        console.log("Human", human);
    };
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    const compareHeight = (humanHeight, dinoHeight) => {
        let commonText = "Dinosaur Height: "+dinoHeight+"\n"+
            "Your Height: "+humanHeight+"\n";
           return humanHeight === dinoHeight ?
                commonText+=
                "Are you even human?":
                humanHeight > dinoHeight ?
                commonText+=
                "Are you even human?":
                commonText+=
                "All is well, the dinosaur is taller than you.";
    };
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareWeight = (humanWeight, dinoWeight) => {
        let commonText = "Dinosaur Weight: "+dinoWeight+"\n"+
            "Your Weight: "+humanWeight+"\n";
        return humanWeight === dinoWeight ?
            commonText+=
            "You weight the same":
            humanWeight > dinoWeight ?
            commonText+=
            "You should be on a diet":
            commonText+=
            "Can you lift "+dinoWeight+" that many pounds";
    };
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    const compareDiet = (humanDiet, dinoDiet) => {
        let commonText = "Dinosaur Diet: "+dinoDiet+"\n"+
            "Your Diet: "+humanDiet+"\n";
        const diets = {
            "herbavor": () => {
                return dinoDiet === "herbavor" ? commonText += "You would compete for food." :
                        commonText += "He probably would have put you in his diet."
            },
            "omnivore": () => {
                return dinoDiet === "hervabor" ?
                    commonText += "You would probably put him in your foor with a salad" :
                    commonText += "Oh oh, it's eat or be eaten";
            },
            "carnivor": () => {
               return dinoDiet === "hervabor" ?
                    commonText += "This dinosaur would be part of what you eat" :
                    commonText += "Hmmm let the hunger games begin!"
            }
        };
        return diets[humanDiet];
    };
    const shuffleDinoObjectsArray = () => {
        let dinoObjectsCurrentIndex = dinoObjects.length;
        while (dinoObjectsCurrentIndex !== -1) {
            dinoObjectsCurrentIndex -= 1;
            const randIndex = Math.floor(Math.random()*dinoObjectsCurrentIndex);
            const currentDinoObject = dinoObjects[dinoObjectsCurrentIndex];
            dinoObjects[dinoObjectsCurrentIndex] = dinoObjects[randIndex];
            dinoObjects[randIndex] = currentDinoObject;
        }
    };
    /**
     *
     * @param {obj} - Dino Instance or Human Instance
     */
    const addGridItems = (obj) => {
        const imagesPath = "images/";
        const gridNode = document.getElementById("grid");
        const divNode = document.createElement("DIV");
        divNode.className = "grid-item";
        const speciesTitleNode = document.createElement("H3");
        const speciesTitleTextNode = document.createTextNode(obj.hasOwnProperty("species") ? obj.species : obj.name);
        speciesTitleNode.appendChild(speciesTitleTextNode);
        divNode.appendChild(speciesTitleNode);
        if(obj.hasOwnProperty("name")) {
            const imageNode = document.createElement("IMG");
            imageNode.src = imagesPath+obj.imageUrl;
            imageNode.alt = "Human image";
            divNode.appendChild(imageNode);
        } else if(obj.hasOwnProperty("species") && obj.species.toLowerCase() === "pigeon") {
            const imageNode = document.createElement("IMG");
            imageNode.src = imagesPath+obj.getImageURL();
            imageNode.alt = `${obj.species} image`;
            divNode.appendChild(imageNode);
            const factNode = document.createElement("p");
            const factTextNode = document.createTextNode(obj.fact);
            factNode.appendChild(factTextNode);
            divNode.appendChild(factNode);
        } else {
            const imageNode = document.createElement("IMG");
            imageNode.src = imagesPath+obj.getImageURL();
            imageNode.alt = `${obj.species} image`;
            divNode.appendChild(imageNode);
        }
        gridNode.appendChild(divNode);
    };
    // Generate Tiles for each Dino in Array
        // Add tiles to DOM
    // Remove form from screen
    function generateTiles () {
        const formNode = document.getElementById("dino-compare");
        formNode.style.display = "none";
        shuffleDinoObjectsArray();
        dinoObjects.slice(0,4).forEach(obj => addGridItems(obj));
        addGridItems(human);
        dinoObjects.slice(4).forEach(obj => addGridItems(obj));
    };

// On button click, prepare and display infographic
    (function createCompareButtonAction() {
        document.getElementById("btn").addEventListener("click", () => {
            getHumanDataFromForm();
            generateTiles();
        });
})();
