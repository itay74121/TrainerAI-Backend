import { readFileSync, writeFileSync, existsSync, mkdir, mkdirSync } from "fs";
import { z } from "zod";
import * as path from "path";

const LogRecordSchema = z.object({
    id: z.number(),
    timestamp: z.string(),
    data: z.any(),
});

type LogRecord = z.infer<typeof LogRecordSchema>;

// Explicit log group keys and shape to avoid unsafe indexing against the Zod schema
type LogGroupKey = "log" | "info" | "warn" | "error";
type LogDataShape = {
    log: LogRecord[];
    info: LogRecord[];
    warn: LogRecord[];
    error: LogRecord[];
};

const LogDataSchema = z.object({
    log: z.array(LogRecordSchema),
    info: z.array(LogRecordSchema),
    warn: z.array(LogRecordSchema),
    error: z.array(LogRecordSchema),
});

export class Logger {
    private filename: string | undefined | null = null;
    private data: LogDataShape | undefined | null = null;

    public constructor(filename: string) {
        this.filename = filename;
        if (this.filename) {
            this.filename = path.resolve(filename);
        }
        this.create();
        this.load();
    }

    private create() {
        if (this.filename) {
            if (!existsSync(this.filename)) {
                const dirs = this.filename.split("\\").filter((x) => x);
                const path = dirs.slice(0, dirs.length - 1).join("\\");
                mkdirSync(path, { recursive: true });
                writeFileSync(dirs.join("\\"), "{}");
            }
        }
    }

    private save() {
        if (this.filename) {
            writeFileSync(this.filename, JSON.stringify(this.data));
        }
    }

    private load() {
        if (this.filename) {
            try {
                const raw = JSON.parse(readFileSync(this.filename, "utf8"));
                const parsed = LogDataSchema.safeParse(raw);
                if (parsed.success) {
                    this.data = parsed.data;
                } else {
                    this.data = { log: [], info: [], warn: [], error: [] };
                }
            } catch {
                this.data = { log: [], info: [], warn: [], error: [] };
            }
        } else {
            this.data = { log: [], info: [], warn: [], error: [] };
        }
    }

    private handleAddRecord(record: LogRecord, type: LogGroupKey) {
        if (!this.data) return;

        const group = (this.data as LogDataShape)[type];
        const lastRecord = group ? group[group.length - 1] : undefined;
        if (lastRecord) {
            group.push({
                id: lastRecord.id + 1,
                timestamp: new Date().toISOString(),
                data: record,
            });
        } else {
            group.push({
                id: 1,
                timestamp: new Date().toISOString(),
                data: record,
            });
        }
        this.save();
    }

    public log(message: object) {
        this.handleAddRecord(message as LogRecord, "log");
    }

    public error(message: object) {
        this.handleAddRecord(message as LogRecord, "error");
    }

    public warn(message: object) {
        this.handleAddRecord(message as LogRecord, "warn");
    }

    public info(message: object) {
        this.handleAddRecord(message as LogRecord, "info");
    }
}
