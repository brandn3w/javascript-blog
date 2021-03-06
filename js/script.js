"use strict";

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
}

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles";
const optArticleTagsSelector = ' .post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optArticleSingleAuthorSelector = '.post-author a';
const optTagListSelector = ".tags.list";
const optAuthorListElem = '.list.authors li a';
const optCloudClassCount = 5;
const optCloudClassPrefix = "tag-size-";
const optAuthorListSelector = ".list.authors";


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
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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
      const linkHTMLData = { id: tag, title: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

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
  //console.log('tagsParams:', tagsParams)
  //let allTagsHTML= '';
  const allTagsData = {tags: []};
  /*[NEW] START LOOP : for each tag in allTags: */
  for (let tag in allTags) {
    /*[NEW] generate code of a link and add it to allTagsHTML */
    //const tagLinkHTML = '<li><a class="'+ calculateTagClass(allTags[tag], tagsParams)+'" href="#tag-'+tag+'">'+tag+'</a></li>'
    //allTagsHTML += tagLinkHTML;

    //add Handlebars
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /*[NEW] END LOOP: for each tag allTags:*/

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
//tagList.innerHTML = allTagsHTML;
/*[NEW] add html from allTagsHTML to tagList */
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

  //add Handlebars:
  const allAuthorsData = { authors: [] };
  const authorSidebar = document.querySelector(optAuthorListSelector);


  for (let article of articles) {

    let author = article.getAttribute('data-author');
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

    //const authorLinkHTML = '<li><a href="#author-' + articleAuthor + '"><span>' + articleAuthor + '</span></a></li>';

    //add handlebars:
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const authorLinkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + authorLinkHTML;
    /* add html for each author wrapper */
    authorList.innerHTML = html;
  }

  for (let author in allAuthors) {
    //const asideAuthorLinkHTML = '<li><a href="#author-' + author + '"><span>' + author + " (" + allAuthors[author] + ")" + '</span></a></li>';
    //add Handlebars:    
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
    //htmlSidebar += asideAuthorLinkHTML;
  }
  //authorSidebar.innerHTML = htmlSidebar;
  authorSidebar.innerHTML = templates.authorCloudLink(allAuthorsData);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = this;

  clickedElement.classList.add('active');
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "author" and extract author from the "href" constant */
  const author = href.replace('#author-', '');
  /* find all author links with class active */
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */
  for (let activeAuthor of activeAuthors) {

    activeAuthor.classList.remove('active');
  }

  /* find all author links with "href" attribute equal to the "href" constant */
  const authorLinks = document.querySelectorAll('a[href^="#author-' + author + '"]');

  /* START LOOP: for each found tag link */
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenerToAuthors() {

  /* find all links to authors */
  const authorLinks = document.querySelectorAll(optArticleSingleAuthorSelector + ',' + optAuthorListElem);
  /* START LOOP: for each link */
  for (let author of authorLinks) {
    /* add tagClickHandler as event listener for that link */
    author.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }
}
addClickListenerToAuthors();

