export class Utils {
    public static copyToClipboard(text:string) {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        input.parentNode.removeChild(input);
    }
}