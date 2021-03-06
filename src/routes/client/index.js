const app = require('../../loaders/express-handlebars');
const { createOrder } = require('../../services/server/klarna');
// const { getItemById } = require('../../services/server/fakeStore');

app.get('/checkout/:product_id', async function (req, res, next) {
	try {
		const { product_id } = req.params;
		const product = await getItemById(product_id);
		const products = [{ product, quantity: 1 }];
		const klarnaJsonResponse = await createOrder(products);
		const html_snippet = klarnaJsonResponse.html_snippet;
		console.log('Order id: ', klarnaJsonResponse.order_id);
		res.render('checkout', { klarna_checkout: html_snippet });
	} catch (error) {
		res.send(error.message);
	}
});

module.exports = app;
