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
        jQuery.getJSON(apiUrl + textValue)
        .done((data) => {
            fillUserInfo(data);
            displayUserInfo();
        })
        .fail(() => {
            hideElement("#userInfo");
            showElement("#msgNotFound");
        })
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
    if (nRepos > 0) {
        // window.location = "repos.html";
        var reposUrl = apiUrl + username + "/repos";
        // console.log(reposUrl);
        jQuery.getJSON(reposUrl)
            .done(function (data) {
                console.dir(data);
                createReposList(data);
            })
    }else{
        alert("O usuário não possui nenhum repositório");
    }
}

function createReposList(objsArray){
    var reposArray = new Array();
    for (var i = 0; i < objsArray.length; i++) {
        var tmp = {
            name: objsArray[i].name,
            stars: objsArray[i].stargazers_count,
            description: objsArray[i].description,
            language: objsArray[i].language,
            url: objsArray[i].html_url
        } 
        reposArray.push(tmp);
    }
        
    generateReposHtmlList(reposArray);
}

function generateReposHtmlList(reposArray) {
    //order list
    reposArray.sort(function(a,b){
        return b.stars - a.stars;
    });
    var listsStr = "";
    for (var i = 0; i < reposArray.length; i++) {
        listsStr += "<li><p>" + reposArray[i].name + "</p></li>";
    }
    jQuery("ol").append(listsStr);
}