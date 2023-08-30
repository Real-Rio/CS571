const SALES_TAX = {
	AL: 0.040,
	AK: 0.000,
	AZ: 0.056,
	AR: 0.065,
	CA: 0.073,
	CO: 0.029,
	CT: 0.064,
	DE: 0.000,
	DC: 0.060,
	FL: 0.060,
	GA: 0.040,
	HI: 0.040,
	ID: 0.060,
	IL: 0.063,
	IN: 0.070,
	IA: 0.060,
	KS: 0.065,
	KY: 0.060,
	LA: 0.045,
	ME: 0.055,
	MD: 0.060,
	MA: 0.063,
	MI: 0.060,
	MN: 0.069,
	MS: 0.070,
	MO: 0.042,
	MT: 0.000,
	NE: 0.055,
	NV: 0.069,
	NH: 0.000,
	NJ: 0.066,
	NM: 0.051,
	NY: 0.040,
	NC: 0.048,
	ND: 0.050,
	OH: 0.058,
	OK: 0.045,
	OR: 0.000,
	PA: 0.060,
	RI: 0.070,
	SC: 0.060,
	SD: 0.045,
	TN: 0.070,
	TX: 0.063,
	UT: 0.061,
	VT: 0.060,
	VA: 0.053,
	WA: 0.065,
	WV: 0.060,
	WI: 0.050,
	WY: 0.040,
}

function roundMoney(num) {
	return Math.round(num * 100) / 100;
}

function calculateSubtotal() {
	const bagelQuantity = parseInt(document.getElementById("bagelQuantity").value);
	const donutQuantity = parseInt(document.getElementById("donutQuantity").value);
	const muffinQuantity = parseInt(document.getElementById("muffinQuantity").value);
	const pieQuantity = parseInt(document.getElementById("pieQuantity").value);
	const cakeQuantity = parseInt(document.getElementById("cakeQuantity").value);
	// ... you do the rest!
	// don't forget to return the sum you calculate!
	return bagelQuantity * 1.5 + donutQuantity * 1 + muffinQuantity * 2 + pieQuantity * 4.5 + cakeQuantity * 7;
}

function calculateSalesTax() {
	// don't forget to use the SALES_TAX object and roundMoney function!
	// don't forget to return the tax you calculate!
	const state = document.getElementById("stateTax").value;
	const sumprice = calculateSubtotal();
	return roundMoney(sumprice * SALES_TAX[state]);
}

document.getElementById("btnSubtotal").addEventListener("click", () => {
	alert("Your subtotal is: $" + calculateSubtotal());
});

document.getElementById("btnSalesTax").addEventListener("click", () => {
	alert("Your sales tax is: $" + calculateSalesTax());
});

// add an event listener for the checkout button!
document.getElementById("btnCheckout").addEventListener("click", () => {
	alert("Your total is: $" + roundMoney(calculateSubtotal() + calculateSalesTax()));
});