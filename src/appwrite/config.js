import conf from '../conf/conf';
import { Client, ID, Databases, Storage, Query } from "appwrite";
import {  Permission, Role } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwritePROJECTID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }


async createPost({ title, slug, content, featuredImage, status, userId }) 
{
     try 
    { 
        return await this.databases.createDocument
    ( conf.appwriteDATABASEID, 
        conf.appwriteCOLLECTIONID, 
        slug, 
    { id: slug, 
      title, 
      slug, 
      content, 
      featuredImage, 
      status, 
      userId } ); 
    } 
    catch (error) 
    { console.log("Appwrite service :: createPost :: error", error); } }


    async updatePost(postId, { title, slug, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug,   
                { title, slug, content, featuredImage, status }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDATABASEID,
                conf.appwriteCOLLECTIONID,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // File upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBUCKETID,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBUCKETID, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // ✅ New method: get file URL for <img>
    getFileUrl(fileId) {
        return `https://${conf.appwriteurl.replace(/^https?:\/\//, '')}/storage/buckets/${conf.appwriteBUCKETID}/files/${fileId}/view?project=${conf.appwritePROJECTID}`;
    }
}

const service = new Service();
export default service;
