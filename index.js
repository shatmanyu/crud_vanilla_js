(async function () {
  const data = await fetch("./data.json");
  const res = await data.json();
  let employees = res;
  let emp_id = employees[0].id;
  let selectedEmployee = employees[0];
  const employeeList = document.querySelector(".emp-list");
  const employeeInfo = document.querySelector(".emp-info");
  // render employee
  // show selected employee
  // const handleAdd = () => {
  //   console.log("add clicked");
  // };
  employeeList.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN" && e.target.id !== emp_id) {
      const ele = document.getElementById(emp_id);
      console.log({ ele });
      ele.classList.remove("selected");
      emp_id = e.target.id;
      e.target.classList.add("selected");
      renderSingleEmployee(emp_id);
    }
    if (e.target.tagName === "BUTTON") {
  employees = employees.filter(
    (emp) => emp.id.toString() !== e.target.parentNode.id
  );
  if (emp_id.toString() === e.target.parentNode.id) {
    selectedEmployee = employees ? employees[0] : -1;
    emp_id = selectedEmployee?.id;
  }
  render();
  renderSingleEmployee(emp_id);
}
  });

  const handleAdd = () => {
    document.getElementById("app").classList.add("modal-open");
    document.querySelector(".emp-modal").style.display = "flex";
  };
  const addForm = document.querySelector(".add-emp-form");
  addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // const formData = new FormData(addForm);
    // const values = [...formData.entries()];
    // console.log({ values });
    const newEmployee = {};
    const firstName = document.getElementById("name").value;
    const lastName = "";
    const dob = document.getElementById("dob").value;
    const email = document.getElementById("email").value;
    newEmployee["id"] = 200;
    newEmployee["firstName"] = firstName;
    newEmployee["lastName"] = lastName;
    newEmployee["dob"] = dob;
    newEmployee["email"] = email;
    employees.push(newEmployee);
    document.getElementById("app").classList.remove("modal-open");
    document.querySelector(".emp-modal").style.display = "none";
    console.log("er", employees, newEmployee);
    addForm.reset();
    render();
    renderSingleEmployee(emp_id);
  });
  const addBtn = document.querySelector(".add-emp");
  addBtn.addEventListener("click", handleAdd);

  const render = () => {
    employeeList.innerHTML = "";
    employees.forEach((emp) => {
      const employee = document.createElement("span");
      const removeEmployee = document.createElement("button");
      removeEmployee.innerHTML = `X`;
      removeEmployee.classList.add("remove-imp");

      employee.classList.add("emp-list-item");
      if (parseInt(emp_id, 10) === emp.id) {
        employee.classList.add("selected");
        selectedEmployee = emp;
      }
      employee.setAttribute("id", emp.id);
      employee.innerHTML = `${emp.firstName}`;
      employee.append(removeEmployee);

      employeeList.append(employee);
    });
  };
  const renderSingleEmployee = (selectedId) => {
    selectedEmployee = employees.filter((emp) => {
      console.log({ emp }, emp.id == selectedId);
      return emp.id == selectedId;
    });
    console.log(selectedEmployee, "Rg");
    if (selectedEmployee[0]) {
      const firstNameEle = document.createElement("span");
      firstNameEle.innerHTML =
        selectedEmployee[0].firstName + " " + selectedEmployee[0].lastName;
      const dob = document.createElement("span");
      dob.innerHTML = selectedEmployee[0].dob;
      console.log(selectedEmployee[0], selectedId, employees);
      employeeInfo.innerHTML = "";
      employeeInfo.append(firstNameEle);
      employeeInfo.append(dob);
    }
  };
  render();
})();
