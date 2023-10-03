        // Eine Funktion, um die Abmessungen des Anzeigebereichs anzuzeigen und zu aktualisieren
        function updateDimensions() {
            const dimensionsElement = document.getElementById('dimensions');
            const width = window.innerWidth;
            const height = window.innerHeight;

            dimensionsElement.textContent = `Breite: ${width}px, Höhe: ${height}px`;
        }

        // Das Event "resize" wird ausgelöst, wenn die Fenstergröße geändert wird
        window.addEventListener('resize', updateDimensions);

        // Die Abmessungen bei Seitenaufruf anzeigen
        window.addEventListener('load', updateDimensions);
