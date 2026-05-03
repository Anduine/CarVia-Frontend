let config = null;

function setConfig(cfg) {
  config = cfg;
}

function getConfig() {
  if (!config) throw new Error("Config not loaded");
  return config;
}

async function loadConfig() {
  if (config) return config;

  const response = await fetch("/config.json");
  if (!response.ok) {
    throw new Error(`Load error config.json: ${response.status}`);
  }

  config = await response.json();

  return config;
}

function getImageUrl(path) {
  return `${config?.API_URL}/storage/image/${path}`;
}

function getUserAvatarUrl(path) {
  return `${config?.API_URL}/storage/avatar/${path}`;
}

export { loadConfig, getConfig, setConfig, getImageUrl, getUserAvatarUrl };
