import React,{useEffect, useState} from 'react'
import DynamicTable from './DinamicTable'

const HomePage = () => {

    const [elements,setElements] = useState([])
    const [climbs,setClimbs] = useState([])
    const [requirements,setRequirements] = useState({
        weight:0,
        calories:0
    })
    const [element, setElement] = useState({
        id:`E${elements.length + 1}`,
        weight:0,
        calories:0
    })
    
    useEffect(()=>{
        let res = fetch(`http://localhost:8000/elements`)
            .then((response) => response.json())
            .then((data) => setClimbs(data.climbs));
    },[])

    const addElement = () => {
        
        setElements([...elements,element])
        setElement({
            id:`E${elements.length}`,
            weight:0,
            calories:0
        })
        console.log(elements)
    }

    const handleElementChange = (e) =>{
        setElement(e)
        console.log(element)
    }
    const handleRequirementsChange = (e) =>{
        setRequirements(e)
    }

    const calcular = () =>{
        let res = fetch(`http://localhost:8000/elements`,{body:{
            elements:elements,
            requirements:requirements,
        }})
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
    
    const getClimbs = async () => {
        try {
            let res = fetch(`http://localhost:8000/elements`)
            .then((response) => response.json())
            .then((data) => setClimbs(data.climbs));
            console.log(climbs)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-full justify-center items-center flex flex-col'>
        <div className='flex w-full'>
        <div className='flex flex-col justify-center items-center m-5 mr-0 border-[1px] rounded w-full'>
            <h3 className='w-full text-center font-medium pt-1 rounded-t text-white bg-blue-500'>Añadir elemento</h3>
            <div className='flex w-full justify-center mx-2 mb-2 mt-1'>
                <div className='flex flex-col w-24 mr-2'>
                    <label htmlFor="calories" className='block'>Calorias</label>
                    <input value={element.calories} onChange={(e) => handleElementChange({...element,calories:e.target.value})} type="number" placeholder='Calorias' className='border-[1px] rounded file:[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                </div>
                <div className='flex flex-col w-24'>
                    <label htmlFor="Peso" className='block'>Peso</label>
                    <input value={element.weight} onChange={(e) => handleElementChange({...element,weight:e.target.value})} type="number" id="Peso" placeholder='Peso' className='border-[1px] rounded file:[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                </div>
                
            </div>
            <button className={`bg-blue-500 w-max p-1 px-4 mb-2 rounded text-white hover:bg-blue-600 transition-all`} onClick={e => addElement()}>Añadir</button>
        </div>
        <div className='flex flex-col justify-center items-center m-5 border-[1px] rounded w-full'>
            <h3 className='w-full text-center font-medium pt-1 rounded-t text-white bg-blue-500'>Requerimientos</h3>
            <div className='flex w-full justify-center mx-2 mb-2 mt-1'>
                <div className='flex flex-col w-24 mr-2'>
                    <label htmlFor="caloriesmin" className='block'>Calorias min</label>
                    <input value={requirements.calories} onChange={(e) => handleRequirementsChange({...requirements,calories:e.target.value})} type="number" placeholder='Caloriasmin' className='border-[1px] rounded file:[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                </div>
                <div className='flex flex-col w-24'>
                    <label htmlFor="Pesomax" className='block'>Peso max</label>
                    <input value={requirements.weight} onChange={(e) => handleRequirementsChange({...requirements,weight:e.target.value})}type="number" id="Pesomax" placeholder='Peso' className='border-[1px] rounded file:[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'/>
                </div>
                
            </div>
            <button className={`bg-green-500 w-max p-1 px-4 mb-2 rounded text-white hover:bg-green-600 transition-all`} onClick={e => addElement()}>Calcular</button>
        </div>
        <button className='bg-blue-500 text-center justify-center text-[2rem] rounded-lg font-bold text-white flex flex-col items-center m-5 border-[1px] rounded w-full' onClick={e => getClimbs()}>
            Consultar
        </button>
        </div>
        <DynamicTable data={climbs}/>
    </div>
  )
}

export default HomePage
