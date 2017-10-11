const apiUrl = "https://api.github.com/users/";

//user info
var username;
var nFollowers;
var nFollowing;
var avatarUrl;
var userEmail;
var userBio;
var nRepos;
var reposArray = new Array();

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
        window.location = "repos.html?user=" + username;
    }else{
        alert("O usuário não possui nenhum repositório");
    }
}

function getReposFromUser() {
    var user = window.location.search.substring(1).split("=")[1];
    jQuery("#username").html(user + " repositories");
    var reposUrl = apiUrl + user + "/repos";
    jQuery.getJSON(reposUrl)
        .done(function (data) {
            // console.dir(data);
            createReposList(data);
        })
}

function createReposList(objsArray){
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
    orderDesc();
    generateReposHtmlList();
}

function generateReposHtmlList() {
    var listsStr = "";
    for (var i = 0; i < reposArray.length; i++) {
        listsStr += "<li><p>" + reposArray[i].name + "</p></li>";
    }
    jQuery("ol").append(listsStr);
}

function orderAsc(){
    reposArray.sort(function(a,b){
        return a.stars - b.stars;
    });
}

function orderDesc() {
    reposArray.sort(function(a,b){
        return b.stars - a.stars;
    });
}

function toggleListOrder(){
    if(document.getElementById('checkOrder').checked){
        orderAsc();
        $("li").remove();
        generateReposHtmlList();
    }
    else{
        orderDesc();
        $("li").remove();
        generateReposHtmlList();
    }
}