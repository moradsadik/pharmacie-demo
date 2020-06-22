import {medicaments, pharmacies} from './db'


const getPharmacies = () =>{
    return pharmacies;
}

const getPharmacieById = (id) => {
    return pharmacies.find(d => d.id === id);
}


const getMedicaments = () =>{
    return medicaments;
}

const getMedicamentById = (id) => {
    return medicaments.find(d => d.id === id);
}


export {getMedicaments, getMedicamentById, getPharmacieById,getPharmacies}