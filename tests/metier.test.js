import {coeffMultiplicateur, prixAchatNet, prixVenteNet} from '../metiers/metier'

const PRIX_ACHAT_BRUT = 100;
const TAUX_DE_REMISE = 0.2;

test('Prix d’achat net ', () => {
    let value = prixAchatNet(PRIX_ACHAT_BRUT, TAUX_DE_REMISE)
    expect(value).toEqual(80)
})

test('Prix de vente net ', () => {
    let coeffMulti = jest.fn();
    coeffMulti.mockReturnValue(2)

    let prixAchatNet = jest.fn();
    prixAchatNet.mockReturnValue(80)

    let value = prixVenteNet(prixAchatNet(), coeffMulti())
    expect(value).toEqual(160)
})

test('Coefficient multiplicateur ', () => {
    let prixVenteNet = jest.fn();
    prixVenteNet.mockReturnValue(160);

    let prixAchatNet = jest.fn();
    prixAchatNet.mockReturnValue(80)

    let value = coeffMultiplicateur(prixVenteNet(), prixAchatNet())
    expect(value).toEqual(2)
})
