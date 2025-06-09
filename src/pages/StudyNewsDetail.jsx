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
        alignItems="center"
        justifyContent="center"
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
        alignItems="center"
        justifyContent="center"
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
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {news.title}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Published on{" "}
          {new Date(news.createdAt).toLocaleDateString("en-GB")}
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box
          className="prose prose-sm sm:prose lg:prose-lg max-w-none"
          sx={{
            mt: 2,
            "& table": {
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 2,
            },
            "& th, & td": {
              border: "1px solid #ddd",
              padding: "10px",
              textAlign: "left",
            },
            "& th": {
              backgroundColor: "#f9f9f9",
              fontWeight: "bold",
            },
            "& a": {
              color: "#1976d2",
              textDecoration: "underline",
              fontWeight: 500,
            },
            "& ul": {
              paddingLeft: 3,
            },
          }}
          dangerouslySetInnerHTML={{ __html: news.description }}
        />

        <Divider sx={{ my: 4 }} />

        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip label="Study News" color="primary" />
        </Box>
      </Paper>

      {/* Optional Back Button */}
      <Box mt={3}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          href="/study-news"
        >
          Back to News
        </Button>
      </Box>
    </Container>
  );
}
