
const getMedicaments = (repository) => {
    return repository.getMedicaments() ;
}

const getMedicamentById = (repository, id) => {
    return repository.getMedicamentById(id) ;
}

const getPharmacies = (repository) => {
    return repository.getPharmacies();
}

const getPharmacieById = (repository, id) => {
    return repository.getPharmacieById(id) ;
}

const addMedicament = (repository, medicament) => {
    return repository.addMedicament(medicament) ;
}

const addPharmacie = (repository, pharmacie) => {
    return repository.addPharmacie(pharmacie) ;
}
const updatePharmacie = (repository, pharmacie) => {
    return repository.updatePharmacie(pharmacie) ;
}
const updatePharmacieMedicament = (repository, id, data) => {
    return repository.updatePharmacieMedicament(id, data) ;
}

export {getMedicaments, updatePharmacieMedicament,getMedicamentById, getPharmacies, getPharmacieById,addPharmacie, updatePharmacie, addMedicament}