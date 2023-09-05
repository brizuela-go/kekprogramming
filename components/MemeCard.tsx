"use client";

import { db } from "@/utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Meme = {
  id: string;
  name: string;
  url: string;
  kek: boolean;
};

type Props = {
  meme: Meme;
};

const MemeCard = ({ meme }: Props) => {
  const router = useRouter();

  const kekMeme = async (id: string) => {
    const docRef = doc(db, "memes", id);

    await updateDoc(docRef, {
      kek: true,
    });

    router.refresh();
  };

  const cringeMeme = async (id: string) => {
    const docRef = doc(db, "memes", id);

    await updateDoc(docRef, {
      kek: false,
    });

    router.refresh();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Image
        width={500}
        height={500}
        className="rounded-lg shadow-lg"
        src={meme.url}
        alt={meme.name}
      />
      <div className="flex justify-center items-center gap-8 mt-10">
        <button
          onClick={() => kekMeme(meme.id)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Kek
        </button>
        <button
          onClick={() => cringeMeme(meme.id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cringe
        </button>
      </div>
    </div>
  );
};

export default MemeCard;
