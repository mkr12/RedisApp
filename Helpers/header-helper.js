"use strict";

class HeaderHelper {
    getJWTToken(header) {
        if (!header || !header.startsWith('Bearer ')) {
            return '';
        }

        let splitted = header.split(' ');
        if (splitted.length !== 2) {
            return '';
        }

        return splitted[1];
    }
}

module.exports = HeaderHelper;