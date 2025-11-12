async function LadeProjektdokumentation(Projektdokumentation) {
  // Das Zielelement auswählen:
  const Zielelement = document.getElementById('Inhaltsbereich');
  if (Zielelement == null) {
    console.error("Fehler in der Dokumentationsstruktur: Der Inhaltsbereich für die Dokumentation konnte nicht ausgewählt werden.");
    return;
  }

  try {
    // Lade den Hauptteil Projektdokumentation in "Inhaltsbereich"
    const DokumentationHTML = await fetch(Projektdokumentation);           // <-- hier bricht CORS ggf. ab
    if (!DokumentationHTML.ok) {
      alert(`Beim Laden der Projektdokumentation „${Projektdokumentation}“ ist ein Fehler aufgetreten!`);
      throw new Error(`HTTP-Fehler: Status ${DokumentationHTML.status}`);
    } else {
      // Der Inhalt der html-Datei:
      const htmlInhalt = await DokumentationHTML.text();

      // Initialisiere einen neuen DOM-Parser und erzeuge ein durchsuchbares DOM-Element:
      const Analysierer = new DOMParser();
      const Quelldokument = Analysierer.parseFromString(htmlInhalt, 'text/html');

      // Das gewünschte Quellelement finden:
      const Quellelement = Quelldokument.getElementById('Inhaltsbereich');
      if (Quellelement !== null) {
        Zielelement.innerHTML = Quellelement.innerHTML;
      } else {
        console.warn('Es konnte kein Element mit der ID „Dokumentation“ gefunden werden.');
        Zielelement.innerHTML = '<p>Die gewünschte Dokumentation konnte nicht gefunden werden.</p>';
      }
    }
  } catch (Fehler) {
    console.error("Fehler beim Laden der gewünschten Inhalte: ", Fehler);
    Zielelement.innerHTML = '<p style="color: red;">Die gewünschte Dokumentation konnte nicht geladen werden.</p>';
  }

  // Evlt. Überschriften durchlaufen und zusätzliches Inhaltsverzeichnis erstellen..?
  // `this.id` bzw. `event.target.id`, um auf die ID des angeklickten Elements in der onclick-Funktion zuzugreifen.
}





(async () => {
  // JSON-Datei wurde bereits zuvor im Header-Element eingebunden
  const Lernprojekteliste = LernprojekteJSON;

  // Liste im DOM
  const Fußzeile = document.getElementById('Fußzeile');
    
  // Eintrag für jedes Objekt erzeugen
  Lernprojekteliste.forEach(Lernprojekt => {
    const Inhaltsverzeichniseintrag = document.createElement('div');
    Inhaltsverzeichniseintrag.textContent = `${Lernprojekt.Name}`;
    Inhaltsverzeichniseintrag.title = `${Lernprojekt.Kurzbeschreibung}`;
    Inhaltsverzeichniseintrag.id = `${Lernprojekt.Kürzel}`;
    Inhaltsverzeichniseintrag.classList.add('Inhaltsverzeichniseintrag');
    Inhaltsverzeichniseintrag.addEventListener('click', async () => {await LadeProjektdokumentation(`.${Lernprojekt.Projektdokumentation}`);});
    Fußzeile.appendChild(Inhaltsverzeichniseintrag);
  });
})();
