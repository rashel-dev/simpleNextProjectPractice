import dbConnect from "@/lib/dbConnect";
import User from "@/model/user.model";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        //login with email and password
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;
                if(!email || !password) {
                    throw new Error("email or password not found");
                }
                await dbConnect();

                const user = await User.findOne({email}).select("+password");
                if(!user) {
                    throw new Error("user not found");
                }
                const isPasswordMatched = await bcrypt.compare(password, user.password)
                if(!isPasswordMatched) {
                    throw new Error("password not matched");
                }
                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    image: user.image
                };
            }
        })
    ],
    callbacks:{
        async jwt({token, user}) {
            if(user) {
                token.id = user.id;
                token.name = user.name;
                token.email = user.email;
                token.image = user.image;
            }
            return token;
        },

       session({session, token}) {
            if(session.user){
                session.user.id = token.id as string;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.image as string;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}