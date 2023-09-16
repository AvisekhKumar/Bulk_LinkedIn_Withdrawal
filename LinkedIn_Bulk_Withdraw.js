/**
 * 
 * Author: Avisekh Kumar
 * GitHub: https://github.com/AvisekhKumar
 * Date: September 17, 2023
 * 
 */

(function initiateWithdrawalProcess() {
    console.log("Initiating withdrawal...");

    const CLICK_INTERVAL = 1800;
    const POPUP_WAIT = 500;
    const RELOAD_THRESHOLD = 90;

    let clickCounter = 0;
    let buttonsArray = [];

    function refreshButtonList() {
        buttonsArray = Array.from(document.getElementsByClassName("artdeco-button__text"));
    }

    function confirmWithdrawal() {
        setTimeout(() => {
            const confirmBtn = document.querySelector('.artdeco-modal__confirm-dialog-btn.artdeco-button--primary');
            if (confirmBtn) {
                confirmBtn.click();
            }
        }, POPUP_WAIT);
    }

    function processNextWithdrawal() {
        if (clickCounter % RELOAD_THRESHOLD === 0 && clickCounter !== 0) {
            console.log(`Completed ${RELOAD_THRESHOLD} withdrawals. Refreshing the page...`);
            setTimeout(() => {
                location.reload();
            }, 2000);
            return;
        }

        const nextButton = buttonsArray.shift();
        if (nextButton) {
            clickCounter++;
            console.log(`Processing withdrawal... Total: ${clickCounter}`);
            nextButton.click();
            confirmWithdrawal();

            if (!buttonsArray.length) {
                setTimeout(() => {
                    refreshButtonList();
                    if (buttonsArray.length === 0) {
                        console.log("All done!");
                    } else {
                        continueWithdrawal();
                    }
                }, CLICK_INTERVAL);
            }
        }
    }

    function continueWithdrawal() {
        setInterval(processNextWithdrawal, CLICK_INTERVAL);
    }

    refreshButtonList();
    continueWithdrawal();
})();
