import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;

export async function GET() {
  const res = await getDocs(collection(db, "memes"));

  const docs = res.docs.map((doc) => doc.data());

  const keks = docs.filter((doc) => doc.kek === true);

  if (keks.length === 0) {
    return NextResponse.json({ error: "No memes found" }, { status: 404 });
  }

  const randomIndex = Math.floor(Math.random() * keks.length);
  const randomMeme = keks[randomIndex];

  return NextResponse.redirect(randomMeme.url);
}
