import PocketBase from 'pocketbase';

const pb = new PocketBase('https://backend-tourly.fly.dev/');

export const fetchPackages = async () => {
  try {
    const packages = await pb.collection('packages').getFullList();
    return packages;
  } catch (error) {
    // Ignore autocancelled error
    if (error && error.message && error.message.includes("autocancelled")) {
      return [];
    }
    console.error('Error fetching packages:', error);
    throw error;
  }
};