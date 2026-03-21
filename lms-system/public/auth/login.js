//  At the top: show password
function myFunction() {
  var x = document.getElementById("myInput");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

// After DOM is ready
// window.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("loginform");

//   if (!loginForm) {
//     console.error("loginform element not found");
//     return;
//   }

//   loginForm.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     const formData = new FormData(e.target);
//     const data = Object.fromEntries(formData.entries());

//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//    const result = await res.json();

//     if (res.ok) {
//       alert("Login successful");

//       if (result.role === "Teacher") {
//         window.location.href = "/dashboards/teacher_dash.html";
//       } else if (result.role === "Student") {
//         window.location.href = "/dashboards/student.html";
//       } else {
//         window.location.href = "/dashboards/";
//       }
//     } else {
//       alert("❌ " + result.message);
//     }
//   } catch(err) {
//     console.error("Login request failed:", err);
//     alert("Server error. Please try again.");
//   }
// });
window.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginform");

  if (!loginForm) {
    console.error("loginform element not found");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Login successful");

        if (result.role === "Teacher") {
          window.location.href = "/dashboards/teacher_dash.html";
        } else if (result.role === "Student") {
          window.location.href = "/dashboards/student.html";
        } else {
          window.location.href = "/auth/login.html";
        }
      } else {
        alert(" " + result.message);
      }
    } catch (err) {
      console.error("Login request failed:", err);
      alert("Server error. Please try again.");
    }
  });
});
