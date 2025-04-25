"use client";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { motion } from "motion/react";
import { useState } from "react";

interface Items {
    name: string;
    href: string;
}

const items: Items[] = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Items",
        href: "/items",
    },
    {
        name: "Manage",
        href: "/items/manage",
    },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const appbar = (
        <AppBar>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleToggle}
                    sx={{ mr: 2, display: { sm: "none" } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className="grow-1 text-5xl">My Blog</Typography>
                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    {items.map((item) => (
                        <Button key={item.name} href={item.href}>
                            <Typography className="text-white">
                                {item.name}
                            </Typography>
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    );

    const drawer = (
        <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleToggle}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: 300,
                },
            }}
        >
            <Box onClick={handleToggle} sx={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ my: 2 }}>
                    My Blog
                </Typography>
                <Divider />
                <List>
                    {items.map((item) => (
                        <ListItem key={item.name} disablePadding>
                            <ListItemButton
                                sx={{ textAlign: "center" }}
                                href={item.href}
                            >
                                <ListItemText>{item.name}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Drawer>
    );

    return (
        <>
            {appbar}
            {drawer}
        </>
    );
}
