export function encodeLite(queryString:string){
	return `${queryString
		.replaceAll("&", "%26")
		.replaceAll("+", "%2B")
		.replaceAll("/", "%2F")
    }`;
}


export function allNumbersAndNoDuplicate(arr: (number|string)[]): number[]{
	const newNum = arr.map((num) => {
		if(typeof num === "string"){
			return Number(num);
		}
		return num;
	}).filter((num) => !isNaN(num));

	//Remove Duplicate
	const uniqueNum = new Set(newNum);
	return Array.from(uniqueNum).sort((a, b) => a - b);
}