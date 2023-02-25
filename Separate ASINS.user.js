// ==UserScript==
// @name         Separate ASINS
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Add a button to the Magnum PI pages
// @author       @julsola
// @match        https://magnumpi-na.aka.amazon.com/case-investigation*
// @grant        none
// ==/UserScript==
var intervalId = setInterval(function() {
    // Check if the target element exists in the DOM

    if (document.querySelector(".detail-grid")) {
        // The target element exists, so the page is fully loaded

        // Clear the interval
        clearInterval(intervalId);




        var box = document.querySelector(".detail-grid")

        //Create a div to contain this tool
        var myDiv = document.createElement("div");
        myDiv.style.marginTop = "20px";
        box.appendChild(myDiv)

        //Create a small title for this tool
        var pTitle = document.createElement("p")
        pTitle.textContent = "ASINs separator"
        pTitle.style.fontWeight = "bold"
        myDiv.appendChild(pTitle)



        var textAreaForAsins = document.createElement("textarea")
        // Set the width and height of the textarea using the style property
        textAreaForAsins.style.width = "150px";
        textAreaForAsins.style.height = "200px";
        textAreaForAsins.style.resize = "none";
        textAreaForAsins.placeholder = "Enter Asins"



        var textAreaForOutput = document.createElement("textarea")
        // Set the width and height of the textarea using the style property
        textAreaForOutput.style.width = "150px";
        textAreaForOutput.style.height = "200px";
        textAreaForOutput.placeholder = "Here you will see the output"
        textAreaForOutput.style.resize = "none";
        textAreaForOutput.readOnly = true;

        // Set the display and margin properties for both textareas
        textAreaForAsins.style.display = "block";
        textAreaForAsins.style.marginBottom = "10px";
        textAreaForOutput.style.display = "block";

        var button = document.createElement("button");
        button.innerHTML = ">>>>"; // Set the text for the button
        button.style.backgroundColor = "blue";
        button.style.color = "white";
        button.style.border = "none";
        button.style.padding = "10px";
        button.style.marginLeft = "10px";
        button.style.marginBottom = "10px";
        button.style.display = "inline-block"; // Display the button next to the textarea


         myDiv.appendChild(textAreaForAsins)
         myDiv.appendChild(button)
        myDiv.appendChild(textAreaForOutput)

        //Event listener for button. This separate every ASIN in textAreaForAsins
        button.addEventListener('click', () => {
            var values = textAreaForAsins.value.trim().split('\n').map(value => value.trim());
            var result = values.join(', ');
            textAreaForOutput.textContent = result;
        });

}

}, 100);