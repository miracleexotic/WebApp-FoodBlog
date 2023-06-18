import sqlite3
import json

file_json = "../../posts.json"
file_db = "WebApp-FoodBlog.db"

conn = sqlite3.connect(file_db)

conn.execute("PRAGMA foreign_keys = 0")
conn.execute("DELETE FROM posts WHERE id <= 7")
conn.execute("PRAGMA foreign_keys = 1")

conn.execute("DELETE FROM posts WHERE deleted_at NOT NULL")
conn.execute("DELETE FROM posts WHERE author_id = 0")

cursor = conn.execute("SELECT title, preview, subject from posts")

file_data = {}
with open(file_json, "r") as file:
    try:
        file_data = json.load(file)
    except:
        pass
try:
    print(type(file_data['Data']))
except:
    file_data = {"Data": []}

for row in cursor:
    file_data["Data"].append({
        "Title": row[0],
        "Preview": row[1],
        "Subject": row[2],
    })

with open(file_json, "w") as file:
    json.dump(file_data, file, indent = 4)


