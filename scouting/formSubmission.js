document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(this);
  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });
  const jsonString = JSON.stringify(jsonData);
  document.querySelector("#out").textContent = jsonString;
});

//picture clicker
document.addEventListener("DOMContentLoaded", function() {
  var clickableArea = document.getElementById("clickable-area");

  clickableArea.addEventListener("click", function(event) {
      var x = event.offsetX;
      var y = event.offsetY;

      document.querySelector("#xyout").textContent = String(x+" "+y)
  });
});