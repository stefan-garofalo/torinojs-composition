# Make The Shape Visible - Speaker Script

### Slide 1 — Make The Shape Visible

Oggi voglio parlare di API design in React.
Parto dai compound components, però la domanda che mi interessa davvero è più generale: cosa mettiamo nelle props, e cosa facciamo emergere direttamente dalla composizione?
Per me l’API pubblica di un componente è il modo in cui tutto il resto del codebase impara a pensare quel componente.
Quindi la regola che voglio proporre è molto semplice: configuration for values, composition for shape.

### Slide 2 — A Useful Component Under Pressure

Partiamo da una cosa molto normale: una riga di notifica.
All’inizio è banalissima: avatar, testo, timestamp, fine.
Poi il prodotto cresce, e quella stessa riga comincia a dover supportare follow request, post like, DM request, photo tag.
Ogni richiesta, presa da sola, ha perfettamente senso. Però queste notifiche stanno tutte dentro la stessa famiglia semantica e hanno strutture diverse.
Una follow request ha bisogno di un’azione, un post like ha bisogno di media, una DM request ha preview e due decisioni, una photo tag ha media e magari anche un comportamento di remove tag.
Da fuori sembra ancora “un solo componente flessibile”, ma in realtà stiamo già iniziando a spingere shape diverse attraverso la stessa API.

### Slide 3 — One Clean Shape

Se isoliamo un singolo caso, tutto fila.
Una notifica di post like, da sola, è pulita: deve mostrare un actor, un body e magari una thumbnail del post.
Finché un componente possiede una sola shape di prodotto, può restare semplice, e secondo me è un bene.
Il problema nasce quando quella shape iniziale diventa il contenitore condiviso dentro cui infiliamo tutte le shape future.
A quel punto il componente non ha ancora “rotto”, ma ha cominciato ad attrarre complessità che non gli appartiene più davvero.

### Slide 4 — Add Interaction

Poi arrivano le follow request.
A prima vista sembra tutto ragionevole: aggiungiamo un bottone, magari un follow back handler, e renderizziamo quell’azione solo quando il type è quello giusto.
Una branch, da sola, ci sta.
La domanda interessante è un’altra: questa branch sta esprimendo una piccola differenza di valore dentro la stessa shape, oppure è il primo segnale che stiamo facendo passare behavior diversi attraverso una surface sola?
Questo pattern si insinua facilmente proprio per questo: all’inizio è ambiguo, e tutto sembra ancora innocuo.

### Slide 5 — Then Two Actions

Poi arriva la DM request, e lì la cosa cambia un po’ di più.
Adesso la riga deve supportare accept e ignore: decisioni, hook diversi, magari anche navigazioni diverse.
Ogni esigenza continua a essere legittima, però il componente condiviso inizia ad allargarsi in modo strano.
Comincia a sapere cos’è una follow request, cos’è una DM request, quali azioni sono consentite, quale preview mostrare e quale route aprire.
Ed è qui che, secondo me, il componente smette di essere solo un renderer e comincia a diventare un parser.
Noi gli passiamo una descrizione tramite props, e lui dentro cerca di interpretare quale shape di prodotto quella descrizione stava cercando di rappresentare.

### Slide 6 — The Outside Still Looks Fine

La fregatura è che, da fuori, tutto sembra ancora accettabile.
Il call site della follow request è corto, quello della DM request è corto, e se fai code review di una sola usage probabilmente la approvi senza problemi.
Ma le API non cedono call site per call site: cedono come insieme.
Man mano che crescono le combinazioni possibili, crescono anche le regole rimaste senza una casa chiara.
Quali actions sono legali per quale type, quali campi sono richiesti, quali vengono ignorati, quale prop vince quando due mode si contraddicono: molto spesso la risposta sta dentro il body del componente, o peggio ancora nella testa di chi lo ha scritto.
Ed è lì che succede quella scena che conosciamo tutti: apri il componente, la lista di props non ti basta per capire, e allora inizi a cercare nel repo un altro call site simile.
Sembra ricerca, ma in realtà è archeologia forzata.

### Slide 7 — More Branches

Poi product chiede moderation.
Sulla carta sembra “un altro notification type”. In pratica cambia le regole del gioco.
Magari non c’è più un actor da linkare, l’avatar diventa un system icon, la copy è sensibile, la navigazione porta a una decisione, e le azioni diventano view decision o appeal.
A questo punto il generic item sta imparando un altro concetto di prodotto.
Le conditionals sono il sintomo.
Le shape supportate sono nascoste dentro un renderer generico: tante props fuori, tante branch dentro.
Ed è qui che arrivi alla prop soup.

### Slide 8 — Then Moderation Breaks It

