var { graphql, buildSchema} = require('graphql')

var schema = buildSchema(
	`type Query {
		addString(str1: String!, str2: String!): String!
		random(min: Int!, max: Int!): Int!
	}`
)

var rootValue = {
	addString: ({str1, str2}) => {
		return str1 + str2
	},
	random: ({min, max}) => {
		return Math.floor(Math.random() * (max-min) + min)
	}
}

graphql({
	schema,
	source: 'query { addString(str1:"Hello", str2:"World") }',
	rootValue
}).then((response) => {
	console.log(response.data)
})

graphql({
	schema,
	source: 'query { random(min:1, max:3) }',
	rootValue
}).then((response) => {
	console.log(response.data)
})

