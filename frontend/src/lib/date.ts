export const HumanReadableDate = (date: any) => {
    return new Date(date).toLocaleDateString()
};