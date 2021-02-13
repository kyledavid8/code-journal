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
  profileButton: document.querySelector('[data-view="profile"]'),
  entryNew: document.querySelector('[data-view="entries"]'),
  entryCreate: document.querySelector('[data-view="create-entry"]'),
  entryButton: document.querySelector('[data-view="entries-button"')
};

var entryForm = document.querySelector('#entry-form');
var entryUrl = document.querySelector('#url');
var entryTitle = document.querySelector('#title');
var entryNotes = document.querySelector('#notes');

var entryImage = document.querySelector('.image-entry');
var buttonNew = document.querySelector('.button-new');

var entryOl = document.querySelector('.entry-ordered-list');
var entryCounter;

avatar.addEventListener('input', function () {
  image.setAttribute('src', avatar.value);
});

entryUrl.addEventListener('input', function () {
  entryImage.setAttribute('src', entryUrl.value);
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  $views.viewProfile.innerHTML = '';
  data.profile.avatarUrl = avatar.value;
  data.profile.username = username.value;
  data.profile.fullName = fullName.value;
  data.profile.location = $location.value;
  data.profile.bio = bio.value;
  data.view = 'view-profile';
  localStorage.setItem('data-object', JSON.stringify(data));
  viewSwapping();
  form.reset();
});

document.addEventListener('DOMContentLoaded', function () {
  var dataStore = localStorage.getItem('data-object');
  if (dataStore !== null) {
    data = JSON.parse(dataStore);
    viewSwapping();
  }
  entryCounter = 0;
  while (data.entries.length > entryCounter) {
    renderEntry();
    entryCounter++;
  }
});

function renderProfile() {
  var h1 = document.createElement('h1');
  h1.textContent = data.profile.fullName;
  $views.viewProfile.appendChild(h1);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  $views.viewProfile.appendChild(row);

  var divCol = document.createElement('div');
  divCol.setAttribute('class', 'column-half');
  row.appendChild(divCol);

  var profileImage = document.createElement('img');
  profileImage.setAttribute('src', data.profile.avatarUrl);
  profileImage.setAttribute('class', 'picture');
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
  editButton.setAttribute('class', 'edit-button');
  editButtonContainer.appendChild(editButton);
}

function viewSwapping(target) {
  var dataViewArray = ['edit-profile', 'view-profile', 'entries', 'create-entry'];
  var $viewsArray = [$views.editProfile, $views.viewProfile, $views.entryNew, $views.entryCreate];
  $views.editProfile.className = 'edit-profile hidden';
  $views.viewProfile.className = 'view-profile hidden';
  $views.entryNew.className = 'entries hidden';
  $views.entryCreate.className = 'create-entry hidden';
  for (var counter = 0; counter <= dataViewArray.length - 1; counter++) {
    if (data.view === dataViewArray[counter]) {
      if (data.view === 'edit-profile') {
        image.setAttribute('src', data.profile.avatarUrl);
      } else if (data.view === 'view-profile') {
        renderProfile();
      }
      $viewsArray[counter].className = dataViewArray[counter];
      break;
    }
  }
}

document.addEventListener('click', function (event) {
  if (event.target.getAttribute('href') === null || data.profile.username === '') {
    return;
  }

  if (event.target === $views.profileButton) {
    $views.viewProfile.innerHTML = '';
    data.view = 'view-profile';
    viewSwapping();
  } else if (event.target === $views.entryButton) {
    data.view = 'entries';
    viewSwapping();
  } else if (event.target === buttonNew) {
    data.view = 'create-entry';
    viewSwapping();
  } else {
    data.view = 'edit-profile';
    viewSwapping();
  }
});

entryForm.addEventListener('submit', function (event) {
  event.preventDefault();
  entryOl.innerHTML = '';
  var entryData = {
    imageUrl: '',
    title: '',
    notes: ''
  };
  entryData.imageUrl = entryUrl.value;
  entryData.title = entryTitle.value;
  entryData.notes = entryNotes.value;
  data.entries.unshift(entryData);
  data.view = 'view-profile';
  localStorage.setItem('data-object', JSON.stringify(data));
  data.view = 'entries';
  viewSwapping();
  entryImage.setAttribute('src', 'images/placeholder-image-square.jpg');
  entryForm.reset();
  entryCounter = 0;
  while (data.entries.length > entryCounter) {
    renderEntry();
    entryCounter++;
  }
});

function renderEntry() {

  var list = document.createElement('li');
  entryOl.appendChild(list);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  list.appendChild(row);

  var colHalf = document.createElement('div');
  colHalf.setAttribute('class', 'column-half');
  row.appendChild(colHalf);

  var img = document.createElement('img');
  img.setAttribute('src', data.entries[entryCounter].imageUrl);
  img.setAttribute('class', 'picture');
  img.setAttribute('alt', 'entry-image');
  colHalf.appendChild(img);

  var colHalfTwo = document.createElement('div');
  colHalfTwo.setAttribute('class', 'column-half');
  row.appendChild(colHalfTwo);

  var rowInCol = document.createElement('div');
  rowInCol.setAttribute('class', 'row-two-one');
  colHalfTwo.appendChild(rowInCol);

  var title = document.createElement('p');
  title.textContent = data.entries[entryCounter].title;
  rowInCol.appendChild(title);

  var rowInColTwo = document.createElement('div');
  rowInColTwo.setAttribute('class', 'row-two-one');
  colHalfTwo.appendChild(rowInColTwo);

  var notes = document.createElement('p');
  notes.textContent = data.entries[entryCounter].notes;
  rowInColTwo.appendChild(notes);

  return list;
}
