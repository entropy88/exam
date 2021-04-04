import {render, html} from "./node_modules/lit-html/lit-html.js";
import {getWikiByid, updateWiki} from "./data.js";

function editTemplate(wiki, onSubmit){
    return html`
     <section id="edit-page" class="content">
            <h1>Edit Article</h1>

            <form @submit=${onSubmit} id="edit" action="#" method="">
                <fieldset>
                    <p class="field title">
                        <label for="title">Title:</label>
                        <input type="text" name="title" id="title" placeholder="Enter article title" .value=${wiki.title}>
                    </p>

                    <p class="field category">
                        <label for="category">Category:</label>
                        <input type="text" name="category" id="category" placeholder="Enter article category" .value=${wiki.category}>
                    </p>
                    <p class="field">
                        <label for="content">Content:</label>
                        <textarea name="content" id="content" .value=${wiki.content}></textarea>
                    </p>

                    <p class="field submit">
                        <input class="btn submit" type="submit" value="Save Changes">
                    </p>

                </fieldset>
            </form>
        </section>

    `
}

export async function edit(ctx){
    let wikiId=ctx.params.id;
    let wiki=await getWikiByid(wikiId);

    ctx.render(editTemplate(wiki, onSubmit));

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

        await updateWiki(wikiId, {title,category,content});
        console.log("updated")
        ctx.page.redirect("/details/"+wikiId)
    }


}

