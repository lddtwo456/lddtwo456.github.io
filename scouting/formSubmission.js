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