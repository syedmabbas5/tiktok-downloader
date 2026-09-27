# TikTok Saver — Free HD Downloader

Simple website: TikTok link paste karo, HD (no watermark) video download link mil jata hai. Koi ads nahi.

## Kaise chalega (local test)

```bash
npm install
npm start
```

Phir browser mein `http://localhost:3000` kholein.

## Free hosting (Render.com — recommended)

1. GitHub par ek naya repository banayein aur ye poori folder upload/push kar dein.
2. [render.com](https://render.com) par free account banayein.
3. **New +** → **Web Service** → apna GitHub repo connect karein.
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
5. Deploy dabayein. 2-3 minute mein aapki website live ho jayegi (link kuch is tarah hoga: `https://your-app.onrender.com`).

## Free hosting (Railway.app — alternative)

1. [railway.app](https://railway.app) par account banayein.
2. **New Project** → **Deploy from GitHub repo**.
3. Railway khud detect kar lega ke Node.js app hai, `npm start` chala dega.
4. Free tier har mahine kuch hours free deta hai.

## Important notes

- Ye tool **tikwm.com** ki public API use karta hai TikTok video resolve karne ke liye. Agar TikTok apna system change kar de to kabhi kabhi ye API kaam karna band kar sakti hai — is case mein alternative API dhoondhni parh sakti hai.
- HD (1080p) link sirf tab milta hai jab TikTok khud us video ke liye HD version provide karta ho — har video ka HD version available nahi hota, aisi soorat mein SD (standard) link mil jayega.
- Sirf apni khud ki content ya jin videos download karne ki permission ho unhi ko download karein. Doosron ka content bina ijazat download/redistribute karna TikTok ke Terms of Service aur copyright law ke khilaf ho sakta hai.
- Ye free hosting tiers (Render/Railway) thodi der inactive rehne par "sleep" ho jate hain — pehli request thodi slow ho sakti hai jab tak server wake ho.

## Customize

- Design/colors `public/index.html` ke `<style>` section mein change kar sakte hain.
- Backend logic `server.js` mein hai.
