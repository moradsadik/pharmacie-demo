
const tauxDeRemise = (prixAchatNet, prixAchatBrut) =>{
    return (1 - prixAchatNet / prixAchatBrut);
}

const prixAchatNet = (prixAchatBrut, tauxDeRemise) =>{
    return prixAchatBrut * ( 1 - tauxDeRemise )
}

const prixVenteNet = (prixAchatNet, coeffMultiplicateur) =>{
    return prixAchatNet * coeffMultiplicateur;
}

const coeffMultiplicateur = (prixVenteNet, prixAchatNet) =>{
    return prixVenteNet / prixAchatNet;
}

export {tauxDeRemise, prixAchatNet, prixVenteNet, coeffMultiplicateur}