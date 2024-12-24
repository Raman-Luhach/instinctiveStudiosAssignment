const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const getStudents = async (req, res) => {

    const {cohort , course} = req.query

    try{
        if (!cohort || !course) {
            const arr = await prisma.student.findMany()
            return res.status(200).json(arr)
        }

        const ans = await prisma.student.findMany({
            where: {
                AND: [
                    {cohort: cohort},
                    {course: course}
                ]
            }
        })

        return res.status(200).json(ans)
    }catch (e){
        return res.status(500).json("Internal Server Error")
    }

}

module.exports = getStudents;
