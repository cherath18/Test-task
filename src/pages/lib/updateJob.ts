import db from "./db";

export function updateJob(
  id: number,
  title: string,
  type: string,
  description: string
) {
  const stmt = db.prepare(
    "UPDATE jobs SET title = ?, type = ?, description = ? WHERE id = ?"
  );
  stmt.run(title, type, description, id);
}
