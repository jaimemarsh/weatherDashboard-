let weatherApiKey = "c33d7e9c5e7e06d80507552604aaf5a5";
let searchInput = $("#searchInput")

searchButton.addEventListener("click", editSearchInput)

function editSearchInput() {
    let errorAlert = document.getElementById("divclass")
    //Sets search value to variable & removes the empty spaces between characters
    let city = searchInput.val().replace(/\s/g, "");
    if (city == "") {
        errorAlert.querySelector("#error").innerHTML = "Enter a city and state to see the weather!"
    }
}

