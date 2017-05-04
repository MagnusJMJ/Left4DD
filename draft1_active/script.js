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
	  catheaders = ["Account", "Name", "Age", "Location", "Employment", "Sex", "Hobbies", "Sports", "Medical", "Insurance", "Religion", 'Strength of Belief'],
    multChoice = {
      age:['18-25', '26-35', '36-45', '46-55', '56-65', '66+'],
      hobbies:['Fishing', 'Technology', 'Fitness', 'Art', 'Crafts', 'Gaming', 'Gardening', 'Cooking'],
      sports:['Riding', 'Football', 'Handball', 'Motorsport', 'Tennis', 'E-sports', 'Golf', 'Hockey'],
      medical:['Acid reflux', 'ADHD', 'Allergies', 'Arthritis', 'Asthma', 'Back pain', 'Clinical depression', 'Diabetes', 'Heartburn', 'Migraines', 'Heart diseases', 'High blood pressure', 'high cholestorol', 'impotence', 'obesity'],
      insurance:['Life insurance', 'Property insurance', 'Health insurance', 'Self insurance', 'Travel insurance'],
      religion:['Christianity', 'Islam', 'Judaism', 'Buddhism', 'Sikhism', 'Hinduism', 'Atheism'],
      strength:['1', '2', '3', '4', '5']
    },
    headers    = [   // objects of the 'Page' type (see constructor).
      ['Username', 'Password', 'Repeat Password'],
      ['What is your first name?', 'What is your last name?', 'What is your middle name?'],
      [multChoice.age],
      ['Which Country do you live in?', 'Which City do you live in?', 'Which Street do you live on?', 'What House number do you have?'],
      ['What is your Education level?', 'what is your Job position called?', 'Which Company do you work for?', 'What do you get in Salary?'],
      ['What is your Gender?', 'What is your Sexual orientation?'],
      [multChoice.hobbies],
      [multChoice.sports],
      [multChoice.medical],
      [multChoice.insurance],
      [multChoice.religion],
      [multChoice.strength]
    ];
console.log('Variable initialization')

function setup() {
  noCanvas();

  // nested for-loop fills the 2D array 'pages' and gives
  // each object the appropriate header argument (see array 'headers')
  for (i = 0; i < headers.length; i++) {
    pages[i] = [];
    console.log('Created sub-array ' + i)
    for (j = 0; j < headers[i].length; j++) {
      pages[i][j] = pageType(catheaders[i], headers[i][j]);

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
    if (Array.isArray(pages[cat][subCat][element])) {
      for (o = 0; o < pages[cat][subCat][element].length; o++) {
        pages[cat][subCat][element][o].hide();
      }
    } else {
      pages[cat][subCat][element].hide();
    }
  }

  // log user input to object for later export as JSON
  if (pages[cat][subCat] instanceof Page2) {
    person[catheaders[cat]] = [];
    for (i = 0; i < pages[cat][subCat].options.length; i++) {
      if (pages[cat][subCat].options[i].checked()) {
        person[catheaders[cat]].push(pages[cat][subCat].options[i].id());
      }
    }
  } else {
    person[headers[cat][subCat]] = pages[cat][subCat].textInput.value();
  }

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
    if (Array.isArray(pages[cat][subCat][element])) {
      for (o = 0; o < pages[cat][subCat][element].length; o++) {
        pages[cat][subCat][element][o].show();
      }
    } else {
      pages[cat][subCat][element].show();
    }
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
      for (element in newPage) {
        if (Array.isArray(newPage[element])) {
          for (m = 0; m < newPage[element].length; m++) {
            newPage[element][m].hide();
          }
        } else {
          newPage[element].hide();
        }
      }
      console.log('Created Page of Type 2');
      break;
    default:
      newPage = new Page1(arg1, arg2);
      for (element in newPage) {
        newPage[element].hide();
      }
      console.log('Created Page of Type 1');
  }
  newPage.submit.position((window.innerWidth/2)-200, (window.innerHeight/10)*8);
  newPage.noSubmit.position((window.innerWidth/2)+150, (window.innerHeight/10)*8);
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

function Page2(cathead, arg2) {
  this.catheader = createElement("h1",'');
  this.header    = createElement('h2', cathead);
  this.options   = [];
  var container = createDiv('');
  for (n = 0; n < arg2.length; n++) {
    this.options.push(createCheckbox(arg2[n], false));
    this.options[n].id(arg2[n]);
    this.options[n].parent(container);
  }
  this.submit    = createButton('Submit');
  this.noSubmit  = createButton('Don\'t Submit');
}

function EndPage() {
	this.test = createElement("h1", "WOW IT WORKED");
	this.test2 = createElement("p", "kinda");
}
