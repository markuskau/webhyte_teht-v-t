import {
  //listAllEntries,
  findEntryById,
  addEntry,
  listAllEntriesByUserId,
  removeEntryById,
} from '../models/entry-model.js';

const getEntries = async (req, res) => {
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    res.status(500);
    res.json(result);
  }
};

const getEntryById = async (req, res) => {
  const entry = await findEntryById(req.params.id);
  if (entry) {
    res.json(entry);
  } else {
    res.sendStatus(404);
  }
};

const postEntry = async (req, res) => {
  const user_id = req.user.user_id;

  const result = await addEntry({ user_id, ...req.body });

  if (result.entry_id) {
    res.status(201).json({
      message: 'New entry added.',
      ...result,
    });
  } else {
    res.status(500).json(result);
  }
};

const putEntry = (req, res) => {
  // placeholder for future implementation
  res.sendStatus(200);
};

const deleteEntry = async (req, res) => {
  const affectedRows = await removeEntryById(req.params.id, req.user.user_id);
  if (affectedRows > 0) {
    res.json({message: 'entry deleted'});
  } else {
    res.status(404).json({message: 'entry not found'});
  }
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
