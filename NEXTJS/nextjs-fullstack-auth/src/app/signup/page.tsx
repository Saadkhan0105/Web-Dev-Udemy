'use client';
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios";
import toast from "react-hot-toast";




export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const onSignUp = async() =>{
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success",response.data);
            router.push("/login");
            toast.success("Signup successful");
        } catch (error: any) {
            console.log("Signup failed",error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }


    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Sign Up"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input 
            className="border-2 border-gray-300 rounded-md p-2 mb-4"
            id="username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
            type="text" />
            <label htmlFor="email">email</label>
            <input 
            className="border-2 border-gray-300 rounded-md p-2 mb-4"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
            type="text" />
            <label htmlFor="password">password</label>
            <input 
            className="border-2 border-gray-300 rounded-md p-2 mb-4"
            id="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
            type="text" />
            <button
                className="bg-blue-500 text-white rounded-md p-2 mb-4"
                onClick={onSignUp}
            >
                {buttonDisabled ? "No credentials to Sign Up" : "Sign Up"}
            </button>
            <Link href="/login">
                <button className="bg-blue-500 text-white rounded-md p-2 mb-4">
                    Already have an account? Login
                </button>
            </Link>
        </div>
    )
}