document.getElementById("submit").addEventListener("click", function () {
    let enteredPassword = document.getElementById("password").value;

    chrome.storage.sync.get("password", function (data) {
        if (enteredPassword === data.password) {
            
            window.location.replace(sessionStorage.getItem("originalUrl") || "https://www.google.com");
        } else {
            document.getElementById("error").classList.remove("hidden");
        }
    });
});
