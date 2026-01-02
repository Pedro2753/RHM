import { v4 as uuidv4 } from "uuid";

export function useExperience({func, setFunc, setMessage, setType, setExperiences, setShowExperienceForm }) {

    function createExperience(){
         setMessage("");

    const lastExperience = func.experiences[func.experiences.length - 1];
    lastExperience.id = uuidv4();

    fetch(`http://localhost:5000/funcionarios/${func.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(func),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFunc(data)
        setExperiences(data.experiences);
        setShowExperienceForm(!showExperienceForm);
        setMessage("Experiência adicionada");
        setType("success");
      });
  }
    
    function removeExperience(id){
        const experiencesUpdated = func.experiences.filter(
      (exp) => exp.id !== id
    )

    const funcUpdated = func

    funcUpdated.experiences = experiencesUpdated

    fetch(`http://localhost:5000/funcionarios/${funcUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(funcUpdated)
    }).then((resp) => resp.json())
    .then((data) => {
      setFunc(funcUpdated)
       setExperiences(experiencesUpdated)
       setMessage('Serviço removido com sucesso!')
    })
    .catch(err => console.log(err))
    }


return { createExperience, removeExperience};
}
