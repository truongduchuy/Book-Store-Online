/* eslint-disable no-console */
export const logError = (...messages) =>
  console.error(`[${process.env.REACT_APP_NAME}]`, ...messages);
export const logWarning = (...messages) =>
  console.warn(`[${process.env.REACT_APP_NAME}]`, ...messages);
export const logInfo = (...messages) =>
  console.info(`[${process.env.REACT_APP_NAME}]`, ...messages);
export const logDebug = (...messages) =>
  console.log(`[${process.env.REACT_APP_NAME}]`, ...messages);

export const API_ERROR_MESSAGE = 'Something went wrong with Api call!';
export const handleApiError = (state, action) => {
  logError(action.payload);
  return state;
};
