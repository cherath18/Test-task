import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Job {
  id: number;
  type: string;
  title: string;
  description: string;
}

interface JobsState {
  jobs: Job[];
  editingJob: Job | null;
  isModalOpen: boolean;
}

const initialState: JobsState = {
  jobs: [],
  editingJob: null,
  isModalOpen: false,
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    setEditingJob: (state, action: PayloadAction<Job | null>) => {
      state.editingJob = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      state.jobs = state.jobs.map((job) =>
        job.id === action.payload.id ? action.payload : job
      );
    },
    deleteJob: (state, action: PayloadAction<number>) => {
      state.jobs = state.jobs.filter((job) => job.id !== action.payload);
    },
  },
});

export const { setJobs, setEditingJob, setModalOpen, updateJob, deleteJob } =
  jobsSlice.actions;
export default jobsSlice.reducer;
