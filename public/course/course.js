document.getElementById('publishBtn').addEventListener('click', async function () {
    const title = document.getElementById('courseTitle').value.trim();
    const courseLevel = document.getElementById('courseLevel').value;
    const language = document.getElementById('language').value;
    const videoFile = document.getElementById('videoFile').files[0];

    console.log("title:", title);
    console.log("course_level:", courseLevel);
    console.log("language:", language);
    console.log("video:", videoFile);

    if (!title || !videoFile) {
        alert('Please enter a course title and upload a video.');
        return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('course_level', courseLevel);
    formData.append('language', language);
    formData.append('video', videoFile);

    try {
        const response = await fetch('http://localhost:5000/api/courses/create', {
            method: 'POST',
            body: formData
        });

        const text = await response.text();
        console.log("Raw server response:", text);

        let result;
        try {
            result = JSON.parse(text);
        } catch (err) {
            throw new Error('Server did not return valid JSON. Check server logs.');
        }

        alert(result.message);
        if (result.courseId) {
            window.location.href = "/view-courses.html";
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error uploading course');
    }
});
