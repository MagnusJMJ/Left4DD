var cat = 0;
var subCat = 0;
var headers = [
  ['First name', 'Middle name', 'Last name'],
  ['Country', 'City', 'Street', 'House-#'    ],
  ['Education level', 'Job', 'Company', 'salary', 'Company address'],
  ['Sex', 'Gender', 'Sexual orientation'],
  [''],
  []
];
var pages = [];

function setup() {
  for (i = 0; i < headers.length; i++) {
    pages[i] = [];
    for (j = 0; j < headers[i].length; j++) {
      pages[i][j] = new Page(headers[i][j]);
      for (element in pages[i][j]) {
        pages[i][j][element].hide();
      }
      pages[i][j].submit.mousePressed(function(){submit(true);});
      pages[i][j].noSubmit.mousePressed(function(){submit(false);});
    }
  }
  for (element in pages[0][0]) {
    pages[0][0][element].show();
  }
}

// function to call when a button is pressed
// TODO: Fucking fix the damn thing
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
