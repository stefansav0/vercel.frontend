import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Divider,
  Chip,
  Paper,
} from "@mui/material";

export default function StudyNewsDetail() {
  const { slug } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://vercel-backend-66m8.onrender.com/api/study-news/slug/${slug}`
        );
        setNews(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching study news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!news) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="error">
          ❌ News not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {news.title}
        </Typography>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          gutterBottom
        >
          Published on {new Date(news.createdAt).toLocaleDateString("en-GB")}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Rich HTML content */}
        <Box
          className="prose prose-sm sm:prose lg:prose-lg max-w-none"
          sx={{
            mt: 2,
            "& table": {
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ccc",
              marginTop: 2,
            },
            "& th, & td": {
              border: "1px solid #ccc",
              padding: "8px",
              textAlign: "left",
            },
            "& th": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
            "& a": {
              color: "#1976d2",
              textDecoration: "underline",
              fontWeight: 500,
            },
            "& ul": {
              pl: 3,
            },
          }}
          dangerouslySetInnerHTML={{ __html: news.description }}
        />

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip label="Study News" color="primary" />
          <Chip label="UP Board" variant="outlined" />
          <Chip label="Exam 2025" variant="outlined" />
        </Box>
      </Paper>
    </Container>
  );
}
