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
import { CalendarMonth as CalendarIcon } from "@mui/icons-material";

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (!news) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Typography variant="h6" color="error">
          ❌ News not found.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          color="primary.main"
        >
          {news.title}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
            mb: 2,
          }}
        >
          <CalendarIcon sx={{ fontSize: 20, mr: 1 }} />
          <Typography variant="body2">
            Published on {new Date(news.createdAt).toLocaleDateString("en-GB")}
          </Typography>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Render HTML content */}
        <Box
          sx={{
            "& h1, & h2, & h3": {
              fontWeight: "bold",
              mt: 3,
              mb: 1,
            },
            "& p": {
              fontSize: "1rem",
              color: "#444",
              mb: 2,
              lineHeight: 1.8,
            },
            "& ul": {
              pl: 3,
              mb: 2,
            },
            "& a": {
              color: "#1976d2",
              textDecoration: "underline",
              fontWeight: 500,
            },
            "& table": {
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: 20,
              mt: 3,
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
          }}
          dangerouslySetInnerHTML={{ __html: news.description }}
        />

        <Divider sx={{ my: 4 }} />

        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          <Chip label="Study News" color="primary" />
        </Box>
      </Paper>
    </Container>
  );
}
