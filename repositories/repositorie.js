import {medicaments, pharmacies, medicamentById,pharmacieById,addpharmacie, updatepharmacie, updatepharmaciemedicament,addmedicament} from './firebase/data'


const getPharmacies = () =>{
    return pharmacies();
}

const getPharmacieById = (id) => {
    return pharmacieById(id)
}


const getMedicaments = () =>{
    return medicaments();
}

const getMedicamentById = (id) => {
    return medicamentById(id);
}


const addMedicament = (medicament) => {
    return addmedicament(medicament)
}

const updatePharmacie = (pharmacie) => {
    return updatepharmacie(pharmacie)
}
const updatePharmacieMedicament = (idPharmacie,data) => {
    return updatepharmaciemedicament(idPharmacie, data)
}

const addPharmacie = (pharmacie) => {
    return addpharmacie(pharmacie)
}


export {getMedicaments,addMedicament,updatePharmacie,addPharmacie,updatePharmacieMedicament, getMedicamentById, getPharmacieById,getPharmacies}