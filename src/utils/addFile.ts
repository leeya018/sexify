import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/firebaseConfig";
import checkUserExists from "./checkUserExists";

// audios
// images
export const addFile = async (uid: string, file: any) => {
  console.log({ uid, file });
  try {
    if (!checkUserExists(uid)) {
      throw new Error(`User with id : ${uid} not found`);
    }

    const storageRef = ref(storage, `users/${uid}/${file.name}`);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    console.log(`File available at: ${downloadURL}`, db);

    return downloadURL;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
