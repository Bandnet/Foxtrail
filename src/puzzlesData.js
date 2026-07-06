export const puzzles = [
  {
    id: 0,
    title: "Die Erklärung",
    description: `Vor drei Tagen geschah das Unfassbare: Rodrigo Ramirez, das Oberhaupt des berüchtigten Cartels, fuhr mit seinem Auto direkt in die Brainrot Convention hinein und riss sechs unschuldige Kinder und das Tung Tung Tung Sahur in den Tod.

Die Kameras liefen, alles wurde aufgezeichnet, und das Video existiert irgendwo im Netz, geschützt durch einen Link und ein Passwort. Detektiv Raul Escobaum war dem Fall auf der Spur. Er hatte beide Zugangsdaten auf einem einzigen Blatt Papier notiert und war kurz davor, das Beweismaterial zu sichern und der Welt zu präsentieren.

Doch das Cartel war schneller. Raul wurde gefunden tot. In der Panik, das Beweismaterial zu vernichten, zerriss jemand das Blatt in Eile, doch die Papierfetzen wurden nicht verbrannt wie befohlen, sondern verstreut und gingen an verschiedenen Orten verloren.

Jetzt hat Rodrigo Ramirez davon erfahren. Er ist ausser sich vor Wut und hat seine Leute ausgeschickt, um jede einzelne Spur zu finden und endgültig zu vernichten.

Ihr seid die Einzigen, die noch eine Chance haben. Findet die Papierfetzen, rekonstruiert den Link und das Passwort, und sichert das Video, bevor das Cartel euch zuvorkommt.

Raul konnte es nicht mehr fertigbringen, aber seine Spur ist noch da, zerstreut und versteckt, und sie wartet auf jemanden, der schneller ist als die Killer, die bereits auf dem Weg sind.

Jede Sekunde zählt. Das Foxtrail beginnt jetzt. Pro Rätsel gibt es ein Bild (merke es dir!), ein Rätsel für den nächsten Ort und ein Inputfeld für den Code, den du am neuen Ort finden wirst.

Erste Code = Start`,
    image: "",
    correctAnswer: "Start"
  },
  {
    id: 1,
    title: "Puzzle 1: Der Dönerladen",
    description: `**POLIZEIBERICHT – Aktenzeichen BR-2024-0847**

Laut anonymem Hinweis hält sich ein Mitglied des Ramirez-Cartels regelmäßig in einem Dönerladen namens „Bang" in der Nähe der Pionierstrasse 28 auf. Der Verdächtige wurde mehrfach dabei beobachtet, neben den Blumentöpfen vor dem Lokal Zigaretten zu rauchen.

Es besteht der Verdacht, dass er unwissentlich einen der Papierfetzen vom Büro Escobaums an seiner Kleidung mitgeführt und dort verloren hat. Umgehende Überprüfung des Bereichs um die Blumentöpfe wird empfohlen.

Vorsicht: Weitere Cartel-Mitglieder könnten in der Umgebung sein.`,
    image: "/string_1.png",
    afterImageText: `**Hinweis:** Wie viele Blumentöpfe hat es direkt vor dem Lokal?\n\nSchau genau hin, dort liegt der nächste Teil.`,
    correctAnswer: "42"
  },
  {
    id: 2,
    title: "Puzzle 2: Das Kesselhaus",
    description: `**POLIZEIBERICHT – Aktenzeichen BR-2024-0847 (Ergänzung)**

Neue Erkenntnisse zum jüngsten Mitglied des Ramirez-Cartels, identifiziert als Carlito. Laut Aussagen aus dem Umfeld des Verdächtigen ist dieser stark fixiert auf Detektivfilme und besucht regelmässig das Kesselhaus in Winterthur. Aktuell läuft dort ein Film, der thematisch in den Bereich Detektion/Ermittlung fällt. Carlito wurde zuletzt in Richtung des Kinos gesichtet. 

Es ist davon auszugehen, dass er sich erneut einen der Papierfetzen Escobaums unbewusst an sich genommen hat und diesen möglicherweise während des Filmbesuchs im Kesselhaus verloren hat. 

Empfehlung: Filmprogramm prüfen, entsprechende Vorstellung ausmachen und Bereich nach verdächtigen Papierschnipseln absuchen. Carlito gilt als unberechenbar – Vorsicht ist angebracht.`,
    image: "/string_2.png",
    afterImageText: `Trage hier den gefundenen Code oder den gesuchten Filmtitel ein.`,
    correctAnswer: "seven" // Hier die gesuchte Lösung für das Kesselhaus eintragen
  },
  {
    id: 3,
    title: "Puzzle 3: Der Hauptbahnhof",
    description: `**POLIZEIBERICHT – Aktenzeichen BR-2024-0847 (Ergänzung II)**

Ein Zeuge meldete sich freiwillig bei der Winti-Polizei und gab an, im BH Winti einen Mann beobachtet zu haben, der offenbar illegale Substanzen anbot. Ausgehend von der Herkunft der Ware und der professionellen Vorgehensweise des Dealers besteht ein starker Verdacht auf eine Verbindung zum Ramirez-Cartel. 

Es ist nicht unwahrscheinlich, dass der Beschuldigte im Besitz weiterer Papierfetzen aus dem Büro Escobaums ist oder diese im Umfeld des BH Winti deponiert hat. 

Hinweis: Im direkten Umgebungsbereich befinden sich mehrere Gleise. Multipliziert deren Anzahl miteinander (oder folge der Spur vor Ort), um den nächsten Standort zu ermitteln. Umgehende Überprüfung empfohlen.`,
    image: "/string_4.png",
    afterImageText: `Multipliziere die Anzahl der Gleise wie im Bericht beschrieben.`,
    correctAnswer: "blue" // Hier das mathematische Ergebnis oder den Code eintragen
  },
  {
    id: 4,
    title: "Puzzle 4: Kirche Peter und Paul",
    description: `**POLIZEIBERICHT – Aktenzeichen BR-2024-0847 (Ergänzung III)**

Ein weiteres identifiziertes Cartel-Mitglied fällt durch stark religiöses Verhalten auf. Laut Beobachtungen besucht die Person regelmäßig die Kirche Peter und Paul in Winterthur, vermutlich aus einem Bedürfnis nach Absolution für die begangenen Taten. 

Es wird vermutet, dass der Gesuchte bei seinen Besuchen einen der Papierfetzen Escobaums in der Nähe der Kirche abgelegt hat. 

Hinweis für das weitere Vorgehen: Auf dem Grasgelände der Kirche befindet sich ein spezifisches Objekt, das als Orientierungspunkt dient. Gesucht wird die Bezeichnung dieses Objekts auf dem Kirchenrasen. Umgehende Überprüfung des Geländes empfohlen, jedoch diskret vorgehen – kirchliche Besucher sollen nicht beunruhigt werden.`,
    image: "/string_3.png",
    afterImageText: `Wie lautet die Bezeichnung des Objekts auf dem Kirchenrasen?`,
    correctAnswer: "secret4" // Hier die Bezeichnung des Objekts eintragen
  },
  {
    id: 5,
    title: "Puzzle 5: Der Sulzerturm",
    description: `**POLIZEIBERICHT – Aktenzeichen BR-2024-0847 (Ergänzung IV)**

Ein weiteres Cartel-Mitglied konnte im Sulzerturm Winterthur lokalisiert werden, wo der Gesuchte offenbar eine reguläre Anstellung innehat. Es gilt als wahrscheinlich, dass er seine Position im Gebäude nutzte, um einen der Papierfetzen Escobaums im direkten Umfeld des Turms zu deponieren. 

Spezifischer Hinweis: Vor dem Sulzerturm befindet sich ein Wasserbereich mit mehreren Blöcken. Die Anzahl dieser Blöcke im Wasser stellt die gesuchte Antwort für den nächsten Standort dar. 

Empfehlung: Vor Ort gehen, Blöcke im Wasser sorgfältig zählen und Anzahl als Lösung notieren. Vorsicht vor Verdächtigen im und um das Gebäude.`,
    image: "/pwd_2.png",
    afterImageText: `Wie viele Blöcke befinden sich im Wasserbereich vor dem Sulzerturm?`,
    correctAnswer: "secret5" // Hier die gezählte Anzahl der Blöcke eintragen
  },
  {
    id: 6,
    title: "Puzzle 6: Der Weg nach Neuwiesen",
    description: `**POLIZEIBERICHT – Aktenzeichen BR-2024-0847 (Ergänzung V)**

Neue Erkenntnisse: Das im Sulzerturm tätige Cartel-Mitglied wurde kürzlich bei einem Treffen mit einem namentlich bekannten Komplizen namens José beobachtet. Nach dem Treffen bewegte sich José in Richtung Neuwiesen. Es wird vermutet, dass José im Besitz eines weiteren Papierfetzens Escobaums ist und diesen auf seinem Weg durch Neuwiesen verloren hat. 

Spezifischer Hinweis: Auf der Strecke in Richtung Neuwiesen befinden sich mehrere Zebrastreifen. Jeder komplette Zebrastreifen gilt als eins, nicht die einzelnen weißen Balken. Die Gesamtanzahl der Zebrastreifen auf dem Weg stellt die gesuchte Lösung dar. 

Umgehende Überprüfung empfohlen. José gilt als gefährlich – Distanz halten.`,
    image: "/string_5.png",
    afterImageText: `Wie viele komplette Zebrastreifen habt ihr auf dem Weg gezählt?`,
    correctAnswer: "secret6" // Hier die Anzahl der Zebrastreifen eintragen
  },
  {
    id: 7,
    title: "Puzzle 7: Migros Restaurant Neuwiesen",
    description: `**POLIZEIBERICHT – Aktenzeichen BR-2024-0847 (Ergänzung VI)**

José wurde zuletzt im Migros Restaurant in Neuwiesen gesichtet, wo er sich offenbar zum Essen aufhielt. Es ist davon auszugehen, dass er auch dort einen der Papierfetzen Escobaums bei sich trug und diesen im Lokal verloren hat. 

Spezifischer Hinweis: Die Anzahl der Kassen im Migros Restaurant Neuwiesen stellt die gesuchte Lösung für den nächsten Standort dar. Vor Ort gehen, Kassen zählen und Anzahl als Antwort notieren. 

José könnte sich weiterhin in der Nähe aufhalten – Vorsicht ist geboten.`,
    image: "/pwd_1.png",
    afterImageText: `Wie viele Kassen gibt es im Migros Restaurant Neuwiesen?`,
    correctAnswer: "secret7" // Hier die Anzahl der Kassen eintragen
  }
];