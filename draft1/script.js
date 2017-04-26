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
  for (i = 0; i < 10; i++) {
    pages[i] = new Page('test'+i);
    for (element in pages[i]) {
      pages[i][element].hide();
    }
    pages[i].submit.mousePressed(function() { submit(true) });
    pages[i].noSubmit.mousePressed(function() { submit(false) });
  }
  for (element in pages[pageNum]) {
    pages[pageNum][element].show();
  }
}

function draw() {

}

function submit(arg1) {

  if (arg1) {
    for (element in pages[pageNum]) {
      pages[pageNum][element].hide();
    }
    for (element in pages[pageNum+1]) {
      pages[pageNum+1][element].show();
    }
    pageNum++;
  } else {
    alert("BUY PENIS ENLARGEMENT PILLS NOW");
  }
}
// constructor funktion
function Page(arg1) {
  this.header = createElement('h1', arg1);
  this.textInput = createInput('');
  this.submit = createButton('Submit');
  this.noSubmit = createButton('Don\'t Submit');
}
