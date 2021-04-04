import {render, html} from "./node_modules/lit-html/lit-html.js";
import {getWikiByid} from "./data.js";
import {deleteWiki} from "./data.js"

function detailsTemplate(wiki, userIsOwner,delWiki){
return html`
 <section id="details-page" class="content details">
            <h1>${wiki.title}</h1>

            <div class="details-content">
                <strong>${wiki.category}</strong>
                <p>${wiki.content}</p>

                <div class="buttons">
                    ${userIsOwner?html`<a @click=${delWiki} href="javascript:void(0)" class="btn delete">Delete</a>
                    <a href="/edit/${wiki._id}" class="btn edit">Edit</a>`:""}
                 
                    <a href="/home" class="btn edit">Back</a>
                </div>
            </div>
        </section>
`
}

export async function details(ctx){
    let wikiId=ctx.params.id;
    let wiki= await getWikiByid(wikiId);
    let userIsOwner=wiki._ownerId==sessionStorage.getItem("userId");

    ctx.render(detailsTemplate(wiki,userIsOwner,delWiki));

    async function delWiki(){
     
        let confirmed=confirm("are you sure?");
        if (confirmed){
            await deleteWiki(wikiId);
            ctx.page.redirect("/home")
        }
}
}