'use client'
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try{
            const res = await axios.post("/api/auth/register", {
                name,
                email,
                password
            });
            console.log(res);
        }catch (error){
            console.log(error);
        }
    }

    return (
        <div className='flex items-center justify-center bg-black text-white'>
            <div className='w-full max-w-md border-2 border-white rounded-2xl p-8 bg-gray-900'>
                <h1 className='text-2xl font-semibold text-center mb-6'>Register</h1>
                <form className='space-y-6' onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="name" className='block mb-1 font-medium'>Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            required
                            placeholder='Enter Your Name'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className='block mb-1 font-medium'>Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            required
                            placeholder='Enter Email'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className='block mb-1 font-medium'>Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            minLength={6}
                            required
                            placeholder='Enter Password'
                            className='w-full border-b border-white py-2 px-1 bg-gray-900 text-white outline-none placeholder-gray-400'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <p className='text-sm text-center mt-1'>Already have an account ? <Link href={'/login'} className='text-blue-400 hover:underline'>login</Link></p>



                    <button className='w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors'>Register</button>
                </form>

                {/* horizonal line */}
                <div className='flex items-center gap-1.25 justify-center my-5'>
                    <hr className="grow border-gray-500" />
                    <span>OR</span>
                    <hr className="grow border-gray-500" />
                </div>

                {/* singup with google button  */}
                <button className='w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-400 rounded-lg bg-white text-black hover:bg-gray-100 transition-colors'>
                    <FcGoogle />
                    <span >Sign Up With Google</span>
                </button>



            </div>
        </div>
    )
}

export default Register;