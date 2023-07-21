const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const arrSet = new Set();

app.get("/numbers", async (req, res) => {
  const urls = Array.isArray(req.query.url) ? req.query.url : [req.query.url];
  console.log(urls);

  try {
    const promises = urls.map(async (url) => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
      };
      const response = await axios.request(config);
      if (response.status === 200) {
        const nums = response.data.numbers;
        console.log(nums);
        nums.forEach((num) => arrSet.add(num));
      }
    });

    await Promise.all(promises);

    const mergedArr = Array.from(arrSet).sort((a, b) => a - b);

    console.log(mergedArr);
    res.send(mergedArr);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the numbers.");
  }
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
