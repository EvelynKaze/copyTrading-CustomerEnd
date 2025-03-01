// constants/env.config.ts

interface AppwriteConfig {
    // Project Details
    projectId: string;
    databaseId: string;
    secretKey: string;

    // Collection IDs
    collections: {
        profile: string;
        kyc: string;
        support: string;
        deposits: string;
        emails: string;
        withdrawals: string;
        transactions: string;
        stockOptions: string;
        stockOptionsPurchases: string;
        copyTrading: string;
        copyTradingPurchases: string;
        cryptoOptions: string;
    };

    // Storage Bucket IDs
    buckets: {
        profile: string;
        kyc: string;
    };
}

const ENV: AppwriteConfig = {
    // Project Details
    projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
    databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    secretKey: process.env.NEXT_PUBLIC_APPWRITE_SECRET_KEY!,

    // Collection IDs
    collections: {
        profile: process.env.NEXT_PUBLIC_APPWRITE_PROFILE_COLLECTION_ID!,
        kyc: process.env.NEXT_PUBLIC_APPWRITE_KYC_COLLECTION_ID ?? '',
        support: process.env.NEXT_PUBLIC_APPWRITE_SUPPORT_COLLECTION_ID!,
        emails: process.env.NEXT_PUBLIC_APPWRITE_ADMIN_EMAIL_COLLECTION_ID!,
        deposits: process.env.NEXT_PUBLIC_APPWRITE_DEPOSITS_COLLECTION_ID!,
        withdrawals: process.env.NEXT_PUBLIC_APPWRITE_WITHDRAWALS_COLLECTION_ID!,
        transactions: process.env.NEXT_PUBLIC_APPWRITE_TRANSACTIONS_COLLECTION_ID!,
        stockOptions: process.env.NEXT_PUBLIC_APPWRITE_STOCKOPTIONS_COLLECTION_ID!,
        stockOptionsPurchases: process.env.NEXT_PUBLIC_APPWRITE_STOCKOPTIONS_PURCHASE_COLLECTION_ID!,
        copyTrading: process.env.NEXT_PUBLIC_APPWRITE_COPYTRADING_COLLECTION_ID!,
        copyTradingPurchases: process.env.NEXT_PUBLIC_APPWRITE_COPYTRADING_PURCHASE_COLLECTION_ID!,
        cryptoOptions: process.env.NEXT_PUBLIC_APPWRITE_CRYPTO_OPTIONS_COLLECTION_ID!,
    },

    // Storage Bucket IDs
    buckets: {
        profile: process.env.NEXT_PUBLIC_APPWRITE_PROFILE_BUCKET_ID!,
        kyc: process.env.NEXT_PUBLIC_APPWRITE_KYC_BUCKET_ID ?? '',
    },
};

// Freeze the object to prevent modifications during runtime
export default Object.freeze(ENV);