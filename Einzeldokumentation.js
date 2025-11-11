(async () => {
  // JSON-Datei wurde bereits zuvor im Header-Element eingebunden
  const Lernprojekteliste = LernprojekteJSON;

  // Liste im DOM
  const Projektliste = document.getElementById('Projektliste');
    
  // Eintrag für jedes Objekt erzeugen
  Lernprojekteliste.forEach(Lernprojekt => {    
    const Sprungmarke = document.createElement('a');
    Sprungmarke.textContent = `${Lernprojekt.Name}`;
    Sprungmarke.title = `${Lernprojekt.Kurzbeschreibung}`;
    Sprungmarke.href = `.${Lernprojekt.Projektdokumentation}`;
    Sprungmarke.id = `${Lernprojekt.Kürzel}`;

    const div = document.createElement('div');
    Projektliste.appendChild(Sprungmarke);
  });
})();
