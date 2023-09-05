import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

export async function GET() {
  const res = await getDocs(collection(db, "memes"));

  const docs = res.docs.map((doc) => doc.data());

  const keks = docs.filter((doc) => doc.kek === true);

  const randomMeme = keks[Math.floor(Math.random() * docs.length)];

  if (!randomMeme) {
    return NextResponse.json({ error: "No memes found" }, { status: 404 });
  }

  return NextResponse.redirect(randomMeme.url);
}
