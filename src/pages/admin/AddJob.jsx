import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const initialState = {
  title: "",
  department: "",
  eligibility: "",
  category: "",
  description: "",
  applyLink: "",
  lastDate: "",
  ageLimit: "",
  applicationFee: "",
  vacancy: "",
  importantDates: {
    applicationBegin: "",
    lastDateApply: "",
    lastDateFee: "",
    examDate: "",
    admitCard: "",
  },
  importantLinks: {
    applyOnline: "",
    downloadNotification: "",
    officialWebsite: "",
  },
};

export default function AddJob() {
  const [jobData, setJobData] = useState(initialState);
  const [auth, setAuth] = useState(false);
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const feeEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setJobData((prev) => ({ ...prev, applicationFee: editor.getHTML() }));
    },
  });

  const vacancyEditor = useEditor({
    extensions: [StarterKit],
    content: "",
    onUpdate: ({ editor }) => {
      setJobData((prev) => ({ ...prev, vacancy: editor.getHTML() }));
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [group, key] = name.split(".");
      setJobData((prev) => ({
        ...prev,
        [group]: { ...prev[group], [key]: value },
      }));
    } else {
      setJobData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleanedJobData = {
      ...jobData,
      applyLink: jobData.applyLink.trim().replace(/,+$/, ""),
      lastDate: jobData.lastDate.trim(),
      title: jobData.title.trim(),
      department: jobData.department.trim(),
      category: jobData.category.trim(),
      eligibility: jobData.eligibility.trim(),
      ageLimit: jobData.ageLimit.trim(),
      description: jobData.description.trim(),
    };

    console.log("Submitting job data:", cleanedJobData);

    try {
      const res = await axios.post("http://localhost:5000/api/jobs", cleanedJobData);
      alert("✅ Job added successfully!");
      console.log("Submitted:", res.data);
      setJobData(initialState);
      feeEditor?.commands.setContent("");
      vacancyEditor?.commands.setContent("");
    } catch (err) {
      console.error("❌ Error:", err.response?.data || err.message);
      alert("❌ Failed to add job");
    }
  };

  if (!auth) {
    return (
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-xl font-bold mb-4">🔐 Admin Access</h1>
        <input
          type="password"
          value={secret}
          placeholder="Enter secret key"
          onChange={(e) => setSecret(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <button
          onClick={() => {
            if (secret === import.meta.env.VITE_ADMIN_SECRET) {
              setAuth(true);
            } else {
              alert("❌ Wrong secret");
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Unlock Form
        </button>
      </div>
    );
  }

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", p: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add New Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              ["title", "Title"],
              ["department", "Department"],
              ["eligibility", "Eligibility"],
              ["category", "Category"],
              ["ageLimit", "Age Limit"],
              ["applyLink", "Apply Link"],
              ["lastDate", "Last Date (YYYY-MM-DD)"],
            ].map(([name, label]) => (
              <Grid item key={name} xs={12} md={6}>
                <TextField
                  fullWidth
                  required={name !== "ageLimit"}
                  name={name}
                  label={label}
                  value={jobData[name]}
                  onChange={handleChange}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                name="description"
                label="Job Description"
                multiline
                rows={4}
                value={jobData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }}>💸 Application Fee</Divider>
              <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
                <EditorContent editor={feeEditor} />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }}>📌 Vacancy Details</Divider>
              <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 1 }}>
                <EditorContent editor={vacancyEditor} />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }}>📅 Important Dates</Divider>
            </Grid>
            {Object.keys(jobData.importantDates).map((field) => (
              <Grid item key={`importantDates.${field}`} xs={12} md={6}>
                <TextField
                  fullWidth
                  label={field.replace(/([A-Z])/g, " $1")}
                  name={`importantDates.${field}`}
                  value={jobData.importantDates[field]}
                  onChange={handleChange}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Divider sx={{ mb: 2 }}>🔗 Important Links</Divider>
            </Grid>
            {Object.entries(jobData.importantLinks).map(([key, val]) => (
              <Grid item key={`importantLinks.${key}`} xs={12} md={6}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, " $1")}
                  name={`importantLinks.${key}`}
                  value={val}
                  onChange={handleChange}
                />
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
