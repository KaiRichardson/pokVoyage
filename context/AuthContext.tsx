import { clearSession, getSession, getStoredUsers, saveUsers, setSession } from "@/lib/storage";
import type { User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
	signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		loadSession();
	}, []);

	async function loadSession() {
		try {
			const userId = await getSession();
			if (userId) {
				const usersJson = await getStoredUsers();
				const users: Record<string, User> = JSON.parse(usersJson) || {};
				if (users[userId]) {
					setUser(users[userId]);
				}
			}
		} catch (e) {
			console.error("Load session error:", e);
		} finally {
			setIsLoading(false);
		}
	}

	async function login(email: string, password: string) {
		try {
			const raw = await getStoredUsers();
			const users: Record<string, User> = JSON.parse(raw) || {};
			const found = Object.values(users).find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
			if (found) {
				await setSession(found.id);
				setUser(found);
				return { success: true };
			}
			return { success: false, error: "Invalid email or password" };
		} catch {
			return { success: false, error: "Something went wrong" };
		}
	}

	async function signup(email: string, password: string, name: string) {
		try {
			const raw = await getStoredUsers();
			const users: Record<string, User> = JSON.parse(raw) || {};
			const exists = Object.values(users).some((u) => u.email.toLowerCase() === email.toLowerCase());
			if (exists) {
				return { success: false, error: "Email already registered" };
			}
			const id = `user_${Date.now()}_${Math.random().toString(36).slice(2)}`;
			const newUser: User = { id, email, name, password };
			users[id] = newUser;
			await saveUsers(JSON.stringify(users));
			await setSession(id);
			setUser(newUser);
			return { success: true };
		} catch {
			return { success: false, error: "Something went wrong" };
		}
	}

	async function logout() {
		await clearSession();
		setUser(null);
	}

	return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within AuthProvider");
	return ctx;
}
