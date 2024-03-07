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

// selection


// placement
document.getElementById("field").addEventListener("click", function(event) {
  let field = document.getElementById("field");

  // get click pos rel to container
  let rect = field.getBoundingClientRect();
  let x_pos = event.clientX - rect.left;
  let y_pos = event.clientY - rect.top;

  document.getElementById("xout").textContent = x_pos;
  document.getElementById("yout").textContent = y_pos;
  console.log(x_pos);
  console.log(y_pos);
});