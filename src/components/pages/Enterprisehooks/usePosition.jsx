import { v4 as uuidv4 } from "uuid";

export function usePosition({enterprise, setEnterprise, setMessage, setType, setPositions, setShowPositionForm }) {

    function createPosition(){
         setMessage("");

    const lastPosition = enterprise.positions[enterprise.positions.length - 1];
    lastPosition.id = uuidv4();

    fetch(`http://localhost:5000/enterprises/${enterprise.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enterprise),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setEnterprise(data)
        setPositions(data.positions);
        setShowPositionForm(!showPositionForm);
        setMessage("Experiência adicionada");
        setType("success");
      });
  }
    
    function removePosition(id){
        const positionsUpdated = enterprise.positions.filter(
      (position) => position.id !== id
    )

    const enterpriseUpdated = enterprise

    enterpriseUpdated.positions = positionsUpdated

    fetch(`http://localhost:5000/enterprises/${enterpriseUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(enterpriseUpdated)
    }).then((resp) => resp.json())
    .then((data) => {
      setEnterprise(enterpriseUpdated)
       setPositions(positionsUpdated)
       setMessage('Serviço removido com sucesso!')
    })
    .catch(err => console.log(err))
    }


return { createPosition, removePosition};
}
