    let human;
    let dinoObjects = [];
    const gridNode = document.getElementById("grid");
    const formNode = document.getElementById("dino-compare");
    const resetNode = document.getElementById("reset");
    const nameNode = document.getElementById("name");
    const heightFeetNode = document.getElementById("feet");
    const heightInchesNode = document.getElementById("inches");
    const weightNode = document.getElementById("weight");
    const dietNode = document.getElementById("diet");
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
        const dinoFacts = Object.keys(this).slice(1);
        let newRandomFacts = [];
        const randomLength = Math.ceil(Math.random()*6);
        while(newRandomFacts.length < randomLength) {
            const randNum = Math.floor(Math.random()*6);
            const newFact = dinoFacts[randNum];
            if(newRandomFacts.indexOf(newFact) === -1) {
                newRandomFacts.push(newFact);
            }
        }
        newRandomFacts = newRandomFacts.map(newRandFact => ({type: newRandFact, value: this[newRandFact]}));
        return newRandomFacts;
    };
    /**
     * Constructs the image url
     * @returns {string}
     */
    Dino.prototype.getImageURL = function() {
        const imagePrefix = this.species;
        const imageSuffix = ".png";
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
         };
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
        human = new Human(name, (+heightFeetNode.value*12) + (+heightInchesNode.value), +weightNode.value, dietNode.value);
    };
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    Human.prototype.compareHeight = function(dinoHeight) {
        let compareText = "";
        compareText += this.height === dinoHeight ?
            "You have the same height" :
            this.height > dinoHeight ?
            "You are taller than the dinosaur." :
            "The dinosaur is taller than you by " + (dinoHeight - this.height) + " inches";
        return compareText;
    };
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Human.prototype.compareWeight = function(dinoWeight) {
        let compareText = "";
        compareText += this.weight === dinoWeight ?
            "You weight the same" :
            this.weight > dinoWeight ?
            "You weight more than the dinosaur":
            "The dinosaur is heavier than you by " + (dinoWeight - this.weight) + " lbs";
        return compareText;
    };
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Human.prototype.compareDiet = function(dinoDiet) {
        const compareText = {
            "herbavor": dinoDiet === "herbavor" ?
                "You would compete for food as you are both herbavor." :
                "This dinosaur would probably put you in his carnivor diet .",
            "omnivore": dinoDiet === "hervabor" ?
                "Dinosaur is hervabor, you are omnivore" :
                "You could eat anything while this carnivor dinoasaur would eat you.",
            "carnivor": dinoDiet === "hervabor" ?
                "This dinosaur is hervabor, it could be part of what you eat" :
                "Oh my two carnivores, let the hunger games begin!"
        };
        return compareText[this.diet.toLowerCase()];
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
    const addFactParragraphNodes = (text) => {
        const factNode = document.createElement("p");
        const factTextNode = document.createTextNode(text);
        factNode.appendChild(factTextNode);
        return factNode;
    };
    /**
     *
     * @param {obj} - Dino Instance or Human Instance
     */
    const createCompareFacts = ({value, type}) => {
        const compareMethods = {
            "diet": human.compareDiet(value),
            "height": human.compareHeight(value),
            "weight": human.compareWeight(value)
        }
        return addFactParragraphNodes(compareMethods[type]);
    };
    const addGridItems = (obj) => {
        const imagesPath = "images/";
        const gridNode = document.getElementById("grid");
        const divNode = document.createElement("DIV");
        divNode.className = "grid-item";
        const speciesTitleNode = document.createElement("H3");
        const speciesTitleTextNode = document.createTextNode(obj.hasOwnProperty("species") ? obj.species : obj.name);
        speciesTitleNode.appendChild(speciesTitleTextNode);
        divNode.appendChild(speciesTitleNode);
        const imageNode = document.createElement("IMG");
        const listNode = document.createElement("UL");
        if(obj.hasOwnProperty("name")) {
            imageNode.src = imagesPath+obj.imageUrl;
            imageNode.alt = "Human Image";
        }
        if(obj.hasOwnProperty("species")) {
            const randomFacts = obj.getRandomFacts();
            imageNode.src = imagesPath+obj.getImageURL();
            imageNode.alt = `${obj.species} image`;
            if(obj.species.toLowerCase() === "pigeon"){
                listNode.appendChild(addFactParragraphNodes(obj.fact));
                randomFacts.filter(({type}) => type !== "fact").forEach(({type, value}) => {
                    listNode.appendChild( type === "diet" || type === "weight" || type === "height"  ? createCompareFacts({type, value}) : addFactParragraphNodes(value));
                });
            } else {
                randomFacts.forEach(({type, value}) => {
                    listNode.appendChild( type === "diet" || type === "weight" || type === "height"  ? createCompareFacts({type, value}) : addFactParragraphNodes(value));
                });
            }
            divNode.appendChild(listNode);
        }
        divNode.appendChild(imageNode);
        gridNode.appendChild(divNode);
    };
    // Generate Tiles for each Dino in Array
        // Add tiles to DOM
    // Remove form from screen
    function generateTiles() {
        formNode.style.display = "none";
        shuffleDinoObjectsArray();
        dinoObjects.slice(0,Math.ceil(dinoObjects.length / 2)).forEach(obj => addGridItems(obj));
        addGridItems(human);
        dinoObjects.slice(Math.ceil(dinoObjects.length / 2)).forEach(obj => addGridItems(obj));
    };
    function generateForm(buttonNode) {
        gridNode.innerHTML = "";
        formNode.style.display = "block";
        buttonNode.remove();
    };
    const createResetButtonAction = () => {
        const buttonNode = document.createElement("BUTTON");
        const buttonTextNode = document.createTextNode("RESET");
        buttonNode.appendChild(buttonTextNode);
        resetNode.appendChild(buttonNode);
        buttonNode.addEventListener("click",() => generateForm(buttonNode));
    };

    const validateInputs = () => {
        return !checkEmptyField(nameNode.value) &&
            onlyAlphabetic(nameNode.value) &&
            stringHasCertainMinimumLength(nameNode.value, 3) &&
            !checkEmptyField(heightFeetNode.value) &&
            hasPositiveValue(heightFeetNode.value) &&
            !checkEmptyField(weightNode.value) &&
            hasPositiveValue(weightNode.value);
    };

// On button click, prepare and display infographic
    (function createCompareButtonAction() {
        document.getElementById("btn").addEventListener("click", () => {
            if(validateInputs()) {
                console.log("Valid");
                getHumanDataFromForm();
                generateTiles();
                createResetButtonAction();
            } else {
                alert("Please fill out all required fields with valid values (*)");
            }
        });
    })();



