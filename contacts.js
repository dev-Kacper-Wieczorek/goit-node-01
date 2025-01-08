const fs = require('fs').promises; // Import modułu fs
const path = require('path'); // Import modułu path

// Ścieżka do pliku contacts.json
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

// Funkcja do pobierania listy kontaktów
async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf-8'); // Odczyt pliku
    return JSON.parse(data); // Parsowanie danych JSON
}

// Funkcja do pobierania kontaktu po ID
async function getContactById(contactId) {
    const contacts = await listContacts(); // Pobierz listę kontaktów
    return contacts.find(contact => contact.id === contactId) || null;
}

// Funkcja do usuwania kontaktu
async function removeContact(contactId) {
    const contacts = await listContacts(); // Pobierz listę kontaktów
    const filteredContacts = contacts.filter(contact => contact.id !== contactId); // Filtruj kontakty
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2)); // Zapisz zmienioną listę kontaktów
    return filteredContacts;
}

// Funkcja do dodawania kontaktu
async function addContact(name, email, phone) {
    const contacts = await listContacts(); // Pobierz listę kontaktów
    const newContact = { id: Date.now().toString(), name, email, phone }; // Nowy kontakt
    contacts.push(newContact); // Dodaj nowy kontakt do listy
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2)); // Zapisz listę z nowym kontaktem
    return newContact;
}

// Eksport funkcji
module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
