let jobCardsArray = [];

let currentTab = 'all';

function storeCardsInArray() {
  const container = document.querySelector('.job-cards-container');
  if (!container) {
    jobCardsArray = [];
    return;
  }
  const articles = container.querySelectorAll('article');
  jobCardsArray = [];
  for (let i = 0; i < articles.length; i++) {
    jobCardsArray.push(articles[i]);
  }
  return jobCardsArray;
}
