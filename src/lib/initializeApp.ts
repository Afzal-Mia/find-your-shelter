import { seedAdmin } from "./seedAdmin";

let initialized = false;

export async function initializeApp() {
    if (initialized) return;

    await seedAdmin();

    initialized = true;
}