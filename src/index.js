const calculate = function(num, base, factor) {
    var sum = 0;
    while(num / base >= 1) {
        sum += Math.floor(num / base);
        base *= factor;
    }
    return sum;
}

const fact = function(num, suffix) {
	var two = 0, five = 0;
	if(suffix === "!") {
		two = calculate(num, 2, 2);
		five = calculate(num, 5, 5);
	} else if(num%2 === 0) {
		two = calculate(num, 2, 2);
		five = calculate(num, 10, 5);
	} else {
		two = 0;
		five = calculate(num, 5, 5) - calculate(num, 10, 5);
	}
	
	return {"two" : two, "five" : five};
}

module.exports = function zeros(expression) {
	var two = 0, five = 0;
	expression.split("*").forEach(function(el){
		var res;
		if(el.endsWith("!!")) {
			res = fact(parseInt(el.slice(0, -2)), "!!");
		} else {
			res = fact(parseInt(el.slice(0, -1)), "!");
		}		
		two += res.two;
		five += res.five;
	});
	
	return Math.min(two, five);
}
