# Job Application Tracker – Assignment Roadmap (Mentor Guide)

Design দেখে এবং README requirements মিলিয়ে এই রোডম্যাপ অনুসরণ করলে part by part assignment সম্পন্ন করতে পারবেন। **কোনো কোড এখানে দেওয়া হবে না** – শুধু কী করতে হবে এবং কীভাবে ভাবতে হবে সেটা hints আকারে দেওয়া হয়েছে।

---

## কার্ডটা সহজে কিভাবে ভাববেন (Step-by-Step)

একটা জব কার্ড = **একটা বাক্স**, যার ভেতরে **ওপর থেকে নিচে** এই অংশগুলো আছে:

| ক্রম | অংশ | HTML এ কী রাখবেন | এক নজরে |
|-----|-----|-------------------|----------|
| ১ | **কার্ডের বাইরের বক্স** | একটা `div` (card, shadow, rounded) | পুরো কার্ডটা যাতে আলাদা দেখায় |
| ২ | **ওপরের লাইন** | বামে: লোগো/আইকন, মাঝে: কোম্পানি নাম + পজিশন, ডানে: ডিলিট বাটন | ফ্লেক্স দিয়ে বাম–মাঝ–ডান সাজাবেন |
| ৩ | **বিস্তারিত এক লাইন** | location • type • salary (ডট দিয়ে আলাদা) | ছোট টেক্সট, একই লাইনে |
| ৪ | **স্ট্যাটাস ট্যাগ** | যেমন "NOT APPLIED" / "INTERVIEW" / "REJECTED" | ছোট বেজ/ব্যাজ – রঙ স্ট্যাটাস অনুযায়ী বদলাবে (JS) |
| ৫ | **বিবরণ** | job এর short description | একটু ছোট প্যারাগ্রাফ |
| ৬ | **দুই বাটন** | INTERVIEW (সবুজ আউটলাইন), REJECTED (লাল আউটলাইন) | পাশাপাশি, একই সারিতে |

**কাজের ধারা:**  
প্রথমে HTML এ একটা কার্ডের structure বানান (নমুনা হিসেবে)। পরে JS এ একটা function থাকবে যেটা **একটা job object** নিয়ে **এই structure টারই copy** বানাবে এবং ভেতরের টেক্সট/আইডি replace করবে। তাই HTML এর একটা কার্ড দেখেই আপনি বুঝতে পারবেন JS এ কোন কোন জায়গায় `companyName`, `position`, `salary` ইত্যাদি বসাতে হবে।

---

## machine.js – কমন ফাংশন এক জায়গায় রাখার ধারণা

**কেন machine.js?**  
একই কাজ (যেমন: count আপডেট, কার্ড রেন্ডার, status বদল) অনেক জায়গায় লাগবে। প্রতিবার একই কোড লিখলে ভুল হওয়া সহজ, আপডেট করতেও কষ্ট। তাই **সব common কাজ এক একটা function** বানিয়ে একটা ফাইলে (যেমন `machine.js`) রাখবেন। অন্য জায়গা থেকে শুধু ওই function গুলো **call** করবেন।

**কী কী function রাখতে পারেন (শুধু ধারণা, নাম আপনি ঠিক করবেন):**

| কাজ | function এর ভাবনা | কোথায় কোথায় call করবেন |
|-----|---------------------|----------------------------|
| ডেটা থেকে count বের করা | বর্তমান job array নিয়ে Total, Interview, Rejected count হিসাব করে return বা সরাসরি DOM আপডেট | পেজ লোড, status বদল, delete – যেকোনো পরিবর্তনের পর |
| ড্যাশবোয়ার্ডে সংখ্যা দেখানো | উপরের count ব্যবহার করে ড্যাশবোয়ার্ডের তিনটা সংখ্যা DOM এ লিখে দেওয়া | count বের করার পরেই, অথবা একটা function এর ভেতরেই |
| বর্তমান ট্যাব অনুযায়ী job list | "all" / "interview" / "rejected" নিয়ে job array ফিল্টার করে যে array পাবেন সেটা return | ট্যাব ক্লিক করলে + কার্ড রেন্ডার করার আগে |
| একটার পর একটা কার্ড বানিয়ে DOM এ যোগ করা | filtered job array নিয়ে লুপ চালিয়ে প্রতিটি job এর জন্য একটা কার্ডের HTML বানিয়ে container এ append | ট্যাব বদলালে, status বদলালে, delete করলে – যেকোনো সময় লিস্ট আপডেট দরকার হলে |
| একটা job এর status বদলানো | job id + নতুন status নিয়ে array তে সেই job খুঁজে status আপডেট, তারপর count + কার্ড আবার রেন্ডার করার function দুইটা call | Interview/Rejected বাটন ক্লিক করলে |
| একটা job ডিলিট করা | job id নিয়ে array থেকে বাদ দিয়ে নতুন array রাখা, তারপর count + কার্ড রেন্ডার আবার call | ডিলিট বাটন ক্লিক করলে |

