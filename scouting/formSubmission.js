// oh no don't steal my google sheets
const id = "220176127667-eeenbtli386ib8os911inr0eh8nkjqjr.apps.googleusercontent.com";

// selection
const make = document.getElementById("make");
const miss = document.getElementById("miss");
const intake = document.getElementById("intake");

make.addEventListener("click", function() {
  console.log("make!");
  make.classList.add("active");
  miss.classList.remove("active");
  intake.classList.remove("active");
});

miss.addEventListener("click", function() {
  console.log("miss!");
  make.classList.remove("active");
  miss.classList.add("active");
  intake.classList.remove("active");
});

intake.addEventListener("click", function() {
  console.log("intake!");
  make.classList.remove("active");
  miss.classList.remove("active");
  intake.classList.add("active");
});

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