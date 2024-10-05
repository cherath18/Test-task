import db from "./db";

export function dropJobsListTable() {
  db.exec("DROP TABLE IF EXISTS jobsList");
}
