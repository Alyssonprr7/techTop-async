const axios = require("axios")

class Controller {
	async index(request,response){
		const {id} = request.params;
		const fields = request.query.enrichFields;

		const filmRequest = await axios.get(`https://swapi.dev/api/films/${id}/`)
		if(!fields){
			return response.json(filmRequest.data)
		}

		let arrayFilter = fields.split(",")	

		await Promise.all(arrayFilter.map(async enrichFields=> {
			const itemRequest = await Promise.all(
				filmRequest.data[enrichFields].map(async item=>{
					 return axios.get(item)
				})
			); 

			const itemsArray = (itemRequest.map(filter=> {
				return filter.data
			}))
			filmRequest.data[enrichFields] = itemsArray
		}))


		return response.json(filmRequest.data)
	}
}


module.exports = Controller