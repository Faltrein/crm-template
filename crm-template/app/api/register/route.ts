import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Username nebo email již existuje." },
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
        token,
        active: false,
      },
    });

    return NextResponse.json({
      success: true,
      id: user.id,
      message: "Registrace proběhla úspěšně.",
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Interní chyba serveru." },
      { status: 500 }
    );
  }
}