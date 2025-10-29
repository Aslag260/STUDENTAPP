let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = localStorage.getItem("editIndex");

// ✅ Display students on index.html
function displayStudents() {
  const tableBody = document.querySelector("#studentTable tbody");
  if (!tableBody) return;
  tableBody.innerHTML = "";

  students.forEach((s, index) => {
    const row = `
      <tr>
        <td>${s.firstName}</td>
        <td>${s.lastName}</td>
        <td>${s.phone}</td>
        <td>${s.email}</td>
        <td>${s.bannerID}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

displayStudents();

// ✅ Add or Edit Student
function saveStudent(e) {
  e.preventDefault();

  const student = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    bannerID: document.getElementById("bannerID").value
  };

  if (editIndex !== null && editIndex !== "null") {
    students[editIndex] = student;
    localStorage.removeItem("editIndex");
  } else {
    students.push(student);
  }

  localStorage.setItem("students", JSON.stringify(students));
  window.location.href = "index.html";
}

// ✅ Edit student
function editStudent(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "form.html";
}

// ✅ Pre-fill form for editing
if (document.getElementById("studentForm") && editIndex !== null && editIndex !== "null") {
  const s = students[editIndex];
  document.getElementById("firstName").value = s.firstName;
  document.getElementById("lastName").value = s.lastName;
  document.getElementById("phone").value = s.phone;
  document.getElementById("email").value = s.email;
  document.getElementById("bannerID").value = s.bannerID;
  document.getElementById("formTitle").textContent = "Edit Student";
}

// ✅ Delete student
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  }
}

// ✅ Search student
function searchStudent() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const filtered = students.filter(s =>
    s.firstName.toLowerCase().includes(searchValue) ||
    s.lastName.toLowerCase().includes(searchValue)
  );
  renderFiltered(filtered);
}

// ✅ Sort student
function sortStudents() {
  const sortValue = document.getElementById("sort").value;
  students.sort((a, b) => {
    const nameA = a.firstName.toLowerCase();
    const nameB = b.firstName.toLowerCase();
    if (sortValue === "asc") return nameA.localeCompare(nameB);
    else return nameB.localeCompare(nameA);
  });
  displayStudents();
}

// ✅ Render filtered list
function renderFiltered(list) {
  const tableBody = document.querySelector("#studentTable tbody");
  tableBody.innerHTML = "";
  list.forEach((s, index) => {
    const row = `
      <tr>
        <td>${s.firstName}</td>
        <td>${s.lastName}</td>
        <td>${s.phone}</td>
        <td>${s.email}</td>
        <td>${s.bannerID}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

// ✅ Cancel edit/add
function cancel() {
  localStorage.removeItem("editIndex");
  window.location.href = "index.html";
}
