const contentDiv = document.getElementById("content"); // Using a template literal to write HTML
const htmlString = ` 
  <div class="my-div">
    <h1>Hello, World!</h1>
    <p>This is a paragraph inserted by JavaScript.</p>
  </div> `;

contentDiv.innerHTML = htmlString;
