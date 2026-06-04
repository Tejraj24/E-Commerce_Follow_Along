// Small helper to standardize API responses
const success = (res, payload = {}, status = 200) => {
  return res.status(status).json({ success: true, ...payload });
};

const error = (res, message = 'Internal server error', status = 500) => {
  return res.status(status).json({ success: false, message });
};

module.exports = { success, error };
