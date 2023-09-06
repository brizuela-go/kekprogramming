import { db } from "@/utils/firebase";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

import { UserButton, currentUser } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import MemeCard from "@/components/MemeCard";
import Link from "next/link";

type Props = {};

async function getMemes() {
  const res = await getDocs(collection(db, "memes"));

  const memes = res.docs.map((doc) => doc.data());

  const cringes = memes.filter((doc) => doc.kek === false);

  return cringes;
}

const AdminPage = async (props: Props) => {
  const user: User | null = await currentUser();

  if (user?.privateMetadata.role !== "admin") {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-y-5">
        <h1 className=" font-semibold text-4xl">
          You don&apos;t have access to this page
        </h1>
        <Link href="/">
          <button className="font-semibold  bg-muted px-6 py-2 rounded-lg hover:opacity-90 active:scale-95  transition duration-200 ease-in-out ">
            Go back
          </button>
        </Link>
        <div className="fixed top-5 right-7">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    );
  }

  const memes = await getMemes();

  if (memes.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-y-5">
        <h1 className=" font-semibold text-4xl">No memes to show</h1>
        <Link href="/">
          <button className="font-semibold  bg-muted px-6 py-2 rounded-lg hover:opacity-90 active:scale-95 transition duration-200 ease-in-out ">
            Go back
          </button>
        </Link>
        <div className="fixed top-5 right-7">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {memes.map((meme: any) => (
          <MemeCard key={meme.name} meme={meme} />
        ))}
      </div>
      <div className="fixed top-5 right-7">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default AdminPage;
