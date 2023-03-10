// ==UserScript==
// @name         Test iframes
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://magnumpi-na.aka.amazon.com/case-investigation/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=amazon.com
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

            function getAsin() {
                return new Promise((resolve) => {
                    const intervalId = setInterval(() => {
                        // Find all the case-summary divs
                        const caseSummaryDivs = document.querySelectorAll('.case-summary');
                        let asin = '';

                        // Loop over the case-summary divs
                        caseSummaryDivs.forEach((caseSummaryDiv) => {
                            // Find the span element that contains the ASIN value
                            const asinSpan = caseSummaryDiv.querySelector('span');

                            // Check if the span element exists
                            if (asinSpan !== null) {
                                // Get the ASIN value from the span element
                                const asinValue = asinSpan.innerHTML;

                                // Do something with the ASIN value, like log it to the console
                                asin = asinValue;

                                clearInterval(intervalId);
                                resolve(asin);
                            }
                        });
                    }, 100);
                });
            }


            // Create a main div to hold the variations divs
            let mainDiv = document.createElement("div");
            mainDiv.setAttribute("id", "mainDiv");

            // Create check buttons for the variations
            let button1 = document.createElement("button");
            button1.textContent = "Show Variations 1";
            button1.addEventListener("click", function() {
                let variationsTool1 = document.querySelector("#variationsHTML1");
                variationsTool1.style.display = "block";
            });
            mainDiv.appendChild(button1);

            let button2 = document.createElement("button");
            button2.textContent = "Show Variations 2";
            button2.addEventListener("click", function() {
                let variationsTool2 = document.querySelector("#variationsHTML2");
                variationsTool2.style.display = "block";
            });
            mainDiv.appendChild(button2);



            // Create the first  div for variations
            let divForVariations = document.createElement("div");
            divForVariations.setAttribute("id", "divForVariations1");
            divForVariations.style.display = "none";

            getAsin().then((asin) => {

                let htmlCodeForVariations = `<iframe id="variationsHTML1" \
title="Displays variations tool"
width="800"
height="410"
style="border:2px solid green; zoom: 0.99;
       -moz-transform: scale(0.99);
       -moz-transform-origin: 0 0;
       -o-transform: scale(0.99);
       -o-transform-origin: 0 0;
       -webkit-transform: scale(0.70);
       -webkit-transform-origin: 0 0;"
src="https://variations.amazon.com/dashboard/#asin=${asin}&method=query&region=us&showChildAsins=true">
</iframe>`;
                divForVariations.innerHTML = htmlCodeForVariations;
                divForVariations.style.display = "inline-block";
                mainDiv.appendChild(divForVariations);

            });




            // Create the second div for CSI
            let divForCSI = document.createElement("div");
            divForCSI.setAttribute("id", "divForVariations1");
            divForCSI.style.display = "none";

            getAsin().then((asin) => {
                const htmlCodeForCSI = `<iframe id="variationsHTML2"
        title="Displays variations tool"
        width="800"
        height="410"
        style="border:2px solid green; zoom: 0.99;
            -moz-transform: scale(0.99);
            -moz-transform-origin: 0 0;
            -o-transform: scale(0.99);
            -o-transform-origin: 0 0;
            -webkit-transform: scale(0.70);
            -webkit-transform-origin: 0 0;"
        src=https://csi.amazon.com/view?view=simple_product_data_view&item_id=${asin}&marketplace_id=1&customer_id=124942766802&merchant_id=5713779&order_id=112-5153002-7168238&realm=USAmazon&stage=prod&submit=Show>
    </iframe>`;
       divForCSI.innerHTML = htmlCodeForCSI;
       divForCSI.style.display = "inline-block";
       mainDiv.appendChild(divForCSI);

   });


            // Create the third  div for SIM tts
            let divForSIM = document.createElement("div");
            divForSIM.setAttribute("id", "divForVariations1");
            divForSIM.style.display = "none";

            let htmlCodeForSIM = `<iframe id="variationsHTML1" \
title="Displays variations tool"
width="800"
height="410"
style="border:2px solid green; zoom: 0.99;
       -moz-transform: scale(0.99);
       -moz-transform-origin: 0 0;
       -o-transform: scale(0.99);
       -o-transform-origin: 0 0;
       -webkit-transform: scale(0.70);
       -webkit-transform-origin: 0 0;"
src="https://issues.amazon.com/issues/create?template=391e1b62-4b1d-435a-a9a7-9654c2932172">
</iframe>`;
            divForSIM.innerHTML = htmlCodeForSIM;
            divForSIM.style.display = "inline-block";
            mainDiv.appendChild(divForSIM);



            // Create the fourth div for CSI view
            let divForCSIViewIsRetail = document.createElement("div");
            divForCSIViewIsRetail.setAttribute("id", "divForVariations1");
            divForCSIViewIsRetail.style.display = "none";

            getAsin().then((asin) => {
                const htmlCodeForCSIViewIsRetail = `<iframe id="variationsHTML2"
        title="Displays variations tool"
        width="800"
        height="410"
        style="border:2px solid green; zoom: 0.99;
            -moz-transform: scale(0.99);
            -moz-transform-origin: 0 0;
            -o-transform: scale(0.99);
            -o-transform-origin: 0 0;
            -webkit-transform: scale(0.70);
            -webkit-transform-origin: 0 0;"
        src=https://csi.amazon.com/view?view=retail_contributions_across_marketplaces&item_id=${asin}&stage=prod>
    </iframe>`;
       divForCSIViewIsRetail.innerHTML = htmlCodeForCSIViewIsRetail;
       divForCSIViewIsRetail.style.display = "inline-block";
       mainDiv.appendChild(divForCSIViewIsRetail);

   });





            // Create the fifth  div for Arnold Audit

            let divForArnoldAudit = document.createElement("div");
            divForArnoldAudit.setAttribute("id", "divForVariations1");
            divForArnoldAudit.style.display = "none";

            getAsin().then((asin) => {

                let htmlCodeForArnoldAudit = `<iframe id="variationsHTML1" \
title="Displays variations tool"
width="800"
height="410"
style="border:2px solid green; zoom: 0.99;
       -moz-transform: scale(0.99);
       -moz-transform-origin: 0 0;
       -o-transform: scale(0.99);
       -o-transform-origin: 0 0;
       -webkit-transform: scale(0.70);
       -webkit-transform-origin: 0 0;"
src="https://arnold.amazon.com/report/asin_audit_report;jsessionid=BF572E9EEB80663A4599580FF9535B26?where.recallCaseIds=&where.asins=${asin}&where.pageNumber=">
</iframe>`;
                divForArnoldAudit.innerHTML = htmlCodeForArnoldAudit;
                divForArnoldAudit.style.display = "inline-block";
                mainDiv.appendChild(divForArnoldAudit);

            });


                // Create the sixth  div for Arnold

            let divForArnold = document.createElement("div");
            divForArnold.setAttribute("id", "divForVariations1");
            divForArnold.style.display = "none";

            getAsin().then((asin) => {

                let htmlCodeForArnold = `<iframe id="variationsHTML1" \
title="Displays variations tool"
width="800"
height="410"
style="border:2px solid green; zoom: 0.99;
       -moz-transform: scale(0.99);
       -moz-transform-origin: 0 0;
       -o-transform: scale(0.99);
       -o-transform-origin: 0 0;
       -webkit-transform: scale(0.70);
       -webkit-transform-origin: 0 0;"
src="https://arnold.amazon.com/;jsessionid=2DE9E5FD95DE9BF38E913CD67F74A940?page.recallCaseSearchModel.titleCriterion.titles=&page.recallCaseSearchModel.asinsCriterion.asins=${asin}&page.recallCaseSearchModel.idCriterion.ids=&_page.recallCaseSearchModel.countriesCriterion.countries=1&_page.recallCaseSearchModel.ownersCriterion.owners=1&page.recallCaseSearchModel.publicUrisCriterion.publicUris=&page.recallCaseSearchModel.creationDateRangeCriterion.creationStartDate=&page.recallCaseSearchModel.creationDateRangeCriterion.creationEndDate=&page.recallCaseSearchModel.recallCaseGroupsCriterion.recallCaseGroups=&page.recallCaseSearchModel.sourceAgenciesCriterion.sourceAgencies=&page.recallCaseSearchModel.privateUrisCriterion.privateUris=&page.recallCaseSearchModel.impactFromDateCriterion.impactFromDate=&page.recallCaseSearchModel.textInAnyFieldCriterion.textInAnyField=&_page.recallCaseSearchModel.recallScopeTypeCriterion.recallScopeTypes=1&_page.recallCaseSearchModel.recallCaseTypeCriterion.recallCaseTypes=1&pageNumber=1">
</iframe>`;
                divForArnold.innerHTML = htmlCodeForArnold;
                divForArnold.style.display = "inline-block";
                mainDiv.appendChild(divForArnold);

            });








            document.body.appendChild(mainDiv);
        }
    }, 100); // check every 100 milliseconds
})();
