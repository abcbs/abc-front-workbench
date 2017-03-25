
import path from 'path'
// import fs   from 'fs-extra'
import configuration from '../../abc-config/config-server'
import global_variables from '../../abc-config/global-variables'
import  endsWith from  'lodash/endsWith'
import keys from 'lodash/keys'
import isObject from 'lodash/isObject'
global._development_ = process.env.NODE_ENV !== 'production';
global._production_ = !global._development_;

// Promise.all(fs);
String.endsWith=String.endsWith||endsWith;

Object.keys=Object.keys||keys;
Object.isObject=Object.isObject||isObject;

global.Root_folder = path.join(__dirname, '..');

global.knexfile = false;
global.configuration = configuration;

for (let key of Object.keys(global_variables))
{
    global[key] = global_variables[key]
}

global.address_book = {};
global.address_ssl_book = {};
// console.log("global.configuration,",global.configuration);
// console.log("global_variables,",global_variables);

for (let key of Object.keys(global.configuration))
{
    // console.log("key,",key);
    if (!key.endsWith('_server') && !key.endsWith('_service'))
    {
        continue
    }

    const value = global.configuration[key];

    if (isObject(value) && isObject(value.http) && value.http.host && value.http.port)
    {
        global.address_book[key] = `http://${value.http.host}:${value.http.port}`
        global.address_ssl_book[key] = `https://${value.http.host}:${value.http.port}`
    }
}
// console.log("address_book,",address_book);
global.wait_for_stores = function(stores, then)
{
    return Promise.all(stores.map(
                store =>{
                    const ready=store.ready||store.default.ready;
                    return ready()
                }
            )
        )
        .then(then)
        .catch((error) =>
        {
            console.log("error,",error);
            process.exit(1)
        })
}