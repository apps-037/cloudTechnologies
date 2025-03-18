document.getElementById("inquiryForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    let formData = {
        name: document.querySelector("[name='name']").value,
        email: document.querySelector("[name='email']").value,
        phone: document.querySelector("[name='phone']").value,
        date: document.getElementById("datepicker").value,
        message: document.querySelector("[name='message']").value
    };

    try {
        let response = await fetch("https://cloudtechnologies.onrender.com/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("Email sent successfully!");
        } else {
            alert("Error sending email.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred.");
    }
});



// document.getElementById("inquiryForm").addEventListener("submit", async function (event) {
//     event.preventDefault();

//     let formData = {
//         name: document.querySelector("[name='name']").value,
//         email: document.querySelector("[name='email']").value,
//         phone: document.querySelector("[name='phone']").value,
//         date: document.getElementById("datepicker").value,
//         message: document.querySelector("[name='message']").value
//     };

//     try {
//         let response = await fetch("/.netlify/functions/sendEmail", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(formData)
//         });

//         if (response.ok) {
//             alert("Email sent successfully!");
//         } else {
//             alert("Error sending email.");
//         }
//     } catch (error) {
//         console.error("Error:", error);
//         alert("An unexpected error occurred.");
//     }
// });
