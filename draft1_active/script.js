// initialization of global variables
var cat     = 0, // 'cat' and 'subCat' are counters to keep
    subCat  = 0, // track of which page is currently showing
    pages   = [], // 'pages' will be a 2D array that contains
    headers = [   // objects of the 'Page' type (see constructor)
      ['First name', 'Middle name', 'Last name'],
      ['Country', 'City', 'Street', 'House-#'],
      ['Education level', 'Job', 'Company', 'salary', 'Company address'],
      ['Sex', 'Gender', 'Sexual orientation'],
      [''],
      []
    ];

function setup() {

  // nested for-loop fills the 2D array 'pages' and gives
  // each object the appropriate header (see array 'headers')
  for (i = 0; i < headers.length; i++) {
    pages[i] = [];
    for (j = 0; j < headers[i].length; j++) {
      pages[i][j] = new Page(headers[i][j]);

      // additional for/in-loop goes through each element of each 'Page'
      // object and hides them. (Implied CSS-rule: "display: none;")
      for (element in pages[i][j]) {
        pages[i][j][element].hide();
      }

      pages[i][j].submit.mousePressed(function(){submit(true);});
      pages[i][j].noSubmit.mousePressed(function(){submit(false);});
    }
  }

  // for/in-loop goes through each element of the first page and shows it
  // (Implied CSS-rule: "display: inline-block")
  for (element in pages[0][0]) {
    pages[0][0][element].show();
  }
}

// function to call when a button is pressed
function submit(orNot) {

  // hide current page
  for (element in pages[cat][subCat]) {
    pages[cat][subCat][element].hide();
  }

  // if user chose 'submit', continue to next page
  if (!orNot) {
    if (subCat == pages[cat].length-1) {
      cat++;
      subCat = 0;
    }
    for (element in pages[cat][subCat]) {
      pages[cat][subCat][element].show();
    }

  // if user chose "don't submit", skip to next category
  } else {
    for (element in pages[cat+1][0]) {
      pages[cat+1][0][element].show();
    }
    cat++;
    subCat = 0;
  }
}

// page constructor
function Page(header) {
  this.header    = createElement('h1', header);
  this.textInput = createInput('');
  this.submit    = createButton('Submit');
  this.noSubmit  = createButton('Don\'t Submit');
}
