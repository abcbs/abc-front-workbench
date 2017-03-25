export default class Memory_store
{
	products = new Map();

	// const rowProducts=require('./demo-data').rowProducts4;

	ready()
	{
		return Promise.resolve()
	}

	async list(product, page)
	{
		return require('./demo-data').rowProducts4;
	}

}