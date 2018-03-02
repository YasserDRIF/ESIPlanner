var i = 1;
$(function(){
	$("#test").mouseover(function(){
		if (i==1){
		var el = $("<p></p>").text("you must be esier").css({"margin-left":"610px","color":"red","size":"bold"});
		$(".g-signin2").after(el);
		i++;
		}
		/*var test ="noor"
		if ((test[test.length-2])=="r"){
		var el = $("<p></p>").text("dont touch me").css({"margin-left":"610px","color":"red","size":"bold"});
		$(".g-signin2").after(el);
		}*/
	})
})
function onSignIn(googleUser)
{
	var profile =googleUser.getBasicProfile();
    $("#email").text(profile.getEmail());
    //alert(profile.getEmail());
    var email = profile.getEmail();
    if ((email.substring(email.lastIndexOf("@"))=="@esi.dz")){
    	$(".g-signin2").css("display","none");
    	$(".data").css("display","block");
    	$("#pic").attr('src',profile.getImageUrl());
    }
    else{
    	alert("Pour acceder a notre agenda tu doit etre un etudiant de l'esi :)");
    }
}
function signOut()
{
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function(){
		alert("you have been successfuly signed out ");

		$(".g-signin2").css("display","block");
		$(".data").css("display","none");
	});
}
