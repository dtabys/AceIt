document.getElementById("cs-obfuscation").innerHtml = this.innerHtml + "<h2>Test</h2>";
var btn = document.createElement("BUTTON")
var t = document.createTextNode("CLICK ME");
btn.appendChild(t);
document.appendChild(btn);

clickButton = function(){
  document.getElementById("singlebutton").click()
};

var url = window.location.href;
var myEle = document.getElementById("1");

if(myEle){

  //var x = document.getElementById("singlebutton");
  //document.getElementById("singlebutton").submit();
  //document.getElementById("1").onChange =
  alert("Before URL");
  document.getElementById('1').value='https://www.chegg.com/homework-help/questions-and-answers/find-ones-digit-number-47327-q30827644?trackid=3056eecf&strackid=37ba3706&ii=1';
  alert("After URL");

  //x.submit();
//  window.setTimeout(clickButton(), 300);
clickButton();
  alert("After Button");
}
