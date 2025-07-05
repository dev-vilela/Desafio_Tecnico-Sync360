// DOM 
const viewMode = document.getElementById('view-mode');
const editMode = document.getElementById('edit-mode');
const editBtn = document.getElementById('edit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const profileForm = document.getElementById('profile-form');
const toast = document.getElementById('toast');

// Elementos de perfil
const profilePic = document.getElementById('profile-pic');
const editProfilePic = document.getElementById('edit-profile-pic');
const profilePicInput = document.getElementById('profile-pic-input');

//Exibir elementos
const viewName = document.getElementById('view-name');
const viewAge = document.getElementById('view-age');
const viewAddress = document.getElementById('view-address');
const viewBio = document.getElementById('view-bio');

// Editar elementos do form
const fullName = document.getElementById('nome-completo');
const age = document.getElementById('age');
const street = document.getElementById('street');
const neighborhood = document.getElementById('neighborhood');
const state = document.getElementById('state');
const bio = document.getElementById('bio');

let userData = {};

// Background 
const body = document.body;
body.classList.add('bg-gradient-to-br', 'from-gray-900', 'via-gray-800', 'to-black', 'text-white');

editBtn.addEventListener('click', () => {
  viewMode.classList.add('hidden');
  editMode.classList.remove('hidden');

  fullName.value = viewName.textContent;
  age.value = viewAge.textContent.split(' ')[0];

  const addressParts = viewAddress.textContent.split(', ');
  street.value = addressParts[0];
  neighborhood.value = addressParts[1];
  state.value = addressParts[2];

  bio.value = viewBio.textContent;
});

cancelBtn.addEventListener('click', () => {
  editMode.classList.add('hidden');
  viewMode.classList.remove('hidden');
});

profilePicInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      editProfilePic.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

async function saveProfile() {
  const formData = new FormData();
  formData.append('name', fullName.value);
  formData.append('age', age.value);
  formData.append('bio', bio.value);
  formData.append('rua', street.value);
  formData.append('bairro', neighborhood.value);
  formData.append('estado', state.value);

  const file = profilePicInput.files[0];
  if (file) {
    formData.append('image', file);
  } else {
    formData.append('currentImage', userData.image);
  }

  try {
    const res = await fetch("http://localhost:3000/api/user", {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) throw new Error("Erro ao atualizar");

    showToast("Perfil atualizado com sucesso!");
    await loadProfile();
    cancelBtn.click();
  } catch (err) {
    showToast("Erro ao salvar perfil", true);
    console.error(err);
  }
}

function showToast(message, isError = false) {
  toast.textContent = message;
  toast.className = 'toast';
  if (isError) toast.classList.add('error');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

async function loadProfile() {
  try {
    const res = await fetch("http://localhost:3000/api/user");
    if (!res.ok) throw new Error("Erro ao buscar perfil");
    userData = await res.json();

    viewName.textContent = userData.name;
    viewAge.textContent = `${userData.age} anos`;
    viewAddress.textContent = `${userData.rua}, ${userData.bairro}, ${userData.estado}`;
    viewBio.textContent = userData.bio;
    const imagePath = userData.image ? `http://localhost:3000${userData.image}` : "https://via.placeholder.com/100";
    profilePic.src = imagePath;
    editProfilePic.src = imagePath;
  } catch (error) {
    console.error('Erro ao carregar perfil:', error);
  }
}

document.addEventListener('DOMContentLoaded', loadProfile);

profileForm.addEventListener('submit', (e) => {
  e.preventDefault();
  saveProfile();
});

document.getElementById('edit-btn').addEventListener('click', () => {
  document.getElementById('view-mode').classList.add('hidden');
  document.getElementById('edit-mode').classList.remove('hidden');

  // Troca o título para "Perfil de Edição"
  document.getElementById('header-title').textContent = 'Perfil de Edição';
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  document.getElementById('edit-mode').classList.add('hidden');
  document.getElementById('view-mode').classList.remove('hidden');

  // Volta o título para "Perfil do Usuário"
  document.getElementById('header-title').textContent = 'Perfil do Usuário';
});

