import { Client, Account, Databases, Storage } from 'appwrite';
import ENV from "@/constants/env"

export const client = new Client();

export const databases = new Databases(client);

export const storage = new Storage(client);


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(ENV.projectId);

export const account = new Account(client);

export { 
    ID,
    Query,
    Permission,
    Role,
} from 'appwrite';