function myFunction() {
   var x = document.getElementById("myInput");
   if (x.type === "password") {
     x.type = "text";
   } else {
     x.type = "password";
   }
 }
// document.getElementById('signupform').addEventListener('submit', async (e) => {
//   e.preventDefault();

//   const formData = new FormData(e.target);
//   const data = Object.fromEntries(formData.entries());

//   try {
//     const res = await fetch('http://localhost:5000/api/auth/register', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });

//     const message = await res.text();

//     if (res.ok) {
//       alert(message); //  Registration successful
//     } else {
//       alert(message); //  Email already exists, etc.
//     }
//   } catch (err) {
//     console.error('Frontend fetch error:', err);
//     alert('Something went wrong. Please try again.');
//   }
// });
document.getElementById('signupform').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json(); //  Parse JSON

    if (!res.ok) {
      alert(` Error: ${result.message}`); //  Show specific backend error
      return;
    }

    alert(`Success: ${result.message}`);
  } catch (err) {
    console.error('Frontend fetch error:', err);
    alert(' Something went wrong. Please try again.');
  }
});

