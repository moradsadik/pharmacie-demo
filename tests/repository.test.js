import * as repo from '../repositories/repositorie'

test('Tous les medicaments', ()=>{
    let all = repo.getMedicaments();
    let value = {id:1,name:'doliprane', prixBrut : 10, taux : 20};

    expect(all).toBeDefined()
    expect(all.length).toEqual(4)
    expect(all).toEqual(expect.arrayContaining([value]))
})

test('Medicaments by id', ()=>{
    let medicament = repo.getMedicamentById(1);
    let expected = {id:1,name:'doliprane', prixBrut : 10, taux : 20};

    expect(medicament).toBeDefined()
    expect(medicament.id).toEqual(1)
    expect(medicament).toEqual(expect.objectContaining(expected))
})

test('Tous les Pharmacies', ()=>{
    let all = repo.getPharmacies();

    expect(all).toBeDefined()
    expect(all.length).toEqual(2)
})

test('Pharmacie by id', ()=>{
    let pharmacie = repo.getPharmacieById(1);

    expect(pharmacie).toBeDefined()
    expect(pharmacie.id).toEqual(1)
    expect(pharmacie).toEqual(expect.objectContaining({id:1, name:"pharmacie 1"}))
})



