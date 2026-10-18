// Tiny event bus between chrome (rail, tab bar, search) and the sheet controller.
export const openSearch = () => window.dispatchEvent(new CustomEvent("search:open"));
export const openSheet = (slug: string) => window.dispatchEvent(new CustomEvent("sheet:open", { detail: slug }));
