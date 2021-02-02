var avatar = document.querySelector('#avatar');
var username = document.querySelector('#username');
var fullName = document.querySelector('#fullName');
var $location = document.querySelector('#location');
var bio = document.querySelector('#bio');
var image = document.querySelector('.image');
var button = document.querySelector('button');

avatar.addEventListener('input', function () {
  image.setAttribute('src', avatar.value);
});

button.addEventListener('click', function () {
  data.profile.avatarUrl = avatar.value;
  data.profile.username = username.value;
  data.profile.fullName = fullName.value;
  data.profile.location = $location.value;
  data.profile.bio = bio.value;
  var dataVar = JSON.stringify(data);
  localStorage.setItem('data-object', dataVar);
  document.reset();
});
