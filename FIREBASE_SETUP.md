# Firebase Setup Guide

To properly configure Firebase Admin SDK for authentication, you need to set up your Firebase project credentials. Here are the steps:

## Step 1: Get Firebase Service Account Credentials

1. Go to your [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to **Project Settings** (gear icon) → **Service Accounts**
4. Click **"Generate new private key"**
5. Download the JSON file (this contains your service account credentials)

## Step 2: Configure Environment Variables

Create a `.env` file in your project root with one of these methods:

### Method 1: Use Service Account Key File (Recommended)

1. Save the downloaded JSON file as `firebase-service-account-key.json` in your project root
2. Add to your `.env` file:
```
GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account-key.json
```

### Method 2: Use Environment Variables

Extract the values from the JSON file and add them to your `.env` file:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
```

## Step 3: Security Notes

- **NEVER commit your `.env` file or service account key to version control**
- The `.env` file is already in `.gitignore` to prevent accidental commits
- For production, use environment variables or secure secret management

## Step 4: Test the Configuration

Run your tests to verify Firebase is properly configured:
```bash
npm test
```

## Troubleshooting

### Common Issues:

1. **"Cannot read properties of undefined"**: Check that your environment variables are properly set
2. **"Invalid private key"**: Make sure the private key includes the `\n` characters for line breaks
3. **"Project not found"**: Verify your `FIREBASE_PROJECT_ID` matches your Firebase project

### For Development/Testing:

If you don't have Firebase credentials set up yet, the code will fall back to a test configuration that allows tests to run without actual Firebase authentication.

## Firebase Client Setup

On your frontend, you'll also need to configure Firebase Client SDK to generate the ID tokens that this backend will verify. Make sure your frontend Firebase config matches the same project.
