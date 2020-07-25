const medicaments =  [
    {coeff:2,name:'doliprane', prixBrut : 10, taux : 20},
    {coeff:2,name:'betadine', prixBrut : 30, taux : 20},
    {coeff:2,name:'paracetamole', prixBrut : 45, taux : 20},
    {coeff:2,name:'effervicense', prixBrut : 22, taux : 20},
]
const pharmacies = [
    {
        name:"pharmacie 1",
        adresse : "1 rue la brokonich",
        horaire : 'entre 9h:00min et 17h00min',
        effectifs : 20,
        lat:48.871090,
        lang:2.372073,
        achats:[{name:"doliprane", quantity:200},{name:"betadine", quantity:131}],
        ventes : [{name:"doliprane", quantity:200},{name:"betadine", quantity:20}],
        formations :[{name:"vente produit", nbre:5, date : '16/06/2020'},{name:"gestion stock", nbre:6, date : '20/06/2020'}],
        medicaments : [
            {coeff:2,name:'doliprane', prixBrut : 10, taux : 20},
            {coeff:2,name:'betadine', prixBrut : 30, taux : 20},
        ]
    },
    {
        name:"pharmacie 2",
        adresse : "2 rue la bochate",
        horaire : 'entre 9h:00min et 17h00min',
        effectifs : 20,
        lat:48.871090,
        lang:2.372073,
        achats:[{name:"doliprane", quantity:250},{name:"paracetamole", quantity:320}],
        ventes : [{name:"doliprane", quantity:200},{name:"paracetamole", quantity:320}],
        formations :[{name:"vente produit", nbre:5, date : '22/06/2020'},{name:"gestion stock", nbre:6, date : '25/06/2020'}],
        medicaments : [
            {coeff:2,name:'doliprane', prixBrut : 10, taux : 20},
            {coeff:2,name:'betadine', prixBrut : 30, taux : 20},
            {coeff:2,name:'paracetamole', prixBrut : 45, taux : 20},
            {coeff:2,name:'effervicense', prixBrut : 22, taux : 20},
        ]
    }
]

export {medicaments, pharmacies }