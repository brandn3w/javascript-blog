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
    const articleTagsArray = articleTags.split('');


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