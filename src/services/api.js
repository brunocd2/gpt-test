import axios from "axios";

axios.defaults.baseURL = "https://cd2-grafo-integrator-ms.herokuapp.com";

export async function getAllProducts() {
  const response = await axios.get('/domazzi/find_all_products');
  return response.data.data;
}

export async function getProductsByCategory(category) {
  const response = await axios.get(`/domazzi/find_products_by_category?categoria=${category}`);
  return response.data.data;
}

export async function getProductsByPartner(partner) {
  const response = await axios.get(`/domazzi/find_products_by_partner?partner=${partner}`);
  return response.data.data;
}

export async function login(userInfos) {
  const response = await axios.post('/power/login', userInfos);
  return response.data.data;
}

export async function forgotPassword(email) {
  const response = await axios.post('/power/forgot', { email });
  console.log('forgot pass response:', response.data);
}

export async function firstAccess(userInfos, newPassword) {
  const response = await axios.post('/power/update_first_acess',
    { ...userInfos, password: newPassword }
  );

  console.log('first access response:', response.data.data);
}

export async function newUser(userInfos) {
  const response = await axios.post('/power/', userInfos);
  console.log('new user response:', response);
}

export async function getUsers() {
  const response = await axios.get(`/power/find_all`);
  return response.data.data;
}

export async function editUser(userInfos, name, lastName, email) {
  const { email_verified_at, first_acess, id } = userInfos;
  console.log(userInfos)

  const response = await axios.post('/power/update', {
    id,
    email,
    email_verified_at,
    first_acess,
    last_name: lastName,
    name,
  });

  return response.data.data;
}

export async function deleteUser(user) {
  const response = await axios.delete(`/power/delete?id=${user.id}`);
  console.log('delete user response:', response);

  return response.data.data;
}
