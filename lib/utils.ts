export const cx = (...values:Array<string|false|null|undefined>) => values.filter(Boolean).join(" ");
export const formatInr = (value:number) => `₹${value.toLocaleString("en-IN")}`;
export const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
