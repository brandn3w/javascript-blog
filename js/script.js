"use strict";

/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  console.log("Link was clicked!", event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link !!! */

  clickedElement.classList.add("active");
  console.log("clickedElement:", clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".posts .active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /*[DONE] get 'href' attribute from the clicked link!!!  */

  const articleSelector = this.getAttribute("href");
  console.log("get href", articleSelector);

  /*[IN PROGRESS] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* [DONE}] add class 'active' to the correct article */

  targetArticle.classList.add("active");
  console.log(targetArticle);
};

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

{
const optArticleSelector = '.post',
optTitleSelector = '.post-title',
optTitleListSelector = '.titles';

function generateTitleLinks(){

/* remove contents of titleList */
const titleList = document.querySelector(optTitleListSelector);
titleList.innerHTML = '';

/* for each article */

const articles = document.querySelectorAll(optArticleSelector + customSelector);

let html = '';
for(let article of articles){

  /* DONE get the article id */

 
 

  /* find the title element */
 
 
 
  /* get the title from the title element */


  /* create HTML of the link */

 


  /* insert link into titleList */
  
  
 
  /* ... */

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelector(".post");
  /* ... */

  let html = '';

  for(let article of articles){
    /* get the article id */
     const articleId = article.getAttribute("id");
  console.log("id", articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
  console.log('articleTitle:', articleTitle);

    /* get the title from the title element */
  
  const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* create HTML of the link */
     const linkHTML ='<li><a href="#' + articleID + '"><span>' +articleTitle + '</span></a></li>';
console.log(linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
}

generateTitleLinks();