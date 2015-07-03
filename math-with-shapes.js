/**
 * TODO:
 * - Take vars out of the global namespace and put them in an object
 * - Keep track of total right and wrong answers each session
 * - Log sessions to local storage
 * - Make able to toggle opacity of shapes on click/touch
 */

var MathWithShapes = {
	numberOne: null,
	numberTwo: null,
	answer: null
}

/* vars to hold references to the HTML elements */
var mathProblem, mathIllustration, mathForm, mathResult;


function generateProblem() {
	MathWithShapes.numberOne = generateNumber( 10 );
	MathWithShapes.numberTwo = generateNumber( 10 );
	MathWithShapes.answer = MathWithShapes.numberOne + MathWithShapes.numberTwo;

	writeProblem();

	generateIllustration();
}

function writeProblem( withAnswer, correct ) {
	mathProblem.className = '';
	if ( withAnswer === true ) {
		mathProblem.innerHTML = ( correct ? correct + ' ' : '' ) + MathWithShapes.numberOne + ' + ' + MathWithShapes.numberTwo + ' = ' + MathWithShapes.answer;
	}
	else {
		mathProblem.innerHTML = ( correct ? correct + ' ' : '' ) + MathWithShapes.numberOne + ' + ' + MathWithShapes.numberTwo;
	}
}

function generateIllustration() {
	var randomColor;

	/* Give the illustration a blank canvas, so to speak */
	mathIllustration.innerHTML = '';

	randomColor = getRandomColor();
	randomShape = getRandomShape();

	drawNumberIllustration( MathWithShapes.numberOne, randomColor, randomShape );

	var problemType = document.createElement( "div" );
	problemType.className = "problem-type";
	problemType.appendChild( document.createTextNode( "+" ) );
	mathIllustration.appendChild( problemType );

	drawNumberIllustration( MathWithShapes.numberTwo, randomColor, randomShape );
}

function drawNumberIllustration( num, randomColor, randomShape ) {
	var toDraw, i;

	for( i = 0; i < num; i++ ) {
		toDraw = document.createElement( 'div' );
		toDraw.className = randomShape + " illustration-shape";
		if ( randomShape === 'triangle' ) {
			toDraw.style.borderColor = "transparent transparent " + randomColor + " transparent";
		}
		else {
			toDraw.style.background = randomColor;
		}
		mathIllustration.appendChild(toDraw);
	}
}

function getRandomColor() {
	var colors = [ "blue", "red", "orange", "purple", "green" ];
	return colors[ Math.floor( Math.random() * colors.length ) ];
}

function getRandomShape() {
	var shapes = [ "square", "circle", "rectangle", "oval", "triangle" ];
	return shapes[ Math.floor( Math.random() * shapes.length ) ];
}

/* Generate a number between 1 and the max argument */
function generateNumber( max ) {
	return Math.floor( Math.random() * max ) + 1;
}

/* Set the vars needed to reference the HTML elements*/
function initiateMathWithShapes() {
	mathProblem = document.getElementById( 'math-problem' );
	mathIllustration = document.getElementById( 'math-illustration' );
	mathForm = document.getElementById( 'math-form' );
	userAnswer = document.getElementById( 'user-answer' );
	mathResult = document.getElementById( 'math-result' );

	mathForm.addEventListener( "submit", checkAnswer );

	generateProblem();

}

function checkAnswer( event ) {
	event.preventDefault();
	if ( MathWithShapes.answer === parseInt( userAnswer.value) ) {
		writeProblem( true, '&check;' );
		mathProblem.className = 'problem-correct';
	}
	else {
		writeProblem( false, '&cross; Try Again!' );
		mathProblem.className = 'problem-incorrect';
	}
}

