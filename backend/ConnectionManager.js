

class ConnectionManger {
    static #ClientGroupConnection = {};
    static #GroupLoginData = {};

    static addClientGroupConnection(groupId, clusterConnection) {
        this.#ClientGroupConnection[groupId] = {
            'connection': clusterConnection,
            'clients': new Array()
        }
    }

    static addGroupLoginData(username, groupId, hashedPassword) {
        this.#GroupLoginData[username] = {
            'groupId': groupId,
            'hashedPassword': hashedPassword
        }
    }

    static getClientGroupConnection(groupId) {
        return this.#ClientGroupConnection[groupId];
    }

    static getGroupLoginData(username) {
        return this.#GroupLoginData[username];
    }
}

module.exports = ConnectionManger;