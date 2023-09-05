"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadButton } from "@/utils/uploadthing";
import { db } from "@/utils/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

export default function Upload() {
  const uploadImageUrlToFirebase = async (url: string, name: string) => {
    try {
      const docRef = await addDoc(collection(db, "memes"), {
        url,
        name,
        kek: false,
      });
      // Get the auto-generated doc id and set it in the document
      const docId = docRef.id;
      await updateDoc(docRef, { id: docId });
    } catch (error) {}
  };

  const handleUploadImage = (url: string, name: string) => {
    toast.promise(uploadImageUrlToFirebase(url, name), {
      loading: "Uploading Image...",
      success: "Image Uploaded! Wait for admin approval",
      error: "Error uploading image",
    });
  };

  return (
    <>
      <Toaster />
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
          // Do something with the response
          // console.log("Files: ", res);

          handleUploadImage(res[0].fileUrl, res[0].fileName);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast.error("Error uploading image");
        }}
      />
    </>
  );
}
