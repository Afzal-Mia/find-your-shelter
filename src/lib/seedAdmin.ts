import bcrypt from "bcryptjs";
import User from "@/models/User";

export async function seedAdmin() {
    try {
        const name = process.env.ADMIN_NAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!name || !email || !password) {
            console.warn("⚠️ ADMIN_NAME, ADMIN_EMAIL or ADMIN_PASSWORD missing.");
            return;
        }

        const existing = await User.findOne({ email });

        if (existing) {
            console.log("✅ Super Admin already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
            role: "superAdmin",
            isEmailVerified: true,
            isBlocked: false,
        });

        console.log("✅ Super Admin created.");
    } catch (error) {
        console.error("❌ Failed to seed Super Admin:", error);
    }
}