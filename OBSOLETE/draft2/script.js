var person = {};

{
  let pages = document.getElementsByTagName('div');
  let n = 0;
  function nextPage() {
    pages[n].style.display = 'none';
    pages[n+1].style.display = 'inline-block';
    n++;
  }
  function prevPage() {
    pages[n].style.display = 'none';
    pages[n-1].style.display = 'inline-block';
    n--;
  }
}

{
  var textInputs = document.getElementsByTagName('input');
  let n = 0;
  while (n < textInputs.length) {
    textInputs[n].addEventListener('click', function() {
      this.value = '';
    });
    textInputs[n].addEventListener('focusout', function() {
      if (!this.value) { this.value = 'Invalid!'; }
    });
    n++;
  }
}

/*
function calcWorth() {
  if (Object.keys(person).length == textInputs.length) {
    let n = 0;
    for (prop in person) {
      prop = textInputs[n].value;
      console.log(prop);
      n++;
    }
  }
}
*/
