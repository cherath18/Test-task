import { NextApiRequest, NextApiResponse } from "next";
import db from "../lib/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // Fetch jobs from the database
    try {
      const jobs = db.prepare("SELECT * FROM jobs").all();
      res.status(200).json(jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  } else if (req.method === "POST") {
    // Insert a new job into the database
    const { title, type, description } = req.body;

    if (!title || !type || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const stmt = db.prepare(
        "INSERT INTO jobs (title, type, description) VALUES (?, ?, ?)"
      );
      const info = stmt.run(title, type, description);

      res.status(201).json({
        id: info.lastInsertRowid,
        title,
        type,
        description,
      });
    } catch (error) {
      console.error("Error inserting job:", error);
      res.status(500).json({ error: "Failed to add job" });
    }
  } else if (req.method === "PUT") {
    // Update a job in the database
    const { id, title, type, description } = req.body;

    if (!id || !title || !type || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      const stmt = db.prepare(
        "UPDATE jobs SET title = ?, type = ?, description = ? WHERE id = ?"
      );
      const result = stmt.run(title, type, description, id);

      if (result.changes === 0) {
        return res.status(404).json({ error: "Job not found" });
      }

      res.status(200).json({ message: "Job updated successfully" });
    } catch (error) {
      console.error("Error updating job:", error);
      res.status(500).json({ error: "Failed to update job" });
    }
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
