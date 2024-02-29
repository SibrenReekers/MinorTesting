import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch("http://localhost:8080/api/v1/auth/authenticate", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user.token) {
            // Assuming user.token is a JWT from your backend
            return { ...user, email: credentials.email };
          }

          return null;
        } catch (error) {
          console.error("Authentication error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // If signing in, add the token to the JWT
      if (user?.token) {
        token.accessToken = user.token;
      }
      // Return previous token if user data is not available
      return token;
    },
    session: async ({ session, token }) => {
      // Pass the JWT token to the session so it can be used in client-side
      session.accessToken = token.accessToken;
      return session;
    },
  },
  // Ensure to set a consistent secret with your backend JWT secret
  secret: process.env.NEXTAUTH_SECRET,
});
