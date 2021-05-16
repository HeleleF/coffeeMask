// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const axios = require("axios");

export default async (req, res) => {
  const IDS = [
    "LOcWIb1mjcU",
    "4z2fs8SJFoY",
    "8f34_LFkN5A",
    "1Euk4EIKS9A",
    "Z3ZD-ARBFHE",
    "CApWIbONfBk",
    "eKGeZIiz9wg",
    "M2xYieaJJrw",
    "M32UAtv8pMc",
    "NNldPeykv1k",
    "ufAv-VFknmE",
    "PKDKzDjQ_Cs",
  ];

  const { data } = await axios.default.get(
    `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${IDS.join(
      ","
    )}&key=${process.env.API_KEY ?? "AIzaSyA0YkJE3gt7jC2LykLj-sY3JJcwwvRawKA"}`
  );

  const results = data.items
    .map(({ statistics, snippet, id }) => ({
      id,
      title: snippet.title,
      thumbnail: snippet.thumbnails.high,
      views: statistics.viewCount,
      likes: statistics.likeCount,
      dislikes: statistics.dislikeCount,
    }))
    .sort((x, y) =>
      y.likes - x.likes === 0 ? y.views - x.views : y.likes - x.likes
    );

  return res.status(200).send(results);
};
