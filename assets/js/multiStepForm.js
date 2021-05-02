var currentTab = 0; // Current tab is set to be the first tab (0)
var commentTextArea = document.getElementById("comment");
var formTabs = document.getElementsByClassName("tab");
var prevButton = document.getElementById("prevBtn");
var skipButton = document.getElementById("skipBtn");
var nextButton = document.getElementById("nextBtn");
var starRating = document.getElementsByName("star");
var stepTracer = document.getElementsByClassName("step");
var stepGrabber = [...document.getElementsByClassName("step")];
var proceed = false;
var inc = 0;
for (prop of stepGrabber) {
    inc++
    if (inc < stepGrabber.length) prop.addEventListener("click", onSliderClick);
}

showTab(currentTab); // Display the current tab

function showTab(activeTab) {
    // This function will display the specified tab of the form and name the Previous/Next buttons as required
    formTabs[activeTab].style.display = "block";
    nextButton.style.background = "var(--cool-grey)"

    if (activeTab == 0) {
        prevButton.style.display = "none";
        skipButton.style.display = "none";
        nextButton.style.background = "var(--slate-blue)";
        nextButton.innerHTML = "Yes";
        setSliderIndicator(activeTab);
        stepTracer[currentTab].classList.add("finish");
        return;

    } else if (activeTab == (formTabs.length - 1)) {

        nextButton.innerHTML = "Submit";
        nextButton.style.background = "var(--slate-blue)";
        //  nextButton.type = "submit";
        skipButton.style.display = "none";
        proceed = true;
        setSliderIndicator(activeTab);

        return;

    } else {
        if (activeTab == 1 && form.elements.star.value) {
            proceed = true;
            nextButton.style.background = "var(--slate-blue)";
        }
        if (activeTab == 2 && form.elements.finalDate.value) {
            proceed = true;
            nextButton.style.background = "var(--slate-blue)";
        }
        if (activeTab == 3 && document.getElementById("comment").value) {
            proceed = true;
            nextButton.style.background = "var(--slate-blue)";
        }
        if (activeTab == 4) {
            proceed = true;
            nextButton.style.background = "var(--slate-blue)";
        }
        if (activeTab == 5 && document.getElementById("videolink").value) {
            proceed = true;
            nextButton.style.background = "var(--slate-blue)";
        }
        if (activeTab == 6 && document.getElementById("name").value) {
            proceed = true;
            nextButton.style.background = "var(--slate-blue)";
        }
        if (activeTab == 7 && document.getElementById("email").value) {
            proceed = true;
            nextButton.style.background = "var(--slate-blue)";
        }

        prevButton.style.display = "inline";
        skipButton.style.display = "inline";
        nextButton.innerHTML = "Next";
        nextButton.type = "button";
    }

    setSliderIndicator(activeTab);
}

function nextPrev(advance, whichBtnPressed) {
    // This function will figure out which tab to display
    if (whichBtnPressed != "skip") {
        if (advance == 1 && !validateForm()) {
            return false; // Exit the function if any field in the current tab is invalid:
        }
        else if (advance == -1) {

        }
        proceed = false;

    }

    formTabs[currentTab].style.display = "none"; // Hide the current tab:
    currentTab = currentTab + advance; // Increase or decrease the current tab by 1:

    if (currentTab >= formTabs.length) { // if you have reached the end of the form turn the next button into a submit button.
        //   nextButton.innerHTML = "Submit";
        nextButton.type = "submit";
        //   skipButton.style.display = "none";
        finalForm();
        return;
    }

    showTab(currentTab); // Otherwise, display the correct tab:
}

function validateForm(whichForm) {


    if (currentTab == 0) return true;


    if (proceed) return true;

    if (whichForm) { //checks if invoked from oninput and current tab is not 0
        nextButton.style.background = "var(--slate-blue)";
        proceed = true;
        stepTracer[currentTab].className += " finish";

        return false;

    } else {
        proceed = false;
    }
}

function setSliderIndicator(activeSlide) {
    // This function removes the "active" class of all steps...
    for (let item of stepTracer) {
            item.className = item.className.replace(" active", "");
    }

    stepTracer[activeSlide].className += " active";
}

function onSliderClick() {
    stepGrabberIndex = stepGrabber.indexOf(this);
    formTabs[currentTab].style.display = "none";
    currentTab = stepGrabberIndex;
    showTab(stepGrabberIndex);
}


function setFormDate() {
    var monthsVar = document.getElementById("new-months");
    var yearsVar = document.getElementById("new-years");
    var monthsText = monthsVar.options[monthsVar.selectedIndex].text;
    var yearsText = yearsVar.options[yearsVar.selectedIndex].text;
    if (monthsText == "Month:") monthsText = "No Month";
    var monthYear = monthsText + " " + yearsText;

    document.getElementById("finalDate").value = monthYear;
    nextButton.style.background = "var(--slate-blue)";
    proceed = true;
    stepTracer[currentTab].classList.add("finish");
}

const form = document.getElementById('regForm');
form.addEventListener('reset', function () {
    if (formTabs[currentTab]) formTabs[currentTab].style.display = "none";
    Array.from(stepTracer).forEach(function (element) {
        element.className = "step"
    });
    currentTab = 0;
    setSliderIndicator(currentTab);
    showTab(currentTab); // Display the current tab
});

function finalForm() {
    var formFilled = form.elements;
    var contributorName = formFilled.namedItem("name").value;
    var contributorEmail = formFilled.namedItem("email").value;

    if (!contributorName) document.getElementById("name").value = "unnamed";
    if (!contributorEmail) document.getElementById("email").value = "anonymous@noemail.com";

}