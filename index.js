// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!

require("dotenv").config();

const server = require("./server.js");

const port = process.env.PORT || 4444;

server.listen(port, () => {
  console.log(`\n*** Server Running on http:localhost:${port} ***\n`);
});
