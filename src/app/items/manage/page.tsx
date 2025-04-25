"use client";
import {
    Container,
    Typography,
    TextField,
    Button,
    Grid,
    Paper,
    IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

type Item = {
    id: number;
    name: string;
    description: string;
    img: string;
};

export default function ManageItemsPage() {
    const [items, setItems] = useState<Item[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState("");
    const [editId, setEditId] = useState<number | null>(null);

    const fetchItems = async () => {
        const res = await fetch("/api/items");
        const data = await res.json();
        setItems(data.items || []);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const handleSubmit = async () => {
        const payload = { name, description, img };

        const url =
            editId !== null
                ? `/api/items/edit?id=${editId}`
                : "/api/items/create";
        const method = editId !== null ? "PUT" : "POST";

        await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        setName("");
        setDescription("");
        setImg("");
        setEditId(null);
        fetchItems();
    };

    const handleDelete = async (id: number) => {
        await fetch(`/api/items/delete?id=${id}`, { method: "DELETE" });
        fetchItems();
    };

    const startEdit = (item: Item) => {
        setEditId(item.id);
        setName(item.name);
        setDescription(item.description);
        setImg(item.img);
    };

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Typography variant="h4" gutterBottom>
                Items verwalten
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid item xs={12}>
                    <TextField
                        label="Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Beschreibung"
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Bild URL"
                        fullWidth
                        value={img}
                        onChange={(e) => setImg(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSubmit}>
                        {editId !== null ? "Ändern" : "Erstellen"}
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                {items.map((item) => (
                    <Grid item xs={12} key={item.id}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <div>
                                <Typography variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2">
                                    {item.description}
                                </Typography>
                            </div>
                            <div>
                                <IconButton
                                    onClick={() => startEdit(item)}
                                    color="primary"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDelete(item.id)}
                                    color="error"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
