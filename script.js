var dividers = document.getElementsByTagName('div');
var pageNum = 0;
function nextPage() {
  dividers[pageNum].style('display', 'none');
  dividers[pageNum+1].style('display', 'inline-block');
  pageNum++;
}
function prevPage() {
  dividers[pageNum].style('display', 'none');
  dividers[pageNum-1].style('display', 'inline-block');
  pageNum--;
}
/*
var textInputs = document.getElementsByTagName('input');
for (i = 0; i < textInputs.length; i++) {
  textInputs[i].
}
*/
