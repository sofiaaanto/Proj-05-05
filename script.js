const students=[];

const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

document.getElementById("studentForm").addEventListener("submit",function(e){
    e.preventDefault();

    const name=document.getElementById("name").value.trim();

    const lastName=document.getElementById("lastName").value.trim();

    const grade=document.getElementById("grade").value.trim();
    
    const fecha=document.getElementById("fecha").value.trim();
  
    if (grade < 1 || grade > 7 || !name || !lastName || isNaN(grade)){
    alert("Error Datos incorrectos")
    return
    }

    //Guardar datos en el Array
    const student={name,lastName,grade: parseFloat(grade), fecha};
    students.push(student);
    addStudentToTable(student)
    // console.log(students)
    
    this.reset();
    calcularProm()
});

function addStudentToTable(student){
    const row=document.createElement("tr");
    row.innerHTML=
    `<td>${student.name}</td>
    <td>${student.lastName}</td>
    <td>${student.grade}</td>
    <td>${student.fecha}</td>`;
    tableBody.appendChild(row);
}

/*function calcularPro(array) {
    if (array.length === 0) {
      return 0;
    }
    let suma = 0;
    for (let i = 0; i < array.length; i++) {
      suma += array[i];
    }
    const promedio = suma / array.length;
    return promedio;
  }

  function calcularPromedio(){
    if (students.length ===0) {
        averageDiv.textContent="Promedio General del Curso: N/A"
        return;
    }
    for (let i = 0; i < averageDiv.length; i++){
        suma += averageDiv[i];}
    const promedio = suma /averageDiv.length;
    return promedio
  
  console.log("El promedio es:", promedio);
 }


  function calcularPromedio(){
    if (students.length ===0) {
        averageDiv.textContent="Promedio General del Curso: N/A"
        return;

    }
    const total = students.reduce((sum, s) => sum+s.grade,0);
    const average = total/students.length;
    averageDiv.textContent=`Promedio General del Curso:  ${average.toFixed(2)}`;
}
*/
  function calcularProm(){
    notas=[]
    if (students.length ===0) {
      averageDiv.textContent="Promedio General del Curso: N/A"
      return;
    }
    for(let alumno of students){
      notas.push(parseInt(alumno.grade))
    }
      const suma = notas.reduce((acu, va)=>acu+va,0);
    
      let promedio = suma/students.length
      averageDiv.textContent=`El Promedio General Del Curso Es: ${promedio}`
    
  }
