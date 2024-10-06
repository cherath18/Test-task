import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fakerEN, fakerDE, fakerZH_CN } from "@faker-js/faker";
import { AppDispatch, RootState } from "@test-task/store/store";
import {
  setJobs,
  setEditingJob,
  setModalOpen,
  updateJob,
} from "@test-task/store/jobsSlice";
import { Job } from "@test-task/types/jobs";

const useJobManager = () => {
  const dispatch: AppDispatch = useDispatch();
  const { jobs, editingJob, isModalOpen } = useSelector(
    (state: RootState) => state.jobs
  );

  useEffect(() => {
    // Populate job data (fake data for now)
    const jobData = [fakerEN, fakerDE, fakerZH_CN].map((faker, index) => ({
      id: index + 1,
      type: faker.person.jobType(),
      title: faker.person.jobTitle(),
      description: faker.person.jobDescriptor(),
    }));

    dispatch(setJobs(jobData));
  }, [dispatch]);

  const openModal = (job: Job) => {
    dispatch(setEditingJob(job));
    dispatch(setModalOpen(true));
  };

  const closeModal = () => {
    dispatch(setModalOpen(false));
    dispatch(setEditingJob(null));
  };

  const saveJob = async (values: Job) => {
    try {
      const response = await fetch("/api/jobs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const updatedJob = await response.json();
        // Dispatch update to the Redux store
        dispatch(updateJob(updatedJob));
        // Immediately reflect the change by closing the modal
        closeModal();
      } else {
        console.error("Failed to update job");
      }
    } catch (error) {
      console.error("Error during job update:", error);
    }
  };

  return { jobs, editingJob, isModalOpen, openModal, closeModal, saveJob };
};

export default useJobManager;
