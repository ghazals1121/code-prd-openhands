import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcrypt";
export const authOptions: NextAuthOptions = {
  providers: [CredentialsProvider({
    name: "credentials",
    credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
    async authorize(credentials) {
      const user = await prisma.user.findUnique({ where: { email: credentials!.email } });
      if (!user) return null;
      const valid = await bcrypt.compare(credentials!.password, user.passwordHash);
      return valid ? user : null;
    },
  })],
  session: { strategy: "jwt" },
};
