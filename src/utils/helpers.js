export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//from https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
export function shuffle(array) {

	var currentIndex = array.length;
	var temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
		// Pick a remaining element...
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;

};

export const sectionDescriptions = {
	"sandwiches": "We consider smørbrød one of our signature offerings at Centropa. We’re inspired by the work of Norwegian authors and food culture from around the world as part of the Centropa Stories project. We recommend trying an assortment by ordering our High Tea service.",
	"snacks": "Check out a book a Deichman and grab a coffee alongside one of our delicious café snacks. All pastries are made fresh in-house every morning by our team of dedicated bakers.",
	"mains": "We offer an assortment of European classics as well as a seasonally rotating selection of internationally-inspired plates.",
	"desserts": "Our desserts are inspired by the creative spirit of Centropa, as well as the homey spirit of the Norwegian countryside. Go ahead, indulge!"
};
