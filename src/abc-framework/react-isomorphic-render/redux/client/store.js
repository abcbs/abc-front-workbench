import { reduxReactRouter } from 'redux-router'
//同Server端的不同
//import { reduxReactRouter } from 'redux-router/server'
import createHistory from 'history/lib/createBrowserHistory'
import create_store from '../store-main'

//store中添加路由、访问历史第三方中间，并把应用的reduce和设置传入到store处理函数
export default function create_store_on_client(get_reducer, settings)
{
	return create_store(reduxReactRouter, createHistory, get_reducer, settings);
}