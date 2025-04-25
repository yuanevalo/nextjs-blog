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
    if (req.method !== "DELETE") {
        res.setHeader("Allow", ["DELETE"]);
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: "Missing 'id'" });
    }

    try {
        await openDatabase();

        const result = await db!.run(`DELETE FROM items WHERE id = ?`, id);

        if (result.changes === 0) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item deleted successfully" });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        res.status(500).json({ message: `Database error: ${error.message}` });
    }
}
