# Test tecnico – Full Stack

**Stack preferito:** Svelte 5 + SvelteKit (alternativa: React + framework a scelta)

---

## Obiettivo

Sviluppare **Asset Watchlist** — un’applicazione fintech per esplorare asset finanziari (azioni, ETF, crypto), cercare nel catalogo e gestire una watchlist personale. Il focus è sul frontend.

---

## Requisiti funzionali

### 1. Dashboard – Lista asset 

- **Layout responsive**: griglia di card asset (header, footer, sidebar toggle, gestione responsive libera)
- **Card asset**: simbolo, nome, prezzo, variazione % (con colore positivo/negativo), pulsante “Aggiungi alla watchlist”
- **Stato watchlist**: persistenza in `localStorage`, `sessionStorage` ; icona/stile diverso per asset in watchlist
- **Loading state**: skeleton o spinner durante il caricamento
- **Empty state**: messaggio chiaro quando non ci sono risultati
- **Accessibilità**: semantica HTML corretta, focus visibile.

### 2. Ricerca con debounce e gestione race conditions 

- **Input di ricerca** con debounce (300–500 ms) per evitare troppe richieste
- **Race condition**: se l’utente digita velocemente, solo l’ultima richiesta deve aggiornare la UI (usare `AbortController` per annullare le richieste precedenti)
- **Indicatore di caricamento** durante la ricerca
- **Messaggio** se la ricerca non restituisce risultati

### 3. Dettaglio asset 

- **Routing**: pagina `/asset/[id]` con dati caricati via `load` (SvelteKit) o equivalente
- **Layout**: simbolo, nome, prezzo, variazione %, descrizione, pulsante watchlist
- **Gestione errori**: pagina 404 o messaggio se l’asset non esiste

### 4. API / Backend

- **Endpoint GET** `/api/asset` con query `?q=termine` per la ricerca
- **Endpoint GET** `/api/asset/[id]` per il singolo asset
- **Caricamento parallelo**: nella dashboard, caricare lista asset e categorie/tipologie in parallelo
- **Gestione errori**: status code e messaggi appropriati; gestione lato client (retry, messaggio utente)