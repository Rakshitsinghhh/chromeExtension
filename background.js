chrome.runtime.onInstalled.addListener(() => {
    chrome.scripting.registerContentScripts([{
        id: "detectIG",
        matches: ["<all_urls>"],
        js: ["content.js"],
        runAt: "document_start"
    }]);
});
