const apiUrl = "https://api.github.com/users/";

//user info
var username;
var nFollowers;
var nFollowing;
var avatarUrl;
var userEmail;
var userBio;

function search(){
    var textValue = jQuery("input").val();
    //get user followers/following info
    jQuery.getJSON(apiUrl + textValue + "/followers")
    .done(function(data){
        nFollowers = Object.keys(data).length;
    })
    jQuery.getJSON(apiUrl + textValue + "/following")
    .done(function(data){
        nFollowing = Object.keys(data).length;
    })

    //get user basic info 
    jQuery.getJSON(apiUrl + textValue)
    .done(function(data){
        fillUserInfo(data);
        displayUserInfo();
    })
    .fail(function(){
        //mostrar msg not found
    })
}

function fillUserInfo(data){
    username  = data.login;
    avatarUrl = data.avatar_url;
    userEmail = data.email;
    userBio   = data.bio;
}

function displayUserInfo(){
    jQuery("#username").html(username);
    jQuery("#followers").html(nFollowers);
    jQuery("#following").html(nFollowing);
    jQuery("#avatarUrl").attr("src", avatarUrl);
    jQuery("#userEmail").html(userEmail);
    jQuery("#userBio").html(userBio);
    toggleVisibility("#userInfo");
}

function toggleVisibility(id){
    $(id).toggle();
}
