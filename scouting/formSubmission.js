document.getElementById("dataForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let formData = new FormData(this);
  let jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });
  let jsonString = JSON.stringify(jsonData);
  document.querySelector("#out").textContent = jsonString;
});

document.getElementById("#field").addEventListener("click", function(event) {
  var fieldContainer = document.getElementById("#field-container");
  var field = fieldContainer.querySelector("#field");

  // get click pos rel to container
  document.querySelector("#xout").textContent = event.clientX;
  document.querySelector("#yout").textContent = event.clientY;
});