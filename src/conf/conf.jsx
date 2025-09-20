const conf = {
    
  appwriteurl: String(import.meta.env.VITE_APPWRITE_URL),        // small "u"
  appwritePROJECTID: String(import.meta.env.VITE_APPWRITE_PROJECT_ID), // all caps
  appwriteDATABASEID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
  appwriteCOLLECTIONID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
  appwriteBUCKETID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),

};

export default conf