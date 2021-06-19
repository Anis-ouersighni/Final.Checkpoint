const Check= _ => {
    if (document.getElementById("email").value =="Aniswersighni@gomycode.com" && document.getElementById("password").value=="123"    ) {
       while(document.getElementById("LabelWrong").hidden == true) { 
        document.getElementById("LabelSuccess").hidden = false ;
        window.location.href = "../Html/Web.html";

        break
       }

    }
    else{
        while(document.getElementById("LabelSuccess").hidden == true) {
        
        document.getElementById("LabelWrong").hidden = false ;
        break
        }
    }

}