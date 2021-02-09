var avatar = document.querySelector('#avatar');
var username = document.querySelector('#username');
var fullName = document.querySelector('#fullName');
var $location = document.querySelector('#location');
var bio = document.querySelector('#bio');
var image = document.querySelector('.image');
var form = document.querySelector('form');
var $views = {
  editProfile: document.querySelector('[data-view="edit-profile"]'),
  viewProfile: document.querySelector('[data-view="view-profile"]'),
  profileButton: document.querySelector('[data-view="profile"]')
};

var renderCounter = 0;

avatar.addEventListener('input', function () {
  image.setAttribute('src', avatar.value);
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  data.profile.avatarUrl = avatar.value;
  data.profile.username = username.value;
  data.profile.fullName = fullName.value;
  data.profile.location = $location.value;
  data.profile.bio = bio.value;
  data.view = 'view-profile';
  localStorage.setItem('data-object', JSON.stringify(data));
  viewSwapping();
  if (renderCounter > 1) {
    $views.viewProfile.removeChild(h1);
    $views.viewProfile.removeChild(row);
  }
  form.reset();
});

document.addEventListener('DOMContentLoaded', function () {
  var dataStore = localStorage.getItem('data-object');
  if (dataStore !== null) {
    data = JSON.parse(dataStore);
    viewSwapping();
  }
});

var h1;
var row;

function renderProfile() {
  h1 = document.createElement('h1');
  h1.textContent = data.profile.fullName;
  $views.viewProfile.appendChild(h1);

  row = document.createElement('div');
  row.setAttribute('class', 'rowTwo');
  $views.viewProfile.appendChild(row);

  var divCol = document.createElement('div');
  divCol.setAttribute('class', 'column-half');
  row.appendChild(divCol);

  var profileImage = document.createElement('img');
  profileImage.setAttribute('src', data.profile.avatarUrl);
  profileImage.setAttribute('id', 'profile-picture');
  divCol.appendChild(profileImage);

  var divColTwo = document.createElement('div');
  divColTwo.setAttribute('class', 'column-half');
  row.appendChild(divColTwo);

  var divRowOne = document.createElement('div');
  divRowOne.setAttribute('class', 'row-two-one');
  divColTwo.appendChild(divRowOne);

  var userImage = document.createElement('img');
  userImage.setAttribute('src', 'https://img.icons8.com/ios-filled/50/000000/username.png');
  divRowOne.appendChild(userImage);

  var pOne = document.createElement('p');
  pOne.textContent = data.profile.username;
  divRowOne.appendChild(pOne);

  var divRowTwo = document.createElement('div');
  divRowTwo.setAttribute('class', 'row-two-one');
  divColTwo.appendChild(divRowTwo);

  var locImage = document.createElement('img');
  locImage.setAttribute('src', 'https://img.icons8.com/ios-filled/50/000000/map-pin.png');
  divRowTwo.appendChild(locImage);

  var pTwo = document.createElement('p');
  pTwo.textContent = data.profile.location;
  divRowTwo.appendChild(pTwo);

  var divBio = document.createElement('div');
  divBio.setAttribute('class', 'biography');
  divColTwo.appendChild(divBio);

  var pBio = document.createElement('p');
  pBio.textContent = data.profile.bio;
  divBio.appendChild(pBio);

  var editButtonContainer = document.createElement('div');
  editButtonContainer.setAttribute('class', 'edit-button-container');
  divColTwo.appendChild(editButtonContainer);

  var editButton = document.createElement('button');
  editButton.textContent = 'EDIT';
  editButton.setAttribute('href', '#');
  editButton.setAttribute('data-view', 'edit-profile');
  editButtonContainer.appendChild(editButton);
}

function viewSwapping(target) {
  if (data.view === 'edit-profile') {
    $views.viewProfile.className = 'view-profile hidden';
    $views.editProfile.className = 'edit-profile';
    image.setAttribute('src', data.profile.avatarUrl);
  } else if (data.view === 'view-profile') {
    renderProfile();
    $views.editProfile.className = 'edit-profile hidden';
    $views.viewProfile.className = 'view-profile';
    renderCounter++;
  }
}

document.addEventListener('click', function (event) {
  if (event.target.getAttribute('href') === null || data.profile.username === '') {
    return;
  }

  if (event.target === $views.profileButton) {
    data.view = 'view-profile';
  } else {
    data.view = 'edit-profile';
  }
  viewSwapping();
  if (renderCounter > 1 && event.target === $views.profileButton) {
    $views.viewProfile.removeChild(h1);
    $views.viewProfile.removeChild(row);
  }
});
