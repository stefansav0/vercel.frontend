import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  conductedby: "",
  examDate: "",
  applicationBegin: "",
  lastDateApply: "",
  admitCard: "",
  publishDate: "",
  description: "",
  howToDownload: "",
  importantLinks: {
    downloadAdmitCard: "",
    officialWebsite: "",
  },
};

const AdminAddAdmitCard = () => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  const isEdit = !!slug;

  useEffect(() => {
    if (!isEdit) return;

    axios
      .get(`http://localhost:5000/api/admit-cards/${slug}`)
      .then((res) => {
        if (res.data) {
          setFormData(res.data);
        } else {
          setError("Admit Card not found");
        }
      })
      .catch(() => setError("Failed to fetch admit card"));
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("importantLinks.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        importantLinks: { ...prev.importantLinks, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/admit-cards/${slug}`,
          formData
        );
        alert("✅ Admit Card updated!");
      } else {
        await axios.post("https://vercel-backend-66m8.onrender.com/api/admit-cards", formData);
        alert("✅ Admit Card created!");
      }
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save admit card");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {isEdit ? "Edit Admit Card" : "Add New Admit Card"}
        </Typography>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            {/* Fields Matching Schema */}
            {[
              { label: "Title", name: "title" },
              { label: "Conducted By", name: "conductedby" },
              { label: "Exam Date", name: "examDate" },
              { label: "Application Begin", name: "applicationBegin" },
              { label: "Last Date to Apply", name: "lastDateApply" },
              { label: "Admit Card Release", name: "admitCard" },
              { label: "Publish Date", name: "publishDate" },
            ].map(({ label, name }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  value={formData[name] || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Grid>
            ))}

            {/* Description */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>

            {/* How to Download */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="How to Download Admit Card"
                name="howToDownload"
                value={formData.howToDownload || ""}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>

            {/* Important Links */}
            <Divider flexItem sx={{ my: 3, width: "100%" }}>
              Important Links
            </Divider>
            {[
              { label: "Download Admit Card", name: "downloadAdmitCard" },
              { label: "Official Website", name: "officialWebsite" },
            ].map(({ label, name }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  label={label}
                  name={`importantLinks.${name}`}
                  value={formData.importantLinks?.[name] || ""}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </Grid>
            ))}

            {/* Submit */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                {isEdit ? "Update" : "Submit"} Admit Card
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default AdminAddAdmitCard;
