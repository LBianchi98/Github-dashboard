import { Octokit, App } from "https://cdn.skypack.dev/octokit";
const octokit = new Octokit({
    auth: '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'
  });

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);

const repos = await octokit.request('GET /users/{username}/repos', {
  username: 'LBianchi98'
});
console.log(repos.data);