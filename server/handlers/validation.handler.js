class ValidationHandler {
	static get EMAIL_REGEX() {
		return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
    }

    static regex(value, reg) {
        if (value !== '') {
            if (reg.test(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static isEmail(value) {
        if (value !== '') {
            if (ValidationHandler.EMAIL_REGEX.test(value)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static testInput(data) {
        data = data.trim();
        data = ValidationHandler.stripslashes(data);
        data = ValidationHandler.htmlspecialchars(data);
        return data;
    }

    static stripslashes(str) {
        str = str.replace(/\\'/g, '\'');
        str = str.replace(/\\"/g, '"');
        str = str.replace(/\\0/g, '\0');
        str = str.replace(/\\\\/g, '\\');
        return str;
    }

    static htmlspecialchars(str) {
        const MAP = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };

        return str.replace(/[&<>"']/g, (m) => MAP[m]);
    }
}

module.exports = ValidationHandler;
