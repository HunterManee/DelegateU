const { Worker } = require('worker_threads');
const axios = require('axios');
const axiosRetry = require('axios-retry').default;

axiosRetry(axios, { retries: 3, retryDelay: axiosRetry.exponentialDelay });

class WorkerManager {
    constructor() {
        this.workers = {
            breakWorker: this.createWorker('./managers/scripts/CheckPersonBreak.js')
        };
    }

    createWorker(scriptPath) {
        const worker = new Worker(scriptPath);
        worker.on('message', this.handleWorkerMessage.bind(this, worker));
        worker.on('error', this.handleWorkerError.bind(this, worker));
        return worker;
    }

    handleWorkerMessage(worker, data) {
        // Handle messages from workers
        try {
            if (data.message === "breakCollection") {
                this.handleBreakCollection(worker, data);
            } else if (data.message === "BreakCompleted") {
                this.handleBreakCompleted(worker, data);
            } else if (data.message === "NotifyPersonOfBreakCompletion") {
                this.notifyPersonOfBreakCompletion(data);
            }
        } catch (error) {
            console.error('Error handling worker message:', error);
        }
    }

    async handleBreakCollection(worker, data) {
        try {
            const breakCollection = await axios.get(`https://delegateubackend.azurewebsites.net/breaks?groupId=${data.groupId}`);
            worker.postMessage({
                message: "CheckBreakCollection",
                groupId: data.groupId,
                breakCollection: breakCollection.data
            });
        } catch (error) {
            console.error('Error fetching break collection:', error);
        }
    }

    async handleBreakCompleted(worker, data) {
        try {
            const body = { completed: true };
            await axios.patch(`https://delegateubackend.azurewebsites.net/breaks/${data.breakId}?groupId=${data.groupId}`, body);
            worker.postMessage({
                message: "NotifyOfBreakCompletion",
                personId: data.personId,
                breakStart: data.breakStart,
                groupId: data.groupId,
            });
        } catch (error) {
            console.error('Error marking break as completed:', error);
        }
    }

    async notifyPersonOfBreakCompletion(data) {
        try {
            const body = {};
            body[`${data.day}BreakStatus`] = 'Had';
            await axios.patch(`https://delegateubackend.azurewebsites.net/people/${data.personId}?groupId=${data.groupId}`, body);
        } catch (error) {
            console.error('Error notifying person of break completion:', error);
        }
    }

    handleWorkerError(worker, error) {
        console.error('Worker error:', error);
    }

    assignTask(workerType, task) {
        const worker = this.workers[workerType];
        if (worker) {
            worker.postMessage(task);
        } else {
            console.error(`No worker found for type: ${workerType}`);
        }
    }
}

module.exports = WorkerManager;
