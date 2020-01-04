"use strict";


const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";
const optArticleTagsSelector = ' .post-tags .list';

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

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add("active");
  console.log(targetArticle);
};

const links = document.querySelectorAll(".titles a");
console.log(links);

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}

function generateTitleLinks(customSelector = '') {     //przypisanie domyślnej wartości
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";

  /* for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);

  /* find all the articles and save them to variable: articles */
  /*const articles = document.querySelector(".post");*/
  /* ... */

  var html = "";

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");
    console.log("id", articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    console.log("articleTitle:", articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' +
      articleTitle + "</span></a></li>";
    console.log(linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */

  for (let article of articles) {

    /* find tags wrapper ???*/

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    tagsWrapper.innerHTML = "";

    /* make html variable with empty string??? */
    var html = "";

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log("get tags", articleTags);

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');


    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link ??? */

      const linkHTML = '<li><a href="#" + tag>' + tag + "</a></li>";


      /* add generated code to html variable */
      html = html + linkHTML;

    }
    /* END LOOP: for each tag */
    tagsWrapper.innerHTML = html;
  }
  /* insert HTML of all the links into the tags wrapper ????*/

  /* END LOOP: for every article: */
}

generateTags();


function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;


  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");


  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeTag of activeTags) {

    /* remove class active */

    activeTag.classList.remove('active');

    /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */

  const TagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for (let tagLink of TagLinks)
    /* add class active */
    tagLink.classList.add('active');
  /* END LOOP: for each found tag link */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}
/* execute function "generateTitleLinks" with article selector as argument */




function addClickListenersToTags() {
  /* find all links to tags */
  const allTagLinks = document.querySelectorAll(optArticleTagsSelector + ',' + optArticleSelector)
  /* START LOOP: for each link */
  for (let tag of allTagLinks) {
    /* add tagClickHandler as event listener for that link */
    tag.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }

}

addClickListenersToTags();

function generateAuthors(){

/* find all articles */
const articles = document.querySelectorAll(optArticleSelector);

/* START LOOP: for every article: */
for (let article of articles){

const authorWrapper = article.querySelector(optArticleQuerySelector);
const authorName = article.getAttribute('post-author');

    /* generate HTML of the link ??? */

  
    
    AuthorWrapper.innerHTML=authorLink;
    /* add generated code to html variable */
    html = html + linkHTML;

  }
  /* END LOOP: for each tag */

}
/* insert HTML of all the links into the tags wrapper ????*/

/* END LOOP: for every article: */

