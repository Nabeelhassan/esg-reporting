export default function roundToDecimal(num, decimal) {
	return Math.round((num + Number.EPSILON) * decimal) / decimal;
}
