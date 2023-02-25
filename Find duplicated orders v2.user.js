// ==UserScript==
// @name         Find duplicated orders v2
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This scrip aims to detec duplicated orders in MagnumPi cases for PSI. Please, try always to double check if duplciated cases are being detected properly as I am testing this tool yet.
// @author       @julsola
// @match        https://magnumpi-na.aka.amazon.com/case-investigation*
// @grant        none
// ==/UserScript==

/* -------------------------------------------------------------------------
The script does the following:

Defines a storeDuplicatedOrders function that does the following:

 Creates an empty array to store order IDs.
 Creates an empty set to keep track of the order IDs we've already seen.
 Creates an empty array to keep duplicates for the copy to clipboard logic.
 Selects all order IDs in the DOM.
 For each order ID, extract the ID number and add it to the ordersArr array.
 If the ID is already in the seenIds set, add the duplicate class to the order ID's span element, and add the ID to the duplicates array.
 If the ID is not already in the seenIds set, add it to the seenIds set.

Defines a checkDuplicated function that does the following:
 Selects the detail grid element in the DOM.
 Creates a div element to hold the duplicated message and assigns a class to it.
 Selects or creates a message element and assigns a class to it.
 Calls the storeDuplicatedOrders function and retrieves the ordersArr, seenIds, and duplicates.
 Checks if there are any duplicates.
 If there are duplicates, sets the message to display the number of duplicated cases and sets the message color to red.
 If there are no duplicates, sets the message to display that there are no duplicates and sets the message color to green.
 Appends the message to the message div and the message div to the detail grid.
 Schedules a timeout function to remove the message div after 8 seconds.

Defines an async function called copyToCLipBoard that does the following:
 Calls the storeDuplicatedOrders function and retrieves the duplicates array.
 Joins the duplicates array into a string.
 Creates a full text string with the message "Duplicated orders: " and the joined duplicates array.
 Writes the full text string to the clipboard using the browser's navigator.clipboard.writeText() API.
 Logs a message to the console that the duplicated orders were copied to the clipboard.

Defines a createBTNToCopy function that does the following:
 Selects the add-comment section in the DOM.
 Selects or creates a copy button and assigns an ID to it.
 Sets the text and styling of the button.
 Schedules an event listener for the button's click event that calls the copyToClipboard function.

*/


