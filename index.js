const express = require ("express");
const app = express();
const morgan = require("morgan");



app.use(express.json());

app.use(morgan)
//declaramos un array de estudiantes que es una base de datos local

const students = [
    {id: 1, name: "Alvaro", edad: 19, enroll: true},
    {id: 2, name: "Daniel", edad: 15, enroll: false },
    {id: 3, name: "Lia", edad: 16, enroll: false}
]
//metodos a utulizar

app.get("/", (req, res) =>{
    res.send("Node JS api");
});

app.get("/api/students", (req, res)=>{
    res.send(students)
});

app.get("/api/students/:id", (req, res) =>{
    const student = students.find ( c => c.id === parseInt(req.params.id));
    if(!student) return res.status(400).send("estudiante no encontrado");
    else res.send(student)
});

//agregar studiantes
app.post("/api/students", (req, res) =>{
    const student = {
        id: students.length +1,
        name: req.body.name,
        edad: parseInt(req.body.edad),
        enroll: (req.body.enroll === "true")
    };
    students.push(student);
    res.send(student);
});

app.delete("/api/students/:id", (req, res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id));

    if(!student) return res.status(404).send("estudiante no encontrado");

    const index = students.indexOf(student);
    students.splice(index, 1);
    res.send(student);
});

const port = process.env.port || 80
app.listen(port, () => {
    console.log(`escuchando puerto ${port}`)
});