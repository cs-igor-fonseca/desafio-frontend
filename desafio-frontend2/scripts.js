const apiUrl = "https://api.github.com/users/";

//user info
var username;
var nFollowers;
var nFollowing;
var avatarUrl;
var userEmail;
var userBio;
var nRepos;

function search(){
    var textValue = jQuery("input").val();
    //get user basic info 
    jQuery.getJSON(apiUrl + textValue)
    .done(function(data){
        fillUserInfo(data);
        displayUserInfo();
    })
    .fail(function(){
        hideElement("#userInfo");
        //jQuery("#userInfo").parent().append( "<p>Nenhum usuário encontrado</p>" );
    })
}

function fillUserInfo(data){
    username   = data.login;
    avatarUrl  = data.avatar_url;
    userEmail  = data.email;
    userBio    = data.bio;
    nFollowers = data.followers;
    nFollowing = data.following;
    nRepos     = data.public_repos;
    // console.dir(data);
}

function displayUserInfo(){
    jQuery("#username").html(username);
    jQuery("#followers").html(nFollowers);
    jQuery("#following").html(nFollowing);
    jQuery("#avatar").attr("src", avatarUrl);
    jQuery("#userEmail").html(userEmail);
    jQuery("#userBio").html(userBio);
    jQuery("#repos").html(nRepos);
    showElement("#userInfo");
}

function hideElement(id){
    if(jQuery(id).is(":visible"))
        jQuery(id).toggle();
}

function showElement(id){
    if(jQuery(id).is(":hidden"))
        jQuery(id).toggle();
}
