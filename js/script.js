"use strict";


const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";
const optArticleTagsSelector = ' .post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagListSelector = ".tags.list";
const optCloudClassCount = 5;
const optCloudClassPrefix = "tag-size-";
const optAuthorListSelector = ".list.authors"; //???


const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;
  //console.log("Link was clicked!", event);

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* [DONE] add class 'active' to the clicked link !!! */

  clickedElement.classList.add("active");
  //console.log("clickedElement:", clickedElement);

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll(".posts .active");

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  /*[DONE] get 'href' attribute from the clicked link!!!  */

  const articleSelector = this.getAttribute("href");
  //console.log("get href", articleSelector);

  /*[DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add("active");
 // console.log(targetArticle);
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
    //console.log("id", articleId);

    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log("articleTitle:", articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' +
      articleTitle + "</span></a></li>";
    console.log(linkHTML);

    /* insert link into html variable */
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

//TAGS PARAMS
function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 99999,
  };
  for (let tag in tags) {
    params.max = Math.max(tags[tag], params.max);
    params.min = Math.min(tags[tag], params.min);
  }
  return params;
}

//CALCULATE TAGS CLASS incomplete

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classAndValueNumber = optCloudClassPrefix + classNumber;
  return classAndValueNumber;
}

//GENERATE TAGS
function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles) {
    /*find tags wrapper*/
    const tagList = article.querySelector(optArticleTagsSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    //console.log("get tags", articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
      html = html + linkHTML + ' ';
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags.hasOwnProperty(tag)) {
        /* [NEW] add tag to allTags object*/
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* [NEW] add generated code to allTags array ???*/
     // allTags.push(linkHTML);
    }
    /* END LOOP: for each tag */
    tagList.innerHTML = html;
    //console.log('taglist', tagList);
    /* insert HTML of all the links into the tags wrapper*/
  }
  /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  /*NEW create variable for all links HTML code*/
  console.log(allTags);
  //console.log('tagsParams:', tagsParams)
let allTagsHTML= '';
  /*[NEW] START LOOP : for each tag in allTags: poza funkcja??? */
  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams)+'" href="#tag-'+tag+'">'+tag+'</a></li>'
  
    console.log(tagsParams);
    allTagsHTML += tagLinkHTML;
    
    /*[NEW] END LOOP: for each tag allTags:*/
  }
  tagList.innerHTML = allTagsHTML;
  /*[NEW] add html from allTagsHTML to tagList */
}

  generateTags();


  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;


    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute("href");
    console.log('clickedelement', clickedElement);


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
    const allTagLinks = document.querySelectorAll('a[href^="#tag"]');
    /* START LOOP: for each link */
    for (let tag of allTagLinks) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }

  }

  addClickListenersToTags();

 function generateAuthors() {
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {
      /*find author wrapper*/
      const authorList = article.querySelector(optArticleAuthorSelector);

      let html = '';
      /* get author attribute */
  const articleAuthor = article.getAttribute('data-author');
      /* [NEW] check if this link is NOT already in allAuthors ??? */

      if (!allAuthors.hasOwnProperty(articleAuthor)) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';
      /* add generated code to html variable */
      html = html + authorLinkHTML;
      /* add html for each author wrapper */
      authorList.innerHTML = articleAuthor;

    }
  }
  generateAuthors();

  function authorClickHandler(event) {
    event.preventDefault();

    const clickedElement = this;

    clickedElementlement.classListadd('active');
    const href = clickedElement.getAttribute('href');
    const author = href.replace('#author-', '');

    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

    for (let activeAuthor of activeAuthors) {
      activeAuthor.classList.remove('active');
    }
    // const authorLinks = document.querySelectorAll('a[href^="author-' + author +'"]');

    for (let authorLink of authorLinks) {
      authorLink.classList.add('active');
    }

    generateTitleLinks('[data-author="' + author + '"]');
  }
  function addClickListenerToAuthors() {

    /* find all links to tags */
    const authorLinks = document.querySelectorAll(optArticleAuthorSelector); /* START LOOP: for each link */
    for (let author of authorLinks) {
      /* add tagClickHandler as event listener for that link */
      tag.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }
  addClickListenersToAuthors();

