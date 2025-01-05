import {object, string} from "zod";

export const signUpSchema = object({
    email: string({required_error: "Email is required"}).email("Invalid email"),
    password: string({required_error: "Password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password must be at most 32 characters"),
    name: string({required_error: "Name is required"})  // Добавил поле name
})

export const signInSchema = object({
    email: string({required_error: "Email is required"}).email("Invalid email"),
    password: string({required_error: "Password is required"})
})