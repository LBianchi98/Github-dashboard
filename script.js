import { Octokit, App } from "https://cdn.skypack.dev/octokit";
const octokit = new Octokit({
    auth: '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'
  });

  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();
  console.log("Hello, %s", login);
