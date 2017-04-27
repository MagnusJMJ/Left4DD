var pages = [];
var pageNum = 0;
var headers = [
  ['First name', 'Middle name', 'Last name'],
  ['Country', 'City', 'Street', 'House-#'    ],
  ['Education level', 'Job', 'Company', 'salary', 'Company address'],
  ['Sex', 'Gender', 'Sexual orientation'],
  [''],
  []
];

function setup() {
  for (i = 0; i < headers.length; i++) {
    pages[i] = [];
    for (j = 0; j < headers[i].length; i++) {
      pages[i][j] = new Page(headers[i][j]);
      for (element in pages[i][j]) {
        pages[i][j][element].hide();
      }
      pages[i][j].submit.mousePressed(function(){submit(true);});
      pages[i][j].nosubmit.mousePressed(function(){submit(false);});
    }
  }
  for (element in pages[0][0]) {
    pages[0][0][element].show();
  }
}

function submit(orNot) {
  
}

// page constructor
function Page(header) {
  this.header = createElement('h1', header);
  this.textInput = createInput('');
  this.submit = createButton('Submit');
  this.noSubmit = createButton('Don\'t Submit');
}