**কিভাবে লিখবেন:**  
- `machine.js` এ শুধু **function definitions** (যেমন `function updateDashboardCount() { ... }`)।  
- পেজ লোড হলে বা বাটন ক্লিক হলে যে script টা চলবে (যেমন `index.html` এর নিচে একটা inline script বা আলাদা `app.js`), সেখানে আপনি **ওই function গুলো call** করবেন।  
- চাইলে একটা function এর ভেতর থেকে আরেকটা function call করতে পারেন (যেমন: status বদলানোর function ভেতর থেকে count আপডেট + কার্ড রেন্ডার call করবে)।

এভাবে common কাজগুলো এক জায়গায় থাকলে বারবার একই কোড লিখতে হবে না, এবং একটা জায়গায় ঠিক করলেই সব জায়গায় ঠিক হয়ে যাবে।

---

## JavaScript – কী কী করবেন (সংক্ষিপ্ত হিন্টস)

- **ডেটা রাখা:** একটা global array (বা machine.js এ) যেখানে সব job object। প্রতিটাতে `id`, `companyName`, `position`, `location`, `type`, `salary`, `description`, `status`।
- **পেজ লোড:** DOM ready হলে একবার ড্যাশবোয়ার্ড count আপডেট করুন, ট্যাব "all" ধরে কার্ড লিস্ট রেন্ডার করুন।
- **ট্যাব ক্লিক:** কোন ট্যাব ক্লিক হয়েছে সেটা একটা variable এ রাখুন, active ট্যাবের class আপডেট করুন, filtered list নিয়ে কার্ড রেন্ডার করুন; list খালি হলে empty state দেখান।
- **Interview/Rejected বাটন:** event delegation – কার্ড container এ এক listener, `event.target` দিয়ে চেক করুন কোন বাটন; বাটন থেকে `data-job-id` নিয়ে সেই job এর status আপডেট করুন, তারপর machine.js এর count + render function call করুন。
- **ডিলিট বাটন:** একইভাবে event delegation, job id নিয়ে array থেকে বাদ দিন, তারপর count + render call করুন।
- **কার্ড রেন্ডার:** container খালি করুন, filtered array এর উপর লুপ চালিয়ে প্রতিটি job এর জন্য একটা কার্ড তৈরি করে container এ append করুন; বাটন/ডিলিট এ `data-job-id` বা data attribute দিয়ে id পাস করুন।

---

## Design থেকে যা বোঝা যায়

- **ডার্ক থিম** – background গাঢ়, টেক্সট সাদা/হালকা।
- **ড্যাশবোয়ার্ড** – ওপরে "Job Application Tracker" টাইটেল, তার নিচে তিনটি মেট্রিক: **Pending / Interview / Rejected** (প্রতিটিতে count)।
- **Available Jobs সেকশন** – বামে টাইটেল, ডানে jobs count। নিচে তিনটি ট্যাব: **All**, **Interview**, **Rejected**।
- **জব কার্ড** – company name, position, location, type, date, status tag, ছোট description, **Interview** ও **Rejected** বাটন, এবং bookmark/আইকন।
- **Empty state** – Interview/Rejected ট্যাবে job না থাকলে: আইকন + "No jobs available" + সাবটাইটেল ("Check back soon..." ইত্যাদি)।

README অনুযায়ী আপনার design এ থাকতে হবে: **companyName, position, location, type, salary, description** এবং **Interview, Rejected** বাটন। Design টা figma/reference অনুযায়ী responsive করতে হবে।

---

# Part-by-Part Roadmap

---

## Part 1: HTML Structure (প্রথমে Layout ঠিক করুন)

