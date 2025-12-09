const baseUrl = import.meta.env.MODE === 'development'? 'http://localhost:3000': 'https://link-tree-web-app-2-backend.onrender.com';

const frontEndBaseUrl  =import.meta.env.MODE  === 'development'? "http://localhost:5173" : "https://link-tree-web-app-frontend.onrender.com";

export default baseUrl;
export { frontEndBaseUrl };