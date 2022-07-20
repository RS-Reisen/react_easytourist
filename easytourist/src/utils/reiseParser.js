export function minPriceFromTrip(reise) {
    // console.log(reise.Titel)
    const termine = reise.Termine.Termin
    // console.log(termine instanceof Array)
    if (termine instanceof Array) {
        return Math.min(termine.map(t => minPriceFromTermin(t)))
    }
    return minPriceFromTermin(termine)
}

function minPriceFromTermin(termin) {
    // console.log(termin.Buchungscode, termin.Start)
    const kategorie = termin.Unterkunft.Kategorie
    // console.log(kategorie instanceof  Array)
    if (kategorie instanceof  Array) {
        let result = Math.min(...kategorie.map(k => minPriceFromKategorie(k)))
        // console.log(result)
        return result
    }
    return minPriceFromKategorie(kategorie)
}

function minPriceFromKategorie(kategorie) {
    // console.log(kategorie)
    return parseFloat(kategorie.Preis)
}