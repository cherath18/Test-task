import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import Modal from "react-modal";
import { RootState } from "../store/store";
import { setJobs } from "../store/jobsSlice";
import useJobManager from "@test-task/pages/hook/useJobManager";
import { Job } from "@test-task/types/jobs";

// Make sure the modal root element is available
Modal.setAppElement("#__next");

const JobTable = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state: RootState) => state.jobs.jobs);

  // Custom hook
  const { editingJob, isModalOpen, openModal, closeModal, saveJob } =
    useJobManager();

  // Fetch jobs
  const fetchJobs = async () => {
    try {
      const response = await fetch("/api/jobs");
      const data = await response.json();
      dispatch(setJobs(data)); // Update Redux state with fetched jobs
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    }
  };

  // Fetch jobs only once on mount
  useEffect(() => {
    if (jobs.length === 0) {
      fetchJobs();
    }
  }, [dispatch]);

  // Handle delete job and refetch job list
  //   const handleDeleteJob = async (id: number) => {
  //     try {
  //       await fetch(`/api/jobs/${id}`, { method: "DELETE" });
  //       await fetchJobs(); // Refetch jobs after deletion
  //     } catch (error) {
  //       console.error("Failed to delete job", error);
  //     }
  //   };

  // Override saveJob to refetch job list after saving
  const handleSaveJob = async (jobData: Job) => {
    await saveJob(jobData);
    await fetchJobs(); // Refetch jobs after saving
  };

  return (
    <div className="container">
      <h1 className="title">Jobs-List</h1>
      {jobs && jobs.length > 0 ? (
        <table className="jobs_table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Job Type</th>
              <th>Job Descriptor</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td data-label="Job Title:">{job.title}</td>
                <td data-label="Job Type:">{job.type}</td>
                <td data-label="Job Descriptor:">{job.description}</td>
                <td data-label="Actions:">
                  <button className="edit-btn" onClick={() => openModal(job)}>
                    Edit
                  </button>
                  {/* <button onClick={() => handleDeleteJob(job.id)}>
                    Delete
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-[40px] text-stone-950">Loading...</div>
      )}

      {editingJob && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Edit Job"
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              maxWidth: "400px",
              maxHeight: "420px",
              margin: "auto",
              padding: "20px",
            },
          }}
        >
          <Formik initialValues={editingJob} onSubmit={handleSaveJob}>
            {({ values }) => (
              <Form className="form_layout">
                <div className="modal_header">
                  <h2>Edit Job</h2>
                  <button className="close_btn" onClick={closeModal}>
                    ×
                  </button>
                </div>
                <div className="form_group">
                  <label>Job Title:</label>
                  <Field
                    className="input_field"
                    name="title"
                    type="text"
                    value={values.title}
                  />
                </div>
                <div className="form_group">
                  <label>Job Type:</label>
                  <Field
                    className="input_field"
                    name="type"
                    type="text"
                    value={values.type}
                  />
                </div>
                <div className="form_group">
                  <label>Job Descriptor:</label>
                  <Field
                    className="input_field"
                    name="description"
                    type="text"
                    value={values.description}
                  />
                </div>
                <div className="modal_footer">
                  <button type="submit" className="common_btn save_btn">
                    Save
                  </button>
                  <button
                    type="button"
                    className="common_btn cancel_btn"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};

export default JobTable;
