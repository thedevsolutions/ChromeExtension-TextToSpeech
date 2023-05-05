chrome.commands.onCommand.addListener(function (command) {
    if (command === "Ctrl+M") {
        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                console.log(tabs);
                chrome.tabs.sendMessage(tabs[0].id, {
                    startSpeechRecognition: true
                });

                var recognition = new webkitSpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = false;
                recognition.lang = "en-US";
                recognition.start();
                recognition.onresult = function (event) {
                    let temp = "";
                    Object.keys(event.results).forEach((item, keyname) => {
                        temp += event.results[keyname][0].transcript;
                    });
                    console.log(temp);
                    chrome.tabs.executeScript(tabs[0].id, {
                        code: `document.activeElement.value = ${JSON.stringify(
                            temp
                        )};`
                    });
                    chrome.runtime.sendMessage({ speechResult: temp });
                };
            }
        );
    }
});