### কী করতে হবে
- পুরো পেজের জন্য semantic HTML ব্যবহার করুন: `header`, `main`, `section` ইত্যাদি।
- **Dashboard section**: ওয়েবসাইটের নাম + তিনটি বক্স/কার্ড – Total (বা Pending), Interview count, Rejected count।
- **Available Jobs section**: বামে "Available Jobs" টাইটেল, ডানে jobs count দেখানোর জায়গা (যেমন "8 jobs")।
- টাইটেলের নিচে তিনটি ট্যাব বাটন: All, Interview, Rejected।
- জব কার্ডগুলোর জন্য একটা container (যেখানে JavaScript দিয়ে কার্ড inject করবেন)। প্রতিটি কার্ডের জন্য প্রয়োজন: company name, position, location, type, salary, description, Interview বাটন, Rejected বাটন।
- Empty state এর জন্য একটা আলাদা block: উপরে আইকন/ইমেজ, "No jobs available", নিচে একটা subtitle। শুরুতে এটা শুধু Interview ও Rejected ট্যাবের জন্য ব্যবহার করবেন – All ট্যাবে তো job থাকবেই।

### Hints
- ট্যাবগুলোকে `button` বা `a` দিয়ে বানান; একটা class দিয়ে "active" ট্যাব চিহ্নিত করতে পারবেন।
- কার্ড container এ একটা ID দিন যাতে JS থেকে `getElementById` বা `querySelector` দিয়ে target করতে পারেন。
- Empty state এবং job list দুটোই একই জায়গায় থাকতে পারে – একটা দেখাবেন, অন্যটা লুকিয়ে রাখবেন (CSS/JS দিয়ে)।

---

## Part 2: Job Data (ডেটা কোথায় রাখবেন)

### কী করতে হবে
- কমপক্ষে **৮টি job** এর তথ্য রাখতে হবে। প্রতিটিতে: companyName, position, location, type, salary, description। পরে status (যেমন: "pending", "interview", "rejected") ও যোগ করবেন।
- এই ডেটা একটা JavaScript array/object এ রাখুন (কোনো একটা `.js` ফাইলে)। লorem ipsum ব্যবহার করবেন না – ছোটখাটো কিন্তু অর্থপূর্ণ টেক্সট লিখুন।

### Hints
- Array of objects সবচেয়ে সুবিধাজনক: `[{ companyName: "...", position: "...", ... }, ...]`।
- প্রতিটি job object এ একটা `status` বা `id` রাখলে পরে Interview/Rejected toggle এবং delete করতে সুবিধা হবে।
- শুরুতে সব job এর status "pending" বা "not applied" ধরতে পারেন।

---

## Part 3: Dashboard Count (সংখ্যা আপডেট)

### কী করতে হবে
- ড্যাশবোয়ার্ডে তিনটি সংখ্যা: Total (মোট job), Interview এ যেগুলো আছে, Rejected এ যেগুলো আছে।
- পেজ লোড হলে এই সংখ্যাগুলো ডেটা অনুযায়ী সঠিকভাবে দেখাতে হবে।
- Interview বাটন ক্লিক করলে Interview count বাড়বে, Rejected বাটন ক্লিক করলে Rejected count বাড়বে; টগল করলে count কমবেশি হবে। Delete করলে সংশ্লিষ্ট count ও কমবে।

### Hints
- একটা function বানান যেটা সব সময় current ডেটা/state ধরে Total, Interview, Rejected count বের করে এবং DOM এ সেই সংখ্যাগুলো আপডেট করে।
- যেখানেই job এর status পরিবর্তন হবে বা job delete হবে, সেখানেই এই function টা call করুন।
- DOM এ count দেখানোর জন্য আলাদা element (span/div) রাখুন এবং `textContent` বা `innerText` দিয়ে value সেট করুন।

---

## Part 4: ট্যাব (All / Interview / Rejected)

