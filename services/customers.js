const { v4: uuid } = require("uuid");
const { orderBy } = require("lodash");
let CUSTOMERS = require("../data/customer.json")

function getCustomers(filters) {
    const { limit, offset, sort, sortDir, dateStart, dateEnd, name, phone, email, status } = filters;

    let filtered = CUSTOMERS;

    if (name) {
        filtered = filtered.filter(customer => customer.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (phone) {
        filtered = filtered.filter(customer => customer.phone.toLowerCase().includes(phone.toLowerCase()));
    }

    if (email) {
        filtered = filtered.filter(customer => customer.email.toLowerCase().includes(email.toLowerCase()));
    }

    if (status) {
        filtered = filtered.filter(customer => customer.status === status);
    }

    if (dateStart) {
        filtered = filtered.filter(customer => new Date(customer.onboardedAt) >= new Date(dateStart));
    }

    if (dateEnd) {
        filtered = filtered.filter(customer => new Date(customer.onboardedAt) <= new Date(dateEnd));
    }

    if (sort) {
        if (sort === "balance") {
            filtered = orderBy(filtered, "balance.amount", sortDir);
        } else
            filtered = orderBy(filtered, sort, sortDir);
    }

    return {
        items: filtered.slice(Number.parseInt(offset), Number.parseInt(offset) + Number.parseInt(limit)),
        pagination: {
            offset: +offset,
            limit: +limit,
            total: filtered.length,
        },
    };

}

function createCustomer(customer) {
    const newCustomer = {
        ...customer,
        uuid: uuid(),
        status: "IN_REVIEW",
        actions: ["DELETE", "EDIT", "CLOSE"],
        balance: { amount: 0, currency: "USD" },
        onboardedAt: new Date().toISOString()
    };

    CUSTOMERS.push(newCustomer);
    return newCustomer;
}

function getCustomer(id) {
    return CUSTOMERS.find(customer => customer.uuid === id)
}

function deleteCustomer(id) {
    const customer = CUSTOMERS.find(customer => customer.uuid === id);

    CUSTOMERS.splice(CUSTOMERS.findIndex(customer => customer.uuid === id), 1,);
    return !!customer;
}

function updateCustomer(id, body) {
    const customer = CUSTOMERS.find(customer => customer.uuid === id);
    const index = CUSTOMERS.findIndex(customer => customer.uuid === id);

    const updatedCustomer = {
        ...customer, ...body,
    }

    CUSTOMERS[index] = updatedCustomer;

    return customer ? updatedCustomer : undefined;
}

module.exports = {
    getCustomers, createCustomer, getCustomer, deleteCustomer, updateCustomer
};