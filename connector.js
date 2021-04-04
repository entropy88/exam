import {render, html} from "./node_modules/lit-html/lit-html.js";
import page from "./node_modules/page/page.mjs"

//IMPORT FROM MODULES!
//import {render, html} from "./node_modules/lit-html/lit-html.js";
//import page from "./node_modules/page/page.mjs"

import {logout as apiLogout} from "./data.js"

import {catalog} from "./catalog.js";
import {login} from "./login.js";
import {register} from "./register.js";
import {create} from "./create.js";
import {details} from "./details.js";
import {edit} from "./edit.js";
import {home} from "./home.js";
import {search} from "./search.js";
// import {myPublications} from "./myPublications.js";

let main=document.querySelector("main");

let logoutBtn=document.getElementById("logoutBtn");
logoutBtn.addEventListener("click", logout);

function logout(){
    console.log("logout")
    apiLogout();
    setUserNav();
    page.redirect("/")
}

setUserNav()

page("/", loadData, home);
page("/home", loadData, home);
page("/catalog", loadData, catalog);
page("/login", loadData, login);
page("/register", loadData, register);
page("/create", loadData, create);
page("/details/:id", loadData, details);
page("/edit/:id", loadData, edit);
page("/search", loadData, search);
page.start()


function setUserNav(){
    let guest=document.getElementById("guest");
    let user=document.getElementById("user");
    let userIsLogged=sessionStorage.getItem("userId");
    if (userIsLogged!=null){
        guest.style.display="none";
        user.style.display="inline-block";
    } else {
        guest.style.display="inline-block";
        user.style.display="none";
    }
}

function loadData(ctx, next){
    ctx.render=function(view){
        render(view,main);
    }
    ctx.setUserNav=setUserNav;
    setUserNav();
    next();
}