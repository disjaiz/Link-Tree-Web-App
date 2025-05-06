const port = 3000;
// const baseUrl = `http://localhost:${port}`;
const baseUrl = `http://192.168.0.105:${port}`;

//=============================== signup fetch ======================================
async function signup(formdata){

  try{
    const response = await fetch(`${baseUrl}/user/signup`, {
    method: "POST",
    headers: {  
        'Content-Type': 'application/json', 
      },
    body: JSON.stringify(formdata),
    credentials: "include",
  });

  return response
  }
  catch (err) {
    console.log('Signup error:', err);
    throw err; 
  } 
}
export default signup;

// ===============================login fetch----------------------------------------------------------
async function login(formdata){
  
  try{
      const response = await fetch(`${baseUrl}/user/login`, {
      method: "POST",
      headers: {
          'Content-Type': 'application/json', 
        },
      body: JSON.stringify(formdata),
      credentials: "include",
  });
    return response
  }

  catch (err) {
      console.log('Login error:', err);
      throw err;  
    }
  }
export {login}

// ================================ UPDATE PROFILE TITLE =========================================

async function updateProfileTitle(userId, profileTitle) {
  try {
    const response = await fetch(`${baseUrl}/user/update-profile-title/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profileTitle }),
    });
    return response
}
catch (err) {
  console.log('Login error:', err);
  throw err;  
}
}
export {updateProfileTitle}
// ================================ LOG-OUT FETCH =========================================
async function logout() {
  try {
    const response = await fetch(`${baseUrl}/user/logout`, {
        method: "POST",
        credentials: "include",
    });
    return response;
} 
catch (err) {
  console.log('Login error:', err);
  throw err;  
}
}
export {logout}
// ================================ FETCH USER DATA =========================================
async function fetchUserData() {
  try {
    const response = await fetch(`${baseUrl}/user/userData`, {
        method: "GET",
        credentials: "include",
    });
    return response;
} 
catch (err) {
  console.log('Login error:', err);
  throw err;  
}
}
export {fetchUserData}

// ================================ UPLOAD PROFILE IMAGE =========================================
async function uploadProfileImage(formData) {
  try {
    const response = await fetch(`${baseUrl}/user/upload-profile-image`, {
        method: "POST",
        body: formData,
        credentials: "include",
    });
    return response;
} 
catch (err) {
  console.log('Login error:', err);
  throw err;  
}}
export {uploadProfileImage}

// ================================ REMOVE PROFILE IMAGE =========================================
async function removeProfileImage() {
  try {
    const response = await fetch(`${baseUrl}/user/remove-profile-image`, {
        method: "DELETE",
        credentials: "include",
    });
    return response;
} 
catch (err) {
  console.log('Login error:', err);
  throw err;  
}}
export {removeProfileImage}