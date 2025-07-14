document.addEventListener('DOMContentLoaded', () => {
    const addExperienceBtn = document.getElementById('addExperience');
    const experienceEntriesDiv = document.getElementById('experienceEntries');
    const addEducationBtn = document.getElementById('addEducation');
    const educationEntriesDiv = document.getElementById('educationEntries');
    const generateResumeBtn = document.getElementById('generateResume');
    const generatedContentDiv = document.getElementById('generatedContent');

    let experienceCount = 1;
    let educationCount = 1;

    // Function to add a new experience entry
    function addExperienceEntry() {
        experienceCount++;
        const newExperienceEntry = document.createElement('div');
        newExperienceEntry.classList.add('experience-entry');
        newExperienceEntry.innerHTML = `
            <div class="form-group">
                <label for="jobTitle${experienceCount}">Job Title</label>
                <input type="text" class="jobTitle" id="jobTitle${experienceCount}" placeholder="Software Engineer">
            </div>
            <div class="form-group">
                <label for="company${experienceCount}">Company</label>
                <input type="text" class="company" id="company${experienceCount}" placeholder="Tech Innovations Inc.">
            </div>
            <div class="form-group-inline">
                <div class="form-group">
                    <label for="startDate${experienceCount}">Start Date</label>
                    <input type="month" class="startDate" id="startDate${experienceCount}">
                </div>
                <div class="form-group">
                    <label for="endDate${experienceCount}">End Date (or "Present")</label>
                    <input type="month" class="endDate" id="endDate${experienceCount}">
                </div>
            </div>
            <div class="form-group">
                <label for="responsibilities${experienceCount}">Key Responsibilities & Achievements (bullet points, AI will expand)</label>
                <textarea class="responsibilities" id="responsibilities${experienceCount}" rows="3" placeholder="- Developed scalable web applications
- Collaborated with cross-functional teams"></textarea>
            </div>
        `;
        experienceEntriesDiv.appendChild(newExperienceEntry);
    }

    // Function to add a new education entry
    function addEducationEntry() {
        educationCount++;
        const newEducationEntry = document.createElement('div');
        newEducationEntry.classList.add('education-entry');
        newEducationEntry.innerHTML = `
            <div class="form-group">
                <label for="degree${educationCount}">Degree/Program</label>
                <input type="text" class="degree" id="degree${educationCount}" placeholder="M.Sc. Computer Science">
            </div>
            <div class="form-group">
                <label for="university${educationCount}">University/Institution</label>
                <input type="text" class="university" id="university${educationCount}" placeholder="University of Technology">
            </div>
            <div class="form-group-inline">
                <div class="form-group">
                    <label for="eduStartDate${educationCount}">Start Date</label>
                    <input type="month" class="eduStartDate" id="eduStartDate${educationCount}">
                </div>
                <div class="form-group">
                    <label for="eduEndDate${educationCount}">End Date</label>
                    <input type="month" class="eduEndDate" id="eduEndDate${educationCount}">
                </div>
            </div>
        `;
        educationEntriesDiv.appendChild(newEducationEntry);
    }

    // Event listener for adding experience
    addExperienceBtn.addEventListener('click', addExperienceEntry);

    // Event listener for adding education
    addEducationBtn.addEventListener('click', addEducationEntry);

    // Event listener for generating resume (this is where AI integration would go)
    generateResumeBtn.addEventListener('click', () => {
        const personalInfo = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            linkedin: document.getElementById('linkedin').value,
            github: document.getElementById('github').value,
        };

        const professionalSummary = document.getElementById('summary').value;

        const experiences = [];
        document.querySelectorAll('.experience-entry').forEach(entry => {
            experiences.push({
                jobTitle: entry.querySelector('.jobTitle').value,
                company: entry.querySelector('.company').value,
                startDate: entry.querySelector('.startDate').value,
                endDate: entry.querySelector('.endDate').value,
                responsibilities: entry.querySelector('.responsibilities').value.split('\n').filter(Boolean), // Split by new line and remove empty
            });
        });

        const education = [];
        document.querySelectorAll('.education-entry').forEach(entry => {
            education.push({
                degree: entry.querySelector('.degree').value,
                university: entry.querySelector('.university').value,
                startDate: entry.querySelector('.eduStartDate').value,
                endDate: entry.querySelector('.eduEndDate').value,
            });
        });

        const skills = {
            technical: document.getElementById('technicalSkills').value.split(',').map(s => s.trim()).filter(Boolean),
            soft: document.getElementById('softSkills').value.split(',').map(s => s.trim()).filter(Boolean),
        };

        // --- THIS IS THE CRITICAL PART FOR AI INTEGRATION ---
        // In a real application, you would send the 'resumeData' object
        // to your backend AI service here.
        // The AI service would then process this data, generate polished
        // resume content, and send it back.

        const resumeData = {
            personalInfo,
            professionalSummary,
            experiences,
            education,
            skills,
        };

        console.log("Collected Resume Data:", resumeData); // For debugging

        // For this frontend-only example, we'll just display the collected data
        // in a formatted way.
        displayGeneratedResume(resumeData);

        // Scroll to the generated resume section
        document.getElementById('resumeOutput').scrollIntoView({ behavior: 'smooth' });
    });

    // Function to display collected data (mock AI output)
    function displayGeneratedResume(data) {
        let outputHtml = `
            <h3>${data.personalInfo.fullName || 'Your Name'}</h3>
            <p>${data.personalInfo.email || ''} | ${data.personalInfo.phone || ''} ${data.personalInfo.linkedin ? '| <a href="' + data.personalInfo.linkedin + '" target="_blank">LinkedIn</a>' : ''} ${data.personalInfo.github ? '| <a href="' + data.personalInfo.github + '" target="_blank">GitHub</a>' : ''}</p>
            <hr>

            <h4>Professional Summary</h4>
            <p>${data.professionalSummary || 'A compelling summary generated based on your input.'}</p>
            <hr>

            <h4>Work Experience</h4>
            ${data.experiences.length > 0 ? data.experiences.map(exp => `
                <p><strong>${exp.jobTitle || 'Job Title'}</strong> at <strong>${exp.company || 'Company Name'}</strong></p>
                <p>${exp.startDate || ''} - ${exp.endDate || ''}</p>
                <ul>
                    ${exp.responsibilities.map(res => `<li>${res}</li>`).join('')}
                </ul>
            `).join('') : '<p>No work experience added or AI will generate this section.</p>'}
            <hr>

            <h4>Education</h4>
            ${data.education.length > 0 ? data.education.map(edu => `
                <p><strong>${edu.degree || 'Degree/Program'}</strong> from <strong>${edu.university || 'University/Institution'}</strong></p>
                <p>${edu.startDate || ''} - ${edu.endDate || ''}</p>
            `).join('') : '<p>No education added or AI will generate this section.</p>'}
            <hr>

            <h4>Skills</h4>
            <p><strong>Technical Skills:</strong> ${data.skills.technical.join(', ')}</p>
            <p><strong>Soft Skills:</strong> ${data.skills.soft.join(', ')}</p>
        `;

        generatedContentDiv.innerHTML = outputHtml;
    }
});



fetch('http://localhost:5000/generate-resume', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(resumeData),
})
.then(res => res.json())
.then(data => {
    generatedContentDiv.innerHTML = `<pre>${data.result}</pre>`; // or parse nicely
})
.catch(err => console.error('Error:', err));