### কী করতে হবে
- **All**: সব job (যেকোনো status) দেখাবে।
- **Interview**: শুধু যেগুলোর status "interview"।
- **Rejected**: শুধু যেগুলোর status "rejected"।
- Interview বা Rejected ট্যাবে কোনো job না থাকলে **empty state** দেখাবেন (আইকন + "No jobs available" + subtitle)। All ট্যাবে কমপক্ষে ৮টা job থাকবে তাই সেখানে empty state দরকার নাও হতে পারে (requirement অনুযায়ী)।
- ট্যাব ক্লিক করলে active ট্যাবের styling বদলাবে এবং ওই ট্যাব অনুযায়ী কার্ড লিস্ট আপডেট হবে।
- Available Jobs সেকশনের ডান পাশে **ট্যাব অনুযায়ী** jobs count দেখাতে হবে (যেমন "0 jobs" যখন Interview এ কিছু নেই)।

### Hints
- একটা variable রাখুন যেটা বলবে এখন কোন ট্যাব selected (যেমন: "all", "interview", "rejected")।
- কার্ড render করার সময় আগে current ট্যাব অনুযায়ী filter করুন: শুধু সেই status এর job গুলো নিন, তারপর DOM এ শুধু সেগুলো দেখান।
- Empty state দেখানোর condition: filtered list এর length 0 কিনা। 0 হলে empty state দেখান, নয়তো কার্ড লিস্ট।

---

## Part 5: Interview ও Rejected বাটন (Status পরিবর্তন)

### কী করতে হবে
- কার্ডে **Interview** বাটন ক্লিক করলে: ওই job এর status "interview" করুন, job টা Interview ট্যাবে যাবে, ড্যাশবোয়ার্ডের Interview count বাড়বে।
- **Rejected** বাটন ক্লিক করলে: ওই job এর status "rejected" করুন, Rejected ট্যাবে যাবে, Rejected count বাড়বে।
- **Toggle**: একবার Interview দিলে পরে আবার Rejected সিলেক্ট করা যাবে, এবং উলটোটাও। টগল করলে status বদলাবে, ট্যাব ও ড্যাশবোয়ার্ড count দুটোই আপডেট হবে।

### Hints
- প্রতিটি job এর একটা unique identifier (id) রাখুন। বাটন ক্লিক করলে আপনি যেন বোঝতে পারেন কোন job – `data-*` attribute বা id জড়িত করে।
- ক্লিক হ্যান্ডলারে: job খুঁজে বের করুন, তার status আপডেট করুন, তারপর (১) ড্যাশবোয়ার্ড count আপডেট করার function call করুন, (২) কার্ড লিস্ট আবার render করুন যাতে বর্তমান ট্যাব অনুযায়ী সঠিক লিস্ট দেখায়।
- Event listener কার্ডের উপরে একবার লাগিয়ে event delegation ব্যবহার করলে অনেক বাটনের জন্য আলাদা listener লাগবে না – একটাই container এ দিয়ে `event.target` দিয়ে চেক করবেন কোন বাটন ক্লিক হয়েছে।

---

## Part 6: কার্ড রেন্ডার করা (DOM এ দেখানো)

### কী করতে হবে
- Job ডেটা থেকে HTML কার্ড জেনারেট করে DOM এ যোগ করবেন। একটা function বানান: input = job array (বা filtered array), output = DOM এ সেই কার্ডগুলো দেখানো।
- ট্যাব বদলালে বা status বদলালে এই function আবার call করলে লিস্ট আপডেট হয়ে যাবে।

### Hints
- `createElement` এবং `appendChild` অথবা `innerHTML` (সাবধানে use করুন) দিয়ে একটা কার্ডের HTML বানান।
- প্রতিটি বাটনে job এর id বা কোনো চিহ্ন রাখুন যাতে ক্লিক করলে JS জানতে পারে কোন job (যেমন `data-job-id="1"`)।
- আগে container খালি করুন (innerHTML = "" বা remove child দিয়ে), তারপর loop চালিয়ে প্রতিটি job এর জন্য একটা কার্ড তৈরি করে container এ append করুন।

---

## Part 7: Delete বাটন (Challenge)

### কী করতে হবে
- প্রতিটি কার্ডে delete বাটন যোগ করুন। ক্লিক করলে ওই job ডেটা থেকে সরিয়ে দেবেন এবং UI থেকে কার্ড মুছে যাবে।
- ড্যাশবোয়ার্ডের Total এবং (যদি ওই job টা Interview বা Rejected এ থাকত) Interview/Rejected count কমিয়ে আপডেট করুন।
- Available Jobs সেকশনের ডান পাশের jobs count ও কমে যাবে।

