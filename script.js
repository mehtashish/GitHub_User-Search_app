const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

async function getUser(username) {
    console.log("Fetching user data for:", username);
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
        notifySearch(username)

    } catch (err) {
        console.error("Error fetching user:", err);
        if (err.response && err.response.status == 404) {
            createErrorCard('No profile with this username!')
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data)
    } catch (err) {
        createErrorCard('Problem fetching repos. Try again!')
    }
}

function createUserCard(user) {
    const userID = user.name || user.login
    const userBio = user.bio ? `<p>${user.bio}</p>` : ''
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${userID}</h2>
      ${userBio}
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repos</strong></li>
      </ul>

      <div id="repos"></div>
    </div>
  </div>
    `
    main.innerHTML = cardHTML
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `

    main.innerHTML = cardHTML
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos')

    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a')
            repoEl.classList.add('repo')
            repoEl.href = repo.html_url
            repoEl.target = '_blank'
            repoEl.innerText = repo.name

            reposEl.appendChild(repoEl)
        })
}

async function notifySearch(username) {
    const bodyData = JSON.stringify({
        body: JSON.stringify({ username })
    });

    const response = await fetch('https://3xdnej4bm0.execute-api.us-east-1.amazonaws.com/dep/notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: bodyData,
    });

    if (response.ok) {
        console.log('Notification sent!');
    } else {
        console.error('Failed to send notification', await response.text());
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value.trim();

    console.log("Search value submitted:", user);

    if (user) {
        getUser(user);
        search.value = '';
    } else {
        console.log("No username entered");
    }
});