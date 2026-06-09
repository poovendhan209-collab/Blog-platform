let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];
let editIndex = Number(localStorage.getItem("editIndex"));

// ================= SAVE =================
function saveBlogs() {
    localStorage.setItem("blogs", JSON.stringify(blogs));
}

// ================= DISPLAY BLOGS =================
function displayBlogs() {
    const blogList = document.getElementById("blogList");
    if (!blogList) return;

    blogList.innerHTML = "";

    blogs.forEach((blog, index) => {

        blogList.innerHTML += `
        <div class="card">

            <h2>${blog.title}</h2>

            ${blog.image ? `<img src="${blog.image}" class="blog-image">` : ""}

            <p>${blog.content}</p>

            <button onclick="editBlog(${index})">Edit</button>
            <button onclick="deleteBlog(${index})">Delete</button>

            <hr>

            <h3>Comments</h3>

            <div>
                ${(blog.comments || []).map(c => `<p>${c}</p>`).join("")}
            </div>

            <input type="text" id="comment${index}" placeholder="Comment">
            <button onclick="addComment(${index})">Post</button>

        </div>
        `;
    });
}

// ================= DELETE =================
function deleteBlog(index) {
    blogs.splice(index, 1);
    saveBlogs();
    displayBlogs();
}

// ================= EDIT =================
function editBlog(index) {
    localStorage.setItem("editIndex", index);
    window.location = "create.html";
}

// ================= COMMENT =================
function addComment(index) {

    let input = document.getElementById("comment" + index);
    let comment = input.value.trim();

    if (!comment) {
        alert("Enter comment");
        return;
    }

    if (!blogs[index].comments) {
        blogs[index].comments = [];
    }

    blogs[index].comments.push(comment);
    saveBlogs();

    input.value = "";
    displayBlogs();
}

// ================= CREATE / UPDATE BLOG =================
function saveBlog() {

    let title = document.getElementById("title").value.trim();
    let image = document.getElementById("image").value.trim();
    let content = document.getElementById("content").value.trim();

    if (!title || !content) {
        alert("Title and Content required");
        return;
    }

    let blog = {
        title,
        image,
        content,
        comments: []
    };

    if (editIndex >= 0) {
        blog.comments = blogs[editIndex].comments || [];
        blogs[editIndex] = blog;
        localStorage.removeItem("editIndex");
    } else {
        blogs.unshift(blog);
    }

    saveBlogs();
    window.location = "index.html";
}

// ================= LOGIN =================
function login() {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        alert("Login successful");
        window.location = "index.html";
    } else {
        alert("Invalid login");
    }
}

// ================= REGISTER =================
function register() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (!username || !email || !password) {
        alert("Fill all fields");
        return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully");
    window.location = "login.html";
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
    displayBlogs();
});