import baseUrl from './config'; 


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

// ================================EDIT USER DATA ==========================================
async function updateSettings(firstName, lastName, email, password, confirmPassword){
  try {
    const response = await fetch(`${baseUrl}/user/update-settings`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', 
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        confirmPassword
      })
    });
    return response;

    } catch (err) {
      console.log('Login error:', err);
      throw err;  
    }
};
export {updateSettings}

// ============================ create link fetch ==================================
async function createLink(linkData){
  try {
    const response = await fetch(`${baseUrl}/user/create-link`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(linkData),
    });

    return response;
  } catch (err) {
    console.log("Error updating link:", err);
  }
}
export {createLink}

// ======================= delete link fetch ==============================================
async function deleteLink(linkId){
  try {
      const response = await fetch(`${baseUrl}/user/links/${linkId}`, {
        method: "DELETE",
        credentials: "include",
      });
    return response;
    } catch (err) {
      console.error('Error deleting link', err);
    }
}
export {deleteLink}

// ====================== update link fetch ==================================================
export const updateLink = async (linkId, linkPayload) => {
  try {
    const response = await fetch(`${baseUrl}/user/links/update/${linkId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(linkPayload),
      credentials: "include",
    });

    return response;
  } catch (err) {
    console.error("Error updating link:", err);
  }
};

// ========================update banner fetch ===========================================
export const updateProfileBanner = async (data) => {
  const response = await fetch(`${baseUrl}/user/profile/update-banner`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(data),
  });
  return response;
};

// ====================== save appearence fetch ==========================================
export const updateAppearence = async (payload) => {
    try {
      const response = await fetch(`${baseUrl}/user/appearance`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      credentials: "include",
    });
    return response
  }
  catch (err) {
    console.error("Error updating appearence:", err);
  }
}
// ========================save click logs ===========================================
export const saveClickLog = async (linkUrl, isSocial) => {
  try {
     await fetch(`${baseUrl}/user/track-click`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ linkUrl, isSocial }),
      });
    // return response;
    // console.log(response)
  } catch (err) {
    console.error("Error saving click log:", err);
  }
};

// ========================save cta logs ===========================================
export const saveCtaLog = async (id) => {
  try {
     await fetch(`${baseUrl}/user/track-cta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({profilePreviewId: id }),
      });
    // return response;
  } catch (err) {
    console.error("Error saving click log:", err);
  }
};
