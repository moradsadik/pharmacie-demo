import * as repo from './firebase'

const pharmacies = async ()=>{
    let data = await repo.read("pharmacies");
    return data;
}

const medicaments =  async () => {
    let data = await repo.read("medicaments");
    return data;
}

const medicamentById = async (id) => {
    let data = []
    data = await repo.readDocument('medicaments',id)
    return  data;
}

const pharmacieById = async (id) => {
    let data = []
    data = await repo.readDocument('pharmacies',id)
    return  data;
}

const addmedicament = (medicament) => {
    repo.add('medicaments', medicament)
}

const addpharmacie = (pharmacie) => {
    repo.add('pharmacies', pharmacie)
}

const updatepharmacie = (pharmacie) => {
    repo.update('pharmacies',pharmacie.ref, pharmacie);
}

const updatepharmaciemedicament = (idPharmacie, data) => {
    repo.updateField('pharmacies',idPharmacie, data)
}

export {medicaments,updatepharmacie, updatepharmaciemedicament,addmedicament,pharmacies,pharmacieById,addpharmacie, medicamentById}