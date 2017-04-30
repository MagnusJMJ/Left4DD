/* *********************************************************
   ** Left4DD Final Project Super Happy Go-Go Supreme(tm) **
   *********************************************************
   TODO:
    * Find out what to do with user input
    * Define some global CSS rules to make things pretty
    * Figure out visualization
*/

// initialization of global variables
var cat     = 0, // 'cat' and 'subCat' are counters to keep
    subCat  = 0, // track of which page is currently showing.
    person  = {}, // Person is an empty object we will push user input to.
    pages   = [], // 'pages' will be a 2D array that contains
    headers = [   // objects of the 'Page' type (see constructor).
      ['First name', 'Middle name', 'Last name'],
      ['Country', 'City', 'Street', 'House-#'],
      ['Education level', 'Job', 'Company', 'salary', 'Company address'],
      ['Sex', 'Gender', 'Sexual orientation'],
      [''],
      []
    ];

function setup() {

  // nested for-loop fills the 2D array 'pages' and gives
  // each object the appropriate header argument (see array 'headers')
  for (i = 0; i < headers.length; i++) {
    pages[i] = [];
    for (j = 0; j < headers[i].length; j++) {
      pages[i][j] = new Page(headers[i][j]);

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

  // for/in-loop goes through each element of the first page and shows it
  // (Implied CSS-rule: "display: inline-block")
  for (element in pages[0][0]) {
    pages[0][0][element].show();
  }
}

// TEST: Write content of object to new JSON file.
function keyPressed() {
  if (keyCode == 32) {
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
  person[headers[cat][subCat]] = pages[cat][subCat].textInput.value();

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

// page constructor
function Page(header) {
  this.header    = createElement('h1', header);
  this.textInput = createInput('');
  this.submit    = createButton('Submit');
  this.noSubmit  = createButton('Don\'t Submit');
}
