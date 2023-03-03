// ==UserScript==
// @name         Copy emails in SPC
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       @julsola
// @match        https://scip.corp.amazon.com/contacts/vendorcode/*
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

            const root = document.querySelector('.root');

            function copyEmails(typeOfEmail) {
                const rows = document.querySelectorAll('tr');
                const uniqueEmails = new Set();


                for (let i = 0; i < rows.length; i++) {
                    const columns = rows[i].querySelectorAll('td');
                    const typeColumnElement = columns[0];


                    if (typeColumnElement && typeColumnElement.textContent) {
                        let firstColumn = typeColumnElement.textContent.split(/[0-9]+/)[0].trim();

                        if (firstColumn === typeOfEmail) {
                            let email = columns[2].textContent.split(/[0-9]+x?\s*/)[1].trim();
                            let strWithXand3Numbers = columns[2].textContent
                            const hasXWith3Digits = /\dx\d{3}/.test(strWithXand3Numbers);
                            if(!hasXWith3Digits){
                                console.log("No x in str")
                            }else{

                                console.log(strWithXand3Numbers)
                                let arrayWithEmailAndPhone = strWithXand3Numbers.split(/\dx\d{3}/)
                                console.log(arrayWithEmailAndPhone)
                                email = arrayWithEmailAndPhone[1]
                            }

                            console.log(email)
                            if (!uniqueEmails.has(email)) {
                                console.log(`Email is not in Set: ${email}`)
                                uniqueEmails.add(email);
                            }

                        }
                    }
                }

                const emailsArray = Array.from(uniqueEmails); //Create new array to join element by comma
                const emailsString = emailsArray.join(',');
                console.log(uniqueEmails)
                console.log(emailsArray)

                navigator.clipboard.writeText(emailsString)
                    .then(() => console.log(`Copied ${emailsArray.length} unique emails to clipboard.`))
                    .catch(err => console.error('Error copying to clipboard:', err));
            }


            // Create the buttons
            const primaryButton = document.createElement('button');
            primaryButton.textContent = 'Primary Account Rep';
            primaryButton.style.backgroundColor = "#46b5d1"

            const complianceButton = document.createElement('button');
            complianceButton.textContent = 'Compliance';
            complianceButton.style.backgroundColor = "#76b5c5"

            const salesButton = document.createElement('button');
            salesButton.textContent = 'Sales';
            salesButton.style.backgroundColor = "#eab676"


            // Create a container div to hold the buttons and apply CSS
            const buttonContainer = document.createElement('div');
            buttonContainer.style.display = 'flex';
            buttonContainer.style.justifyContent = 'flex-end';
            buttonContainer.style.position = 'fixed';
            buttonContainer.style.top = '0';
            buttonContainer.style.right = '0';
            buttonContainer.style.marginRight = "100px";

            // Append the buttons to the container div
            buttonContainer.appendChild(primaryButton);
            buttonContainer.appendChild(complianceButton);
            buttonContainer.appendChild(salesButton);

            // Append the container div to the body
            document.body.appendChild(buttonContainer);

            const buttons = [primaryButton, complianceButton, salesButton];
            buttons.forEach(button => {
                button.addEventListener('click', () => {
                    const typeOfEmail = button.textContent.trim();
                    console.log(`You clicked the ${typeOfEmail} button.`);

                    copyEmails(typeOfEmail);
                });
            });


        }
    }, 100); // check every 100 milliseconds

})();