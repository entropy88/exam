import {
    render,
    html
} from "./node_modules/lit-html/lit-html.js";
import {
    searchByKeyword
} from "./data.js";

function searchTemplate(onSearch) {
    return html `
     <section id="search-page" class="content">
            <h1>Search</h1>
            <form @submit=${onSearch} id="search-form">
                <p class="field search">
                    <input @id="searchInput" type="text" placeholder="Search by article title" name="search">
                </p>
                <p class="field submit">
                    <input class="btn submit" type="submit" value="Search">
                </p>
            </form>
            <div class="search-container">
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
                        <p>Category: <span>JAVA</span></p>
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
                </a>

                <h3 class="no-articles">No matching articles</h3> -->
            </div>
        </section>
    `
}

function wikiPreviewTemplate(wiki) {
    return html `<a class="article-preview" href="/details/"+wiki._id>
    <article>
        <h3>Topic: <span>${wiki.title}</span></h3>
        <p>Category: <span>${wiki.category}</span></p>
    </article>
</a> `
}

export async function search(ctx) {

    async function onSearch(e) {
        e.preventDefault();
        let searchQuery = document.querySelector("input").value;
        console.log(searchQuery)

        let wikis = await searchByKeyword(searchQuery);
        let wikisDiv = document.getElementsByClassName("search-container")[0];
        if (wikisDiv.length > 0) {
            ctx.render(wikis.map(wikiPreviewTemplate), wikisDiv);

        } else {
            ctx.render(html ` <h3 class="no-articles">No matching articles</h3>`, wikisDiv)
        }
    }

    ctx.render(searchTemplate(onSearch));

}