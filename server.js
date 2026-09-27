const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Basic TikTok URL validation
function isValidTikTokUrl(url) {
  return /tiktok\.com/i.test(url) || /vt\.tiktok\.com/i.test(url) || /vm\.tiktok\.com/i.test(url);
}

// API endpoint: fetch video info + download links
app.post("/api/download", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || !isValidTikTokUrl(url)) {
      return res.status(400).json({ error: "Sahi TikTok link paste karein." });
    }

    // Using tikwm.com public API to resolve the video (no watermark, includes HD when available)
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`;

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    });

    const data = await response.json();

    if (!data || data.code !== 0 || !data.data) {
      return res.status(500).json({ error: "Video fetch nahi ho saka. Link check karein ya dobara koshish karein." });
    }

    const video = data.data;

    // tikwm returns relative paths sometimes; make sure they're absolute
    const baseUrl = "https://www.tikwm.com";
    const normalize = (link) => {
      if (!link) return null;
      return link.startsWith("http") ? link : baseUrl + link;
    };

    return res.json({
      success: true,
      title: video.title || "TikTok Video",
      cover: normalize(video.cover),
      author: video.author ? video.author.nickname : "Unknown",
      duration: video.duration,
      hd_url: normalize(video.hdplay),       // 1080p / HD, no watermark (when TikTok provides it)
      sd_url: normalize(video.play),         // standard quality, no watermark
      music_url: normalize(video.music),     // audio only
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error. Baad mein try karein." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
