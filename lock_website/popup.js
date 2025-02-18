document.addEventListener("DOMContentLoaded", function () {
    let siteInput = document.getElementById("site");
    let addButton = document.getElementById("add");
    let siteList = document.getElementById("siteList");
    let passwordInput = document.getElementById("newPassword");
    let savePasswordButton = document.getElementById("savePassword");

    function updateList() {
        chrome.storage.sync.get({ blockedSites: [] }, function (data) {
            siteList.innerHTML = "";
            data.blockedSites.forEach((site, index) => {
                let li = document.createElement("li");
                li.textContent = site;

                let removeButton = document.createElement("button");
                removeButton.textContent = "Remove";
                removeButton.onclick = function () {
                    data.blockedSites.splice(index, 1);
                    chrome.storage.sync.set({ blockedSites: data.blockedSites }, updateList);
                };

                li.appendChild(removeButton);
                siteList.appendChild(li);
            });
        });
    }

    addButton.addEventListener("click", function () {
        let site = siteInput.value.trim();
        if (site) {
            chrome.storage.sync.get({ blockedSites: [] }, function (data) {
                if (!data.blockedSites.includes(site)) {
                    data.blockedSites.push(site);
                    chrome.storage.sync.set({ blockedSites: data.blockedSites }, updateList);
                }
            });
        }
        siteInput.value = "";
    });

    savePasswordButton.addEventListener("click", function () {
        let newPassword = passwordInput.value.trim();
        if (newPassword) {
            chrome.storage.sync.set({ password: newPassword }, function () {
                alert("Password updated!");
            });
        }
    });

    updateList();
});
