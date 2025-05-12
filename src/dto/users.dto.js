import crypto from 'crypto';
import { createHash } from '../helpers/hash.helper.js';
const { PERSISTENCE } = process.env;


class UserDTO {
    constructor(user) {

        if( PERSISTENCE !== 'mongo') {
            this._id = crypto.randomBytes(12).toString('hex')
            this.createdAt = new Date().toISOString()
            this.updatedAt = new Date().toISOString()
        }

        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.date = user.date;
        this.email = user.email;
        this.password = createHash(user.password);
        this.role = user.role || "USER";
        this.avatar = user.avatar || "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png";
        this.isGoogleUser = user.isGoogleUser || false;
        this.active = user.active || true;
    
    }
}

export default UserDTO;