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
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
      } catch (error) {
        console.error("Error fetching study news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [slug]);

  if (loading) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!news) {
    return (
      <Box
        height="80vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
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
        elevation={3}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          boxShadow: 6,
          backgroundColor: "#ffffff",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#1a202c" }}
        >
          {news.title}
        </Typography>

        {/* Date */}
        <Typography variant="body2" color="text.secondary" mb={2}>
          Published on {new Date(news.createdAt).toLocaleDateString("en-GB")}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* News Body */}
        <Box
          sx={{
            mt: 2,
            fontSize: "1rem",
            lineHeight: 1.8,
            "& table": {
              width: "100%",
              borderCollapse: "collapse",
              marginY: 2,
            },
            "& th, & td": {
              border: "1px solid #ddd",
              padding: "10px",
              textAlign: "left",
            },
            "& th": {
              backgroundColor: "#f0f0f0",
              fontWeight: 600,
            },
            "& a": {
              color: "#1976d2",
              textDecoration: "underline",
              fontWeight: 500,
            },
            "& ul": {
              paddingLeft: 3,
              marginTop: 1,
            },
          }}
          dangerouslySetInnerHTML={{ __html: news.description }}
        />

        <Divider sx={{ my: 4 }} />

        {/* Tags */}
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip label="Study News" color="primary" />
        </Box>
      </Paper>

      {/* Back Button */}
      {/* Back Link */}
      <div className="text-center mt-6">
        <Link to="/study-news" className="text-blue-600 hover:underline font-medium">
          ← Back to Study News
        </Link>
      </div>
    </Container>
  );
}
