// Tuodaan tietokantayhteys
import promisePool from '../utils/database.js';

// Haetaan kaikki päiväkirjamerkinnät tietokannasta
const listAllEntries = async () => {
  try {
    // Suoritetaan SQl-kysely
    const [rows] = await promisePool.query('SELECT * FROM DiaryEntries');
    // Palautetaan kaikki rivit
    return rows;
  } catch (e) {
    // Tulostetaan virhe konsoliin jos tapahtuu
    console.error('error', e.message);
    // Palautetaan virhe objekti controllerille
    return {error: e.message};
  }
};

// Haetaan kaikki merkinnät tietylle käyttäjälle user_id:n perusteella
const listAllEntriesByUserId = async (id) => {
  try {
    // SQL kysely
    const sql = 'SELECT * FROM DiaryEntries WHERE user_id = ?';
    // execute käyttää prepared statementtia
    const [rows] = await promisePool.execute(sql, [id]);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// Haetaan yksittäinen merkintä entry_id:n perusteella
const findEntryById = async (id) => {
  try {
    // prepared statement
    const [rows] = await promisePool.execute('SELECT * FROM DiaryEntries WHERE entry_id = ?', [id]);
    // Palautetaan ensimmäinen tulos
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// Lisätään uusi päiväkirjamerkintä
const addEntry = async (entry) => {
  // Puretaan entry-objektista kentät
  const {user_id, entry_date, mood, weight, sleep_hours, notes} = entry;
  // SQL kysely
  const sql = `INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  // Parametrit prepared statementille
  const params = [user_id, entry_date, mood, weight, sleep_hours, notes];
  try {
    // Suoritetaan INSERT
    const result = await promisePool.execute(sql, params);
    // Palautetaan lisätyn rivin ID
    return {entry_id: result[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

// Poistetaan merkintä entry_id:n ja user_id:n perusteella
const removeEntryById = async (entryId, userId) => {
  // SQL DELETE kysely
  const sql = 'DELETE from DiaryEntries WHERE entry_id = ? AND user_id = ?';
  // Suoritetaan kysely
  const [result] = await promisePool.execute(sql, [entryId, userId]);
  // affectedRows kertoo mikä entry_id poistettiin
  return result.affectedRows;
};

export {listAllEntries, findEntryById, addEntry, listAllEntriesByUserId, removeEntryById};