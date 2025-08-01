export function encodeLite(queryString:string){
	return `${queryString
		.replaceAll("&", "%26")
		.replaceAll("+", "%2B")
		.replaceAll("/", "%2F")
    }`;
}