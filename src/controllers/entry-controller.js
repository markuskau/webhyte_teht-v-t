// Tuodaan model-funktiot jotka käsittelevät tietokantaa
import {
  //listAllEntries, // ei käytössä tällä hetkellä
  findEntryById,
  addEntry,
  listAllEntriesByUserId,
  removeEntryById,
} from '../models/entry-model.js';

// GET /api/entries
// Haetaan kaikki päiväkirjamerkinnät kirjautuneelle käyttäjälle
const getEntries = async (req, res) => {
  // req.user tulee autentikointimiddlewaresta JWT
  // user_id kertoo kenen merkinnät haetaan
  const result = await listAllEntriesByUserId(req.user.user_id);
  // jos model ei palauta erroria
  if (!result.error) {
    res.json(result); // palautetaan merkinnät JSONina
  } else {
    res.status(500); // palvelinvirhe
    res.json(result); // palautetaan virheviesti
  }
};

// GET /api/entries/:id
// Haetaan yhden päiväkirjamerkinnän perusteella
const getEntryById = async (req, res) => {
  // req.params.id tulee URL:stä
  const entry = await findEntryById(req.params.id);
  // Jos merkintä löytyy
  if (entry) {
    res.json(entry);
  } else {
    // Jos ei löydy
    res.sendStatus(404); // Not found
  }
};

// POST /api/entries
// Lisätään uusi päiväkirjamerkintä
const postEntry = async (req, res) => {
  // user_id tulee autentikoinnista
  const user_id = req.user.user_id;
  // yhdistetään user_id ja request body
  const result = await addEntry({ user_id, ...req.body });
  // jos merkintä lisättiin onnistuneesti
  if (result.entry_id) {
    res.status(201).json({
      message: 'New entry added.',
      ...result, // sisältää entry_id
    });
  } else {
    // jos lisäys epäonnistui
    res.status(500).json(result);
  }
};

// PUT /api/entries
// päivittää merkinnän (ei ole toteutettu)
const putEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

// DELETE /api/entries
// Poistetaan päiväkirjamerkintä
const deleteEntry = async (req, res) => {
  // poistetaan merkintä jos entry_id ja user_id täsmää
  const affectedRows = await removeEntryById(req.params.id, req.user.user_id);
  // jos rivi poistettiin
  if (affectedRows > 0) {
    res.json({message: 'entry deleted'});
  } else {
    // jos merkintää ei löydy
    res.status(404).json({message: 'entry not found'});
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
