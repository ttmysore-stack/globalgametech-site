# Global Game Tech — Static Website

This repository contains the static website files for Global Game Tech.

## How to upload (Web UI)
1. Create a new repository on GitHub named `globalgametech-site`.
2. Click Add file > Upload files, and upload all files/folders from the unzipped folder.
3. Commit changes.

## How to deploy (CLI)
Run these commands inside the site folder:
```bash
git init
git add .
git commit -m "Initial site upload - Global Game Tech"
git branch -M main
git remote add origin https://github.com/ttmysore-stack/globalgametech-site.git
git push -u origin main
```

## Netlify
1. Add new site > Import from Git > GitHub > select repo.
2. Build command: (leave blank); Publish directory: /