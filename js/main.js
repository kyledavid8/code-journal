var avatar = document.querySelector('#avatar');
var username = document.querySelector('#username');
var fullName = document.querySelector('#fullName');
var $location = document.querySelector('#location');
var bio = document.querySelector('#bio');
var image = document.querySelector('.image');
var container = document.querySelector('.container');
var form = document.querySelector('form');

avatar.addEventListener('input', function () {
  image.setAttribute('src', avatar.value);
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (localStorage.getItem('data-object') === null) {
    var data = {
      view: 'edit-profile',
      profile: {
        username: '',
        fullName: '',
        location: '',
        avatarUrl: '',
        bio: ''
      },
      entries: []
    };
    data = JSON.stringify(data);
    localStorage.setItem('data-object', data);
  }

  data = localStorage.getItem('data-object');
  data = JSON.parse(data);

  data.profile.avatarUrl = avatar.value;
  data.profile.username = username.value;
  data.profile.fullName = fullName.value;
  data.profile.location = $location.value;
  data.profile.bio = bio.value;
  var dataVar = JSON.stringify(data);
  localStorage.setItem('data-object', dataVar);
  viewSwapping('profile');
  form.reset();
});

document.addEventListener('DOMContentLoaded', function () {
  var data = localStorage.getItem('data-object');
  data = JSON.parse(data);
  if (data.profile.username !== '') {
    viewSwapping('profile');
  } else {
    viewSwapping('edit-profile');
  }
});

function render() {
  var data = localStorage.getItem('data-object');
  data = JSON.parse(data);

  var dataView = document.createElement('div');
  dataView.setAttribute('data-view', 'profile');
  dataView.setAttribute('class', 'viewProfile hidden');

  var h1 = document.createElement('h1');
  h1.textContent = data.profile.fullName;
  dataView.appendChild(h1);

  var row = document.createElement('div');
  row.setAttribute('class', 'row');
  dataView.appendChild(row);

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

  return dataView;
}

function viewSwapping(target) {
  var array = ['edit-profile', 'profile'];
  container.appendChild(render());
  var viewProfile = document.querySelector('.viewProfile');
  var editProfile = document.querySelector('.editProfile');
  editProfile.className = 'editProfile hidden';
  if (target === array[0]) {
    editProfile.className = 'editProfile';
    viewProfile.className = 'viewProfile hidden';
    var get = localStorage.getItem('data-object');
    get = JSON.parse(get);
    get.view = array[0];
    var set = JSON.stringify(get);
    localStorage.setItem('data-object', set);
  } else if (target === array[1]) {
    viewProfile.className = 'viewProfile';
    get = localStorage.getItem('data-object');
    get = JSON.parse(get);
    get.view = array[1];
    set = JSON.stringify(get);
    localStorage.setItem('data-object', set);
  }
}
