# Live link- https://saddamtkg.github.io/Programing-Hero-B13-assignment-04/

## Answers to Questions

### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

**Answer:**
getElementById diye amra ekta element select kori jader id diye unique. Ekta matro element return kore. getElementsByClassName diye amra sob element ni e ashi jader same class name ache – eita ekta collection/array type jinish return kore, mane onek gulo element. querySelector diye amra CSS selector use kore first je element match korbe sheta ni e ashi – ekta element. Ar querySelectorAll diye same selector match kora sob element ni e ashi, collection hishebe. So summary te id thakle getElementById easy, class diye onek element lagle getElementsByClassName, ar jodi complex selector (like ".card .btn") lagle querySelector/querySelectorAll use kori.

---

### 2. How do you create and insert a new element into the DOM?

**Answer:**
First createElement diye notun element banai. Example: document.createElement("div"). Tarpor oi element er moddhe text or child add korte pari. Tarpor jekhane add korte chai oi parent element select kore appendChild use kori – tahole notun element ta parent er last e chole jai. Jodi kono specific position e (before another child) add korte chai tahole insertBefore use kori – parent.insertBefore(newElement, referenceElement). So create kora + parent er sathe connect kora ei dui step e amra DOM e notun element insert kori.

---

### 3. What is Event Bubbling? And how does it work?

**Answer:**
Event bubbling mane hocche jokhon amra kono element e click kori (or kono event fire hoy), sei event ta child theke parent er dike uthe jai – mane prothome child e trigger hoy, tarpor parent e, tarpor taro parent e, eivabe document porjonto. Browser by default eita e kore. Example: ekta button er moddhe click korle event ta button e fire hoy, tarpor button er parent div e, tarpor tar parent e – eivabe upore uthe jai. Tai amra parent element e ekta listener diye o child er click dhorte pari, karon event bubble hoe parent e o ashe.

---

### 4. What is Event Delegation in JavaScript? Why is it useful?

**Answer:**
Event delegation mane hocche amra listener parent element e ekta diye dei, child er event handle kori. Jokhon click hoy parent e, amra check kori je actual click kon child e hoyeche (event.target or closest use kore). Eta useful karon – onek button thakle sob button e alada listener na diye ekta parent e diye amra sob handle korte pari. Ar important kichu hocche jodi amra pore theke DOM e notun element add kori (dynamic), shegulo teo listener automatically kaaj kore karon event bubble hoe parent e ashe. So code kom lage, dynamic element o handle hoy.

---

### 5. What is the difference between preventDefault() and stopPropagation() methods?

**Answer:**
preventDefault() browser er default behavior stop kore. Example: link e click korle normally page navigate hoy – preventDefault() dile sei navigation hobe na. Form submit e o same – submit howar default ta bondho kora jai. stopPropagation() event er bubbling bondho kore – mane event ta ar upore parent/grandparent e jabe na. So preventDefault() bolche "browser er normal kaaj koro na", stopPropagation() bolche "event ar upore uthbo na, baki listener gulo run hobe na". Duita alada jinish – ekta default action, arekta event flow (bubbling).
