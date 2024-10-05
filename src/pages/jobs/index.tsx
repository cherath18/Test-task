import { Formik, Form, Field } from "formik";
import Modal from "react-modal";
import useJobManager from "../hook/useJobManager";

// Make sure the modal root element is available
Modal.setAppElement("#__next");

const JobTable = () => {
  // Ccustom hook
  const { jobs, editingJob, isModalOpen, openModal, closeModal, saveJob } =
    useJobManager();

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
          <Formik initialValues={editingJob} onSubmit={saveJob}>
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
