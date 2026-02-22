function themeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  themeToggleBtn.addEventListener('click', function () {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
    themeIcon.classList.toggle('fa-moon', currentTheme === 'dark');
    themeIcon.classList.toggle('fa-sun', currentTheme === 'light');
  });
}

let jobCardsArray = [];

let currentTab = 'all';

// ========== HTML থেকে সব কার্ড নিয়ে array তে রাখা ==========

function storeCardsInArray() {
  const container = document.getElementById('jobs-card-container');
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

function getcountByStatus() {
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
  return { pendingCount, interviewCount, rejectedCount };
}

// ========== ড্যাশবোয়ার্ডের তিনটা সংখ্যা + ডান পাশের jobs count আপডেট করা ==========
function updateDashboardCounts() {
  storeCardsInArray();
  const counts = getcountByStatus();

  const pendingEl = document.getElementById('dashboard-pending');
  const interviewEl = document.getElementById('dashboard-interview');
  const rejectedEl = document.getElementById('dashboard-rejected');
  const jobsCountEl = document.getElementById('jobs-count');

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

function applyTabFilter() {
  const container = document.getElementById('jobs-card-container');
  const emptyState = document.getElementById('jobs-empty-state');
  if (!container) return;
  let visibleCount = 0;

  for (let i = 0; i < jobCardsArray.length; i++) {
    const card = jobCardsArray[i];
    const status = card.getAttribute('data-status');
    const shouldShow = currentTab === 'all' || status === currentTab;

    if (shouldShow) {
      card.classList.remove('hidden');
      visibleCount = visibleCount + 1;
    } else {
      card.classList.add('hidden');
    }
  }
  if (visibleCount === 0 && currentTab !== 'all') {
    container.classList.add('hidden');
    if (emptyState) {
      emptyState.classList.remove('hidden');
    }
  } else {
    container.classList.remove('hidden');
    if (emptyState) {
      emptyState.classList.add('hidden');
    }
  }

  const tabAll = document.getElementById('tab-all');
  const tabInterview = document.getElementById('tab-interview');
  const tabRejected = document.getElementById('tab-rejected');

  if (tabAll) {
    tabAll.classList.remove('btn-primary', 'btn-ghost');
    tabAll.classList.add(currentTab === 'all' ? 'btn-primary' : 'btn-ghost');
  }

  if (tabInterview) {
    tabInterview.classList.remove('btn-primary', 'btn-ghost');
    tabInterview.classList.add(
      currentTab === 'interview' ? 'btn-primary' : 'btn-ghost',
    );
  }

  if (tabRejected) {
    tabRejected.classList.remove('btn-primary', 'btn-ghost');
    tabRejected.classList.add(
      currentTab === 'rejected' ? 'btn-primary' : 'btn-ghost',
    );
  }
}

function switchTab(tabName) {
  currentTab = tabName;
  applyTabFilter();
  updateDashboardCounts();
}

function updateCardBadge(card, status) {
  const badge = card.querySelector('.badge');
  if (!badge) return;
  badge.classList.remove(
    'bg-green-500',
    'bg-gray-500',
    'bg-red-500',
    'text-white',
  );
  if (status === 'interview') {
    badge.textContent = 'INTERVIEW';
    badge.classList.add('bg-green-500', 'text-white');
  } else if (status === 'rejected') {
    badge.textContent = 'REJECTED';
    badge.classList.add('bg-red-500', 'text-white');
  } else {
    badge.textContent = 'NOT APPLIED';
  }
}

function setupInterviewRejectedButtons() {
  const container = document.getElementById('jobs-card-container');
  if (!container) return;

  container.addEventListener('click', function (e) {
    const interviewBtn = e.target.closest('.btn-interview');
    if (interviewBtn) {
      const card = interviewBtn.closest('article');
      if (card) {
        card.setAttribute('data-status', 'interview');
        updateCardBadge(card, 'interview');
        applyTabFilter();
        updateDashboardCounts();
      }
      return;
    }
    const rejectedBtn = e.target.closest('.btn-rejected');
    if (rejectedBtn) {
      const card = rejectedBtn.closest('article');
      if (card) {
        card.setAttribute('data-status', 'rejected');
        updateCardBadge(card, 'rejected');
        applyTabFilter();
        updateDashboardCounts();
      }
    }
  });
}

// ========== Delete বাটন: কার্ড DOM থেকে সরানো + array ও count আপডেট ==========
function setupDeleteButtons() {
  const container = document.getElementById('jobs-card-container');
  if (!container) return;
  container.addEventListener('click', function (e) {
    const deleteBtn = e.target.closest('.btn-delete-job');
    if (!deleteBtn) return;
    const card = deleteBtn.closest('article');
    if (card) {
      card.remove();
      storeCardsInArray();
      updateDashboardCounts();
      applyTabFilter();
    }
  });
}
