import { useState, useEffect } from "react";
import { fakerEN, fakerDE, fakerZH_CN } from "@faker-js/faker";

// Define the interface for a job object
interface Job {
  id: number;
  type: string;
  title: string;
  description: string;
}

// Custom Hook: useJobManager
const useJobManager = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Populate job data (fake data for now)
    const jobData: Job[] = [fakerEN, fakerDE, fakerZH_CN].map(
      (faker, index) => ({
        id: index + 1,
        type: faker.person.jobType(),
        title: faker.person.jobTitle(),
        description: faker.person.jobDescriptor(),
      })
    );

    setJobs(jobData);
  }, []);

  const openModal = (job: Job) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  const saveJob = async (values: Job) => {
    console.log(values, "---saveJob---");

    const response = await fetch("/api/jobs", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      const updatedJob = await response.json();
      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === updatedJob.id ? updatedJob : job))
      );
      closeModal(); // Close the modal after saving
      console.log("Job updated successfully:", updatedJob);
    } else {
      console.error("Failed to update job");
    }
  };

  return {
    jobs,
    editingJob,
    isModalOpen,
    openModal,
    closeModal,
    saveJob,
  };
};

export default useJobManager;
