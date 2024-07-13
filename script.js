document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    applyTheme();
});

function loadCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.forEach(course => {
        addCourseToList(course.subject, course.name, course.content);
    });
}

function addCourse() {
    const subject = document.getElementById('subject').value;
    const courseName = document.getElementById('courseName').value;
    const courseContent = document.getElementById('courseContent').value;
    
    if (courseName === '' || courseContent === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.push({ subject, name: courseName, content: courseContent });
    localStorage.setItem('courses', JSON.stringify(courses));

    addCourseToList(subject, courseName, courseContent);
    clearInputs();
    filterCourses();
}

function addCourseToList(subject, name, content) {
    const courseList = document.getElementById('courseList');
    const courseItem = document.createElement('div');
    courseItem.classList.add('course-item');
    courseItem.setAttribute('data-subject', subject);
    
    courseItem.innerHTML = `
        <h3>${name} (${subject})</h3>
        <div class="course-content">${content}</div>
    `;
    
    courseItem.addEventListener('click', function() {
        const allContents = document.querySelectorAll('.course-content');
        allContents.forEach(c => c.style.display = 'none');
        
        const contentDiv = this.querySelector('.course-content');
        contentDiv.style.display = 'block';
    });
    
    courseList.appendChild(courseItem);
}

function clearInputs() {
    document.getElementById('subject').value = 'Français';
    document.getElementById('courseName').value = '';
    document.getElementById('courseContent').value = '';
    document.getElementById('filterSubject').value = 'Tous';
}

function filterCourses() {
    const filterSubject = document.getElementById('filterSubject').value;
    const courses = document.querySelectorAll('.course-item');
    
    courses.forEach(course => {
        if (filterSubject === 'Tous' || course.getAttribute('data-subject') === filterSubject) {
            course.style.display = 'block';
        } else {
            course.style.display = 'none';
        }
    });
}

let timerInterval;

function startTimer(minutes) {
    clearInterval(timerInterval);
    const now = new Date().getTime();
    const countDownTime = now + minutes * 60 * 1000;

    timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countDownTime - now;

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secs = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timerDisplay").innerHTML = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("timerDisplay").innerHTML = "00:00:00";
            alert("Le temps est écoulé!");
        }
    }, 1000);
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark');
    const theme = body.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
}

function applyTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        document.body.classList.add('dark');
    }
}