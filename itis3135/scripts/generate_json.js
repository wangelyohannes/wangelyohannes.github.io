document.addEventListener("DOMContentLoaded", function () {
  var genJsonBtn = document.getElementById("generate-json-btn");
  var form = document.getElementById("intro-form");
  var outputContainer = document.getElementById("output-container");
  var pageTitle = document.getElementById("page-title");
  var formSubtitle = document.getElementById("form-subtitle");

  function getVal(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  genJsonBtn.onclick = function () {
    var imageInput;
    var imageUrl;
    var courses;
    var links;
    var courseEntries;
    var linkEntries;
    var i;
    var entry;
    var introData;
    var jsonString;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    imageInput = document.getElementById("user-image");
    imageUrl = getVal("default-image");

    if (imageInput && imageInput.files && imageInput.files[0]) {
      imageUrl = imageInput.files[0].name;
    }

    courses = [];
    courseEntries = document.querySelectorAll(".course-entry");

    for (i = 0; i < courseEntries.length; i += 1) {
      entry = courseEntries[i];
      courses.push({
        department: entry.querySelector(".course-dept").value,
        number: entry.querySelector(".course-num").value,
        name: entry.querySelector(".course-name").value,
        reason: entry.querySelector(".course-reason").value
      });
    }

    links = [];
    linkEntries = document.querySelectorAll(".link-entry");

    for (i = 0; i < linkEntries.length; i += 1) {
      entry = linkEntries[i];
      links.push({
        name: entry.querySelector(".link-name").value,
        href: entry.querySelector(".link-url").value
      });
    }

    introData = {};
    introData["first_name"] = getVal("first-name");
    introData["middle_name"] = getVal("middle-name") || null;
    introData["preferred_name"] = getVal("nickname") || null;
    introData["last_name"] = getVal("last-name");
    introData["divider"] = getVal("divider");
    introData["mascot_adjective"] = getVal("mascot-adj");
    introData["mascot_animal"] = getVal("mascot-animal");
    introData["acknowledgment_statement"] = getVal("ack-statement");
    introData["acknowledgment_date"] = getVal("ack-date");
    introData["image"] = imageUrl;
    introData["image_caption"] = getVal("caption");
    introData["personal_statement"] = getVal("personal-state");
    introData["personal_background"] = getVal("personal-bg");
    introData["professional_background"] = getVal("professional-bg");
    introData["academic_background"] = getVal("academic-bg");
    introData["subject_background"] = getVal("subject-bg");
    introData["primary_computer"] = getVal("computer-bg");
    introData["backup_computer"] = getVal("backup-computer");
    introData["funny_thing"] = getVal("funny-item") || null;
    introData["share_more"] = getVal("share-item") || null;
    introData["quote"] = getVal("quote");
    introData["quote_author"] = getVal("quote-author");
    introData["courses"] = courses;
    introData["links"] = links;

    jsonString = JSON.stringify(introData, null, 2);

    pageTitle.innerText = "Introduction JSON";
    form.style.display = "none";
    formSubtitle.style.display = "none";

    outputContainer.innerHTML =
      "<section>" +
      "<h3>Generated JSON Data:</h3>" +
      '<pre><code class="language-json">' +
      escapeHtml(jsonString) +
      "</code></pre>" +
      '<div style="text-align: center; margin-top: 20px;">' +
      '<button type="button" id="json-back-btn">Back to Form</button>' +
      "</div>" +
      "</section>";

    outputContainer.style.display = "block";
    outputContainer.hidden = false;

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }

    document.getElementById("json-back-btn").onclick = function () {
      outputContainer.style.display = "none";
      form.style.display = "block";
      pageTitle.innerText = "Introduction Form";
      formSubtitle.style.display = "block";
    };
  };
});
