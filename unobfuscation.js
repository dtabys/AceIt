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

var obfuscated = document.getElementsByClassName("cs-obfuscation")[0];
var expertAns = document.getElementsByClassName("txt-body answer-excerpt-seo")[0];
if (!!expertAns) {
  document.getElementsByClassName("dialog-question")[0].removeChild(expertAns);
}

if (!!obfuscated){
	var pagenum = window.location.pathname.split('-');
	var questionID = "https://textsheet.com/answer?id=" + pagenum[pagenum.length - 1].substr(1);
	httpGet(questionID, function(response) {
		if (!!response.getElementById("content")) {
			obfuscated.innerHTML = response.getElementById("content").innerHTML;
			obfuscated.className = "unobfuscation";
		} else {
			httpGet("https://textsheet.com/", function(textsheetResponse) {
        var s = document.createElement("script");
        s.src = "https://www.google.com/recaptcha/api.js";
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);

				var form = textsheetResponse.getElementsByClassName("input-group")[0];
        form.getElementsByClassName("form-control")[0].hidden = true;
        form.getElementsByClassName("form-control")[0].value = window.location.href;
        form.getElementsByClassName("form-control")[0].removeAttribute("required");
				form.removeChild(form.getElementsByClassName("spacer30")[0]);

        //form.getElementById("singlebutton").removeAttribute()

				form = textsheetResponse.getElementById("form-buscar");
        form.action = "https://textsheet.com/retort";
				obfuscated.removeChild(obfuscated.getElementsByClassName("C-Eggshell-dialog C-Eggshell-inline-dialog qna sunkist-obfuscation")[0]);
				obfuscated.appendChild(form);
        //eval(function onSubmit(token) {return document.getElementById("form-buscar").submit();});
				obfuscated.className = "unobfuscation";
        //document.getElementById("form-buscar").submit();
			});
		}
	});
}