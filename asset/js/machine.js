let jobCardsArray = [];

let currentTab = 'all';

// ========== HTML থেকে সব কার্ড নিয়ে array তে রাখা ==========

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

// ========== কার্ডের status অনুযায়ী count বের করা ==========

function getconutByStatus() {
  let pendingCount = 0;
  let interviewCount = 0;
  let rejectedCount = 0;

  for (let i = 0; i < jobCardsArray.length; i++) {
    const status = jobCardsArray[i].getAttribute('data-status');
    if (status === 'pending') {
      pendingCount = pendingCount + 1;
    } else if (status === 'interview') {
      interviewCount = interviewCount + 1;
    } else if (status === 'rejected') {
      rejectedCount = rejectedCount + 1;
    }
  }
  return {
    pending: pendingCount,
    interview: interviewCount,
    rejected: rejectedCount,
  };
}

// ========== ড্যাশবোয়ার্ডের তিনটা সংখ্যা + ডান পাশের jobs count আপডেট করা ==========
function updateDashboardCounts() {
  storeCardsInArray();
  const counts = getconutByStatus();

  const pendingEl = document.getElementById('dashboard-pending');
  const interviewEl = document.getElementById('dashboard-interview');
  const rejectedEl = document.getElementById('dashboard-rejected');
  const totalJobsEl = document.getElementById('jobs-count');

  if (pendingEl) {
    pendingEl.textContent = jobCardsArray.length;
  }
  if (interviewEl) {
    interviewEl.textContent = counts.interviewCount;
  }
  if (rejectedEl) {
    rejectedEl.textContent = counts.rejectedCount;
  }
  if (jobsCountEl) {
    if (currentTab === 'all') {
      jobsCountEl.textContent = jobCardsArray.length + ' Jobs';
    } else if (currentTab === 'interview') {
      jobsCountEl.textContent = counts.interviewCount + ' Jobs';
    } else {
      jobsCountEl.textContent = counts.rejectedCount + ' Jobs';
    }
  }
}
