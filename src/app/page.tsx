"use client";
import { Container, Paper, Typography } from "@mui/material";
import { motion } from "motion/react";

export default function Home() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Paper elevation={4} sx={{ padding: 4, textAlign: "center" }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to my site!
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                    This site uses Material UI and Framer Motion for cool
                    animations.
                </Typography>
            </Paper>
        </motion.div>
    );
}
