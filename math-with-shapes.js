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
	answer: null,
	totalClicked: 0,
	totalGenerated: 0,
	totalCorrect: 0,
	answeredAlready: false,
	cachedSelectors: {}
};


MathWithShapes.generateProblem = function() {
	MathWithShapes.numberOne = MathWithShapes.generateNumber( 10 );
	MathWithShapes.numberTwo = MathWithShapes.generateNumber( 10 );
	MathWithShapes.answer = MathWithShapes.numberOne + MathWithShapes.numberTwo;

	MathWithShapes.totalGenerated += 1;
	MathWithShapes.answeredAlready = false;

	MathWithShapes.writeProblem();

	MathWithShapes.generateIllustration();
	MathWithShapes.addToggleOnClick();
	MathWithShapes.countClicked();
	userAnswer.value = '';
};

MathWithShapes.writeProblem = function( withAnswer, correct ) {
	mathProblem.className = '';
	if ( withAnswer === true ) {
		mathProblem.innerHTML = ( correct ? correct + ' ' : '' ) + MathWithShapes.numberOne + ' + ' + MathWithShapes.numberTwo + ' = ' + MathWithShapes.answer;
	}
	else {
		mathProblem.innerHTML = ( correct ? correct + ' ' : '' ) + MathWithShapes.numberOne + ' + ' + MathWithShapes.numberTwo;
	}
};

MathWithShapes.generateIllustration = function() {
	var randomColor;

	/* Give the illustration a blank canvas, so to speak */
	MathWithShapes.cachedSelectors.mathIllustration.innerHTML = '';

	randomColor = MathWithShapes.getRandomColor();
	randomShape = MathWithShapes.getRandomShape();

	MathWithShapes.drawNumberIllustration( MathWithShapes.numberOne, randomColor, randomShape );

	var problemType = document.createElement( "div" );
	problemType.className = "problem-type";
	problemType.appendChild( document.createTextNode( "+" ) );
	MathWithShapes.cachedSelectors.mathIllustration.appendChild( problemType );

	MathWithShapes.drawNumberIllustration( MathWithShapes.numberTwo, randomColor, randomShape );
};

MathWithShapes.drawNumberIllustration = function( num, randomColor, randomShape ) {
	var toDraw, i;

	for( i = 0; i < num; i++ ) {
		toDraw = document.createElement( 'div' );
		toDraw.className = randomShape + " math-illustration-shape";
		if ( randomShape === 'triangle' ) {
			toDraw.style.borderColor = "transparent transparent " + randomColor + " transparent";
		}
		else {
			toDraw.style.background = randomColor;
		}
		MathWithShapes.cachedSelectors.mathIllustration.appendChild(toDraw);
	}
};

MathWithShapes.getRandomColor = function() {
	var colors = [ "blue", "red", "orange", "purple", "green" ];
	return colors[ Math.floor( Math.random() * colors.length ) ];
};

MathWithShapes.getRandomShape = function() {
	var shapes = [ "square", "circle", "rectangle", "oval", "triangle" ];
	return shapes[ Math.floor( Math.random() * shapes.length ) ];
};

/* Generate a number between 1 and the max argument */
MathWithShapes.generateNumber = function( max ) {
	return Math.floor( Math.random() * max ) + 1;
};

MathWithShapes.cacheSelectors = function() {
	mathProblem = document.getElementById( 'math-problem' );
	MathWithShapes.cachedSelectors.mathIllustration = document.getElementById( 'math-illustration' );
	MathWithShapes.cachedSelectors.mathForm = document.getElementById( 'math-form' );
	userAnswer = document.getElementById( 'user-answer' );
	MathWithShapes.cachedSelectors.mathResult = document.getElementById( 'math-result' );
	mathRecord = document.getElementById( 'math-record' );
	manualCount = document.getElementById( 'manual-count' );
}

/* Set the vars needed to reference the HTML elements*/
MathWithShapes.initiateMathWithShapes = function() {
	MathWithShapes.cacheSelectors();

	MathWithShapes.cachedSelectors.mathForm.addEventListener( "submit", MathWithShapes.checkAnswer );

	MathWithShapes.generateProblem();

};

MathWithShapes.checkAnswer = function( event ) {
	event.preventDefault();
	if ( MathWithShapes.answer === parseInt( userAnswer.value) ) {
		MathWithShapes.writeProblem( true, '&check;' );
		mathProblem.className = 'problem-correct';
		if ( MathWithShapes.answeredAlready === false ) {
			MathWithShapes.totalCorrect += 1;
		}
	}
	else {
		MathWithShapes.writeProblem( false, '&cross; Try Again!' );
		mathProblem.className = 'problem-incorrect';
	}
	MathWithShapes.answeredAlready = true;
	mathRecord.innerText = MathWithShapes.totalCorrect + ' / ' + MathWithShapes.totalGenerated;
};


/* Look into whether it's a memory leak to add these event listeners but never remove them manually. I think they should be removed when the previous problem's shapes are erased, but I want to be sure.*/
MathWithShapes.addToggleOnClick = function() {
	$( '.math-illustration-shape' ).on( "click", function() {
		$( this ).toggleClass('clicked-shape');
		MathWithShapes.countClicked();
	} );
};

MathWithShapes.countClicked = function() {
	MathWithShapes.totalClicked = $( '.math-illustration .clicked-shape' ).length;

		if( MathWithShapes.totalClicked > 0 ) {
			manualCount.innerHTML = "<p>You've counted</p><p class='manual-count-number'>" + MathWithShapes.totalClicked +"</p><button id='resetCount' onclick='MathWithShapes.startOverCounting()'>Start Over Counting</button>";

		}
		else {
			manualCount.innerHTML = "";
		}
};

MathWithShapes.startOverCounting = function() {
	$( '.math-illustration-shape' ).removeClass('clicked-shape');
	MathWithShapes.countClicked();
};