Secondo me moderation è il punto in cui la finzione smette di reggere.
Dal call site sembra ancora “un altro tipo di notifica”, ma se guardi bene non stai più configurando dettagli della stessa riga.
Stai dicendo: niente actor, mostra un system icon, mostra una reason inline, primary action uguale a view decision, secondary action uguale a appeal.
Qui non sta cambiando una label: stanno cambiando identità, navigazione, sensibilità della copy, azioni e permessi.
Quando un cambiamento di prodotto è un cambiamento di shape, aggiungere un’altra prop è il livello di espressione sbagliato.
L’API finge che stiamo configurando valori, ma in realtà stiamo cercando di descrivere struttura.

### Slide 9 — Props Outside, Branches Inside

A questo punto il pattern si vede bene in miniatura.
Una prop decide l’icona, una prop decide l’href, una prop decide l’azione primaria, poi magari ne arriva un’altra per gestire un’eccezione di permission o di visibility.
Il numero assoluto di props conta fino a un certo punto.
La soglia vera arriva quando le props smettono di essere semplici input e iniziano a funzionare come un piccolo linguaggio di programmazione.
Una seleziona il mode, un’altra corregge il caso speciale, un’altra spegne qualcosa che esiste solo in quel mode, un’altra ancora cambia behavior perché il mode non era abbastanza preciso.
Quando succede questo, la semplicità promessa dall’API è già andata persa.
Quella è composizione codificata male.

### Slide 10 — Structural Variation

Qui entra il lens che per me chiarisce tutto.
Ci sono cambiamenti che sono davvero solo values: una label diversa, uno stato di loading, un disabled state, una data.
E poi ci sono cambiamenti che sono shapes.
Se cambiano le parts, se cambiano le actions, se cambia la navigation, se cambiano le permissions, o se cambia il confine di ownership del comportamento, siamo fuori dal semplice value dentro la stessa struttura.
Stiamo parlando di structural variation.
E quando la variation è structural, la struttura va resa visibile.

### Slide 11 — Configuration Is For Values

Da qui arriva la regola.
Configuration is for values. Composition is for shape.
Le props vanno benissimo quando descrivono fatti indipendenti dentro una shape già stabile: una label, una data, un count, uno stato di loading, un bottone disabilitato.
Se la domanda è “quale behavior esiste qui?”, oppure “quali parti compongono davvero questa esperienza?”, la risposta deve stare nella composizione.
Le parti che renderizzi diventano il contratto del behavior supportato.

### Slide 12 — Extract The Row

Il refactor parte da una mossa piccola: estrarre la row e trattarla come una primitive stabile.
La row resta il frame condiviso, la shell noiosa e riusabile.
Però smette di essere il posto che deve capire tutti i behavior di prodotto.
Da questo momento in poi, la variant possiede la composizione, mentre la primitive possiede il contratto di rendering condiviso.

### Slide 13 — Extract Identity

La prima cosa utile da rendere esplicita è l’identità.
In una actor-based notification renderizzi `Notification.Actor`; in moderation renderizzi `Notification.SystemIcon`.
Non c’è più bisogno di `showActor={false}` o di un actor “tecnicamente opzionale” solo perché esiste un mode che non lo usa.
E soprattutto togliamo al generic component il compito di decidere in segreto se questa cosa rappresenta una persona, un evento di sistema o qualcos’altro.
La regola di prodotto smette di essere implicita e diventa leggibile direttamente nel JSX.

### Slide 14 — Extract Copy

Poi succede la stessa cosa con la copy.
Body, timestamp, e magari più avanti reason, preview, primary detail: invece di lasciarli come casi speciali dentro un renderer generico, li trasformiamo in slot con nomi chiari.
Il component kit comincia a darci un vocabolario stabile.
E ogni variant decide quali parole di quel vocabolario fanno parte della sua shape.
Il risultato è che la struttura non va più dedotta: la leggi.

### Slide 15 — Extract Media

Media è un ottimo esempio perché non appartiene a tutte le notifiche allo stesso modo.
Photo tag e post like ne hanno bisogno, moderation magari decide esplicitamente di non mostrarlo, anche quando il target originale sotto sarebbe un post con media.
Quindi media non dovrebbe essere una flag che ogni notifica si porta dietro “nel dubbio”.
Dovrebbe essere una primitive che compare solo nelle shape che ne hanno davvero bisogno.
Qui la composizione diventa concreta: parti condivise, ma nessun obbligo di fingere che tutte le shape abbiano le stesse parti.

### Slide 16 — Extract Actions

Le actions, secondo me, sono ancora più importanti della parte visiva.
Una DM request ha accept e ignore, una follow request ha follow back, una moderation notification ha view decision e appeal.
Qui stiamo facendo molto più che scegliere etichette diverse per lo stesso bottone generico.
Ogni action porta dietro contesto, permessi, stato, tracking, destinazioni e promessa UX diverse.
Per questo `primaryAction="viewDecision"` o `primaryAction="followBack"` sono una perdita di informazione.
Molto meglio avere behavior primitives visibili, che fanno parte della shape composta e quindi raccontano chiaramente cosa l’utente può fare.

