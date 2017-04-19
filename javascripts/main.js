// Use AJAX | Promises to load all 3 JSON files
// Iterate over all JSON files and match the human with their appropriate pet(s)
// ES6-ify it all!

$(document).ready(function(){
	var loadHumans = function(){
		return new Promise(function(resolve,reject){
			$.ajax("./database/humans.json")
			.done(function(data1){
				resolve(data1.humans);
			})
			.fail(function(error){
				reject(error);
			});
		});
	};

	var loadDogs = function(){
		return new Promise(function(resolve,reject){
			$.ajax("./database/dogs.json")
			.done(function(data2){
				resolve(data2.dogs);
			})
			.fail(function(error){
				reject(error);
			});
		});
	};	

	var loadCats = function(){
		return new Promise(function(resolve,reject){
			$.ajax("./database/cats.json")
			.done(function(data3){
			resolve(data3.cats);
			})
			.fail(function(error){
			reject(error);
			});
		});
	};

	var loadDinos = function(){
		return new Promise(function(resolve,reject){
			$.ajax("./database/dinos.json")
			.done(function(data4){
			resolve(data4.dinos);
			})
			.fail(function(error){
			reject(error);
			});
		});
	};


	var myHumans = [];
	var myAnimals = [];
	//checking for two arguments, one human and one pet (human, pet)
	// this function is checking for the type of true false that the human wants for a pet
	var checkForTypeMatch = function(human, pet){
		// this is an array we need to loop feeding a single pet and a single human
		var interestedInArray = human["interested-in"];
		var isMatchNumber = interestedInArray.indexOf(pet.type);
		if (isMatchNumber === -1){
			return false;
		} else {
			return true;
		}
		// as of this statement we are feeding in 1 human and 1 pet and return a true or false for match.. 

	};	



	//////// hu
	loadHumans().then(function(humans){
		// "human is a place holder, needs to match up the function argument with what will be pushed."
		humans.forEach(function(human){
		//creating a place holder for the matches of humans wiht animals
		human.matches = [];
		myHumans.push(human);			
		});

			Promise.all([loadCats(), loadDinos(), loadDogs()])
			.then(function(result){
			// console.log(result);
				result.forEach(function(xhrResult){
					//nesting two for each arraay of the 3 resulst and the array of each json, to we need to into the first array ant then through each animal array. 
					xhrResult.forEach(function(animal){
						myAnimals.push(animal);
					});
					///// result is the array that holds the results for the for each loop 
				});

				for(var i=0; i<myHumans.length; i++){
					for (var k=0; k < myAnimals.length; k++){
						if (checkForTypeMatch(myHumans[i], myAnimals[k])){
							myHumans[i].matches.push(myAnimals[k]);
						}
						console.log(checkForTypeMatch(myHumans[i], myAnimals[k]));
					}
				}
					console.log(myHumans);
				});
			});
		// console.log(humans);
/// how do you pus all the dinos, dogs, and cats all to the same "animals arrray."
// prime example for a promise.all array gathering. 




/////////// Challenge is to figure out how to match them to the humans ///////////////////




});