### Hints
- ডেটা array থেকে item remove করুন (যেমন `filter` দিয়ে ওই id বাদ দিয়ে নতুন array নিন)।
- তারপর ড্যাশবোয়ার্ড আপডেট function + কার্ড রেন্ডার function আবার call করলেই UI সঠিক থাকবে।
- Delete বাটনেও event delegation ব্যবহার করলে সহজ – container এ listener, তারপর `event.target` দিয়ে চেক করুন delete বাটন ক্লিক হয়েছে কিনা।

---

## Part 8: Responsive Design

### কী করতে হবে
- ড্যাশবোয়ার্ড ও Available Jobs সেকশন মোবাইল ও ট্যাবলেটে ভালো দেখাতে হবে। Figma/design অনুযায়ী breakpoint নিন।

### Hints
- Tailwind/DaisyUI ব্যবহার করলে `md:`, `lg:` দিয়ে layout ও font size adjust করতে পারবেন।
- কার্ডগুলোকে grid বা flex দিয়ে রাখুন; মোবাইলে এক কলাম, বড় স্ক্রিনে একাধিক কলাম।
- ট্যাবগুলো মোবাইলে ছোট ফন্ট বা stack হতে পারে – design অনুযায়ী সিদ্ধান্ত নিন।

---

## Part 9: README এবং Commit

### কী করতে হবে
- Meaningful commit করুন (কমপক্ষে ৮টি): যেমন "Add HTML structure", "Add job data", "Add dashboard count", "Implement tabs", "Add Interview/Rejected buttons", "Toggle status", "Add delete", "Responsive and README"।
- README তে প্রশ্নগুলোর উত্তর **নিজের ভাষায়** লিখুন। Google/AI থেকে copy-paste করবেন না।

### README প্রশ্নগুলোর জন্য Concept Hints (উত্তর নয়, শুধু ভাবনা)

1. **getElementById vs getElementsByClassName vs querySelector/querySelectorAll**  
   ভাবুন: কোনটা একটা element দেয়, কোনটা list, কোনটা CSS selector দিয়ে এক বা একাধিক element নিতে পারা যায়।

2. **Create and insert new element**  
   ভাবুন: `createElement`, `createTextNode`, তারপর `appendChild` / `insertBefore` কোথায় ব্যবহার হয়।

3. **Event Bubbling**  
   ভাবুন: ক্লিক করলে event কেমন করে child থেকে parent দিকে উঠে যায়। একটা nested element এ ক্লিক করলে কী কী element এ event টা যায়।

4. **Event Delegation**  
   ভাবুন: অনেকগুলো বাটনের বদলে একটা parent এ listener দিলে কী সুবিধা। Dynamic element (পরে যোগ করা) এর জন্যই কেন উপকারী।

5. **preventDefault vs stopPropagation**  
   ভাবুন: একটা হলো browser এর default কাজ বন্ধ করা (যেমন link এ ক্লিক), অন্যটা হলো event কে উপরের দিকে যেতে না দেওয়া (bubbling বন্ধ)।

---

## সংক্ষিপ্ত ক্রম (Order of Work)

1. HTML structure + basic CSS/Tailwind  
2. Job data array (৮টা job, meaningful text)  
3. একটা JS file এ: ডেটা লোড, ড্যাশবোয়ার্ড count calculation + DOM আপডেট  
4. কার্ড render function + All ট্যাবে সব কার্ড দেখানো  
5. ট্যাব ক্লিক → active ট্যাব + filtered list + empty state  
6. Interview / Rejected বাটন → status আপডেট, count ও ট্যাব আপডেট  
7. টগল (Interview ↔ Rejected)  
8. Delete বাটন + count ও লিস্ট আপডেট  
9. Responsive + README প্রশ্নের উত্তর + commit  

---

যেকোনো part এ আটকে গেলে আগের part গুলো ঠিকমতো হয়েছে কিনা চেক করুন; বেশির ভাগ সমস্যা হয় ডেটা/state এক জায়গায় রাখা আর সেটা একটু function দিয়ে আপডেট করা। ধৈর্য ধরে একটার পর একটা part করুন – সফলতা নিশ্চিত।  

**কোনো part এ নির্দিষ্ট step এ আটকে গেলে বলুন, সেই step এর জন্য আরও ছোট ছোট hint দিতে পারব (কোড না দিয়ে)।**
