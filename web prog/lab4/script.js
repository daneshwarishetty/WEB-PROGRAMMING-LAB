function showCapital() {
      const countryList = document.getElementById("country");
      const capitalText = document.getElementById("capital");

      if (countryList.value === "") {
        capitalText.textContent = "";
      } else {
        capitalText.textContent = "Capital: " + countryList.value;
      }
    }
