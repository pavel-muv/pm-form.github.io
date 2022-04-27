let student = [
  {
    surname: "Иванов",
    name: "Иван",
    patronymic: "Иванович",
    birth: "2012",
    training: "2020",
    faculty: "Химия",
  },
  {
    surname: "Петров",
    name: "Петр",
    patronymic: "Петрович",
    birth: "2001",
    training: "2000",
    faculty: "Физика",
  },
];

let tableRow = document.querySelectorAll("td");
let alert = document.createElement("div");

let button = document.querySelector(".button");

let inpSurname = document.querySelector(".inp-surname");
let inpName = document.querySelector(".inp-name");
let inpPatronymic = document.querySelector(".inp-patronymic");
let inpBirth = document.querySelector(".inp-birth");
let inpTraining = document.querySelector(".inp-training");
let inpFaculty = document.querySelector(".inp-faculty");

//создаем функцию расчета возраста

getAge = function (dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

//создаем функцию расчета лет обучения

getСourse = function (dateStringCorse) {
  var date = new Date();
  return getAge(dateStringCorse) <= 3
    ? getAge(dateStringCorse) + " курс"
    : getAge(dateStringCorse) <= 4 && date.getMonth() <= 7
    ? getAge(dateStringCorse) + " курс"
    : "закончил";
};

// получаем значение из полей ввода

const addRow = (data) => {
  const fullname = data.surname + " " + data.name + " " + data.patronymic;
  const tmprow = document.getElementById("tmp").content.querySelector("tr");
  const row = tmprow.cloneNode(true);
  row.querySelector(".student__name").innerHTML = fullname;
  row.querySelector(".student__faculty").innerHTML = data.faculty;
  row.querySelector(".student__birth").innerHTML =
    data.birth + ` ( ${getAge(data.birth)} лет)`;
  row.querySelector(".student__training").innerHTML = `${data.training} - ${
    +data.training + 4
  } (${getСourse(data.training)} )`;
  let tb = document.querySelector("table").tBodies[0].append(row);
};

// валидация формы
function checkValidatioString(classList) {
  if (
    /[0-9]/.test(document.querySelector(classList).value) ||
    document.querySelector(classList).value == ""
  ) {
    return false;
  }
  return true;
}
dateTuday = new Date();

// валидация формы года обучения
function checkValidatioInt(classList) {
  if (
    /[0-9]/.test(document.querySelector(classList).value) &&
    document.querySelector(classList).value <= dateTuday.getFullYear() &&
    document.querySelector(classList).value >= 2000
  ) {
    return true;
  }
  return false;
}
// валидация формы даты
function checkValidatioDate(classList) {
  if (
    /[0-9]/.test(document.querySelector(classList).value) &&
    Date.parse(document.querySelector(classList).value) <=
      Date.parse(dateTuday.getFullYear()) &&
    Date.parse(document.querySelector(classList).value) >=
      Date.parse("1900-01-01")
  ) {
    return true;
  }
  return false;
}

//   Заполняем форму

document.querySelector(".button").onclick = function () {
  let data = {
    surname: inpSurname.value,
    name: inpName.value,
    patronymic: inpPatronymic.value,
    birth: inpBirth.value,
    training: inpTraining.value,
    faculty: inpFaculty.value,
  };

  if (
    checkValidatioString(".inp-surname") &&
    checkValidatioString(".inp-name") &&
    checkValidatioString(".inp-patronymic") &&
    checkValidatioString(".inp-faculty") &&
    checkValidatioInt(".inp-training") &&
    checkValidatioDate(".inp-birth")
  ) {
    addRow(data);
    student.push(data);
    inpSurname.value = "";
    inpName.value = "";
    inpPatronymic.value = "";
    inpBirth.value = "";
    inpTraining.value = "";
    inpFaculty.value = "";
  } else if (checkValidatioString(".inp-surname") == false) {
    button.before(alert);
    alert.innerHTML = "<strong>Введите фамилию</strong>";
  } else if (checkValidatioString(".inp-name") == false) {
    button.before(alert);
    alert.innerHTML = "<strong>Введите имя</strong>";
  } else if (checkValidatioString(".inp-patronymic") == false) {
    button.before(alert);
    alert.innerHTML = "<strong>Введите отчество</strong>";
  } else if (checkValidatioString(".inp-faculty") == false) {
    button.before(alert);
    alert.innerHTML = "<strong>Введите факультет</strong>";
  } else if (checkValidatioString(".inp-training") == false) {
    button.before(alert);
    alert.innerHTML = "<strong>Введите год начала обучения</strong>";
  } else if (checkValidatioString(".inp-birth") == false) {
    button.before(alert);
    alert.innerHTML = "<strong>Введите дату рождения</strong>";
  } else alert("заполние правильно все поля");
};

addRow(student[0]);
addRow(student[1]);

// сортировка по имени

document.querySelector(".heading__name").onclick = function () {
  let tableRow = document.querySelectorAll(".student");

  tableRow.forEach(function (item) {
    item.remove();
  });
  let byName = student.slice(0);
  let nameSort = byName.sort(function (a, b) {
    let x =
      a.surname.toLowerCase() +
      a.name.toLowerCase() +
      a.patronymic.toLowerCase();
    let y =
      b.surname.toLowerCase() +
      b.name.toLowerCase() +
      b.patronymic.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  // наполнение таблицы
  for (let i = 0; i < nameSort.length; i++) {
    addRow(nameSort[i]);
  }
};

//сотртировки по факультету

document.querySelector(".heading__faculty").onclick = function () {
  let tableRow = document.querySelectorAll(".student");

  tableRow.forEach(function (item) {
    item.remove();
  });
  let byFaculty = student.slice(0);
  let facultySort = byFaculty.sort(function (a, b) {
    let x = a.faculty.toLowerCase();
    let y = b.faculty.toLowerCase();
    return x < y ? -1 : x > y ? 1 : 0;
  });

  // наполнение таблицы
  for (let i = 0; i < facultySort.length; i++) {
    addRow(facultySort[i]);
  }
};

//сотртировка по  дате рождения

document.querySelector(".heading__birth").onclick = function () {
  let tableRow = document.querySelectorAll(".student");

  tableRow.forEach(function (item) {
    item.remove();
  });
  let byDate = student.slice(0);
  let dateSort = byDate.sort(function (a, b) {
    return a.birth - b.birth;
  });
  console.log("by date:");
  console.log(byDate);

  // наполнение таблицы
  for (let i = 0; i < dateSort.length; i++) {
    addRow(dateSort[i]);
  }
};

//сотртировка по  дате начала учебы

document.querySelector(".heading__training").onclick = function () {
  let tableRow = document.querySelectorAll(".student");

  tableRow.forEach(function (item) {
    item.remove();
  });
  let byTraining = student.slice(0);
  let trainingSort = byTraining.sort(function (a, b) {
    return a.training - b.training;
  });

  // наполнение таблицы
  for (let i = 0; i < trainingSort.length; i++) {
    addRow(trainingSort[i]);
  }
};

// поиск студента

document.querySelector(".serch-button").onclick = function () {
  // const serchSurname = document.querySelector(".serch-surname").value;
  // const serchPatronymic = document.querySelector(".serch-patronymic").value;
  const serchName = document.querySelector(".serch-name").value;
  const serchBirth = document.querySelector(".serch-birth").value;
  const serchTraining = document.querySelector(".serch-training").value;
  const serchFaculty = document.querySelector(".serch-faculty").value;

  let resultSerch = student.filter(
    (item) =>
      item.name == serchName ||
      item.surname == serchName ||
      item.patronymic == serchName ||
      item.birth == serchBirth ||
      item.training == serchTraining ||
      item.faculty == serchFaculty
  );
{
    console.log(resultSerch.length);
    for (let i = 0; i < resultSerch.length; i++) {
      let tableRowSerch = document.querySelectorAll(".student");
      tableRowSerch.forEach(function (item) {
        item.remove();
      });
      addRow(resultSerch[i]);
  }
}
};
