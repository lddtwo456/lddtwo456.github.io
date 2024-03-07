document.getElementById("dataForm").addEventListener("submit", function(event) {
  event.preventDefault();
  let formData = new FormData(this);
  let jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
  });
  let jsonString = JSON.stringify(jsonData);
  document.getElementById("out").textContent = jsonString;
});

document.getElementById("field").addEventListener("click", function(event) {
  var fieldContainer = document.getElementById("field-container");
  var field = fieldContainer.getElementById("field");

  // get click pos rel to container
  document.getElementById("xout").textContent = event.clientX;
  document.getElementById("yout").textContent = event.clientY;
  document.getElementById("test").innerHTML = "Click!";
});