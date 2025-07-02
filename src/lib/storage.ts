import { FormData } from "@/types/FormData";

const STORAGE_KEY = "selfAwarenessFormData";

export function saveFormData(data: FormData) {
    if (typeof window !== "undefined") {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Failed to save data to localStorage:", e);
        }
    }
}

export function loadFormData(): FormData | null {
    if(typeof window !== "undefined") {
        try {
            const item = localStorage.getItem(STORAGE_KEY);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.error("Failed to load data from localStorage:", e);
            return null;
        }
    }
    return null;
}

export function clearFormData() {
    if (typeof window !== "undefined") {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.error("Failed to clear localStorage:", e);
        }
    }
}