import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/utils/firebase";

// Constants for configuration
export const dynamic = "force-dynamic";
export const revalidate = 10;
export const runtime = "nodejs";
export const preferredRegion = "auto";

// Function to get a random meme from Firebase
export async function getRandomMeme() {
  try {
    // Get all memes from the 'memes' collection
    const querySnapshot = await getDocs(collection(db, "memes"));
    const docs = querySnapshot.docs.map((doc) => doc.data());

    // Filter memes with 'kek' property set to true
    const kekMemes = docs.filter((doc) => doc.kek === true);

    if (kekMemes.length === 0) {
      return null; // No kek memes found
    }

    // Choose a random kek meme
    const randomIndex = Math.floor(Math.random() * kekMemes.length);
    const randomMeme = kekMemes[randomIndex];

    return randomMeme;
  } catch (error) {
    return null; // Handle error gracefully
  }
}

export async function GET() {
  try {
    const randomMeme = await getRandomMeme();

    if (!randomMeme) {
      return NextResponse.json({ error: "No memes found" }, { status: 404 });
    }

    // Redirect to the URL of the random meme
    return NextResponse.redirect(randomMeme.url);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
