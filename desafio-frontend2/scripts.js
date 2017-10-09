const apiUrl = "https://api.github.com/users/";

//user info
var username;
var nFollowers;
var nFollowing;
var avatarUrl;
var userEmail;
var userBio;
var nRepos;

//listening to enter keypress
$("#searchInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#searchBtn").click();
    }
});

function search(){
    var textValue = jQuery("input").val();
    if(textValue.length > 0){
        try {
            jQuery.getJSON(apiUrl + textValue)
            .done(function(data){
                fillUserInfo(data);
                displayUserInfo();
            }) 
            .fail(function(){
                hideElement("#userInfo");
                showElement("#msgNotFound");
            })
        } catch (error) {
            console.log(error);
            hideElement("#userInfo");
            showElement("#msgNotFound");
        }
    }
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
    hideElement("#msgNotFound");
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

function callReposPage(){
    //apiUrl + "/" + username + "/repos"
    window.location.href = "repos.html";
}