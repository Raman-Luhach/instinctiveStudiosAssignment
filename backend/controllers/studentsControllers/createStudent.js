const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createStudent = async (req, res) => {
    const { name, cohort, courses } = req.body;

    try {
        const newStudent = await prisma.student.create({
            data: {
                name: name,
                cohort: cohort,
                courses: courses
            }});

        return res.status(201).json(newStudent);
    }catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = createStudent
