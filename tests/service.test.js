
//mock les couche externe : repository

import {getMedicaments} from "../services/Services";

test('test 1 ', () => {
    const repository = { getMedicaments : jest.fn };
    expect(getMedicaments(repository)).toBeDefined()
})


test('test 2' , ()=>{

    const repository = { getMedicaments : jest.fn() };
    const values = [
        {name:'doliprane', prix : 10, taux : 20},
        {name:'betadine', prix : 30, taux : 20}
    ]

    repository.getMedicaments.mockReturnValue(values)
    const medicaments = getMedicaments(repository)
    expect(repository.getMedicaments.mock.calls.length).toBe(1)
    expect(repository.getMedicaments.mock.results[0].value[1].name).toEqual('betadine')

    // tester les valeurs dans le médicaments
    expect(medicaments).toEqual(values)

})

test('test 3  ', () => {

    const repository = { getMedicaments : jest.fn() };
    const values = [
        {name:'doliprane', prix : 10, taux : 20},
        {name:'betadine', prix : 30, taux : 20}
    ]

    repository.getMedicaments.mockReturnValue(values)
    const medicaments = getMedicaments(repository)
    expect(repository.getMedicaments.mock.calls.length).toBe(1)
    expect(repository.getMedicaments.mock.results.length).toEqual(1)
    expect(repository.getMedicaments.mock.results[0].value.length).toEqual(2)

    expect(repository.getMedicaments.mock.results[0].value[0].name).toEqual('doliprane')
    expect(repository.getMedicaments.mock.results[0].value[0].prix).toEqual(10)
    expect(repository.getMedicaments.mock.results[0].value[0].taux).toEqual(20)

})

