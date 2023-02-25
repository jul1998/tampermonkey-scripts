// ==UserScript==
// @name         Paragon Body
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Creata paragon correspondence
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



            function getParagonVariablesInMagnumCase(){
                var paragonAsin = ""
                // Find all the case-summary divs
                var caseSummaryDivs = document.querySelectorAll(".case-summary");

                // Loop over the case-summary divs
                caseSummaryDivs.forEach(function(caseSummaryDiv) {
                    // Find the span element that contains the ASIN value
                    var asinSpan = caseSummaryDiv.querySelector("span");

                    // Check if the span element exists
                    if (asinSpan !== null) {
                        // Get the ASIN value from the span element
                        var asinValue = asinSpan.innerHTML;

                        // Do something with the ASIN value, like log it to the console
                        paragonAsin = asinValue;
                    }
                });

                const elements = document.querySelectorAll('div.preserve-whitespace.word-wrap');
                const regex = /\[Trending \d+\]|\[CC\]|\[Annotation\]|Customer Review - .+? - |FAAST-v\d+-SAFETY-|\[Annotation\]|Return \(ORC\) - [A-Z0-9]+ - /g;

                var paragonAsinTitle = elements[0].textContent.replace(regex, "");


                return {paragonAsin, paragonAsinTitle}

            }

            const {paragonAsin, paragonAsinTitle} = getParagonVariablesInMagnumCase()


            //Function to add reviews to paragon body
            function addReviews(paragonString){
                for (let i = 0; i < grabOrderReviews().length; i++) {
                    paragonString += `${grabOrderReviews()[i]}\n`;
                }
                return paragonString;
            }



            let paragonTextForCC = `Hello,

We are contacting you because potential safety concerns have been logged regarding a product sold by you. We are writing as part of an internal investigation to address our mutual customer’s concerns.

The potential safety concern is regarding ${paragonAsin} – ${paragonAsinTitle} and the customer’s comments are as follows:

`;

            paragonTextForCC = addReviews(paragonTextForCC);

            paragonTextForCC += `
We ask that you please respond with the appropriate documentation within 7 days by taking the following steps:

1. MOST IMPORTANT: Submit all relevant safety testing data and certification for the product in English. Include testing specifically related to the incident in question. Please refer to the attached word document of “Product Compliance Guidelines” if you have any questions. PLEASE NOTE: An MSDS does not suffice for safety testing.

Please provide the appropriate standard for this product . If you have questions about the appropriate standards for the product, please consult with the laboratory directly

2. Provide images of the product (front, back, accessories, and packaging); safety/compliance marks and logos (e.g. FCC, UL, and ETL); and safety labels and warnings on the product or packaging. Please also attach the, model number, serial number, UPC code and a copy of the instruction manual.

Thank you for your cooperation on this important matter.

Please note:
Your product will be removed from the website if we do not hear back from you with the requested documents within the next 7 days.\n`


         let paragonTextForSuppression = `Hello,

We are contacting you because a potential safety concern has been logged regarding a product sold by you. We are writing as part of an internal investigation to address our mutual customer’s concerns.
The potential safety concern is regarding ${paragonAsin} – ${paragonAsinTitle} and the customer’s comment is as follows:

`

         paragonTextForSuppression = addReviews(paragonTextForSuppression)

            paragonTextForSuppression+=`
The following ASIN(s) have been suppressed:
xxxxxxx

We ask you please respond to the above concern by taking the following steps:
1.    MOST IMPORTANT: Submit all relevant safety testing data and certification for the item in English. Include testing specifically relating to the incident in question. Please refer to the attached word document of “Product Compliance Guidelines” if you have any questions. PLEASE NOTE: An MSDS does not suffice for safety testing.

Please provide the appropriate standard for this product . If you have questions about the appropriate standards for the product, please consult with the laboratory directly

2. Provide images of the product (front, back, accessories, and packaging). Images should include: model/serial number, safety/compliance marks & logos and safety labels & warnings on the product or packaging. Please also attach the model number, serial number, UPC code and a copy of the instruction manual.

Thank you for your cooperation on this important matter.

Please note:
While we investigate, the product will remain unavailable for purchase from our store .

If the above documentation request is not completed in its entirety within 7 days, the case will be closed and the ASIN will remain suppressed.

         `

          let paragonTextForTopicalCC = `Hello,

We are contacting you because potential safety concerns have been logged regarding a product sold by you. We are writing as part of an internal investigation to address our mutual customer’s concerns.

The potential safety concern is regarding ${paragonAsin} – ${paragonAsinTitle} and the customer’s comments are as follows:

`

   paragonTextForTopicalCC = addReviews(paragonTextForTopicalCC)


            paragonTextForTopicalCC+=`
We ask that you please respond with the appropriate documentation within 7 days by taking the following steps:

1. MOST IMPORTANT: Submit all relevant safety testing data and certification for the product in English. Include testing specifically related to the incident in question. Please refer to the attached word document of “Product Compliance Guidelines” if you have any questions. PLEASE NOTE: An MSDS does not suffice for safety testing.
 The appropriate standard for this product appears to be Human Repeat Insult Patch Test (HRIPT) and Certificate of Analysis (COA). If you are not able to provide HRIPT testing, please provide an alternate report showing irritation and sensitization testing for your product. Amazon will review and determine if the documentation is acceptable per Amazon Policy.
Proprietary information regarding formulations or ingredients may be redacted. However, please ensure the test report includes the following:
•	Name of test performed and what the test covered
•	Name of the accredited, third-party lab performing the test
•	Status of test i.e. “Pass/Fail”
•	Model # of item tested
•	Visible signature from laboratory certifying the testing
 2. Provide images of the product (front, back, accessories, and packaging); safety/compliance marks and logos (e.g. FCC, UL, and ETL); and safety labels and warnings on the product or packaging. Please also attach the, model number, serial number, UPC code and a copy of the instruction manual.

Thank you for your cooperation on this important matter.

Please note:
Your product will be removed from the website if we do not hear back from you with the requested documents within the next 7 days.`

            var caseDetailsBox = document.querySelector(".detail-grid")

            // Create a div to wrap the radio options and labels
            var radioGroup = document.createElement("div");
            radioGroup.classList.add("radio-group");
            radioGroup.style.position = "relative";
            radioGroup.style.bottom = "0";
            radioGroup.style.left = "0";
            radioGroup.style.marginTop = "20px";

            function createRetailOptionsAndLabels(){

                //Div for retail and non retail optoions
                var retailContainer = document.createElement("div");
                retailContainer.style.alignItems = "center";
                retailContainer.style.display = "flex";


                //Paragraph for asking retail or non retail
                var isRetailParagraph = document.createElement("p");
                isRetailParagraph.textContent = "Retail or non Retail:";

                // Create the "Retail" radio option
                var retailRadio = document.createElement("input");
                retailRadio.type = "radio";
                retailRadio.id = "retailOption";
                retailRadio.name = "retailRadioGroup";
                retailRadio.value = "Retail";
                retailRadio.classList.add("radio-option");

                // Create the "Retail" label
                var retailLabel = document.createElement("label");
                retailLabel.htmlFor = "retailOption";
                retailLabel.innerHTML = "Retail";
                retailLabel.classList.add("radio-label");
                retailLabel.style.marginRight = "20px"


                // Create the "No retail" radio option
                var noRetailRadio = document.createElement("input");
                noRetailRadio.type = "radio";
                noRetailRadio.id = "noRetailOption";
                noRetailRadio.name = "retailRadioGroup";
                noRetailRadio.value = "No retail";
                noRetailRadio.classList.add("radio-option");

                // Create the "No retail" label
                var noRetailLabel = document.createElement("label");
                noRetailLabel.htmlFor = "noRetailOption";
                noRetailLabel.innerHTML = "No retail";
                noRetailLabel.classList.add("radio-label");

                retailContainer.appendChild(retailRadio)
                retailContainer.appendChild(retailLabel)
                retailContainer.appendChild(noRetailRadio)
                retailContainer.appendChild(noRetailLabel)
                //Append p for retail
                radioGroup.appendChild(isRetailParagraph)

                // Append the "Retail" radio option and label to the radioGroup div
                radioGroup.appendChild(retailContainer)



            }


            function createTypeOfParagonOptionAndLabel(){

                //Paragraph for CC or supression
                var askForTypeOfParagon = document.createElement("p");
                askForTypeOfParagon.textContent = "Type of paragon:";

                // Create the div to wrap the radio options
                var suppressContainer = document.createElement("div");
                suppressContainer.style.alignItems = "center";
                suppressContainer.style.display = "flex";
                //suppressContainer.style.gap = "10px"


                // Create the "CC" radio option and label
                var ccRadio = document.createElement("input");
                ccRadio.type = "radio";
                ccRadio.id = "ccOption";
                ccRadio.name = "paragonType";
                ccRadio.value = "cc";
                ccRadio.classList.add("CC-option");
                var ccLabel = document.createElement("label");
                ccLabel.htmlFor = "ccOption";
                ccLabel.innerHTML = "CC";
                ccLabel.style.marginRight = "20px"

                // Create the "Suppression" radio option and label
                var suppressRadio = document.createElement("input");
                suppressRadio.type = "radio";
                suppressRadio.id = "suppressOption";
                suppressRadio.name = "paragonType";
                suppressRadio.value = "suppress";
                suppressRadio.classList.add("suppress-option");
                var suppressLabel = document.createElement("label");
                suppressLabel.htmlFor = "suppressOption";
                suppressLabel.innerHTML = "PRO";
                suppressLabel.style.marginRight = "20px"

                // Create the "Topical" radio option and label
                var topicalProductRadio = document.createElement("input");
                topicalProductRadio.type = "radio";
                topicalProductRadio.id = "topicalOption";
                topicalProductRadio.name = "paragonType";
                topicalProductRadio.value = "topical";
                topicalProductRadio.classList.add("topical-option");
                var topicalProductcLabel = document.createElement("label");
                topicalProductcLabel.htmlFor = "topicalOption";
                topicalProductcLabel.innerHTML = "Topical CC";
                topicalProductcLabel.style.marginRight = "20px"



                // Add the radio options and labels to the div
                suppressContainer.appendChild(ccRadio);
                suppressContainer.appendChild(ccLabel);
                suppressContainer.appendChild(suppressRadio);
                suppressContainer.appendChild(suppressLabel);
                suppressContainer.appendChild(topicalProductRadio);
                suppressContainer.appendChild(topicalProductcLabel);

                //Append p for paragon type
                radioGroup.appendChild(askForTypeOfParagon)


                //Append suprression radio options
                radioGroup.appendChild(suppressContainer);
                return { ccRadio, suppressRadio, topicalProductRadio }


            }



            //Create text area for paragon body
            function createPagaronTextArea(){
                var paragonBody = document.createElement("textarea");
                paragonBody.id= "paragonBody";
                paragonBody.classList.add("paragon-body")
                paragonBody.style.width = "250px";
                paragonBody.style.height = "200px";
                paragonBody.style.resize = "none";
                paragonBody.placeholder = "Paragon body"
                return paragonBody

            }

            function subjectArea(){
                let subjectInput = document.createElement("input")
                subjectInput.id = "subjectArea"
                subjectInput.classList.add("subject-input-area")
                subjectInput.style.marginBottom = "20px"
                subjectInput.style.height = "20px";
                subjectInput.style.width = "250px";
                subjectInput.placeholder = "Paragon subject"
                radioGroup.appendChild(subjectInput)
                return subjectInput
            }


            // Call createRetailOptionsAndLabels function
            createRetailOptionsAndLabels()


            // destructure variables in createRetailOptionsAndLabels function
            const { ccRadio, suppressRadio, topicalProductRadio } = createTypeOfParagonOptionAndLabel();

            //Create variable for creating paragon body text area
            const paragonBody = createPagaronTextArea()


            function addParagonBodyBtn(){
                // Create a button element

                var addButton = document.createElement("button");
                addButton.innerHTML = "Add Paragon Body";

                // Add some style to the button
                addButton.style.backgroundColor = "#4CAF50";
                addButton.style.color = "white";
                addButton.style.padding = "10px 20px";
                addButton.style.border = "none";
                addButton.style.borderRadius = "4px";
                addButton.style.cursor = "pointer";
                addButton.classList.add("add-body-btn")
                addButton.style.marginTop = "10px"
                addButton.style.marginBottom = "10px"

                // Add a click event listener to the button
                addButton.addEventListener("click", function() {
                    // Append the text to the value of the paragonBody textarea
                      addParagonTextBody()

                });

                radioGroup.appendChild(addButton);
            }

            //Add button to pagon body
            addParagonBodyBtn()


            //Add paragon subject input
            const subjectAreaInput = subjectArea()

            function addParagonTextBody(){
                subjectAreaInput.value += `[CC]Product Safety Concern – ${paragonAsin}`
                if (ccRadio.checked) {
                    paragonBody.value += paragonTextForCC;
                } else if (suppressRadio.checked) {
                    paragonBody.value += paragonTextForSuppression;
                } else if (topicalProductRadio.checked){
                    paragonBody.value += paragonTextForTopicalCC;
                }else{
                    return
                }

            }



            radioGroup.appendChild(paragonBody)
            // Find the last child element of the caseDetailsBox
            var lastChild = caseDetailsBox.lastElementChild;
/*
            setTimeout(function() {
                var button = document.querySelector('.add-body-btn');
                button.click();
            }, 5000); */
            // Append the radioGroup div after the last child element
            caseDetailsBox.insertBefore(radioGroup, lastChild.nextSibling);

        }
    }, 100); // check every 100 milliseconds

})();