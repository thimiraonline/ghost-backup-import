# Ghost Backup Import Tool

A simple Node.js script to **import Ghost CMS database backups** directly via the Ghost Admin API.  
This tool is useful when the Ghost Admin UI cannot handle large files (e.g., when restoring a large blog backup).

---

## ✨ Features
- Import Ghost CMS `.json` backup files programmatically
- Works with **self-hosted Ghost** or **Ghost(Pro)**
- Uses **JWT authentication** with your Staff Token API key
- Clean `.env` configuration (just your API key, base URL, and backup path)

---

## 📦 Requirements
- [Node.js](https://nodejs.org/) v16+
- A Ghost Admin Staaf Token API key (`<id>:<secret>`)
  - Generate one in Ghost Admin → *Settings* → *Staff* → *Administrator Profile*.

---

## ⚙️ Setup

1. **Clone this repo**
   ```bash
   git clone https://github.com/thimiraonline/ghost-backup-import.git
   cd ghost-backup-import

2. **Install dependencies**
   ```bash
   git clone https://github.com/thimiraonline/ghost-backup-import.git
   cd ghost-backup-import

3. **Configure environment variables**
    Copy .env.example` to `.env` and edit:
    ```bash
        `cp .env.example .env`


Example `.env`:

        # Ghost Admin API Key (format: <id>:<secret>)
        GHOST_ADMIN_API_KEY=YOUR_ADMIN_API_KEY_HERE

        # Base Ghost URL
        GHOST_URL=https://yourdomain.com/ghost/api/admin

        # Path to your backup file
        BACKUP_FILE=./backup.json

▶️ Usage
--------

Run the importer with:

    node import.js

✅ On success:

`Backup imported successfully!`

❌ On failure:

`Error: Import failed: 422 Unprocessable Entity`

* * * * *

📂 Project Structure
--------------------

        ghost-backup-import/
        ├── import.js       # Import script
        ├── package.json    # Dependencies
        ├── .env.example    # Example env file
        ├── README.md       # This file

* * * * *

🛠 Troubleshooting
------------------

-   **`422 Unprocessable Entity: Please select a database file`**\
    → Make sure `BACKUP_FILE` points to an existing `.json` file.

-   **`403 Forbidden`**\
    → Double-check your `GHOST_ADMIN_API_KEY`. It must be in `<id>:<secret>` format.

-   **Timeouts (408)**\
    → Increase `client_max_body_size` in Nginx if your file is large (e.g., `5G;`).

* * * * *

🔮 Future Plans
---------------

-   Add `export.js` script to automate Ghost database exports

-   Support Dockerized Ghost migration workflows

-   CLI tool packaging (`npx ghost-backup-import`)

* * * * *

📜 License
----------

MIT License -- feel free to use, modify, and share.

* * * * *

🌟 Contributing
---------------

PRs are welcome! If you find a bug or want to suggest a feature, open an issue.