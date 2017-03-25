import { errors } from 'web-service'

export default function(api)
{
	const users = new Map()

	let id_counter = 0
	//
	const simpledata={
		"authName": "公开测试部分北京区代理数据支付部分",
		"authCode": "110105100016",
		"authDecript": "朝阳测试，三月使用期"
	}

	users.set(id_counter++, simpledata)

	api.get('/authenticationmanager/authentication', function()
	{
		return Array.from(users.values())
	})

	api.get('/authenticationmanager/authentication/:id', function({ id })
	{
		if (!users.has(id))
		{
			throw new errors.Not_found(`Authentication ${id} not found`)
		}
		
		return { ...users.get(id), id: id }
	})

	api.post('/authenticationmanager/authentication', function(data)
	{
		console.info("authentication,",data)
		if (!data.authName||!data.authCode)
		{
			throw new errors.Input_rejected(`"authName" not specified`)
		}

		id_counter++
		const id = String(id_counter)
		users.set(id, data)
		return id
	})

	api.patch('/authenticationmanager/authentication/:id', function({ id, name })
	{
		// throw new Error(123)

		if (!users.has(id))
		{
			throw new errors.Not_found(`Authentication ${id} not found`)
		}

		users.get(id).name = name
	})

	api.delete('/authenticationmanager/Authentication/:id', function({ id })
	{
		if (!users.has(id))
		{
			throw new errors.Not_found(`Authentication ${id} not found`)
		}
		
		users.delete(id)
	})

	api.post('/authenticationmanager/Authentication/:authentication_id/picture', function({ user_id, id, sizes })
	{
		if (!users.has(authentication_id))
		{
			throw new errors.Not_found(`Authentication ${authentication_id} not found`)
		}
		users.get(authentication_id).picture = { id, sizes }
	})
}