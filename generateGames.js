const fs = require("fs");
const path = require("path");

// Folder where your HTML files live (root of repo)
const directoryPath = path.join(__dirname);

// Scan for all .html files
fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.error("Unable to scan directory:", err);
  }

  // Filter only .html files
  const games = files
    .filter(file => file.endsWith(".html"))
    .map(file => {
      return {
        name: file.replace(".html", ""), // strip extension for display
        url: file
      };
    });

  // Save to games.json
  fs.writeFileSync("games.json", JSON.stringify(games, null, 2));
  console.log("✅ games.json generated with", games.length, "entries");
});
