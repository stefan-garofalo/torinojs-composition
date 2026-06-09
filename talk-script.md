# Make The Shape Visible - Speaker Script

## Slide 1 — Make The Shape Visible

Questo talk parla di React API design.

Uso i compound components come esempio concreto per arrivare alla domanda vera: cosa appartiene alle props e cosa appartiene alla composition.

Perché la public API di un componente diventa il modo in cui il resto del codebase pensa a quel componente.

La composition è l'unico modo sano per architettare componenti React quando devono sopravvivere alla dinamicità reale di prodotto.

Le props vanno benissimo per i values. Ma sono un pessimo posto dove nascondere l'architectura.

Perciò il seguente mental model:

Configuration for values. Composition for shape.


## Slide 2 — A Useful Component Under Pressure

Partiamo da un componente per le notifiche.

Niente di strano. Avatar, testo, magari timestamp. Il tipo di componente che ogni app ha.

Però ora avremmo bisogno di coprirea anche le follow requests. Serve perciò un actor e una follow-back action.

Ora anche per i post likes. Serve aggiungere una thumbnail del post, e un link al post.

Poi per le richieste di DM. Serve una preview del messaggio e due actions: accept o reject.

Poi per i photo tags. Serve media, e magari anche un remove-tag behavior.

Il problema è che sono tutte semanticamente parte delle notifiche, ma abbastanza diverse da richiedere una propria shape differente.

Dal call site sembra ancora tutto ok:

`type="dmRequest"`, actor, message, preview, primary action, secondary action.

Però il componente ha già iniziato a esporre un'interfaccia confusa.

## Slide 3 — One Clean Shape

Se guardiamo un caso isolato, è pulito.

Una post-like notification ha un solo job.

Renderizza actor. Renderizza body. Renderizza media del post.

Non c'è nessun problema profondo di architecture. Un componente che possiede una sola product shape può restare banalissimo, ed è una cosa positiva.

Il problema nasce quando questa shape pulita diventa il posto condiviso dove infilare ogni shape futura.

Il componente sta ancora facendo il suo lavoro. Ha solo iniziato ad attrarre ogni nuova esigenza.

## Slide 4 — Add Interaction

Poi arrivano le follow requests.

Ancora tutto ragionevole.

Aggiungiamo un follow-back hook. Renderizziamo un button solo quando il type è `followRequest`.

Questa è la prima branch che dice: la row non sta più solo renderizzando notification data. Ora conosce un product behavior.

Una branch può andare benissimo.

La domanda è se questa branch rappresenta una piccola differenza di value, oppure il primo segnale che stiamo spingendo behaviors diversi attraverso una sola surface.

A questo punto è ancora ambiguo.

Ed è proprio per questo che questo pattern si insinua così facilmente.

## Slide 5 — Then Two Actions

Poi arriva la DM request.

Adesso la row deve supportare accept e ignore.

Servono hook diversi, button diversi, magari anche una destination diversa.

Di nuovo, ogni riga ha una ragione per esistere.

Ma la shared row si sta allargando. Ora conosce follow-back, accept, ignore, message request navigation, media rendering, e le condizioni per ognuna di queste cose.

Questo è il momento in cui il componente inizia a diventare un parser.

La public API gli passa una descrizione. Dentro il componente noi decodifichiamo quale product shape quella descrizione stava cercando di rappresentare.

## Slide 6 — The Outside Still Looks Fine

La parte fastidiosa è che da fuori sembra ancora accettabile.

La usage della follow request è piccola.

La usage della DM request è piccola.

Se fai review di un solo call site probabilmente la approvi.

Ma le API cedono come insieme, non call site per call site.

Lo spazio delle combinazioni possibili cresce, e le combinazioni valide vivono quasi sempre nella nostra testa.

Quali actions sono legali per quale type?

Quali fields sono required?

Quali fields vengono ignorati?

Quale prop vince quando due modes si contraddicono?

Di solito la risposta è: da qualche parte nel body del componente.

E lì parte il gesto rassegnato che conosciamo tutti: apri il componente, la prop list non ti spiega davvero il behavior, e quindi fai search nel repo per trovare un altro call site con la stessa combinazione.

Sembra ricerca, ma in realtà è archeologia forzata.

L'API ha smesso di essere leggibile da sola.

## Slide 7 — More Branches

Poi product chiede moderation.

Qui l'abstraction inizia a mentire male.

Supportare moderation significa insegnare al generic item un altro product concept.

C'è una decision href. L'actor identity può sparire. L'avatar diventa un system icon. Appeal e view-decision handlers finiscono dentro il componente condiviso.

La row ora sa cos'è un report, cos'è una DM request, cos'è una follow request, quale route apre ognuna, e quali actions sono permesse.

Le conditionals sono solo il sintomo.

Le product shapes supportate sono nascoste dentro un generic renderer.

Tante props fuori. Tante branches dentro.

Questa è prop soup.

## Slide 8 — Then Moderation Breaks It

Dal call site moderation sembra solo un altro notification type.

