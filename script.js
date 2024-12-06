const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const toggleThemeBtn = document.getElementById('toggleTheme');
const body = document.body;

toggleThemeBtn.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const themeText = document.querySelector('.theme-text');
    themeText.textContent = body.classList.contains('light-mode') ? 'Dark' : 'Light';
});

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
    const userID = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}</p>` : '';
    const profileLink = user.html_url;
    const followersLink = `${profileLink}?tab=followers`;
    const followingLink = `${profileLink}?tab=following`;
    const repoLink = `${profileLink}?tab=repositories`;

    const cardHTML = `
    <div class="card profile-card">
        <div class="avatar-container">
            <a href="${profileLink}" target="_blank">
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
            </a>
        </div>
        <div class="user-info">
            <h1><a href="${profileLink}" target="_blank">${userID}</a></h1>
            ${userBio}
            <ul>
                <li><a href="${followersLink}" target="_blank">${user.followers} Followers</a></li>
                <li><a href="${followingLink}" target="_blank">${user.following} Following</a></li>
                <li><a href="${repoLink}" target="_blank">${user.public_repos} Repositories</a></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
    `;
    main.innerHTML = cardHTML;
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
    const reposEl = document.getElementById('repos');

    repos.slice(0, 5).forEach((repo) => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

// for integrating AWS SNS service

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