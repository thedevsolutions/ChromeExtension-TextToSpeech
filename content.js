console.log("content screen");
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(request);
    if (request.startSpeechRecognition) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";
        recognition.start();
        recognition.onresult = function (event) {
            var result = event.results[0][0].transcript;
            console.log(result);
            chrome.runtime.sendMessage({ speechResult: result });
        };
    }
});
