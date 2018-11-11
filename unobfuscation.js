function httpGet(url, callback) {
  if (!window.XMLHttpRequest) {
    window.setTimeout(function() { callback(false); }, 0);
    return;
  }
  var done = false;
  var xhr = new window.XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && !done) {
      done = true;
      callback(xhr.response);
    }
  }
  xhr.onabort = xhr.onerror = function() {
    if (!done) {
      done = true;
      callback(false);
    }
  }
  try {
    xhr.open("GET", url, true);
    xhr.responseType = "document";
    xhr.send();
  } catch (e) {
    window.setTimeout(function() {
      if (!done) {
        done = true;
        callback(false);
      } 
    }, 0);
  }
}

var obfuscated = document.getElementsByClassName("cs-obfuscation");
var sauce = obfuscated[0];

if (!!obfuscated){
	var pagenum = window.location.pathname.split('-');
	var questionID = "https://textsheet.com/answer?id=" + pagenum[pagenum.length - 1].substr(1);
	httpGet(questionID, function(response) {
		if (!!response.getElementById("content")) {
			sauce.innerHTML = response.getElementById("content").innerHTML;
			sauce.style.fontSize = "xx-large";
			sauce.className = "unobfuscation";
		} else {
			httpGet("https://textsheet.com/", function(textsheetResponse) {
				var form = textsheetResponse.getElementsByClassName("input-group")[0];
				form.removeChild(form.getElementsByClassName("form-control")[0]);
				form.removeChild(form.getElementsByClassName("input-group-btn")[0]);
				form.removeChild(form.getElementsByClassName("spacer30")[0]);
				form = textsheetResponse.getElementById("form-buscar");
				sauce.removeChild(sauce.getElementsByClassName("C-Eggshell-dialog C-Eggshell-inline-dialog qna sunkist-obfuscation")[0]);
				sauce.appendChild(form);
				sauce.style.fontSize = "xx-large";
				sauce.className = "unobfuscation";
			});
		}
	});
}