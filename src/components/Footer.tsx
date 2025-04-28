"use client";
import { Container, Typography, Link, Box, Grid } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                backgroundColor: "#333",
                color: "white",
                py: 4,
                mt: 5,
                textAlign: "center",
            }}
        >
            <Grid container spacing={2} justifyContent="center">
                <Link href="#" color="inherit" underline="none">
                    Privacy Policy
                </Link>
                <Link href="#" color="inherit" underline="none">
                    Terms of Service
                </Link>
                <Link href="#" color="inherit" underline="none">
                    Support
                </Link>
            </Grid>

            <Typography variant="body2" sx={{ mt: 3 }}>
                &copy; 2025 My Blog. All rights reserved.
            </Typography>
        </Box>
    );
}
