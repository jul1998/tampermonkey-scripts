// ==UserScript==
// @name         Up and down scroller
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fills automatically paragon body
// @author       @julsola
// @match        https://magnumpi-na.aka.amazon.com/case-investigation*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var intervalId = setInterval(function() {
        // Check if the target element exists in the DOM
        if (document.querySelector(".detail-grid")) {
            // The target element exists, so the page is fully loaded

            // Clear the interval
            clearInterval(intervalId);

            function createButtonToScrollDown(){

                function scrollToBottom() {
                    window.scrollTo(
                        {
                         top: document.body.scrollHeight,
                         behavior: 'smooth'

                        }
                    );
                }

                // Define the bounce animation using @keyframes
                const bounceKeyframes = `
    @keyframes bounce {
        0% {
            transform: translateY(-10px);
        }
        50% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(-10px);
        }
    }
`;

                // Create a style element and set its text to the bounce animation keyframes
                var style = document.createElement('style');
                style.innerHTML = bounceKeyframes;

                // Add the style element to the head of the document
                document.head.appendChild(style);

                // create a button element
                var button = document.createElement('button');
                button.innerHTML = '&#8595;' + '&#8595;' + '&#8595;';
                button.style.position = 'fixed';
                button.style.bottom = '0';
                button.style.right = '0';
                //Add some style
                button.style.backgroundColor = '#008CBA';
                button.style.color = 'white';
                button.style.padding = '12px 24px';
                button.style.borderRadius = '6px';
                button.style.border = 'none';
                button.style.fontSize = '16px';
                button.style.cursor = 'pointer';
                button.style.animation = 'bounce 1s ease-in-out infinite';

                // add a click event listener to the button
                button.addEventListener('click', scrollToBottom);

                // append the button to the body of the page
                document.body.appendChild(button);

            }

            function createButtonToScrollUp(){

                const bounceKeyframes = `
    @keyframes bounce {
        0% {
            transform: translateY(-10px);
        }
        50% {
            transform: translateY(10px);
        }
        100% {
            transform: translateY(-10px);
        }
    }
`;

                 // Add the bounce animation to the page using GM_addStyle
                 var styleForTopBtn = document.createElement('style');
                styleForTopBtn.innerHTML = bounceKeyframes;

                  // Add the style element to the head of the document
                document.head.appendChild(styleForTopBtn);

                 // create a button element to scroll to the top of the page
                 var topButton = document.createElement('button');
                 topButton.innerHTML = '&#8593;' + '&#8593;' + '&#8593;';
                 topButton.style.position = 'fixed';
                 topButton.style.top = '0';
                 topButton.style.right = '0';

                 topButton.style.backgroundColor = '#008CBA';
                 topButton.style.color = 'white';
                 topButton.style.padding = '12px 24px';
                 topButton.style.borderRadius = '6px';
                 topButton.style.border = 'none';
                 topButton.style.fontSize = '16px';
                 topButton.style.cursor = 'pointer';
                 topButton.style.animation = 'bounce 1s ease-in-out infinite';

                 // add a click event listener to the top button
                 topButton.addEventListener('click', scrollToTop);

                 // append the button to the body of the page
                 document.body.appendChild(topButton);

                 // function to scroll to the top of the page
                 function scrollToTop() {
                     window.scrollTo({
                         top: 0,
                         behavior: 'smooth'
                     });
                 }

             }


            createButtonToScrollDown()
            createButtonToScrollUp()

        }
    }, 100); // check every 100 milliseconds

})();