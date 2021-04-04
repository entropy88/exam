import {render, html} from "./node_modules/lit-html/lit-html.js";
import {getAllWikis} from "./data.js"

function catalogTemplate(data){
    return html`
    <section id="catalog-page" class="content catalogue">
            <h1>All Articles</h1>

            ${data.length>0?data.map(wikiTemplate):html`<h3 class="no-articles">No articles yet</h3>`}

            <!-- <a class="article-preview" href="#">
                <article>
                    <h3>Topic: <span>Arrays</span></h3>
                    <p>Category: <span>Javascript</span></p>
                </article>
            </a>
            <a class="article-preview" href="#">
                <article>
                    <h3>Topic: <span>Tuples and Sets</span></h3>
                    <p>Category: <span>Python</span></p>
                </article>
            </a>
            <a class="article-preview" href="#">
                <article>
                    <h3>Topic: <span>Stacks and Queues</span></h3>
                    <p>Category: <span>Java</span></p>
                </article>
            </a>
            <a class="article-preview" href="#">
                <article>
                    <h3>Topic: <span>Lists</span></h3>
                    <p>Category: <span>C#</span></p>
                </article>
            </a>
            <a class="article-preview" href="#">
                <article>
                    <h3>Topic: <span>Classes</span></h3>
                    <p>Category: <span>Javascript</span></p>
                </article>
            </a> -->

            <!-- No articles message -->
            
        </section>

    `
}

export async function catalog(ctx){
    
    let data= await getAllWikis();
    ctx.render(catalogTemplate(data));

}

function wikiTemplate(item){
    return html` <a class="article-preview" href="/details/${item._id}">
    <article>
        <h3>Topic: <span>${item.title}</span></h3>
        <p>Category: <span>${item.category}</p>
    </article>
</a>`
}