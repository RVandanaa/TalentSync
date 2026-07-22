const calculateMatchScore = (student, job) => {

    let score = 0;

    // -----------------------------
    // Skills (60%)
    // -----------------------------

    const studentSkills = student.skills.map(skill =>
        skill.toLowerCase()
    );

    const requiredSkills = job.requiredSkills.map(skill =>
        skill.toLowerCase()
    );

    let matchedSkills = 0;

    requiredSkills.forEach(skill => {

        if (studentSkills.includes(skill)) {

            matchedSkills++;

        }

    });

    const skillScore =
        requiredSkills.length === 0
            ? 60
            : (matchedSkills / requiredSkills.length) * 60;

    score += skillScore;

    // -----------------------------
    // CGPA (20%)
    // -----------------------------

    if (student.cgpa >= job.minimumCGPA) {

        score += 20;

    }

    // -----------------------------
    // Branch (20%)
    // -----------------------------

    if (

        job.branch.includes(student.branch)

    ) {

        score += 20;

    }

    return Math.round(score);

};

module.exports = calculateMatchScore;