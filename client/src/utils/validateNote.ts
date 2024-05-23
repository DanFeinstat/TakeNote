export default function validateNote(content: string) {
    if (content.length < 20 || content.length > 300) {
        return `Note must be between 20 and 300 characters, but is ${content.length} characters long`;
    }
    return null;
};