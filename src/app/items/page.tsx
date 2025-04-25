"use client";
import {
    Container,
    Paper,
    Typography,
    Grid,
    CircularProgress,
} from "@mui/material";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Image from "next/image";

type Item = {
    id: number;
    name: string;
    description: string | null;
    img: string | null;
};

export default function Items() {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("/api/items");
                const data = await res.json();
                setItems(data.items || []);
            } catch (error) {
                console.error("Fehler beim Laden der Items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: 10 }}>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Typography variant="h4" gutterBottom>
                    Items
                </Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container spacing={3}>
                        {items.map((item) => (
                            <Grid item xs={12} key={item.id}>
                                <Paper elevation={3} sx={{ p: 2 }}>
                                    <Typography variant="h6">
                                        {item.name}
                                    </Typography>
                                    {item.description && (
                                        <Typography
                                            variant="body2"
                                            sx={{ mt: 1 }}
                                        >
                                            {item.description}
                                        </Typography>
                                    )}
                                    {item.img && (
                                        <Image
                                            src={item.img}
                                            alt={item.name}
                                            width={500}
                                            height={300}
                                            style={{
                                                marginTop: 8,
                                                borderRadius: 8,
                                                width: "100%",
                                                height: "auto",
                                            }}
                                        />
                                    )}
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </motion.div>
        </Container>
    );
}
