// ==UserScript==
// @name         Identify severities
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://magnumpi-na.aka.amazon.com/
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var intervalId = setInterval(function() {
        // Check if the target element exists in the DOM
        if (document.readyState === 'complete') {
            // The target element exists, so the page is fully loaded

            // Clear the interval
            clearInterval(intervalId);

            let newInterval = setInterval(() => {
                let rows = document.querySelectorAll(".ReactVirtualized__Table__rowColumn");

                rows.forEach(item => {
                    let titleDiv = item.querySelector("div[title]");

                    if (titleDiv) {
                        let titleStr = titleDiv.getAttribute("title");


                        if (titleStr.includes("PS_LOW") || titleStr.includes("PS_MEDIUM") || titleStr.includes("PS_MONITOR")) {
                            console.log(titleStr);
                        }

                        if (titleDiv && titleStr.includes("PS_MEDIUM")) {
                            // Add a new class to the row
                            item.classList.add("highlighted_medium");
                        }else if(titleDiv && titleStr.includes("PS_LOW")){
                           item.classList.add("highlighted_low")
                        }else if(titleDiv && titleStr.includes("PS_MONITOR")){
                           item.classList.add("highlighted_monitor")
                        }
                        else if(titleDiv && titleStr.includes("PS_HIGH")){
                           item.classList.add("highlighted_high")
                        }

                          //clearInterval(newInterval)
                    }


                });

                let style = document.createElement('style');
                style.innerHTML = `
  .highlighted_medium {
    background-color: yellow;
  }

  .highlighted_low {
    background-color: green;
  }

  .highlighted_monitor {
    background-color: blue;
  }

 .highlighted_high {
    background-color: red;
  }
`;
                document.head.appendChild(style);

            }, 3000);

        }
    }, 100); // check every 100 milliseconds

})();