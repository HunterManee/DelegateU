const WebSocket = require('ws');

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

    static addClientToGroup(groupId, ws) {
        if (this.#ClientGroupConnection[groupId]) {
            this.#ClientGroupConnection[groupId].clients.push(ws);
            ws.on('close', () => this.removeClientFromGroup(groupId, ws));
            ws.on('error', () => this.removeClientFromGroup(groupId, ws));
        } else {
            console.error(`Group ID ${groupId} not found`);
        }
    }

    static removeClientFromGroup(groupId, ws) {
        if (this.#ClientGroupConnection[groupId]) {
            this.#ClientGroupConnection[groupId].clients = this.#ClientGroupConnection[groupId].clients.filter(client => client !== ws);
        }
    }

    static broadcastRequestToGroup(groupId, message, route, requestType) {
        const requestInfo = {requestType, route}
        if (this.#ClientGroupConnection[groupId]) {
            this.#ClientGroupConnection[groupId].clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ requestInfo, message })); // Send as JSON
                }
            });
        }
    }
}

module.exports = ConnectionManger;