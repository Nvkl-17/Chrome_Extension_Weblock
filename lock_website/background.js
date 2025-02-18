chrome.storage.sync.get({ blockedSites: [], password: "1234" }, function (data) {
    let rules = data.blockedSites.map((site, index) => ({
        "id": index + 1,
        "priority": 1,
        "action": { "redirect": { "extensionPath": "/lock.html" } },
        "condition": { "urlFilter": `*://${site}/*`, "resourceTypes": ["main_frame"] }
    }));

    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: rules.map(rule => rule.id),
        addRules: rules
    });
});
