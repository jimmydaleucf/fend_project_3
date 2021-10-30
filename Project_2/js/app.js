/** Define Global Variables */
/**creates an object that contains all the sections */
const sections = document.querySelectorAll("section");

/**creates a object that is the empty "ul" element */
const list = document.getElementById("navbar__list");

const navBar = document.querySelector(".page__header");

/**
 * End Global Variables
 
* Start Helper Functions
 * 
*/
/** need to set timeout to hide nav after initial load.  */
function hideNav() {
  navBar.classList.add("hidden");
}

function showNav(){
  clearTimeout(navTimer);
}

const navTimer = setTimeout(function () {hideNav();}, 5000);

/**
 * End Helper Functions
 */

/* Begin Main Functions
 *
 */

/** This function adds "active-class" to the section in the viewport and also adds "active" as a class to the nav item */
function makeActive() {
  navBar.classList.remove("hidden")
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    let id = section.getAttribute("id");
    if (box.top <= 300 && box.bottom >= 400) {
      section.className = "active-class";
      document.querySelector(`.${id}`).classList.add("active");
    } else {
      let id = section.getAttribute("id");
      document.querySelector(`.${id}`).classList.remove("active");
      section.className = "boring";
    }
  }
}

// build the nav
for (section of sections) {
  /**Creates new nav item "li"*/
  const newElement = document.createElement("li");
  // newElement.addEventListener("click", function changeClass(evt) {evt.target.classList.toggle("active-class");});
  newElement.classList.add(section.id);
  /**creates new anchor tag*/
  const newAnchor = document.createElement("a");
  /**creates variable "sectionname" and assigns it the value from the "data-nav element" */
  let sectionName = section.dataset.nav;
  /**creates id for the new nav item */
  let navName = section.id + "nav";
  newAnchor.setAttribute("href", "index.html#" + section.id);
  newAnchor.innerText = sectionName;
  newElement.setAttribute("id", navName);
  newElement.appendChild(newAnchor);
  list.appendChild(newElement);
}
/**creates an object with all the nav items in it */
const navItems = document.getElementById("navbar__list").querySelectorAll("li");

// Add class 'active' to section when near top of viewport



// listen for scroll and then check element position and show the nav. reset timer until next scroll. 
document.addEventListener("scroll", function () {
  makeActive();
  showNav();
  setTimeout(function () {
    hideNav();
  }, 5000);;
});
