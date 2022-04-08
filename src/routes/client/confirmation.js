const app = require('../../loaders/express-handlebars');
const { retrieveOrder } = require('../../services/server/klarna');

app.get('/confirmation', async function (req, res, next) {
	const order_id = req.query.order_id;
	console.log(order_id);
	const klarnaJsonResponse = await retrieveOrder(order_id);
	const html_snippet = klarnaJsonResponse.html_snippet;
	res.render('confirmation', {
		klarna_confirmation: html_snippet
	});
});
//453b9951-f7ad-6f9b-9d65-d74f027362b6
module.exports = app;
