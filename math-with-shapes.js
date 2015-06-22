var numberOne, numberTwo, answer;
	/* vars to hold references to the HTML elements */
	var mathProblem, mathIllustration, mathForm, mathResult;


	function generateProblem() {
		numberOne = generateNumber( 10 );
		numberTwo = generateNumber( 10 );
		answer = numberOne + numberTwo;

		mathProblem.innerHTML = numberOne + ' + ' + numberTwo;

		generateIllustration();
	}

	function generateIllustration() {
		var randomColor;

		/* Give the illustration a blank canvas, so to speak */
		mathIllustration.innerHTML = '';

		randomColor = getRandomColor();
		randomShape = getRandomShape();

		drawNumberIllustration( numberOne, randomColor, randomShape );

		var problemType = document.createElement( "div" );
		problemType.className = "problem-type";
		problemType.appendChild( document.createTextNode( "+" ) );
		mathIllustration.appendChild( problemType );

		drawNumberIllustration( numberTwo, randomColor, randomShape );
	}

	function drawNumberIllustration( num, randomColor, randomShape ) {
		var toDraw, i;

		for( i = 0; i < num; i++ ) {
			toDraw = document.createElement( 'div' );
			toDraw.className = randomShape;
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
		var colors = [ "blue", "red", "pink", "orange", "purple", "green" ];
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
		mathResult = document.getElementById( 'math-result' );

		generateProblem();
	}