### Slide 17 — The Shape Is In The Code

A quel punto, se apri per esempio `ModerationNotification`, la shape è finalmente lì davanti a te.
Vedi una row, poi system icon, body, timestamp, actions.
Non vedi più `showActor={false}`, non vedi `primaryAction="viewDecision"`, e non vedi una branch generica nascosta dentro un componente enorme.
Il behavior supportato ha un nome, e la shape supportata è leggibile dall’esterno.
È ancora un’astrazione, certo. Però si lascia leggere.

### Slide 18 — Make The Variants Explicit

Da lì cambia anche la public API del modulo.
Iniziamo a esportare le shape supportate con il loro nome: `FollowRequestNotification`, `PostLikeNotification`, `DMRequestNotification`, `PhotoTagNotification`, `ModerationNotification`, `PostCommentNotification`.
Ogni export diventa una product shape esplicita.
L’app smette di chiedersi “quale combinazione di props descrive questa notifica?”.
La domanda diventa: “qual è la shape supportata che sto renderizzando?”.
Ed è una domanda molto più piccola, molto più locale, molto più leggibile.

### Slide 19 — Internal Kit / Public API

Questo per me è il boundary interessante.
Dentro il modulo hai il kit composabile: primitives visive come `Actor`, `Body`, `Timestamp`, `Media`, e primitives di behavior come `FollowBack`, `ViewDecision`, `Appeal`.
Fuori dal modulo, invece, l’app usa named variants stabili e riconoscibili.
In altre parole: flessibilità dentro, local reasoning fuori.
Chi mantiene il modulo conserva la libertà di comporre; chi lo usa non deve decifrare una grammatica privata di props.

### Slide 20 — The Inner Context

Ovviamente i dati restano.
Si spostano dietro un provider boundary che ogni variant possiede per conto suo.
Mi piace pensarlo in tre parti: `state`, `actions`, `meta`.
`state` è ciò che le primitives renderizzano, `actions` è ciò che possono attivare, `meta` è il contesto operativo intorno a loro — ref, id, label, formatting, tracking, dettagli di piattaforma.
La cosa importante è che le primitives consumano un’interfaccia, non l’implementazione.
`Notification.ViewDecision` non deve sapere se i dati arrivano da un hook, da uno store globale o da un payload server: quello è affare del provider della shape che la usa.

### Slide 21 — New Behavior, New Place

Quando product chiede una nuova notifica, per esempio `PostCommentNotification`, la differenza si vede subito.
Nella vecchia API sarebbe stato l’ennesimo problema di overlap: un po’ simile a post like, un po’ simile a DM request, ma non davvero uguale a nessuna delle due.
Con la nuova impostazione, quella complessità riceve un posto nuovo dove vivere.
La nuova shape prende un nome, riusa actor, body, preview, media o actions dove serve, ma senza fingere di essere un’altra notifica.
Ed è qui che si capisce bene che la composizione non elimina la complessità: decide dove farla abitare.
Nel caso buono, la complessità vive in named variants, primitives esportate e provider contracts; non in combinazioni accidentali di props.

### Slide 22 — Shrink The Public State Space

Sotto c’è anche una piccola teoria, molto pratica.
Ogni API pubblica di un componente definisce uno state space pubblico.
Ogni combinazione di props che esponi è uno stato che qualcuno può scrivere, revieware, testare e mantenere.
Un bag di flag allarga quello spazio, spesso molto più di quanto il prodotto supporti davvero.
Le explicit variants, invece, restringono il set pubblico e dicono con chiarezza: queste sono le shape supportate.
Non basta rifiutare gli stati impossibili.
Vogliamo anche meno modi pubblici da tenere in testa.
E qui TypeScript aiuta davvero, non con i trick intelligenti, ma con cose molto terra-terra: union, record, autocomplete, coverage della registry.
Anche per gli strumenti AI questa esplicità conta di più, perché il codice con shape nominate e primitives nominate offre appigli semantici molto più chiari.

### Slide 23 — Make The Shape Visible

Quindi la regola finale è la stessa con cui ho iniziato.
Configuration is for values. Composition is for shape.
Se un behavior è supportato, dagli un nome.
Se una shape è supportata, rendila visibile.
Se una regola cambia parts, actions, navigation, permissions o ownership boundary, non nasconderla dentro l’ennesima prop di un generic component.
Rendi reale quell’astrazione, falle occupare un posto esplicito nel codice, e lascia che chi usa l’API possa ragionare in locale, senza dover fare archeologia nel resto del sistema.