Ma guardiamo cosa siamo costretti a dire:

No actor. Hide actor. Show system icon. Show inline reason. Primary action is view decision. Secondary action is appeal.

Qui non cambia una label dentro la stessa row.

Cambiano identity, navigation, copy sensitivity, actions, permissions.

Questa è una shape change.

E quando un product change è una shape change, un'altra prop è il livello di espressione sbagliato.

L'API sta fingendo che stiamo configurando values.

In realtà stiamo descrivendo structure.

## Slide 9 — Props Outside, Branches Inside

Questo è il pattern in piccolo.

`showSystemIcon` diventa una icon branch.

`type` diventa una href branch.

`primaryAction` diventa una action branch.

Poi arriva anche una permission branch, perché la moderation copy ha regole diverse di visibilità.

Prop soup è quando le props smettono di essere inputs e iniziano a diventare un programming language.

Una prop seleziona il mode. Un'altra patcha l'eccezione. Un'altra disabilita una cosa che esiste solo in un mode. Un'altra cambia behavior perché il mode non era abbastanza specifico.

A quel punto la component API ha perso la semplicità che prometteva.

È composition codificata male.

## Slide 10 — Structural Variation

Questo è il lens che uso.

Alcuni cambiamenti sono values.

Alcuni cambiamenti sono shapes.

Cambia una label? Quello è un value.

Cambia un loading state? Probabilmente è un value.

Ma se cambiano le parts, se cambiano le actions, se cambia la navigation, se cambia l'ownership boundary, o se le permissions cambiano cosa può essere mostrato, quella è structural variation.

E quando la variation è structural, make the structure visible.

Non clever.

Visible.

## Slide 11 — Configuration Is For Values

Quindi la regola diventa:

Configuration is for values.

Composition is for shape.

Smettiamo di gestire behavior con props.

Behavior is composition-bound.

Values e configuration sono prop-bound.

Una prop può dire qual è la label. Una prop può dire se un button è disabled. Una prop può passare date, count, href, loading state.

Ma se la domanda è "quale behavior esiste qui?", quello deve essere visibile nella composition.

Le parts che renderizzi sono il behavior contract.

## Slide 12 — Extract The Row

Quindi il refactor non parte inventando un framework enorme.

Parte estraendo la row.

Il shared container diventa una primitive.

Ora una variant può comporre la row invece di configurarla.

Questo è importante perché la row è stabile. La row è il frame.

Ma il contenuto della row cambia da shape a shape.

Quindi teniamo la shared shell noiosa, e smettiamo di chiederle di capire ogni product behavior.

La variant possiede la composition.

La primitive possiede il rendering contract condiviso.

## Slide 13 — Extract Identity

Poi rendiamo esplicita l'identity.

In una actor-based notification renderizzi `Notification.Actor`.

In moderation renderizzi `Notification.SystemIcon`.

Niente `showActor={false}`.

Niente actor prop tecnicamente optional ma solo per un mode.

Niente generic component che decide se questa cosa è una persona, un system event, o altro.

La moderation shape sceglie direttamente un system icon.

È una piccola cosa, ma cambia completamente la reading experience.

Ora la product rule si vede nel JSX.

## Slide 14 — Extract Copy

Poi la copy diventa una primitive.

Body. Timestamp. Magari più avanti reason, preview, primary detail.

Stiamo dando un nome agli slots stabili della famiglia.

Il component kit ci dà un vocabulary.

La variant decide quali parole di quel vocabulary fanno parte di questa shape.

Quindi invece di avere un generic item che branch-a internamente su quale copy mostrare, la shape dice:

system icon, body, timestamp.

Piccolo. Leggibile. Locale.

## Slide 15 — Extract Media

Media è un buon esempio perché non tutte le notifications ce l'hanno.

Photo tags ne hanno bisogno.

Post likes ne hanno bisogno.

Moderation magari decide apposta di non mostrarlo, anche se il target sotto era un post con media.

Quindi media non dovrebbe essere una flag che ogni notification si porta dietro.

Dovrebbe essere una primitive usata dalle shapes che davvero hanno bisogno di media.

Qui composition inizia a diventare pratica.

Shared parts, ma nessun obbligo per ogni shape di fingere di avere ogni part.

## Slide 16 — Extract Actions

Le actions sono ancora più importanti.

DM request ha accept e ignore.

Follow request ha follow back.

Moderation ha view decision e appeal.

Qui non stiamo parlando di buttons generici.

Stiamo parlando di UX behavior primitives.

`FollowBack` implica un actor, una relationship action, optimistic state, magari tracking, magari disabled state dopo il click.

`ViewDecision` implica moderation context, un decision target, permission per ispezionarlo, e una support route.

`Appeal` implica un permission path diverso e una product promise diversa.

Questi behaviors non dovrebbero essere string values passati dentro `primaryAction`.

Dovrebbero essere pezzi visibili della composed shape.

## Slide 17 — The Shape Is In The Code

