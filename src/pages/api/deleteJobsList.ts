// pages/api/deleteJobsList.ts

import { NextApiRequest, NextApiResponse } from "next";
import { dropJobsListTable } from "../lib/dropTable";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      dropJobsListTable();
      res.status(200).json({ message: "jobsList table deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete jobsList table" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
