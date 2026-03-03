function showPage(pageId) {

document.querySelectorAll(".page")
.forEach(p => p.classList.remove("active-page"));

document.getElementById(pageId)
.classList.add("active-page");

document.querySelectorAll(".sidebar li")
.forEach(li => li.classList.remove("active"));

event.target.classList.add("active");
}