import path from 'path';

export const repoRoot = path.resolve(__dirname, '../');

export const logServerEntryS6 = path.join(repoRoot, 'servers/abc-core-services/log-service/entry.js');
export const userServerEntryES6 = path.join(repoRoot, 'servers/abc-core-services/user-service/entry.js');
export const authenticationServerEntryES6 = path.join(repoRoot, 'servers/abc-core-services/authentication-service/entry.js');
export const webServerProxyEntryES6 = path.join(repoRoot, 'servers/abc-core-services/web-server-proxy/entry.js');
//
export const apiServerEntryS6 = path.join(repoRoot, 'servers/abc-bs-services/sample-service/entry.js');
//
export const partServerEntryES6 = path.join(repoRoot, 'servers/abc-core-services/part-service/entry.js');
export const productServerEntryES6 = path.join(repoRoot, 'servers/abc-core-services/product-service/entry.js');
export const orderServerEntryES6 = path.join(repoRoot, 'servers/abc-core-services/order-service/entry.js');
export const shoppingServerEntryES6 = path.join(repoRoot, 'servers/abc-core-services/shopping-cart-service/entry.js');

export const servicepfx= path.join(repoRoot, 'resource/certs/server.pfx');