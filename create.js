import {render, html} from "./node_modules/lit-html/lit-html.js";
import {createWiki} from "./data.js";

function createTemplate(onSubmit){
    return html`
      <section @submit=${onSubmit} id="create-page" class="content">
            <h1>Create Article</h1>

            <form id="create" action="#" method="">
                <fieldset>
                    <p class="field title">
                        <label for="create-title">Title:</label>
                        <input type="text" id="create-title" name="title" placeholder="Enter article title">
                    </p>

                    <p class="field category">
                        <label for="create-category">Category:</label>
                        <input type="text" id="create-category" name="category" placeholder="Enter article category">
                    </p>
                    <p class="field">
                        <label for="create-content">Content:</label>
                        <textarea name="content" id="create-content"></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Create">
                    </p>

                </fieldset>
            </form>
        </section>

    `
}
export async function create(ctx){

    ctx.render(createTemplate(onSubmit));

    async function onSubmit(e){
        e.preventDefault();
        let form=e.target;
        let formData= new FormData(form);
        let title=formData.get("title");
        let category=formData.get("category");
        let content=formData.get("content");

        if (title.length<1 || category.length<1 || content.length<1 ){
            return alert ("all fields are mandatory")
        }

        await createWiki({title,category,content});
        ctx.page.redirect("/")
    }
}