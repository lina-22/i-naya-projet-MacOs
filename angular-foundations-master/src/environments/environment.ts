// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl:"https://gateway.marvel.com:443",
  // apiKey:"Clé d’API disponible sur marvel.com"
  apiKey:"6bcf208e93d99f2987f7778dd2ee17a5",
  privateKey:"52bfff00b6b624712e0ce561bc85a11c7f244186",
  hash:"1ad229f40d63f41474eca55bc55af188",
  ts:"1700602408992"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
