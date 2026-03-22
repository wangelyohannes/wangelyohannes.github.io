document.addEventListener("DOMContentLoaded", function () {
  var genHtmlBtn = document.getElementById("generate-html-btn");
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

  genHtmlBtn.onclick = function () {
    var firstName;
    var middleName;
    var nickname;
    var lastName;
    var mascotAdj;
    var mascotAnimal;
    var customCaption;
    var courseEntries;
    var linkEntries;
    var coursesLi;
    var linkArray;
    var i;
    var entry;
    var dept;
    var num;
    var name;
    var reason;
    var url;
    var rawHtmlCode;
    var displayName;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    firstName = getVal("first-name");
    middleName = getVal("middle-name");
    nickname = getVal("nickname");
    lastName = getVal("last-name");
    mascotAdj = getVal("mascot-adj");
    mascotAnimal = getVal("mascot-animal");
    customCaption = getVal("caption");

    displayName = firstName;
    if (middleName) {
      displayName += " " + middleName;
    }
    if (nickname) {
      displayName += ' "' + nickname + '"';
    }
    displayName += " " + lastName + "'s " + mascotAdj + " " + mascotAnimal;

    coursesLi = "";
    courseEntries = document.querySelectorAll(".course-entry");

    for (i = 0; i < courseEntries.length; i += 1) {
      entry = courseEntries[i];
      dept = entry.querySelector(".course-dept").value;
      num = entry.querySelector(".course-num").value;
      name = entry.querySelector(".course-name").value;
      reason = entry.querySelector(".course-reason").value;

      coursesLi +=
        "            <li><strong>" +
        dept +
        " " +
        num +
        " - " +
        name +
        ":</strong> " +
        reason +
        "</li>\n";
    }

    linkArray = [];
    linkEntries = document.querySelectorAll(".link-entry");

    for (i = 0; i < linkEntries.length; i += 1) {
      entry = linkEntries[i];
      name = entry.querySelector(".link-name").value;
      url = entry.querySelector(".link-url").value;
      linkArray.push('<a href="' + url + '" target="_blank">' + name + "</a>");
    }

    rawHtmlCode =
      "<!DOCTYPE html>\n" +
      '<html lang="en">\n' +
      "<body>\n\n" +
      "    <header>\n" +
      "        <h1>" +
      displayName +
      "</h1>\n" +
      "    </header>\n" +
      "    <main>\n" +
      "        <figure>\n" +
      '            <img src="' +
      getVal("default-image") +
      '" alt="' +
      firstName +
      '">\n' +
      "            <figcaption>" +
      customCaption +
      "</figcaption>\n" +
      "        </figure>\n" +
      "        <p>" +
      getVal("personal-state") +
      "</p>\n" +
      "        <ul>\n" +
      (getVal("nickname")
        ? "            <li><strong>Nickname:</strong> " +
          getVal("nickname") +
          "</li>\n"
        : "") +
      "            <li><strong>Personal Background:</strong> " +
      getVal("personal-bg") +
      "</li>\n" +
      "            <li><strong>Professional Background:</strong> " +
      getVal("professional-bg") +
      "</li>\n" +
      "            <li><strong>Academic Background:</strong> " +
      getVal("academic-bg") +
      "</li>\n" +
      "            <li><strong>Subject Background:</strong> " +
      getVal("subject-bg") +
      "</li>\n" +
      "            <li><strong>Primary Computer:</strong> " +
      getVal("computer-bg") +
      "</li>\n" +
      "            <li><strong>Backup Work Computer and Location Plan:</strong> " +
      getVal("backup-computer") +
      "</li>\n" +
      "            <li><strong>Courses:</strong>\n" +
      "                <ul>\n" +
      coursesLi +
      "                </ul>\n" +
      "            </li>\n" +
      (getVal("funny-item")
        ? "            <li><strong>Funny Item:</strong> " +
          getVal("funny-item") +
          "</li>\n"
        : "") +
      (getVal("share-item")
        ? "            <li><strong>Shared Item:</strong> " +
          getVal("share-item") +
          "</li>\n"
        : "") +
      "        </ul>\n" +
      '        <p><em>"' +
      getVal("quote") +
      '"</em> — ' +
      getVal("quote-author") +
      "</p>\n" +
      "        <nav>\n" +
      "            " +
      linkArray.join(" | ") +
      "\n" +
      "        </nav>\n" +
      "    </main>\n" +
      "</body>\n" +
      "</html>";

    pageTitle.innerText = "Introduction HTML";
    form.style.display = "none";
    formSubtitle.style.display = "none";

    outputContainer.innerHTML =
      "<section>" +
      "<h3>Generated HTML Code:</h3>" +
      '<pre><code class="language-html">' +
      escapeHtml(rawHtmlCode) +
      "</code></pre>" +
      '<div style="text-align: center; margin-top: 20px;">' +
      '<button type="button" id="html-back-btn">Back to Form</button>' +
      "</div>" +
      "</section>";

    outputContainer.style.display = "block";
    outputContainer.hidden = false;

    if (typeof hljs !== "undefined") {
      hljs.highlightAll();
    }

    document.getElementById("html-back-btn").onclick = function () {
      outputContainer.style.display = "none";
      form.style.display = "block";
      pageTitle.innerText = "Introduction Form";
      formSubtitle.style.display = "block";
    };
  };
});
