import initBudget from "./routes/pages/data/budget.json"
import { writable } from "svelte/store";

export const budget = writable(initBudget);

export function formatCurrency(value) {
    let Euro = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
    });
    return Euro.format(Math.floor(value))
}