const baseUrl = process.env.NODE_ENV === 'development'? 'http://192.168.0.105:3000': 'https://link-tree-web-app-2-backend.onrender.com';

const frontEndBaseUrl  =process.env.NODE_ENV === 'development'? `http://192.168.0.105:5173` : `https://link-tree-web-app-frontend.onrender.com`;

export default baseUrl;
export { frontEndBaseUrl };