(function() {
    'use strict';

    function storeDuplicatedOrders(){
        const ordersArr = []; // Store all the order IDs
        const seenIds = new Set(); // Keep track of the order IDs we've already seen
        const duplicates = []; // Keep duplicates for copy to clipboard logic



        var orderIdSpans = document.querySelectorAll(".orderId"); //Select order IDs by class
        orderIdSpans.forEach(span => {
            var orderId = span.textContent.split("#")[1]; //Create a list with the element of orderId and split to obtain two elements in this list. Se decond element [1] is the whole order ID
            ordersArr.push(orderId) //Push orders to Array ordersArr
            //console.log(`Order ID: "${orderId}"`) // Just a test in the console

            /*
            The seenIds set is used to keep track of the order IDs that have been seen so far. For each span element that contains an order ID, the orderId is extracted and checked if it has already been added to the seenIds set.

            If the orderId is already in the seenIds set, then it is a duplicate order ID and the span element is given the CSS class duplicate, which will highlight it on the page.

             The duplicates array is also used to keep track of the duplicate order IDs.

            If the orderId is not in the seenIds set, then it is added to the seenIds set. This ensures that the next time the same orderId is encountered, it will be identified as a duplicate.

            */

            if (seenIds.has(orderId)) {
                if (span.classList) {
                    span.classList.add('duplicate'); // Add the duplicate class to the span
                }
                duplicates.push(orderId)
            } else {

                seenIds.add(orderId);
            }
        });

        return {ordersArr, seenIds, duplicates}
    }

    function checkDuplicated(){
        var box = document.querySelector(".detail-grid")
        var messageDiv = box.querySelector(".duplicated-message-div") || document.createElement("div") // Use existing div if it exists, or create a new one
        messageDiv.className = "duplicated-message-div" // Add a class to identify the div element
        messageDiv.style.marginTop = "30px"

        var message = messageDiv.querySelector(".duplicated-message") || document.createElement("p") // Use existing message if it exists, or create a new one
        message.className = "duplicated-message" // Add a class to identify the message element

        message.style.margin = '10px 0'; // Set some margin to separate the message from other elements
        message.style.fontSize = '24px'

        const {ordersArr, seenIds, duplicates} = storeDuplicatedOrders() //Get variables from storeDuplicatedOrders

        var orderIdSet = new Set(ordersArr);
        if (ordersArr.length !== orderIdSet.size) {
            var totalDuplicatedCases = Math.abs(orderIdSet.size - ordersArr.length)

            if (!messageDiv.contains(message)) { // Only append the message if it doesn't exist in the div
                message.textContent = `There are duplicated orders! Total: ${totalDuplicatedCases}`
             message.style.color = 'red'; // Set the color of the message to red
                messageDiv.appendChild(message)
                box.appendChild(messageDiv)
            }
        } else {
            message.textContent = `No duplicated orders`
         message.style.color = 'green'; // Set the color of the message to red
        messageDiv.appendChild(message)
        box.appendChild(messageDiv)
    }

        setTimeout(() => { // Remove the div after a delay of 5 seconds
            if (box.contains(messageDiv)) { // Check if the div exists before trying to remove it
                box.removeChild(messageDiv)
                checkDuplicated()
            }
        }, 8000)
    }


    async function copyToCLipBoard(){
        //Function to copy duplicated orders to clipboard
        const {duplicates} = storeDuplicatedOrders()//Store variables from storeDuplicatedOrders

        var textToCopy = await duplicates.join(",")
        var fullText = await "Duplicated orders: " + textToCopy
        await navigator.clipboard.writeText(fullText);
        await console.log("Duplicated orders were copy to clipboard")
        return
    }

    function createBTNToCopy() {
        var commentSection = document.querySelector(".add-comment")

        var copyButton = commentSection.querySelector("#copy-button") || document.createElement('button'); // Use existing button if it exists, or create a new one
        copyButton.textContent = 'Copy duplicated orders';
        copyButton.style.marginTop = '10px';
        copyButton.id = 'copy-button';
        copyButton.style.backgroundColor = '#4CAF50';
        copyButton.style.border = "none";
        copyButton.style.color = "white";
        copyButton.style.padding = "10px 16px";
        copyButton.style.textAlign = "center";
        copyButton.style.textDecoration = "none";
        copyButton.style.display = "inline-block";
        copyButton.style.fontSize = "16px";
        copyButton.style.margin = "4px 2px";
        copyButton.style.cursor = "pointer";

        //Hightlight style for duplicated orders in Magnum
        var style = document.createElement('style');
        style.textContent = '.orderId.duplicate { background-color: red; }';
        document.head.appendChild(style);

        copyButton.addEventListener("click", () => {
            copyToCLipBoard()
        })

        if (!commentSection.contains(copyButton)) { // Only append the button if it doesn't exist in the comment section
            commentSection.appendChild(copyButton);
        }

        setTimeout(() => { // Remove the button after a delay of 5 seconds
            if (commentSection.contains(copyButton)) { // Check if the button exists before trying to remove it
                commentSection.removeChild(copyButton)
                createBTNToCopy()
            }
        }, 5000)

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

                checkDuplicated()
                /*---------------------------------------------------------------------------------------------------------------*/
                createBTNToCopy()

            }

        }
    };

    // Create an observer instance linked to the callback function
    const bodyObserver = new MutationObserver(bodyCallback);

    // Start observing the body node for configured mutations
    bodyObserver.observe(bodyNode, bodyConfig);



})();


