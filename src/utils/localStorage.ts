import { deepParseJson } from 'deep-parse-json';

export const getLS = (key: string) => {
  return deepParseJson(localStorage.getItem(key));
};

export const setLS = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeLS = (key: string) => {
  localStorage.removeItem(key);
};

// Save suggestion for Autocomplete
export const saveSuggestionLS = (key: string, value: string) => {
  const oldSuggestion = getLS(key) || [];

  if (Array.isArray(oldSuggestion)) {
    let newSuggestion = [...oldSuggestion];

    if (value) {
      newSuggestion = newSuggestion.filter((s) => s !== value);
      newSuggestion.unshift(value);
      newSuggestion = newSuggestion.slice(0, 3);

      setLS(key, newSuggestion);
    }

    return newSuggestion;
  }

  return [];
};
