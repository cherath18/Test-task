import { NextApiRequest, NextApiResponse } from "next";
import { updateJob } from "../lib/updateJob";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, title, type, description } = req.body;

    try {
      updateJob(id, title, type, description);
      res.status(200).json({ message: "Job updated successfully" });
    } catch (error) {
      console.log(error, "error");
      res.status(500).json({ error: "Failed to update job" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
