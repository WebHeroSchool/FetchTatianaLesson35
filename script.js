/*const name = 'Tatiana20th';
const url = 'https://api.github.com/users/';
const log = console.log;*/

/*const getName = () => setTimeout(() => name ? log(name) : log('Иия не найдено'), 3000);
const getUrl = () => setTimeout (() => url ? log(url) : log('Ccылка не найдена'), 2000);

fetch(`${url}${name}`)
  .then(res => res.json())
  .then(json => log(json.avatar_url))
  .catch(err => log(err)); */


/*const getName = new Promise((resolve, reject) => {
	setTimeout(() => name ? resolve(name) : reject('Имя не найдено'), 3000);
});

const getUrl = new Promise((resolve, reject) => {
	setTimeout(() => url ? resolve(url) : reject('Ccылка не найдена'), 2000);
});

Promise.all([getName, getUrl])
  .then(([name, url]) => fetch(`${url}${name}`))
  .then(res => res.json())
  .then(json => log(json.avatar_url))
  .catch(err => log(err));*/

let url = window.location.toString();

let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if (userName === undefined){
        userName = 'Tatiana20th';
    }
    return userName;
}

let name = getUsername(url);

let getNewDate = new Promise((resolve, reject) => {
	let newDate = new Date();
	setTimeout(() => newDate ? resolve(newDate) : reject('Ошибка в вычислении времени'), 3000);
});

let getUserData = fetch('https://api.github.com/users/' + name);

Promise.all([getUserData, getNewDate])
    .then(([oneUserData, oneNewDate]) => {
    	userData = oneUserData;
    	todayDate = oneNewDate;
    })

    .then(res => userData.json())
    .then(json => {
        let avatar = json.avatar_url;
        let name = json.login;
        let bio = json.bio;
        let profile = json.html_url;
        if (name) {

            let addAvatar = () => {
                let newAvatar = document.createElement('img');
                newAvatar.src = avatar;
                let addString = document.createElement('br');
                document.body.appendChild(newAvatar);
                document.body.appendChild(addString);
            }

            let addBio = () => {
                let newBio = document.createElement('p');
                newBio.innerHTML = bio;
                document.body.appendChild(newBio);
            }

            let addProfile = () => {
                let elementForLink = document.createElement('a');
                let elementForHeader = document.createElement('h2');
                elementForHeader.innerText = name;
                elementForLink.href = profile;
                document.body.appendChild(elementForLink);
                elementForLink.appendChild(elementForHeader);
            }

            let addDate = () => {
            	let newTodayDate = document.createElement('p');
            	newTodayDate.innerHTML = todayDate;
            	document.body.appendChild(newTodayDate);
            }

            let preloader = document.getElementById('circle');
            preloader.classList.add('hidden');


            addProfile();
            addBio();
            addAvatar();
            addDate();
        }
        else {
            alert('Sorry, no information about this user')
        }
    })

    .catch(err => alert(err + 'here is no data'));