const bcrypt = require('bcrypt');

const { getByNameCustomer } = require('../models/customer');
const { getByNameUser } = require('../models/user');
const { getByIdRole } = require('../models/role');

const { createTokenAdmin } = require('../auth/admin');
const { createTokenWeb } = require('../auth/web');

const loginWeb = async(username, password) => {
    const [customer] = await getByNameCustomer(username);
    const [role] = await getByIdRole(customer.role_id);
    const isValid = bcrypt.compare(password, customer.password);
    if (isValid) {
        const token = createTokenWeb(customer.username, role.name);
        return token;
    }
};

const loginAdmin = async(username, password) => {
    const [user] = await getByNameUser(username);
    const [role] = await getByIdRole(user.role_id);
    const isValid = bcrypt.compare(password, user.password);
    if (isValid) {
        const token = createTokenAdmin(user.username, role.name);
        return token;
    }
};

module.exports = {
    loginAdmin,
    loginWeb,
};