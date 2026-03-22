document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("intro-form");
  var outputContainer = document.getElementById("output-container");
  var pageTitle = document.getElementById("page-title");
  var formSubtitle = document.getElementById("form-subtitle");
  var courseSection = document.getElementById("courses-container");
  var linkSection = document.getElementById("links-container");
  var DEFAULT_IMG = "images/42F5A85F-440C-47BE-A65C-BBAA2830FF7F_1_105_c.jpeg";

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

  function addCourseRow() {
    var newCourse = document.createElement("div");
    newCourse.className = "course-entry";
    newCourse.innerHTML =
      '<input type="text" class="course-dept" placeholder="Dept" required />' +
      '<input type="text" class="course-num" placeholder="Number" required />' +
      '<input type="text" class="course-name" placeholder="Course Name" required />' +
      '<input type="text" class="course-reason" placeholder="Why?" required />' +
      '<button type="button" class="delete-course-btn">Delete</button>';
    courseSection.appendChild(newCourse);
  }

  function addLinkRow() {
    var newLink = document.createElement("div");
    newLink.className = "link-entry";
    newLink.innerHTML =
      '<label>Link Name: <input type="text" class="link-name" required /></label>' +
      '<label>URL: <input type="url" class="link-url" required /></label>' +
      '<button type="button" class="delete-link-btn">Delete</button>';
    linkSection.appendChild(newLink);
  }

  function collectCourses() {
    var courseHTML = "<ul>";
    var entries = document.querySelectorAll(".course-entry");
    var i;
    var entry;
    var dept;
    var num;
    var name;
    var reason;

    for (i = 0; i < entries.length; i += 1) {
      entry = entries[i];
      dept = entry.querySelector(".course-dept").value;
      num = entry.querySelector(".course-num").value;
      name = entry.querySelector(".course-name").value;
      reason = entry.querySelector(".course-reason").value;

      if (dept && num) {
        courseHTML +=
          "<li><strong>" +
          escapeHtml(dept) +
          " " +
          escapeHtml(num) +
          " - " +
          escapeHtml(name) +
          ":</strong> " +
          escapeHtml(reason) +
          "</li>";
      }
    }

    courseHTML += "</ul>";
    return courseHTML;
  }

  function collectLinks() {
    var linkArray = [];
    var entries = document.querySelectorAll(".link-entry");
    var i;
    var entry;
    var name;
    var url;

    for (i = 0; i < entries.length; i += 1) {
      entry = entries[i];
      name = entry.querySelector(".link-name").value;
      url = entry.querySelector(".link-url").value;

      if (name && url) {
        linkArray.push(
          '<a href="' +
            escapeHtml(url) +
            '" target="_blank">' +
            escapeHtml(name) +
            "</a>"
          );
      }
    }

    return linkArray.join(" | ");
  }

  function getImageUrl() {
    var imageInput = document.getElementById("user-image");
    if (imageInput && imageInput.files && imageInput.files[0]) {
      return URL.createObjectURL(imageInput.files[0]);
    }
    return DEFAULT_IMG;
  }

  function buildHeaderTitle() {
    var firstName = getVal("first-name");
    var middleName = getVal("middle-name");
    var nickname = getVal("nickname");
    var lastName = getVal("last-name");
    var mascotAdj = getVal("mascot-adj");
    var mascotAnimal = getVal("mascot-animal");

    var title = firstName + " ";

    if (middleName) {
      title += middleName + " ";
    }

    if (nickname) {
      title += '"' + nickname + '" ';
    }

    title += lastName + "'s " + mascotAdj + " " + mascotAnimal;
    return title;
  }

  function renderIntroduction() {
    var headerTitle = buildHeaderTitle();
    var customCaption = getVal("caption");
    var personalSt = getVal("personal-state");
    var personalBg = getVal("personal-bg");
    var professionalBg = getVal("professional-bg");
    var academicBg = getVal("academic-bg");
    var subjectBg = getVal("subject-bg");
    var computerBg = getVal("computer-bg");
    var backupComputer = getVal("backup-computer");
    var funnyItem = getVal("funny-item");
    var shareItem = getVal("share-item");
    var courseHTML = collectCourses();
    var linkHTML = collectLinks();
    var imageUrl = getImageUrl();
    var quote = getVal("quote");
    var quoteAuthor = getVal("quote-author");
    var outputHtml = "";

    outputHtml += "<h3>" + escapeHtml(headerTitle) + "</h3>";
    outputHtml += '<figure style="text-align: center;">';
    outputHtml +=
      '<img src="' +
      escapeHtml(imageUrl) +
      '" alt="Profile Photo" style="max-width: 300px; border-radius: 10px;" />';
    outputHtml += "<figcaption>" + escapeHtml(customCaption) + "</figcaption>";
    outputHtml += "</figure>";
    outputHtml += "<p>" + escapeHtml(personalSt) + "</p>";
    outputHtml += '<ul style="list-style: none; padding: 0;">';
    outputHtml += "<li><h3>Background & Interests</h3></li>";
    outputHtml +=
      "<li><strong>•Personal Background:</strong> " +
      escapeHtml(personalBg) +
      "</li>";
    outputHtml +=
      "<li><strong>•Professional Background:</strong> " +
      escapeHtml(professionalBg) +
      "</li>";
    outputHtml +=
      "<li><strong>•Academic Background:</strong> " +
      escapeHtml(academicBg) +
      "</li>";
    outputHtml +=
      "<li><strong>•Subject Background:</strong> " +
      escapeHtml(subjectBg) +
      "</li>";
    outputHtml +=
      "<li><strong>•Primary Computer:</strong> " +
      escapeHtml(computerBg) +
      "</li>";
    outputHtml +=
      "<li><strong>•Backup Work Computer and Location Plan:</strong> " +
      escapeHtml(backupComputer) +
      "</li>";

    if (funnyItem) {
      outputHtml +=
        "<li><strong>•Funny / Interesting Item:</strong> " +
        escapeHtml(funnyItem) +
        "</li>";
    }

    if (shareItem) {
      outputHtml +=
        "<li><strong>•I'd also like to share:</strong> " +
        escapeHtml(shareItem) +
        "</li>";
    }

    outputHtml +=
      "<li><strong><h3>Courses:</h3></strong> " + courseHTML + "</li>";
    outputHtml += "</ul>";
    outputHtml +=
      '<p style="text-align: center; font-style: italic; margin-top: 20px;">"' +
      escapeHtml(quote) +
      '" — ' +
      escapeHtml(quoteAuthor) +
      "</p>";
    outputHtml +=
      '<div style="text-align: center; margin-top: 20px; font-weight: bold;">' +
      linkHTML +
      "</div>";
    outputHtml += '<div style="text-align: center; margin-top: 30px;">';
    outputHtml +=
      '<button type="button" id="reset-page-btn">Fill out the form again</button>';
    outputHtml += "</div>";

    form.style.display = "none";
    formSubtitle.style.display = "none";
    outputContainer.innerHTML = outputHtml;
    outputContainer.style.display = "block";
    outputContainer.hidden = false;

    document.getElementById("reset-page-btn").onclick = function () {
      window.location.reload();
    };
  }

  document.getElementById("add-course-btn").onclick = function () {
    addCourseRow();
  };

  document.getElementById("add-link-btn").onclick = function () {
    addLinkRow();
  };

  document.addEventListener("click", function (e) {
    var entryClass;
    var rows;

    if (
      e.target &&
      (e.target.classList.contains("delete-course-btn") ||
        e.target.classList.contains("delete-link-btn"))
    ) {
      if (e.target.classList.contains("delete-course-btn")) {
        entryClass = ".course-entry";
      } else {
        entryClass = ".link-entry";
      }

      rows = document.querySelectorAll(entryClass);

      if (rows.length > 1) {
        e.target.parentElement.remove();
      } else {
        var inputs = e.target.parentElement.querySelectorAll("input");
        var i;
        for (i = 0; i < inputs.length; i += 1) {
          inputs[i].value = "";
        }
      }
    }
  });

  document.getElementById("reset-btn").onclick = function () {
    window.location.reload();
  };

  document.getElementById("clear-btn").onclick = function (e) {
    var inputs;
    var textareas;
    var courseRows;
    var linkRows;
    var i;
    var j;

    e.preventDefault();

    inputs = form.querySelectorAll("input");
    textareas = form.querySelectorAll("textarea");

    for (i = 0; i < inputs.length; i += 1) {
      if (
        inputs[i].type !== "submit" &&
        inputs[i].type !== "reset" &&
        inputs[i].type !== "button" &&
        inputs[i].type !== "hidden" &&
        inputs[i].type !== "file"
      ) {
        inputs[i].value = "";
      }
    }

    for (i = 0; i < textareas.length; i += 1) {
      textareas[i].value = "";
    }

    courseRows = document.querySelectorAll(".course-entry");
    for (i = 0; i < courseRows.length; i += 1) {
      if (i > 0) {
        courseRows[i].remove();
      } else {
        var courseInputs = courseRows[i].querySelectorAll("input");
        for (j = 0; j < courseInputs.length; j += 1) {
          courseInputs[j].value = "";
        }
      }
    }

    linkRows = document.querySelectorAll(".link-entry");
    for (i = 0; i < linkRows.length; i += 1) {
      if (i > 0) {
        linkRows[i].remove();
      } else {
        var linkInputs = linkRows[i].querySelectorAll("input");
        for (j = 0; j < linkInputs.length; j += 1) {
          linkInputs[j].value = "";
        }
      }
    }
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    renderIntroduction();
  });
});
