const PORT = process.env.PORT || 8000;
import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const app = express();

const articles = [];

app.get("/", (req, res) => {
  res.json("Welcome to my World of Warcraft Patch Note API");
});

app.get("/patch-notes", (req, res) => {
  axios
    .get("https://news.blizzard.com/en-us/world-of-warcraft")
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".ArticleLink.ArticleListItem-linkOverlay").each(function () {
        const title = $(this).text();
        const url = $(this).attr("href");
        articles.push({
          title,
          url: "https://news.blizzard.com/" + url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
