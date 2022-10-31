import { Octokit } from "https://cdn.skypack.dev/octokit";
const octokit = new Octokit({
    auth: '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'
  });

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();
const responseRepos = await octokit.request('GET /user/repos', {});
const repos = responseRepos.data;
const container = document.getElementById("tbody");
repos.forEach(async element => {
  const url = element.commits_url.substring(22, element.commits_url.length - 6);//eliminate {/sha} from url
  const response = await octokit.request('GET ' + url, { });
  const data = response.data;
  let dataUnfixed = data[0].commit.committer.date.toString();
  let dataFixed = dataUnfixed.slice(8,10) + '-' + dataUnfixed.slice(5,7) + '-' + dataUnfixed.slice(0,4);
  let tr = document.createElement("tr");
  if(!element.archived)
    tr.className = "active"
  else tr.className = "archived"
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
  


document.getElementById("btnArchived").addEventListener("click", getArchived);
document.getElementById("btnActive").addEventListener("click", getActive);
document.getElementById("sortName").addEventListener("click", sortName);
document.getElementById("sortDate").addEventListener("click", sortDate);
document.getElementById("searchBtn").addEventListener("click", search);
function getArchived(){
  const allRepos = document.getElementsByTagName("tr");
  for(let element of allRepos){
    
    if(element.className == "archived"){
      element.style.display = 'table-row';
    }
    else if(element.className == "active"){
      
      element.style.display = 'none';
    }
  }
}
function getActive(){
  const allRepos = document.getElementsByTagName("tr");
  for(let element of allRepos){
    if(element.className == "active"){
      element.style.display = 'table-row';
    }
    else if(element.className == "archived"){
      
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
function search() {
  const actives = document.getElementsByClassName("active");
  const archiveds = document.getElementsByClassName("archived");
  const val = document.getElementById('searchInput').value;
  var re = new RegExp(val, 'gi');
  console.log(re)
  for(let element of actives){
    if(element.firstChild.innerHTML.match(re) == null){
      element.style.display = 'none';
    }
    else{
      element.style.display = 'table-row';
    }
  }
  for(let element of archiveds){
    if(element.firstChild.innerHTML.match(re) == null){
      element.style.display = 'none';
    }
    else{
      element.style.display = 'table-row';
    }
  }
}