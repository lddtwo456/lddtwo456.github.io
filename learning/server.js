const express = require('express');
const app = express();
const PORT = 3000;

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
