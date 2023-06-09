const favoriteRepos = ["get-job", "word-wheel", "library-management-system", "barber-shop", "DateCalcBot", "study-projects"]

function userInformationHTML(user) {
  return `
      <h2>${user.name}
          <span class="small-name">
              (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
          </span>
      </h2>
      <div class="gh-content">
          <div class="gh-avatar">
              <a href="${user.html_url}" target="_blank">
                  <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
              </a>
          </div>
          <p>Followers: ${user.followers} / Following ${user.following} <br> Repos: ${user.public_repos}</p>
      </div>`;
}

function repoInformationHTML(user, repos) {
  if (repos.length == 0) {
    return `<div class="clearfix repo-list">No repos!</div>`;
  }

  let listItemsHTML;
  if (user.login === "FlashDrag") {
    listItemsHTML = hightlightFavoriteRepos(repos);
  } else {
    listItemsHTML = repos.map(function (repo) {
      return `<li>
                  <a href="${repo.html_url}" target="_blank">${repo.name}</a>
              </li>`;
    });
  }

  return `<div class="clearfix repo-list">
              <p>
                  <strong>Repo List:</strong>
              </p>
              <ul>
                  ${listItemsHTML.join("\n")}
              </ul>
          </div>`;
}

function hightlightFavoriteRepos(repos) {
  let listItemsHTML = repos.map(function (repo) {
    let listItem;
    if (favoriteRepos.includes(repo.name)) {
      listItem = `<li><a class="repo-highlight" href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
    } else {
      listItem = `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`
    }
    return listItem;
  });

  return listItemsHTML;
}

function fetchGitHubInformation() {
  $("#gh-user-data").html("");
  $("#gh-repo-data").html("");

  let username = $("#gh-username").val();

  if (!username) {
    $("#gh-user-data").html("<h2>Please enter a GitHub Username</h2>");
    return;
  }

  $("#gh-user-data").html(
    `<div id="loader">
        <img src="assets/css/loader.gif" alt="loading..." />
    </div>`
  );

  $.when(
    // jQuery getJSON (shorthand Ajax function that makes HTTP get request) method
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    function (firstResponse, secondResponse) {
      let userData = firstResponse[0];
      let repoData = secondResponse[0];
      $("#gh-user-data").html(userInformationHTML(userData));
      $("#gh-repo-data").html(repoInformationHTML(userData, repoData));
    }, function (errorResponse) {
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
      } else if (errorResponse.status === 403) {
        let resetTime = new Date(errorResponse.getResponseHeader("X-RateLimit-Reset") * 1000);
        $("#gh-user-data").html(`<h4>Too many requests, please wait until ${resetTime.toLocaleTimeString()}</h4>`)
      } else {
        $("#gh-user-data").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
      }
    });
}

/**
 * Creates a debounced version of the given function.
 * The debounced function will delay the invoking of the original function
 * until after the specified wait time has passed since the last time it was called.
 *
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay before invoking the function.
 * @returns {Function} - A debounced version of the given function.
 *
 * @example
 * const debouncedFunc = debounce(function() { console.log('Debounced!'); }, 300);
 * window.addEventListener('resize', debouncedFunc);
 */
function debounce(func, wait) {
  let timeout;

  return function(...args) {
    const context = this;

    // Clear any existing timeout to prevent the previous function call from executing
    clearTimeout(timeout);

    // Set a new timeout to delay the execution of the original function
    timeout = setTimeout(() => {
      // Call the original function with the saved context ('this') and arguments
      func.apply(context, args)
    }, wait);
  };
}

const throttledOnInput = debounce(fetchGitHubInformation, 800);

$(document).ready(fetchGitHubInformation);