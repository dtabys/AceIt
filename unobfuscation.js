// async get calls
function httpGetAsync(aUrl, callback) {
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
    xhr.open("GET", aUrl, true);
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

// blurred out part
var obfuscated = document.getElementsByClassName("cs-obfuscation")[0];

if (!!obfuscated){
	var pagenum = window.location.pathname.split('-');
	var questionID = "https://textsheet.com/answer?id=" + pagenum[pagenum.length - 1].substr(1);
	httpGetAsync(questionID, function(response) {
		if (!!response.getElementById("content")) {
			// unblur
			obfuscated.innerHTML = response.getElementById("content").innerHTML;
			obfuscated.style.fontSize = "large";
			obfuscated.className = "unobfuscation";
		} else {
			// else replace with "no answer found"
			obfuscated.innerHTML = "<span>Answer not found :(</span>";
			obfuscated.style.fontSize = "xx-large";
			obfuscated.className = "unobfuscation";
		}
	});
}
