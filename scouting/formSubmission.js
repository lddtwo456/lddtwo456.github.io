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

document.addEventListener("DOMContentLoaded", function(event) {
  var fieldContainer = document.getElementById("field-container");
  var field = fieldContainer.querySelector("field");

  field.addEventListener("click", function(event) {
    // get click pos rel to container
    var rect = fieldContainer.getBoundingClientRect();
    var offsetX = event.clientX - rect.left;
    var offsetY = event.clientY - rect.top;

    // get position of click rel to image
    var imageX = offsetX / rect.width * field.naturalWidth;
    var imageY = offsetY / rect.height * field.naturalHeight;

    // out
    document.querySelector("#xout").textContent = imageX;
    document.querySelector("#yout").textContent = imageY;
  })
});