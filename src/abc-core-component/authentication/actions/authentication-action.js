import {authenication_manager_url} from '../../../abc-framework/routeres/ModuleURL'
export const LOAD = 'Authentication/Client/LOAD'
export const getAuthenications = () =>
    ({
        promise : async http =>
        {
            const user_ids = await http.get(authenication_manager_url)
            return Promise.all(user_ids.map(id => http.get(authenication_manager_url+`/${id}`)))
        },
        events: ['retrieving authenication', 'authenication retrieved', 'authenication retrieval failed']
    })

export const addAuthenication = (info) =>
    ({
        promise: http => http.post(authenication_manager_url, info),
        events: ['adding authenication', 'authenication added', 'adding authenication failed']
    })

export const removeAuthenication = (id) =>
    ({
        promise: http => http.delete(authenication_manager_url+`/${id}`),
        events: ['deleting authenication', 'authenication deleted', 'deleting user failed']
    })

export const renameAuthenication = () =>
    ({
        promise: http => http.patch(authenication_manager_url+`/${id}`),
        events: ['renaming authenication', 'user authenication', 'renaming authenication failed']
    })


/**
 * Simulates data loaded into this reducer from somewhere
 */
export const simulateAuthenicationData = data => ({ type: LOAD, data })
