
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
    }

    /**
     * Uses this as the Dino instance to get facts from
     */
    Dino.prototype.getRandomFacts = function() {
        const dinoFacts = Object.keys(this);
        let newRandomFacts = [];
        const randomLength = Math.floor(Math.random()*3)+3;
        while(newRandomFacts.length < randomLength) {
            const randNum = Math.ceil(Math.random()*6);
            const newFact = dinoFacts[randNum];
            if(newRandomFacts.indexOf(newFact) === -1) {
                newRandomFacts.push(newFact);
            }
        }
        newRandomFacts = newRandomFacts.map(newRandFact => ({ type: newRandFact, value: this[newRandFact] }));
        console.log(newRandomFacts);
    }

    // Create Dino Objects

    /**
     * Gets the dinosaur objects from async functions
     * @type {[Dino]}
     */
    const dinoObjects = (function () {
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
        }).catch(e => {
            alert("Can't create dinosaur objects");
            return []
        });
        return dinoData;
    })();

    // Create Human Object

    // Use IIFE to get human data from form


    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 

    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
