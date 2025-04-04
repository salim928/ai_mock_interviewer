'use server';

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; // 1 week

export async function signUp(params: SignUpParams) {
    const { uid, name, email } = params;

    try {
        const userRecord = await db.collection("users").doc(uid).get();

        if (userRecord.exists) {
            return {
                success: false,
                message: "User already exists",
            };
        }

        await db.collection("users").doc(uid).set({
            name,
            email,
        });

        return {
            success: true,
            message: "Account created successfully. Please sign in.",
        };
    } catch (e: unknown) { // Use `unknown` for better type safety
        console.error("Error signing up user:", e);

        // Narrow down the type of `e` to check for specific properties
        if (e instanceof Error && (e as { code?: string })?.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: "Email already exists",
            };
        }

        return {
            success: false,
            message: "Failed to sign up user",
        };
    }
}

export async function signIn(params: SignInParams) {
    const { email, idToken } = params;

    try {
        const userRecord = await auth.getUserByEmail(email);

        if (!userRecord) {
            return {
                success: false,
                message: "User does not exist. Create an account instead.",
            };
        }

        await setSessionCookie(idToken);

        return {
            success: true,
            message: "Logged in successfully.",
        };
    } catch (error) {
        console.error("Error during sign-in:", error);

        return {
            success: false,
            message: "Failed to log into an account",
        };
    }
}

export async function setSessionCookie(idToken: string) {
    try {
        const cookieStore = await cookies();
        const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: ONE_WEEK * 1000 });

        console.log("Session Cookie Created:", sessionCookie);

        cookieStore.set("session", sessionCookie, {
            maxAge: ONE_WEEK,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
        });

        console.log("Session Cookie Set");
    } catch (error) {
        console.error("Error setting session cookie:", error);
        throw new Error("Failed to set session cookie");
    }
}

export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get("session")?.value;

        console.log("Session Cookie Retrieved:", sessionCookie);

        if (!sessionCookie) {
            console.log("No session cookie found");
            return null;
        }

        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        console.log("Decoded Claims:", decodedClaims);

        const userRecord = await db
            .collection("users")
            .doc(decodedClaims.uid)
            .get();

        if (!userRecord.exists) {
            console.log("User record not found");
            return null;
        }

        return {
            ...userRecord.data(),
            id: userRecord.id,
        } as User;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}

export async function isAuthenticated() {
    const user = await getCurrentUser();
    console.log("Authenticated User:", user);

    return !!user;
}