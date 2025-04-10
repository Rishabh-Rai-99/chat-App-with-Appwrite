import { Account, Client, Databases, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(import.meta.env.VITE_PROJECT_ID);

export const databases = new Databases(client);
export const account = new Account(client)

export const createDocument = async () => {
  try {
    const response = await databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTION_ID,
      ID.unique(),
      {}
    );
  } catch (error) {
    console.error("Error Creating Document:", error);
  }
};

export default client;
