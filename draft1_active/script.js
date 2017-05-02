/* *********************************************************
   ** Left4DD Final Project Super Happy Go-Go Supreme(tm) **
   *********************************************************
   TODO:
    * Find out what to do with user input
    * Define some global CSS rules to make things pretty
    * Figure out visualization
	  * Figure out the right questions
	  * placed the objects
*/

// initialization of global variables
var cat        = 0, // 'cat' and 'subCat' are counters to keep
    subCat     = 0, // track of which page is currently showing.
    person     = {}, // Person is an empty object we will push user input to.
    pages      = [], // 'pages' will be a 2D array that contains
	  catheaders = ["Name", "Age", "Location", "Employment", "Sex", "Hobbies", "Sports", "Medical", "Insurance", "Religion", 'Strength of Belief'],
    headers    = [   // objects of the 'Page' type (see constructor).
      ['What is your first name?', 'What is your last name?', 'What is your middle name?'],
      ['18-25' '26-35', '36-45', '46-55', '56-65', '66+'],
      ['Which Country do you live in?', 'Which City do you live in?', 'Which Street do you live on?', 'What House number do you have?'],
      ['What is your Education level?', 'what is your Job position called?', 'Which Company do you work for?', 'What do you get in Salary?'],
      ['What is your Gender?', 'What is your Sexual orientation?'],
      ['Fishing', 'Technology', 'Fitness', 'Art', 'Crafts', 'Gaming', 'Gardening', 'Cooking'],
      ['Riding', 'Football', 'Handball', 'Motorsport', 'Tennis', 'E-sports', 'Golf', ],
      [''],
      [''],
      [''],
      [''],
    ];

function setup() {

  // nested for-loop fills the 2D array 'pages' and gives
  // each object the appropriate header argument (see array 'headers')
  for (i = 0; i < headers.length; i++) {
    pages[i] = [];
    for (j = 0; j < headers[i].length; j++) {
      pages[i][j] = pageType(catheaders[i], headers[i][j]);

      // additional for/in-loop goes through each element of each 'Page'
      // object and hides them. (Implied CSS-rule: "display: none;")
      for (element in pages[i][j]) {
        pages[i][j][element].hide();
      }

      // Links the function 'submit' to all the buttons. 'submit' is wrapped in
      // an anonymous function to avoid a bug where the function fires in the
      // two following lines (which it isn't supposed to)
      pages[i][j].submit.mousePressed(function(){submit(false);});
      pages[i][j].noSubmit.mousePressed(function(){submit(true);});
    }
  }
	pages[pages.length-1].push(new EndPage);

	// WE HAVE TO GO DEEPER
	var lastPage = pages[pages.length-1][pages[pages.length-1].length-1];

	for (element in lastPage) {
		lastPage[element].hide();
	}

  // for/in-loop goes through each element of the first page and shows it
  // (Implied CSS-rule: "display: inline-block")
  for (element in pages[0][0]) {
    pages[0][0][element].show();
  }
}

// Write content of object to new JSON file.
function keyPressed() {
  if (keyCode == UP_ARROW) {
    saveJSON(person, 'newperson.json', false);
  }
}

// function to call when a button is pressed
function submit(orNot) {

  // hide current page
  for (element in pages[cat][subCat]) {
    pages[cat][subCat][element].hide();
  }

  // TEST: log user input to object for later export as JSON
  // person[headers[cat][subCat]] = pages[cat][subCat].textInput.value();

  // IF user chose 'Don't submit' OR user is on the last page of
  // this category, skip to the first question in next category.
  if (orNot || subCat == pages[cat].length-1) {
    cat++;
    subCat = 0;
  // ELSE go to the next question in this category
  } else {
    subCat++;
  }

  // now that 'cat' and 'subCat' have been changed
  // appropriately, show the "new" page.
  for (element in pages[cat][subCat]) {
    pages[cat][subCat][element].show();
  }
}

function pageType(arg1, arg2) {
  var newPage;
  switch (arg1) {
    case 'Age':
    case 'Hobbies':
    case 'Sports':
    case 'Medical':
    case 'Insurance':
    case 'Religion':
    case 'Strength of Belief':
      newPage = new Page2(arg1, arg2);
      break;
    default:
      newPage = new Page1(arg1, arg2);
  }
  return newPage;
}

// page constructor
function Page1(cathead, header) {
  this.catheader = createElement("h1",cathead);
  this.header    = createElement('h2', header);
  this.textInput = createInput('');
  this.submit    = createButton('Submit');
  this.noSubmit  = createButton('Don\'t Submit');
}

function Page2(cathead, header) {
  this.catheader = createElement("h1",cathead);
  this.header    = createElement('h2', header);
  this.checkBox  = createCheckbox('');
  this.submit    = createButton('Submit');
  this.noSubmit  = createButton('Don\'t Submit');
}

function EndPage() {
	this.test = createElement("h1", "WOW IT WORKED");
	this.test2 = createElement("p", "kinda");
}
