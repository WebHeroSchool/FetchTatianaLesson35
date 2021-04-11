/*fetch('https://api.github.com/users/Tatiana20th');
  .then (res => res.json());
  .then(json => console.log(json.url));
  .then(json => console.log(json.avatar_url, json.url));
  .catch(err => console.log(err));
  .catch(error => console.error(error));*/

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

fetch('https://api.github.com/users/' + name)
    .then(res => res.json())
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

            addProfile();
            addBio();
            addAvatar();
        }
        else {
            alert('Sorry, no information about this user')
        }
    })

    .catch(err => alert(err + 'here is no data'));