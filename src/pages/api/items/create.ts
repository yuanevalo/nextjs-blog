import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

type ResponseData = {
    message: string;
};

let db: Database | null = null;

async function openDatabase() {
    if (!db) {
        db = await open({
            filename: "./database.db",
            driver: sqlite3.Database,
        });
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>,
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, description, img } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Missing 'name' field" });
    }

    try {
        await openDatabase();

        await db!.run(
            `INSERT INTO items (name, description, img) VALUES (?, ?, ?)`,
            name,
            description || null,
            img || null,
        );

        res.status(201).json({ message: "Item successfully created" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({ message: `Database error: ${error.message}` });
    }
}
