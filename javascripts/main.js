// Use AJAX | Promises to load all 3 JSON files
// Iterate over all JSON files and match the human with their appropriate pet(s)
// ES6-ify it all!

// var is done away with .. (let and const) 
// let = variables that are changed later on in your code ... 
// const =  something that isnt going to change in your code.... 
// always as "am i going to change the value of this later on?"


///FAT ARRROW ... changing the way functions look ... 

/// new functions = 
// const let nameOftheFunction () => {
	//let= "blah"
	//const = thisThingIsStagnant
// }


$(document).ready(function(){
	const outputContainer = $("#output");

	const writeToDOM = function (humanArray) {
	  let domString = "";
	  for (let i = 0; i < humanArray.length; i++) {
	    domString += `<div class="human row">`;
	    domString += `<div class="col-sm-4">`;
	    domString += `<img src="${humanArray[i].image}">`;
	    domString += `<p>${humanArray[i].name}</p>`;
	    domString += `</div>`;
	    domString += `<div class="col-sm-8 overflow-row">`;
	    for (let j = 0; j < humanArray[i].matches.length; j++){
	      domString += `<div class="animal">`;
	      domString += `<img src="${humanArray[i].matches[j].image}">`;
	      domString += `<p>${humanArray[i].matches[j].name}</p>`;
	      domString += `<p>${humanArray[i].matches[j].description}</p>`;
	      domString += `</div>`;
	    }
	    domString += `</div>`;
	    domString += `</div>`;
	  }
	  outputContainer.append(domString);
	};

	// const loadHumans = function(){
	// 	return new Promise(function(resolve,reject){
	// 		$.ajax("./database/humans.json")
	// 		.done(function(data1){
	// 			resolve(data1.humans);
	// 		})
	// 		.fail(function(error){
	// 			reject(error);
	// 		});
	// 	});
	// };

	const loadHumans = () => {
		return new Promise((resolve,reject) => {
			$.ajax("./database/humans.json")
			.done((data1) => resolve(data1.humans))
			.fail((error) => reject(error));
			// .fail((error) => {reject(error)}) //can leave in the curly brackets if you want... looks uglier ... but you can .  
		});
	};



	const loadDogs = () => {
		return new Promise((resolve,reject) => {
			$.ajax("./database/dogs.json")
			.done((data2) => resolve(data2.dogs))
			.fail((error) => reject(error));
		});
	};	

	const loadCats = () => {
		return new Promise((resolve,reject) => {
			$.ajax("./database/cats.json")
			.done((data3)=> resolve(data3.cats))
			.fail((error) => reject(error));
		});
	};

	const loadDinos = () => {
		return new Promise((resolve,reject) =>{
			$.ajax("./database/dinos.json")
			.done((data4) => resolve(data4.dinos))
			.fail((error) => reject(error));
		});
	};

	// items in side an array can be set as either. the things inside the array can but the array holder will not change.. 
	let myHumans = [];
	let myAnimals = [];
	//checking for two arguments, one human and one pet (human, pet)
	// this function is checking for the type of true false that the human wants for a pet
	const checkForTypeMatch = function(human, pet){
		// this is an array we need to loop feeding a single pet and a single human
		const interestedInArray = human["interested-in"];
		const isMatchNumber = interestedInArray.indexOf(pet.type);
		if (isMatchNumber === -1){
			return false;
		} else {
			return true;
		}
		// as of this statement we are feeding in 1 human and 1 pet and return a true or false for match.. 

	};	
/// checking for kids=true matches the pets kid friendly = true as well. 
	const checkForKidFriendly = (human, pet) => {
		const hasKids = human["has-kids"]; // checking the "key in humans" true/false
		const isKidFriendly = pet["kid-friendly"];
		let isMatched = true;
		// if human has kids and the pet (matchign the argument) and the pet is kid frienly ! is and opposite( not kid friendly)
		if (hasKids && !isKidFriendly){
			isMatched = false;
		} 
		return isMatched;
	};



	//////// hu
	loadHumans().then((humans) => {
		// "human is a place holder, needs to match up the function argument with what will be pushed."
		humans.forEach((human) => {
		//creating a place holder for the matches of humans wiht animals
		human.matches = [];
		myHumans.push(human);			
		});

			Promise.all([loadCats(), loadDinos(), loadDogs()])
			.then((result) => {
			// console.log(result);
				result.forEach((xhrResult) => {
					//nesting two for each arraay of the 3 resulst and the array of each json, to we need to into the first array ant then through each animal array. 
					xhrResult.forEach((animal) => {
						myAnimals.push(animal);
					});
					///// result is the array that holds the results for the for each loop 
				});

				for(let i=0; i<myHumans.length; i++){
					for (let k=0; k < myAnimals.length; k++){
						if (checkForTypeMatch(myHumans[i], myAnimals[k]) && checkForKidFriendly(myHumans[i], myAnimals[k])){
							myHumans[i].matches.push(myAnimals[k]);
						}
						console.log(checkForTypeMatch(myHumans[i], myAnimals[k]));
					}
				}
					// console.log(myHumans);
					writeToDOM(myHumans);//WRITE TO DOM CALLED AFTER PROMISE arrays have been pulled and sorted into the arrays 
				})
				.catch((errors) => {
					console.log(errors);
				});
			})
			.catch((humanError) => {
				console.log(humanError);
			});	



		// console.log(humans);
/// how do you pus all the dinos, dogs, and cats all to the same "animals arrray."
// prime example for a promise.all array gathering. 




/////////// Challenge is to figure out how to match them to the humans ///////////////////




});



