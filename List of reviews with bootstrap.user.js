// ==UserScript==
// @name         List of reviews with bootstrap
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a button to the Magnum PI pages
// @author       @julsola
// @match        https://magnumpi-na.aka.amazon.com/case-investigation*
// @grant        none
// ==/UserScript==





// The target element exists, so the page is fully loaded
// Add the Bootstrap CSS to the page
/*   var bootstrapCSS = document.createElement("link");
        bootstrapCSS.setAttribute("rel", "stylesheet");
        bootstrapCSS.setAttribute("href", "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
        document.head.appendChild(bootstrapCSS);*/

function grabOrderReviews(){
    var reviewsArray = []
    var list = document.createElement("ul");
    var reviews = document.querySelectorAll(".single-term-review")
    reviews.forEach((review,index) => {
        var pTag = review.querySelector("p").textContent;
        var listItem = document.createElement("li");
        listItem.setAttribute("class", "list-group-item list-group-item-info")
        list.style.marginTop = "20px";
        listItem.textContent =`${index + 1}."${pTag}"`
                    reviewsArray.push(`${index + 1}."${pTag}"`)
                    list.appendChild(listItem);
                    //box.appendChild(list)
                    console.log(`"${index} ${pTag}"`);});
            //console.log(reviewsArray)
            return reviewsArray; // return reviewsArray as a standalone value
        }

async function copyToCLipBoard() {
  const reviewsArray = grabOrderReviews();
  console.log(reviewsArray);
  var textToCopy = await reviewsArray.join(",\n"); // join with a comma and a newline character
  var fullText = await textToCopy; // add a newline character before the list
  await navigator.clipboard.writeText(fullText);
  await console.log("Reviews were copied to clipboard");
  return;
}

function createBTNToCopy() {
    var commentSection = document.querySelector(".add-comment")
    var existingButton = document.getElementById("copy-button");


    var copyButton = commentSection.querySelector("#copy-reviews-button") || document.createElement('button'); // Use existing button if it exists, or create a new one
    copyButton.textContent = 'Copy reviews';
    copyButton.style.marginTop = '10px';
    copyButton.id = 'copy-reviews-button';
    copyButton.style.backgroundColor = 'blue';
    copyButton.style.border = "none";
    copyButton.style.color = "white";
    copyButton.style.padding = "10px 16px";
    copyButton.style.textAlign = "center";
    copyButton.style.textDecoration = "none";
    copyButton.style.display = "block";
    copyButton.style.fontSize = "16px";
    copyButton.style.margin = "4px 2px";
    copyButton.style.cursor = "pointer";

    copyButton.addEventListener("click", () => {
        copyToCLipBoard()
    })

    if (!commentSection.contains(copyButton)) { // Only append the button if it doesn't exist in the comment section
        commentSection.appendChild(copyButton);
    }

    setTimeout(() => { // Remove the button after a delay of 5 seconds
        if (commentSection.contains(copyButton)) { // Check if the button exists before trying to remove it
            commentSection.removeChild(copyButton)
            console.log("Copy reviews button removed")()
            createBTNToCopy()
        }
    }, 100000)

    return
}





// Select the node that will be observed for mutations
const bodyNode = document.querySelector('body');

// Options for the observer (which mutations to observe)
const bodyConfig = { attributes: true };

// Callback function to execute when mutations are observed
const bodyCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {

            // The target element exists, so the page is fully loaded
            /*---------------------------------------------------------------------------------------------------------------*/

            createBTNToCopy()


        }

    }
};

// Create an observer instance linked to the callback function
const bodyObserver = new MutationObserver(bodyCallback);

// Start observing the body node for configured mutations
bodyObserver.observe(bodyNode, bodyConfig);



