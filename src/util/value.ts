export function isValueSet(v: any): boolean {
	return v !== null && v != undefined;
}
export function isSetAndFilled(v: string): boolean {
	return v !== null && v != undefined && v.length > 0;
}
