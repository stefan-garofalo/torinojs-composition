# Make The Shape Visible - Scaletta

### Slide 1 — Make The Shape Visible

- Tema: API design in React, partendo dai compound components.
- Domanda centrale: cosa va nelle props, cosa deve emergere dalla composizione.
- L'API pubblica insegna al codebase come pensare un componente.
- Regola: configuration for values, composition for shape.

### Slide 2 — A Useful Component Under Pressure

- Caso iniziale: notification row semplice.
- Il prodotto cresce: follow request, post like, DM request, photo tag.
- Ogni richiesta e' sensata da sola.
- Il problema: stessa famiglia semantica, shape diverse.
- Rischio: spingere shape diverse nella stessa API.

### Slide 3 — One Clean Shape

- Un singolo caso resta pulito.
- Post like: actor, body, thumbnail.
- Una sola product shape -> componente semplice.
- Problema quando la shape iniziale diventa contenitore di tutte le future.
- Il componente non e' rotto, ma attira complessita' non sua.

### Slide 4 — Add Interaction

- Arriva follow request: aggiungiamo bottone e handler.
- Una branch isolata sembra innocua.
- Domanda chiave: differenza di valore o nuovo behavior?
- Il pattern entra per ambiguita': sembra ancora ragionevole.

### Slide 5 — Then Two Actions

- DM request richiede accept e ignore.
- Entrano decisioni, hook, navigazioni diverse.
- Il componente inizia a conoscere i concetti di prodotto.
- Smette di essere renderer, diventa parser.
- Le props descrivono, il componente interpreta la shape nascosta.

### Slide 6 — The Outside Still Looks Fine

- I call site restano corti e reviewabili singolarmente.
- Le API cedono come insieme, non call site per call site.
- Crescono combinazioni e regole senza casa.
- Campi richiesti, ignorati, incompatibili: spesso regole nascoste nel body.
- Quando cerchi call site simili nel repo, stai facendo archeologia.

### Slide 7 — More Branches

- Product chiede moderation.
- Sembra un altro notification type, ma cambia le regole.
- Actor assente, system icon, copy sensibile, navigazione decisionale, action nuove.
- Il generic item impara un altro concetto di prodotto.
- Conditionals come sintomo: props fuori, branch dentro.
- Arrivo alla prop soup.

### Slide 8 — Then Moderation Breaks It

- Moderation rompe la finzione.
- Non stai cambiando una label: cambiano identita', navigazione, copy, azioni, permessi.
- Se il cambiamento di prodotto e' cambiamento di shape, un'altra prop e' il livello sbagliato.
- L'API finge configuration, ma sta descrivendo struttura.

### Slide 9 — Props Outside, Branches Inside

- Props come linguaggio interno: mode, eccezioni, visibility, behavior.
- Il numero di props conta meno del ruolo che assumono.
- Soglia critica: le props non sono piu' input, ma grammatica privata.
- Questa e' composizione codificata male.

### Slide 10 — Structural Variation

- Lens principale: distinguere values da shapes.
- Values: label, loading, disabled, data.
- Shapes: parts, actions, navigation, permissions, ownership boundary.
- Se la variation e' structural, la struttura va resa visibile.

### Slide 11 — Configuration Is For Values

- Configuration is for values.
- Composition is for shape.
- Props ok per fatti indipendenti dentro una shape stabile.
- Se la domanda e' quale behavior esiste o quali parti compongono l'esperienza, serve composizione.
- Le parti renderizzate diventano contratto del behavior.

### Slide 12 — Extract The Row

- Prima mossa: estrarre la row come primitive stabile.
- La row e' frame condiviso, shell riusabile.
- Non deve capire tutti i behavior di prodotto.
- Variant possiede la composizione.
- Primitive possiede il contratto di rendering condiviso.

### Slide 13 — Extract Identity

