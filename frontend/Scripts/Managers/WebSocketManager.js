import ApiManager from "./ApiManger.js";
import LoginElement from "../DynamicElements/Elements/LoginElement.js";
import DataManager from "./DataManager.js";
import HolderElement from "../DynamicElements/Elements/HolderElement.js";
import FormManager from "./FormManager.js";
import MenuElement from "../DynamicElements/Elements/MenuElement.js";
import BreakManager from "./BreakManager.js";
import ClockManager from "./ClockManager.js";

export default class WebSocketManager {
    static ws = null;
  
    // Initialize the WebSocket connection
    static connect() {
      this.ws = new WebSocket(`wss://delegateubackend.azurewebsites.net`);
  
      this.ws.onopen = () => {
        console.log('WebSocket connection opened');
        // Automatically join a group after connection, if needed
        this.joinGroup(ApiManager.idDiningGroup);
      };
  
      this.ws.onmessage = (event) => {
        console.log('Message received from server:', event.data);
        const data = JSON.parse(event.data);
        const requestInfo = data.requestInfo;
        if(requestInfo !== undefined) {
            switch(requestInfo.requestType) {
                case 'POST':
                    DataManager.addDatasetToLocalCollection(requestInfo.route, data.message);
                    FormManager.clearFormCollection();
                    FormManager.clearFormDataset();
                    break;
                case `PATCH`:
                    DataManager.updateDatasetOfLocalCollection(requestInfo.route, data.message._id, data.message);
                    FormManager.clearFormDataset();
                    break;
                case 'DELETE':
                    DataManager.deleteDatasetFromLocalCollection(requestInfo.route, data.message._id);
                    break;
            }
            if(document.querySelector('.focus') !== null){
              return;
            }
            if(MenuElement.tabType === 'break'){
              BreakManager.onPersonBreak();
            }
            const elementBodyHolder = document.getElementById('body');
            HolderElement.mechanicHolder(elementBodyHolder);
            return;
        }
        console.log(data.message);
        // Handle incoming messages based on message content
        // For example, update UI or process data
      };
  
      this.ws.onclose = (event) => {
        console.log('WebSocket connection closed:', event.reason);
        // Handle the connection closing
        clearInterval(ClockManager.intervalId);
        LoginElement.mechanicLogin();
      };
  
      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        // Handle errors
      };
    }
  
    // Method to send a message to the server
    static sendMessage(action, data = {}) {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ action, ...data });
        this.ws.send(message);
        console.log('Message sent:', message);
      } else {
        console.error('WebSocket is not open. ReadyState:', this.ws.readyState);
      }
    }
  
    // Method to join a group
    static joinGroup(groupId) {
      this.sendMessage('join', { groupId });
    }
  
    // Method to leave a group (if needed)
    static leaveGroup(groupId) {
      this.sendMessage('leave', { groupId });
    }
  
    // Method to close the WebSocket connection
    static disconnect() {
      if (this.ws) {
        this.ws.close();
        this.ws = null;
        console.log('WebSocket connection closed');
        LoginElement.mechanicLogin();
      }
    }
}
  
  