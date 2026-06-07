import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";
import { transporter } from "@/app/lib/nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Chybí povinná pole" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Uživatel již existuje" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const token = crypto.randomBytes(32).toString("hex");

    const user = await prisma.users.create({
      data: {
        username,
        email,
        password: hashedPassword,
        token: token,
      },
    });
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

    const confirmUrl = `${DOMAIN}/confirmAccount?t=${token}`;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Potvrzení účtu",
      html: `
        <h2>Vítej 👋</h2>
        <p>Klikni pro aktivaci účtu:</p>
        <a href="${confirmUrl}">${confirmUrl}</a>
      `,
    });
    
    return NextResponse.json(
      {
        message: "Registrace proběhla úspěšně",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Interní chyba serveru" },
      { status: 500 }
    );
  }
}