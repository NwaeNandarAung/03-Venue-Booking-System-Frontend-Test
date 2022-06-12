$(document).ready(function () {
    //tabs
    let tabHeader = document.getElementsByClassName("tab-header")[0];
    let tabIndicator = document.getElementsByClassName("tab-indicator")[0];
    let tabBody = document.getElementsByClassName("tab-body")[0];
    let tabsPane = tabHeader.getElementsByTagName("div");

    //loop data of tabsPane
    for (let i = 0; i < tabsPane.length; i++) {
        //onclick tabsPane
        tabsPane[i].addEventListener("click", function () {
            //remove active class of active tab header
            tabHeader.getElementsByClassName("active")[0].classList.remove("active");
            //add active class to currently click tabsPane
            tabsPane[i].classList.add("active");
            //remove active class of active tab body
            tabBody.getElementsByClassName("active")[0].classList.remove("active");
            //add active class to div of currently clicked tabBody
            tabBody.getElementsByTagName("div")[i].classList.add("active");
            //stying tabIndicator to be consistence with tabHeader
            tabIndicator.style.left = `calc(calc(100% / 5) * ${i})`;
        });
    }
})