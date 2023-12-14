const DynamicTable = ({ data }) => {
    // Extraer elementos, requisitos y soluciones de cada objeto
    let elements = [];
    let requirements = [];
    let solution =[];
    let solutionString = ""
  
    // Generar string de la solución
    if(data){
        elements = data.elements;
        requirements = data.requirements;
        solution = data.solution
        solutionString = solution.forEach((element) => `${element.id}`).join(", ");
    }
    // Contar elementos
    const elementsCount = elements.length;
  
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Calorías Requeridas</th>
            <th>Peso Requerido</th>
            <th>Cantidad de Elementos</th>
            <th>Elementos en Solución</th>
          </tr>
        </thead>
        <tbody>
          {data.foreach(item => (
            <tr key={data.indexOf(item)}>
              <td>{requirements.calories}</td>
              <td>{requirements.weight}</td>
              <td>{elementsCount}</td>
              <td>{solutionString}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default DynamicTable;