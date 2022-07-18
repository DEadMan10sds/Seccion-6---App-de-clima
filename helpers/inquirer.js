const inquirer = require("inquirer");
require("colors");

const menuQuestions = [
  {
    type: "list",
    pageSize: 20,
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: "1. Crear tarea",
      },
      {
        value: "2",
        name: "2. Mostrar tareas",
      },
      {
        value: "3",
        name: "3. Mostrar tareas completadas",
      },
      {
        value: "4",
        name: "4. Mostrar tareas pendientes",
      },
      {
        value: "5",
        name: "5. Completar tarea(s)",
      },
      {
        value: "6",
        name: "6. Editar tarea",
      },
      {
        value: "7",
        name: "7. Borrar tarea",
      },
      {
        value: "0",
        name: "0. Salir",
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("===========================".cyan);
  console.log("   Seleccione una opcion".cyan);
  console.log("===========================\n".cyan);

  // console.log(`${`1.`.green} Crear tarea`);
  // console.log(`${`2.`.green} Mostrar tareas`);
  // console.log(`${`3.`.green} Mostrar tareas completadas`);
  // console.log(`${`4.`.green} Mostrar tareas pendientes`);
  // console.log(`${`5.`.green} Completar tarea(s)`);
  // console.log(`${`6.`.green} Borrar tarea`);
  // console.log(`${`7.`.green} Editar tarea`);
  // console.log(`${`0.`.green} Salir \n`);

  const { opcion } = await inquirer.prompt(menuQuestions);
  //console.log(opcion);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".magenta} para continuar\n`,
    },
  ];

  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Por favor ingresa un valor";
        } else return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const mostarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    const idx = `${++index}.`.green;
    return {
      value: tarea.id,
      name: `${idx} ${tarea.descr}`,
      //Ternario, si tarea.completed existe, es true, si no, false -> ? caso exitoso | : caso no exitoso
      checked: tarea.completed ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selecciones",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};

const listadoTareaBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
    return {
      value: tarea.id,
      name: `${++index}.- ${tarea.descr} `,
    };
  });

  //Se añade al inicio la opción de salida, si bien se puede hacer al último no se recomienda en caso de tener demasiadas tareas
  choices.unshift({
    value: "0",
    name: "0.".red + "Cancelar",
  });

  const preguntas = [
    {
      type: "list",
      pageSize: 20,
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);
  return id;
};

const confirmar = async (message) => {
  const pregunta = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(pregunta);
  return ok;
};
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  mostarListadoChecklist,
  listadoTareaBorrar,
  confirmar,
};
