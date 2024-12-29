import { Client, Account, Databases, Storage } from 'appwrite';

export const client = new Client();

export const databases = new Databases(client);

export const storage = new Storage(client);

const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

export const account = new Account(client);

export { 
    ID,
    Query,
    Permission,
    Role,
} from 'appwrite';