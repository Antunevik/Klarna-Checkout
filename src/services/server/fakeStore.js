import { clearCookie } from 'express/lib/response';
import fetch from 'node-fetch';

async function getItemById(id) {
	const response = await fetch(`https://fakestoreapi.com/products/${id}`);

	if (response.ok) {
		const product = await response.json();
		return product;
	} else {
		console.error('Error ', response.statusText, response.status);
		throw new Error('500 error, Fake store api is not working');
	}
}

async function getCartById(id) {
	const response = await fetch(`https://fakestoreapi.com/carts/${id}`);
	if (response.ok) {
		const cart = await response.json();
		return cart;
	} else {
		console.error('Error ', response.statusText());
		throw new Error('500 error!, Fake store API is not working.');
	}
}

async function getProductsFromCart(cart) {
	const { products } = cart;
	const response = await fetch('https://fakestoreapi.com/products');
	if (response.ok) {
		const productsFromDb = await response.json();
		const productsFromCart = [];
		//productFromCart fylla den med produkter
		products.forEach((product) => {
			const foundProduct = productsFromDb.find((element) => element.id === product.productId);
			console.log(foundProduct);
			if (foundProduct) {
				productsFromCart.push({ product: foundProduct, quantity: product.quantity });
			}
		});
		return productsFromCart;
	} else {
		console.error('Error ', statusText);
		throw new Error('500 error!, Fake store API is not working');
	}
}

module.exports = { getItemById, getCartById, getProductsFromCart };
