import routes  from '../routeres/Routes'
import wrapper from './wrapper'
// import reducer from '../reducers'
// import reducer from '../../todos/reducers/index'
// import clientMiddleware from '../middleware/clientMiddleware'

// import Client from './Client'
export default
{

  reducer:() => require('../reducers/reducerindex'),

  routes,

  wrapper,
  authentication_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8",
  // redux_middleware:() => [clientMiddleware],
  authentication:{
    header:"Abc-Endpoint"
  },
  on_store_created({ reload_reducer })
  {

    if (__DEVTOOLS__ && module.hot)
    {
      module.hot.accept('../reducers', reload_reducer)
    }
  }
}

