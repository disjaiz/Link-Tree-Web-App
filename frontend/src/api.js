// Create a function to handle Google authentication using fetch
import {baseUrl} from './config';

export const googleAuth = async (code) => {
    try{
     const response = await fetch(`${baseUrl}/user/google?code=${code}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
               'Content-Type': 'application/json',
          },
     });
     return response.json();
    } catch (error) {
     console.error("Error during Google authentication:", error);
     throw error;
    }
};