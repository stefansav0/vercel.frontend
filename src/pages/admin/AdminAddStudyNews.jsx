import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import TipTapEditor from "../../components/TipTapEditor";

const initialState = {
  title: "",
  description: "",
};

export default function AdminAddStudyNews() {
  const [news, setNews] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNews((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!news.title || !news.description) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/study-news", news);
      alert("✅ Study news posted successfully!");
      setNews(initialState);
    } catch (error) {
      console.error("Error submitting study news:", error);
      alert("❌ Failed to submit news");
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" className="text-blue-700 font-semibold mb-4">
          Add Study News
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title Field */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Title <span className="text-red-600">*</span>
              </Typography>
              <TextField
                fullWidth
                name="title"
                placeholder="Enter news title"
                value={news.title}
                onChange={handleChange}
                required
              />
            </Grid>

            {/* Rich Description Field */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Description <span className="text-red-600">*</span>
              </Typography>
              <TipTapEditor
                content={news.description}
                onChange={(value) =>
                  setNews((prev) => ({ ...prev, description: value }))
                }
              />
              <Typography
                variant="caption"
                display="block"
                sx={{ mt: 1 }}
                className="text-sm text-gray-600"
              >
                You can paste images or use HTML-friendly formatting.
              </Typography>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ px: 4, py: 1.5 }}
              >
                Publish News
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
