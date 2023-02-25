// ==UserScript==
// @name         Transfer case in Paragon bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  This bot transfer the case automatically once the paragon is created. Users only have to press the button in the header to trigger this function
// @author       @julsola
// @match        https://paragon-na.amazon.com/hz/case?caseId*
// @grant        none
// ==/UserScript==

var mainintervalId = setInterval(function() {
    // Check if the target element exists in the DOM
    if (document.readyState === 'complete') {
        // The target element exists, so the page is fully loaded

        // Clear the interval
        clearInterval(mainintervalId);


        //Get all buttons in paragon page
        const btns = document.querySelectorAll(".tertiary");

        //Define all intervals
        let intervalIdForClickingRadioButton;
        let intervalIdForAddinText;
        let interlIdForSelectingAgent;
        let interlIdForTransferCase;

        //Selelect header
        let header = document.querySelector(".header_2lDCk");

        function createBtn(){

            let transferButton = document.createElement("button");
            transferButton.setAttribute("id", "myButton");
            transferButton.textContent = "Tranfer case automatically";
            transferButton.style.backgroundColor = "blue";
            transferButton.style.color = "white";
            transferButton.style.padding = "10px";
            header.appendChild(transferButton);



            transferButton.addEventListener("click", function() {
                startHere()
            });

        }

        function copyCaseId() {

            let myArr = []
           if (document.readyState === 'complete') {
                const currentUrl = window.location.href;
                const parameterStartIndex = currentUrl.indexOf('caseId=') + 7;
                const parameterEndIndex = currentUrl.indexOf('&', parameterStartIndex);
                const parameterValue = currentUrl.substring(parameterStartIndex, parameterEndIndex);
                console.log(parameterValue);
                navigator.clipboard.writeText(parameterValue)

           };
        }


        // define a function to check if the radio button exists
        function checkRadioOption() {

            const radioOption = document.querySelector("#katal-id-11");
            if (radioOption) {
                radioOption.click()

                clearInterval(intervalIdForClickingRadioButton);
                intervalIdForAddinText = setInterval(addTextToTextArea, 1000);


            }
        }

        function addTextToTextArea(){
            const textAreaForTransfer = document.querySelector('input[placeholder="Type here to search"]');
            console.log(textAreaForTransfer)

            window.scrollBy(0, 250); // scroll down by 50 pixels
            textAreaForTransfer.value = "alejandv";

            textAreaForTransfer.dispatchEvent(new Event('input', { bubbles: true })); // trigger input event
            clearInterval(intervalIdForAddinText);
            interlIdForSelectingAgent = setInterval(selectAgent, 1000);


        }


        function selectAgent(){
            const agent = document.querySelector("#agentSelect")
            console.log(agent)
            agent.selectedIndex = 0; // select the first option
            agent.dispatchEvent(new Event('change', { bubbles: true })); // dispatch a change event

            if(agent.selectedIndex === -1){

                console.log("Agent not selected")
            }else{

                console.log("Agent selected")
            }
            clearInterval(interlIdForSelectingAgent);
            interlIdForTransferCase = setInterval(tranferCase, 1000);

            function tranferCase(){

                const buttons = document.getElementsByTagName('button');

                // Loop through each button and check its text content
                for (let i = 0; i < buttons.length; i++) {
                    const button = buttons[i];
                    if (button.textContent.trim() === 'Transfer Case') {
                        // Found the target button, simulate a click event
                        button.click();
                        break; // Exit the loop since we found the button
                    }
                }
                clearInterval(interlIdForTransferCase);

            }

        }

        function startHere(){

            btns.forEach(btn => {
                const eachBtn = btn.textContent.trim();
                if (eachBtn === "Transfer") {
                    console.log(btns);
                    intervalIdForClickingRadioButton = setInterval(checkRadioOption, 1000);
                    btn.click();

                }
            });

        }


        createBtn()
        copyCaseId()


    }
}, 100); // check every 100 milliseconds
