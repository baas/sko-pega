/* Get Cookie from Browser */
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = document.cookie;
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

/* Set Cookie in Browser */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

/* Move User to Index */
function redirectUser(){
	window.location.href = '/agenda.html';
}


$( document ).ready(function() {
  /* If a valid email exists, move forward, else do nothing. */
  if(getCookie("email") != ""){
	  redirectUser();
  }
});


/* For Login Page JH 1/2/2019 */
function loginEmail(){
	setCookie('email', document.getElementById('emailentry').email.value, 180);
    emailFind = document.getElementById('emailentry').email.value;
    var filtered = sko_obj.filter(function (el) {
        return el['Email Address'] === emailFind;
    })

    if (filtered.length == 0) {
        alert("No Registration found for email address: " + emailFind);
    } else {
		/* Verify Account Data */
        alert(emailFind + " :: " + regionTest + " " + dept + " " + industryTest + " " + roleTest + " " + Name);
		redirectUser();
    }
}

