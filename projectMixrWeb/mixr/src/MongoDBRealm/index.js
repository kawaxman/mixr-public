import { Stitch, AnonymousCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-sdk'
 
export function initializeAndLogin() {
  const client = Stitch.initializeDefaultAppClient('mixrrealm-uxlfh');
  client.auth.loginWithCredential(new AnonymousCredential())
}

export function callPullClientStitch(...parameters) {
  const client = Stitch.defaultAppClient;
  return client.callFunction('pullClient', parameters);
}

export async function callCreateClientStitch(...parameters) {
  const client = Stitch.defaultAppClient;
  return client.callFunction('createClient', parameters);
}

export function callUploadDrinksStitch(...parameters) {
  const client = Stitch.defaultAppClient;
  return client.callFunction('stitchUploadDrinks', parameters);
}

export function callFetchDrinkById(...parameters) {
  const client = Stitch.defaultAppClient;
  return client.callFunction('fetchDrinkById', parameters);
}

export function callFetchDrinksByName(...parameters) {
  const client = Stitch.defaultAppClient;
  return client.callFunction('fetchDrinksByName', parameters);
}

export function callFetchDrinksByIngredients(...parameters) {
  const client = Stitch.defaultAppClient;
  return client.callFunction('fetchDrinksByIngredients', parameters);
}

export function callUpdateProfileData(...parameters) {
  const client = Stitch.defaultAppClient;
  return client.callFunction('updateProfileData', parameters);
}