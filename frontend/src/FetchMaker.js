const port = 3000;

//=============================== signup fetch ======================================
async function signup(formdata){

  try{
    const response = await fetch(`http://localhost:${port}/user/signup`, {
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
      const response = await fetch(`http://localhost:${port}/user/login`, {
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