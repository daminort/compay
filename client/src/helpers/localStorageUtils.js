export function storeValue(keyName, value) {
  localStorage.setItem(keyName, JSON.stringify(value));
}

export function restoreValue(keyName, defaultValue = null) {
  try {
    const value = localStorage.getItem(keyName);
    return JSON.parse(value);

  } catch (error) {
    return defaultValue || null;
  }
}

export function clearValue(keyName) {
  localStorage.removeItem(keyName);
}
