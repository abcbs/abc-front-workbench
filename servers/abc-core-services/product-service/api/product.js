import { http, errors } from 'web-service'
import moment from 'moment'

import store from '../store/store'

export default function(api)
{
	var db = {
    tobi: { name: 'tobi', species: 'ferret' },
    loki: { name: 'loki', species: 'ferret' },
    jane: { name: 'jane', species: 'ferret' }
	};

	var pets = {
		list: async function (){
			var names = Object.keys(db);
			return  'pets: ' + names.join(', ');
		},

		show: async function (name){
			var pet = db[name];
			if (!pet) return this.throw('cannot find that pet', 404);
			return  pet.name + ' is a ' + pet.species;
		}
	};
	//
	// api.get('/productlist', pets.list);
	/**
	 * 查询固定条件
	 * 		orderType:查询排序类型，日期，日期倒排
	 *
	 * 查询固定格式,
	 * 		module：查询属于哪个模块,
	 * 		func:功能点,
	 * 		pageClientCurrent:客户端是多少页，
	 * 		pageServerCurrent:服务端目前是多少页
	 * 		pageNumber:每页多少行,
	 * 		queryClientTimestamp：客户端查询时间戳
	 * 		total:总共多少行
	 *
	 */
	api.get('/productlist', async function({ queryConditaion }, {module,func, pageClientCurrent,
		pageServerCurrent, pageNumber,queryClientTimestamp,total}){
		const page={
			pageClientCurrent:pageClientCurrent,
			pageServerCurrent:pageServerCurrent,
			pageNumber:pageNumber,
			queryClientTimestamp:queryClientTimestamp,
			total:total
		};
		const pruductQueryCondation=queryConditaion;
		const products = await store.list(pruductQueryCondation,page);
		return products;
	});

	api.get('/productmananer/:name', pets.show);
}