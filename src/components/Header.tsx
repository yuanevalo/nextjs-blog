"use client";
import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { motion } from "motion/react";

export default function Header() {
    return (
        <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <AppBar position="sticky">
                <Toolbar>
                    <Container
                        maxWidth="lg"
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h6">My Blog</Typography>

                        <div>
                            <Button
                                color="inherit"
                                href="/"
                                sx={{ marginRight: 2 }}
                            >
                                Home
                            </Button>
                            <Button
                                color="inherit"
                                href="/items"
                                sx={{ marginRight: 2 }}
                            >
                                Items
                            </Button>
                            <Button
                                color="inherit"
                                sx={{ marginRight: 2 }}
                                href="/items/manage"
                            >
                                Verwalten
                            </Button>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
}