Ora apriamo moderation, e la shape è lì.

Deriva un view model.

Renderizza una row.

Poi system icon, body, timestamp, actions.

Niente `showActor={false}`.

Niente `primaryAction="viewDecision"`.

Niente generic moderation branch nascosta dentro una row gigante.

Il behavior supportato ha un nome.

La shape supportata è visibile.

È ancora abstraction, ma è abstraction che puoi leggere da fuori.

## Slide 18 — Make The Variants Explicit

Ora cambia la public API.

Invece di un generic component con un mode language in crescita, il modulo esporta le notification shapes che supporta.

`FollowRequestNotification`.

`PostLikeNotification`.

`DMRequestNotification`.

`PhotoTagNotification`.

`ModerationNotification`.

`PostCommentNotification`.

Ogni export è una product shape con un nome.

L'app non chiede più: quale combinazione di props descrive questa notification?

Chiede: qual è la supported notification shape?

E qui la registry conta.

La registry diventa una coverage surface.

Se il backend ha un notification type, il frontend deve avere un renderer supportato.

La product taxonomy e la UI taxonomy restano allineate.

## Slide 19 — Internal Kit / Public API

Questo è il boundary che mi interessa.

Composition tiene insieme compound components e named variants.

Splitti ogni behavior in primitives più piccole, sia quando quel behavior è visual UI, sia quando è proprio UX behavior.

`Actor`, `Body`, `Timestamp`, `Media` sono visual primitives.

`FollowBack`, `ViewDecision`, `Appeal` sono behavior primitives.

La visual primitive dice cosa appare.

La behavior primitive dice cosa l'utente può fare.

Ogni primitive possiede un piccolo reusable scope. Poi quelle primitives collaborano con le sibling per formare l'abstraction finale.

L'abstraction finale dichiara esplicitamente quale UX supporta.

E per questo il JSX diventa documentazione utile: mostra la UI visibile e la UX supportata nello stesso punto.

## Slide 20 — The Inner Context

Il data resta lì.

Si sposta dietro un provider boundary.

Ogni named variant possiede il provider contract di cui le sue primitives hanno bisogno.

Mi piace la divisione `state`, `actions`, `meta` perché dà al context una shape noiosa e prevedibile.

`state` è quello che le primitives renderizzano.

`actions` sono quello che le primitives possono triggerare.

`meta` è il contesto operativo: refs, ids, labels, formatting, tracking, platform details.

La regola importante è che le primitives consumano l'interface, non l'implementation.

`Notification.Actions` non deve sapere se lo stato moderation arriva da un hook, da un server payload, da local state, o da global store.

Il provider è l'unico punto che sa come viene gestito lo state.

Così l'implementation resta privata, mentre la composition resta esplicita.

## Slide 21 — New Behavior, New Place

Poi product chiede post comment notifications.

Nella vecchia API sarebbe stato un altro overlap problem.

Sembra un po' post like, perché c'è una post thumbnail.

Sembra un po' DM request, perché c'è una text preview.

Magari ha una reply action e un comment permalink.

Con la nuova shape, prende un nome.

`PostCommentNotification`.

Può condividere actor, body, media, actions primitives senza fingere di essere una post like, una DM request, o una moderation event.

Questa è la parte interessante.

Composition decide dove vive la complessità.

Qui la complessità vive in named variants, exported primitives, provider contracts, e una registry che possiamo controllare.

Non in combinazioni accidentali di props.

## Slide 22 — Shrink The Public State Space

Questa è la piccola teoria dietro al pattern.

Una component API ha un public state space.

Ogni combinazione pubblica di props è uno state che qualcuno può scrivere, revieware, testare, mantenere.

Un bag di flags allarga quello spazio.

Suggerisce più combinazioni di quante il prodotto supporti davvero.

Explicit variants restringono il public set.

Dicono: queste sono le shapes che supportiamo.

A volte la versione composta ha più righe.

Il goal è avere meno public modes da tenere in testa.

L'IDE può autocomplete-are le supported shapes.

TypeScript può controllare la registry.

Una reviewer può leggere il JSX e capire cos'è il componente.

Piccola parentesi AI: questa cosa conta ancora di più adesso, perché AI legge meglio codice esplicito. Named shapes e named primitives danno semantic handles agli agents. E se composition genera un po' più di boilerplate, AI è molto brava a pagare quel costo.

## Slide 23 — Make The Shape Visible

Quindi la regola finale è questa.

Configuration is for values.

Composition is for shape.

Se un behavior è supportato, dagli un nome.

Se una shape è supportata, rendila visibile.

Se una regola cambia parts, actions, navigation, permissions, o ownership boundary, non nasconderla dentro un'altra prop su un generic component.

Se gestisci behavior tramite props, probabilmente hai costruito un componente implicito dentro il componente.

Rendilo reale.

Dagli un nome.

Renderizza le sue parts.

Sposta la shape nel codice che le persone possono vedere.

Tieni la flexibility dentro il modulo.

Dai local reasoning a chi usa l'API.
