import Upload from "@/components/Upload";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

async function getMemes() {
  const res = await getDocs(collection(db, "memes"));

  const docs = res.docs.map((doc) => doc.data());

  const keks = docs.filter((doc) => doc.kek === true);

  return keks;
}

export default async function Home() {
  const keks = await getMemes();

  return (
    <main className="flex flex-col space-y-10 my-40 max-w-7xl mx-auto  ">
      <div className="fixed top-5 right-7 flex justify-center items-center gap-x-4">
        <Link
          href={"/admin"}
          className="bg-foreground text-black font-medium hover:opacity-90 active:scale-95 transition duration-200 ease-in-out py-2 px-4 rounded"
        >
          Go to admin panel
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
      <h1 className="text-9xl max-xl:text-6xl font-semibold tracking-tighter text-center  ">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-700">
          Kek
        </span>
        <span className=" bg-clip-text text-transparent bg-gradient-to-r   from-red-500 to-rose-700">
          {" "}
          Programming
        </span>
      </h1>
      <p className=" tracking-tight text-3xl font-medium dark:text-slate-200 text-slate-800  text-center">
        Upload your best memes
      </p>

      <Upload />
      <Link className="flex justify-center" href="/api/random">
        <code className=" hover:underline hover:-translate-y-2 transition duration-200 ease-in-out text-center ">
          kekprogramming/api/random
        </code>
      </Link>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {keks.map((meme) => (
            <div
              key={meme.id}
              className="flex flex-col justify-center items-center"
            >
              <Image
                width={500}
                height={500}
                className="rounded-lg shadow-lg"
                src={meme.url}
                alt={meme.name}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
