export default () => ({
	port: parseInt(process.env.PORT) || 3000,
	midtrans: {
		server_key: process.env.MIDTRANS_SERVER_KEY,
		client_key: process.env.MIDTRANS_CLIENT_KEY
	},
	jwt: {
		secret: process.env.JWT_KEY
	}
})
