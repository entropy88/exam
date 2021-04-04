import {render, html} from "./node_modules/lit-html/lit-html.js";
import {register as apiRegister} from "./data.js"


function registerTemplate(onSubmit){
    return html`
     <section id="register-page" class="content auth">
            <h1>Register</h1>

            <form @submit=${onSubmit} id="register" action="#" method="">
                <fieldset>
                    <blockquote>Knowledge is not simply another commodity. On the contrary. Knowledge is never used up.
                        It
                        increases by diffusion and grows by dispersion.</blockquote>
                    <p class="field email">
                        <label for="register-email">Email:</label>
                        <input type="email" id="register-email" name="email" placeholder="maria@email.com">
                    </p>
                    <p class="field password">
                        <label for="register-pass">Password:</label>
                        <input type="password" name="password" id="register-pass">
                    </p>
                    <p class="field password">
                        <label for="register-rep-pass">Repeat password:</label>
                        <input type="password" name="rep-pass" id="register-rep-pass">
                    </p>
                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Register">
                    </p>
                    <p class="field">
                        <span>If you already have profile click <a href="#">here</a></span>
                    </p>
                </fieldset>
            </form>
        </section>
    `
}

export async function register(ctx){

    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let form=e.target;
        let formData=new FormData(form);
        let email=formData.get("email");
        let password=formData.get("password");
        let repass=formData.get("rep-pass");
        if (password!==repass){
            return alert("passords differ")
        }

        await apiRegister(email, password);
        ctx.page.redirect("/home");

    }
}