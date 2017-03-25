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
	api.get('/orderlist', pets.list);
	api.get('/ordermananer/:name', pets.show);
}