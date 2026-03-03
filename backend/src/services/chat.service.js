const pool = require("../config/db");
const aiEngine = require("./ai.engine");

async function handleMessage(userId, message) {
  await pool.query(
    `INSERT INTO ai_chat_messages (user_id, sender, message)
     VALUES ($1,'user',$2)`,
    [userId, message]
  );

  const reply = aiEngine.generateChatResponse(message);

  await pool.query(
    `INSERT INTO ai_chat_messages (user_id, sender, message)
     VALUES ($1,'ai',$2)`,
    [userId, reply]
  );

  const countRes = await pool.query(
    `SELECT id FROM ai_chat_messages
     WHERE user_id=$1
     ORDER BY created_at DESC`,
    [userId]
  );

  if (countRes.rows.length > 10) {
    const idsToDelete = countRes.rows.slice(10).map(r => r.id);
    await pool.query(
      `DELETE FROM ai_chat_messages
       WHERE id = ANY($1::int[])`,
      [idsToDelete]
    );
  }

  return reply;
}

async function getHistory(userId) {
  const result = await pool.query(
    `SELECT sender, message, created_at
     FROM ai_chat_messages
     WHERE user_id=$1
     ORDER BY created_at ASC`,
    [userId]
  );

  return result.rows;
}

async function clearChat(userId) {
  await pool.query(
    `DELETE FROM ai_chat_messages
     WHERE user_id=$1`,
    [userId]
  );
}

module.exports = { handleMessage, getHistory, clearChat };