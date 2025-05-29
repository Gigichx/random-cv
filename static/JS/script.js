// Funzione principale che genera un nuovo utente
function generaUtente() {
    // Mostra il caricamento
    mostraCaricamento();

    // Chiama l'API per ottenere un utente casuale
    fetch('https://randomuser.me/api/')
        .then((response) => response.json()) // Converte la risposta in JSON
        .then((data) => {
            // Prende il primo utente dai risultati
            const utente = data.results[0];
            // Mostra l'utente nella pagina
            mostraUtente(utente);
        })
        .catch((errore) => {
            // Se c'è un errore, mostra un messaggio
            console.error('Errore:', errore);
            mostraErrore();
        })
        .finally(() => {
            // Nasconde sempre il caricamento alla fine
            nascondiCaricamento();
        });
}

// Funzione che crea e mostra la carta dell'utente
function mostraUtente(utente) {
    // Prepara i dati dell'utente
    const nomeCompleto =
        utente.name.title + ' ' + utente.name.first + ' ' + utente.name.last;
    const dataNascita = new Date(utente.dob.date).toLocaleDateString(
        'it-IT'
    );
    const dataRegistrazione = new Date(
        utente.registered.date
    ).toLocaleDateString('it-IT');
    const indirizzo =
        utente.location.street.number + ' ' + utente.location.street.name;

    // Crea l'HTML della carta utente con design spettacolare
    const cartaUtente = `
                <div class="user-card">
                    <!-- Header con gradiente e foto -->
                    <div class="user-header">
                        <img src="${utente.picture.large
        }" alt="Foto utente" class="user-photo">
                        <h2 class="user-name">${nomeCompleto}</h2>
                        <p class="user-email"><i class="fas fa-envelope me-2"></i>${utente.email
        }</p>
                    </div>
                    
                    <!-- Dettagli con hover effects -->
                    <div class="user-details">
                        <div class="row">
                            <!-- Prima colonna -->
                            <div class="col-md-6">
                                <!-- Sezione informazioni personali -->
                                <div class="info-section">
                                    <h4 class="info-title">
                                        <i class="fas fa-user"></i>
                                        Informazioni Personali
                                    </h4>
                                    <div class="info-row">
                                        <span class="info-label">Genere:</span>
                                        <span class="info-value">
                                            <i class="fas fa-${utente.gender === 'male'
            ? 'mars'
            : 'venus'
        } me-1"></i>
                                            ${utente.gender === 'male'
            ? 'Maschio'
            : 'Femmina'
        }
                                        </span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Età:</span>
                                        <span class="info-value">${utente.dob.age
        } anni</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Data di nascita:</span>
                                        <span class="info-value">${dataNascita}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Nazionalità:</span>
                                        <span class="info-value">${utente.nat
        }</span>
                                    </div>
                                </div>
                                
                                <!-- Sezione contatti -->
                                <div class="info-section">
                                    <h4 class="info-title">
                                        <i class="fas fa-phone"></i>
                                        Contatti
                                    </h4>
                                    <div class="info-row">
                                        <span class="info-label">Telefono:</span>
                                        <span class="info-value">${utente.phone
        }</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Cellulare:</span>
                                        <span class="info-value">${utente.cell
        }</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Seconda colonna -->
                            <div class="col-md-6">
                                <!-- Sezione indirizzo -->
                                <div class="info-section">
                                    <h4 class="info-title">
                                        <i class="fas fa-map-marker-alt"></i>
                                        Indirizzo
                                    </h4>
                                    <div class="info-row">
                                        <span class="info-label">Via:</span>
                                        <span class="info-value">${indirizzo}</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Città:</span>
                                        <span class="info-value">${utente.location.city
        }</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Stato:</span>
                                        <span class="info-value">${utente.location.state
        }</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Paese:</span>
                                        <span class="info-value">${utente.location.country
        }</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">CAP:</span>
                                        <span class="info-value">${utente.location.postcode
        }</span>
                                    </div>
                                </div>
                                
                                <!-- Sezione account -->
                                <div class="info-section">
                                    <h4 class="info-title">
                                        <i class="fas fa-cog"></i>
                                        Account
                                    </h4>
                                    <div class="info-row">
                                        <span class="info-label">Username:</span>
                                        <span class="info-value">${utente.login.username
        }</span>
                                    </div>
                                    <div class="info-row">
                                        <span class="info-label">Registrato dal:</span>
                                        <span class="info-value">${dataRegistrazione}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

    // Inserisce la carta nella pagina
    document.getElementById('contenitoreUtente').innerHTML = cartaUtente;

    // Nasconde il messaggio di benvenuto
    document.getElementById('benvenuto').style.display = 'none';
}

// Funzione che mostra il caricamento
function mostraCaricamento() {
    document.getElementById('caricamento').style.display = 'block';
    document.getElementById('benvenuto').style.display = 'none';
}

// Funzione che nasconde il caricamento
function nascondiCaricamento() {
    document.getElementById('caricamento').style.display = 'none';
}

// Funzione che mostra un messaggio di errore
function mostraErrore() {
    document.getElementById('contenitoreUtente').innerHTML = `
                <div class="alert alert-danger text-center" role="alert">
                    <h4><i class="fas fa-exclamation-triangle me-2"></i>Ops! Qualcosa è andato storto</h4>
                    <p>Non riesco a caricare i dati. Controlla la connessione internet e riprova.</p>
                </div>
            `;
}

// Variabile globale per memorizzare il nome dell'utente
let nomeUtente = "";

// Chiedi il nome al caricamento della pagina
window.onload = function () {
    let input = prompt("Inserisci il tuo nome:");

    // Se è un numero, mostra errore e ricarica la pagina
    if (!isNaN(input) && input !== null && input.trim() !== "") {
        alert("Errore: Il nome non può essere un numero.");
        location.reload();
        return;
    }

    // Se è vuoto o solo spazi, imposta "USER"
    if (!input || input.trim() === "") {
        nomeUtente = "USER";
    } else {
        nomeUtente = input.trim();
    }

    // Inserisci il nome nel messaggio di benvenuto
    const benvenutoDiv = document.getElementById("benvenuto");
    benvenutoDiv.innerHTML = `
      <h3>Benvenuto ${nomeUtente}!</h3>
      <p>Clicca sul pulsante magico per generare il tuo primo utente casuale</p>
    `;
};