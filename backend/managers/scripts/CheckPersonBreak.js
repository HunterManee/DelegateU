const {parentPort} = require('worker_threads');

  
parentPort.on('message', (data) => {
    if(data.message === 'breakCollection'){
        parentPort.postMessage(data);
    }else if(data.message === "CheckBreakCollection") {
        const breakCollection = data.breakCollection;
        const incompleteBreaks =
        breakCollection.filter(Break => Break.completed === false);
        const currentDate = new Date();
        for(const incompleteBreak of incompleteBreaks) {
            const breakEnd = new Date(incompleteBreak.end);
            if(breakEnd > currentDate) {continue};
            const breakStart = new Date(incompleteBreak.start);
            parentPort.postMessage({
                message: "BreakCompleted",
                breakId: incompleteBreak._id,
                personId: incompleteBreak.personId,
                breakStart: breakStart,
                groupId: data.groupId
            })
        }
        return;
    }else if(data.message === 'NotifyOfBreakCompletion') {
        const days = {
            0:'sun', 1:'mon', 2:'tue', 3:'wed', 4:'thu', 5:'fri', 6:'sat'
        }
        const day = days[data.breakStart.getDay()];
        parentPort.postMessage({
            message: "NotifyPersonOfBreakCompletion",
            day: day,
            personId: data.personId,
            groupId: data.groupId
        })
    }
})
