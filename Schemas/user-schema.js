module.exports = {
	schema: {
		"properties": {
			"firstName": {
				"id": "/properties/FirstName",
				"type": "string",
				"minLength": 3
			},
			"lastName": {
				"id": "/properties/LastName",
				"type": "string",
				"minLength": 3
			},
			"age": {
				"id": "/properties/age",
				"type": "integer",
				"minimum": 0,
				"maximum": 100
			},
			"address": {
				"id": "/properties/Address/",
				"type": "object",
				"properties": {
					"street": {
						"id": "/properties/address/Street",
						"type": "string",
						"minLength": 1
					},
					"homeNumber": {
						"id": "/properties/address/HomeNumber",
						"type": "string",
						"minLength": 1
					},
					"postcode": {
						"id": "/properties/address/Postcode",
						"type": "integer",
						"minimum": 10000,
						"maximum": 99999
					},
					"city": {
						"id": "/properties/address/City",
						"type": "string",
						"minLength": 1
					}
				},
				"additionalProperties": false,
				"required": ["street", "postcode", "homeNumber", "city"]
			}
		},
		"type": "object",
		"additionalProperties": false,
		"required": ["firstName", "lastName", "age", "address"]
	}
}