- Rendere esplicita l'identita'.
- Actor-based: `Notification.Actor`.
- Moderation: `Notification.SystemIcon`.
- Niente `showActor={false}` o actor opzionale per colpa di un mode.
- La regola di prodotto diventa leggibile nel JSX.

### Slide 14 — Extract Copy

- Rendere esplicite le parti testuali.
- Body, timestamp, reason, preview, detail come slot nominati.
- Il component kit crea vocabolario stabile.
- Ogni variant decide quali parole appartengono alla sua shape.
- La struttura si legge, non si deduce.

### Slide 15 — Extract Media

- Media non appartiene a tutte le notifiche.
- Photo tag e post like si', moderation forse no.
- Media non deve essere una flag "nel dubbio".
- Deve comparire solo nelle shape che ne hanno bisogno.
- Parti condivise, senza fingere shape uguali.

### Slide 16 — Extract Actions

- Actions piu' importanti della parte visiva.
- DM: accept/ignore; follow: follow back; moderation: view decision/appeal.
- Non sono solo label diverse dello stesso bottone.
- Ogni action porta contesto, permessi, stato, tracking, destinazioni, promessa UX.
- `primaryAction="..."` perde informazione.
- Behavior primitives visibili raccontano cosa l'utente puo' fare.

### Slide 17 — The Shape Is In The Code

- In `ModerationNotification` la shape e' davanti a te.
- Row, system icon, body, timestamp, actions.
- Niente `showActor={false}`, niente `primaryAction="viewDecision"`, niente branch nascosta.
- Behavior e shape hanno un nome.
- L'astrazione resta, ma si lascia leggere.

### Slide 18 — Make The Variants Explicit

- La public API cambia.
- Esportare shape supportate con nome: `FollowRequestNotification`, `PostLikeNotification`, `DMRequestNotification`, ecc.
- Ogni export e' una product shape esplicita.
- Non chiedi piu' quale combinazione di props serve.
- Chiedi quale shape supportata stai renderizzando.

### Slide 19 — Internal Kit / Public API

- Boundary del modulo.
- Dentro: kit composabile con primitives visive e di behavior.
- Fuori: named variants stabili.
- Flessibilita' dentro, local reasoning fuori.
- Chi usa il modulo non decifra una grammatica privata di props.

### Slide 20 — The Inner Context

- I dati restano, ma dietro un provider boundary per variant.
- Tre parti: `state`, `actions`, `meta`.
- `state`: cosa renderizzano le primitives.
- `actions`: cosa attivano.
- `meta`: contesto operativo, tracking, formatting, ref, id.
- Le primitives consumano interfacce, non implementazioni.
- Il provider della shape decide da dove arrivano i dati.

### Slide 21 — New Behavior, New Place

- Nuova notifica: `PostCommentNotification`.
- Vecchia API: overlap tra casi esistenti.
- Nuova API: nuova complessita' in un posto nominato.
- La shape riusa primitives senza fingere di essere un'altra notifica.
- La composizione non elimina la complessita': decide dove abita.

### Slide 22 — Shrink The Public State Space

- Ogni API pubblica definisce uno state space pubblico.
- Ogni combinazione di props e' uno stato da scrivere, revieware, testare, mantenere.
- Flag e prop bag allargano lo spazio oltre il prodotto reale.
- Explicit variants restringono il set pubblico alle shape supportate.
- Non basta rifiutare stati impossibili: vogliamo meno stati pubblici da tenere in testa.
- TypeScript aiuta con union, record, autocomplete, registry coverage.
- Anche gli strumenti AI leggono meglio shape e primitives nominate.

### Slide 23 — Make The Shape Visible

- Chiusura: configuration for values, composition for shape.
- Se un behavior e' supportato, dagli un nome.
- Se una shape e' supportata, rendila visibile.
- Se cambiano parts, actions, navigation, permissions o ownership boundary, non nasconderlo in una prop.
- Dai all'astrazione un posto esplicito nel codice.
- Obiettivo: local reasoning, niente archeologia nel repo.
