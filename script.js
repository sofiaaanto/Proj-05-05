
const students = [];

const tableBody=document.querySelector("#studentsTable tbody")
const averageDiv=document.getElementById("average");
document.getElementById("studentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const lastName = document.getElementById("lastname").value.trim();
    const grade = document.getElementById("grade").value.trim();

    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade)) {
        alert("Error: Datos incorrectos");
        return;
    }

    if (estudianteEditando) {
        //  Actualizar estudiante existente
        const { student, row } = estudianteEditando;
        student.name = name;
        student.lastName = lastName;
        student.grade = grade;

        // Ahi se Actualiza visualmente la fila en la tabla....
        row.innerHTML =
            `<td>${student.name}</td>
             <td>${student.lastName}</td>
             <td>${student.grade}</td>
             <td><button class="delete">Eliminar</button></td>
             <td><button class="edit">Editar</button></td>`;

        // Vuelve a conectar los botones
        row.querySelector(".delete").addEventListener("click", function () {
            deleteEstudiante(student, row);
        });
        row.querySelector(".edit").addEventListener("click", function () {
            editarEstudiante(student, row);
        });

        estudianteEditando = null;
        document.querySelector("#studentForm button[type='submit']").textContent = "Agregar";
    } else {
        // Agregar nuevo estudiante
        const student = { name, lastName, grade };
        students.push(student);
        addStudentToTable(student);
    }

    this.reset();
    calcularPromedio();
});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name} </td>
    <td>${student.lastName} </td>
    <td>${student.grade} </td>
    <td> <button class="delete">Eliminar</button></td>
    <td> <button class="edit">Editar</button></td>`
    ;

row.querySelector(".delete").addEventListener("click", function(){
    deleteEstudiante(student, row);
});
row.querySelector(".edit").addEventListener("click", function(){
    editarEstudiante(student, row);
});
tableBody.appendChild(row);
}

function deleteEstudiante(student, row){
    //busca el estudiante en el array
    const index=students.indexOf(student);
    if(index >-1){
        students.splice(index,1);
        row.remove();
        calcularPromedio();
    }
}
let estudianteEditando = null;
function editarEstudiante(student, row) {
    // Guardar el estudiante a editar
    estudianteEditando = { student, row };

    document.getElementById("name").value = student.name;
    document.getElementById("lastname").value = student.lastName;
    document.getElementById("grade").value = student.grade;

    // Cambiar de Agregar a Actualizar
    document.querySelector("#studentForm button[type='submit']").textContent = "Actualizar";
}

function calcularPromedio(){
    notas = []
    if (students.length ===0){
        averageDiv.textContent="Promedio de Calificaciones: No Disponible"
        return;
    }
    
    for (let alumno of students){
        console.log(alumno)
        notas.push(parseFloat(alumno.grade))
    }
    
    const suma = notas.reduce((acu, valorAct) => acu+ valorAct,0);

    let promedio = suma/students.length
    averageDiv.textContent=`Promedio de Calificaciones: ${promedio}` 
}  


