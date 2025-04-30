type IdObject = { id: string };

export function findIndex(arr: IdObject[], obj: IdObject): number {
	return arr.findIndex((item) => item.id === obj.id);
}
