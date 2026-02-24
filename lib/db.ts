import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'enquiries.json');

// Ensure the data directory exists
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}

// Ensure the file exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify([], null, 2));
}

export interface Enquiry {
    id: string;
    name: string;
    phoneNumber: string;
    email: string;
    solution: string;
    timestamp: string;
}

export function getEnquiries(): Enquiry[] {
    try {
        const data = fs.readFileSync(DB_PATH, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading enquiries:', error);
        return [];
    }
}

export function saveEnquiry(enquiry: Omit<Enquiry, 'id' | 'timestamp'>) {
    const enquiries = getEnquiries();
    const newEnquiry: Enquiry = {
        ...enquiry,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toISOString(),
    };
    enquiries.push(newEnquiry);
    fs.writeFileSync(DB_PATH, JSON.stringify(enquiries, null, 2));
    return newEnquiry;
}
