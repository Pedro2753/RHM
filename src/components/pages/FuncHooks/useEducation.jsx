import { v4 as uuidv4 } from "uuid";

export function useEducation({ func, setFunc, setMessage, setEducations, setType }) {
  function createEducation() {
    setMessage("");
 
    const lastEducation = func.educations[func.educations.length - 1];
    lastEducation.id = uuidv4();

    fetch(`http://localhost:5000/funcionarios/${func.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(func),
    })
      .then((r) => r.json())
      .then((data) => {
        setFunc(data);
        setEducations(data.educations);
        setMessage("Formação adicionada");
        setType("success");
      });
  }

  function removeEducation(id) {
    const educationsUpdated = func.educations.filter(
      (edu) => edu.id !== id
    )

    const funcUpdated = func

    funcUpdated.educations = educationsUpdated

    fetch(`http://localhost:5000/funcionarios/${func.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(funcUpdated),
    })
      .then((r) => r.json())
      .then(() => {
        setFunc(funcUpdated);
        setEducations(educationsUpdated);
        setMessage("Formação removida");
        setType("success");
      });
  }

  return { createEducation, removeEducation };
}