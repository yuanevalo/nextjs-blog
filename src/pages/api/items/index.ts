import type { NextApiRequest, NextApiResponse } from "next";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

type Item = {
    id: number;
    name: string;
    description: string | null;
    img: string | null;
};

type ResponseData = { message: string } | { item: Item } | { items: Item[] };

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
    if (req.method !== "GET") {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    await openDatabase();

    const { id } = req.query;

    try {
        if (id) {
            const item = await db!.get<Item>(
                `SELECT * FROM items WHERE id = ?`,
                Number(id),
            );

            if (!item) {
                return res.status(404).json({ message: "Item not found" });
            }

            res.status(200).json({ item });
        } else {
            const items = await db!.all<Item[]>(`SELECT * FROM items`);
            res.status(200).json({ items });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({ message: `Database error: ${error.message}` });
    }
}
