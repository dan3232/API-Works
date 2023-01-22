let postArray = []
const postTitle = document.getElementById("title");
const postBody = document.getElementById("body");

function renderPosts() {
        let html = ""
        for (data of postArray) {
            html += `
            <h3>${data.title}</h3>
            <p>${data.body}</p>
            <hr/>
            `
        }
        document.getElementById("container").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postArray = data.slice(0, 5);
        renderPosts() 
    })

document.getElementById("new-post").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = {
        title: postTitle.value,
        body: postBody.value
    }
    fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            postArray.unshift(data);
            renderPosts();
            postTitle.value = "";
            postBody.value = "";
        });
})


