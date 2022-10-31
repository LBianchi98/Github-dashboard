import { Octokit, App } from "https://cdn.skypack.dev/octokit";
const octokit = new Octokit({
    auth: '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'
  });

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
console.log("Hello, %s", login);

const responseRepos = await octokit.request('GET /users/{username}/repos', {
  username: 'LBianchi98'
});
const repos = responseRepos.data;
const container = document.getElementById("tbody");
repos.forEach(element => {
  const url = element.commits_url.substring(0, element.commits_url.length - 6);//eliminate {/sha} from url
  fetch(url).then((response) => response.json()).then((data) => {
    let dataUnfixed = data[0].commit.committer.date.toString();
    let dataFixed = dataUnfixed.slice(8,10) + '-' + dataUnfixed.slice(5,7) + '-' + dataUnfixed.slice(0,4);
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdDate = document.createElement("td");
    var name = document.createTextNode(element.name);
    var date = document.createTextNode(dataFixed);
    tdName.appendChild(name);
    tdDate.appendChild(date);
    tr.appendChild(tdName);
    tr.appendChild(tdDate);
    container.appendChild(tr);
  });
  
  
});

document.getElementById("btnArchived").addEventListener("click", getArchived);
document.getElementById("btnActive").addEventListener("click", getActive);
document.getElementById("sortName").addEventListener("click", sortName);
document.getElementById("sortDate").addEventListener("click", sortDate);
function getArchived(){
  const allRepos = document.getElementsByTagName("p");
  for(let element of allRepos){
    
    if(element.className == "archived"){
      element.style.display = 'inline';
    }
    else{
      
      element.style.display = 'none';
    }
  }
}
function getActive(){
  const allRepos = document.getElementsByTagName("p");
  for(let element of allRepos){
    if(element.className == "active"){
      element.style.display = 'inline';
    }
    else{
      
      element.style.display = 'none';
    }
  }
}
function sortName() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("repos-table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
function sortDate() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("repos-table");
  switching = true;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[1];
      y = rows[i + 1].getElementsByTagName("TD")[1];
      var day1 =  x.innerHTML.slice(0,2);
      var day2 = y.innerHTML.slice(0,2);
      var month1 =  parseInt(x.innerHTML.slice(3,5));
      var month2 = parseInt(y.innerHTML.slice(3,5));
      var year1 =  x.innerHTML.slice(6,11);
      var year2 = y.innerHTML.slice(6,11);
      const date1 = new Date(year1,month1-1,day1);
      const date2 = new Date(year2,month2-1, day2);
      if (date1 < date2) {
        shouldSwitch = true;
        break;
      }
    }
   if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}