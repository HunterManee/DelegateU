import HolderElement from './Elements/HolderElement.js';

import MenuListeners from './Listeners/MenuListeners.js';
import DisplayTypeListeners from './Listeners/DisplayTypeListeners.js';
import FormTypeListeners from './Listeners/FormTypeListeners.js';
import ObjectListeners from './Listeners/ObjectListeners.js';

import DateTimeManager from '../Managers/DateTimeManger.js';
import DataManager from '../Managers/DataManager.js';
import ClockManager from '../Managers/ClockManager.js';
import MenuElement from './Elements/MenuElement.js';
import LoginElement from './Elements/LoginElement.js';
import LoginListeners from './Listeners/LoginListeners.js';



const mutationCallBack = (mutationList) => {
    for(let mutation of mutationList){ 
        if(mutation.type === 'childList') {
            for(let addedNode of mutation.addedNodes){
                if(addedNode.classList !== undefined){
                    if(addedNode.classList.contains('page-tabs')) {
                        MenuListeners.setTabListeners(addedNode);
                    }else if(addedNode.classList.contains('display')){
                        const elementLayout = addedNode.parentNode;
                        if(elementLayout.classList.contains('header') === true) {
                            DisplayTypeListeners.setDisplayHeaderListeners(addedNode);
                            continue;
                        }
                        if(elementLayout.classList.contains('footer') === true) {
                            DisplayTypeListeners.setDisplayFooterListeners(addedNode);
                            continue;
                        }
                    }else if(addedNode.classList.contains('form')){
                        const elementLayout = addedNode.parentNode;
                        if(elementLayout.classList.contains('header') === true) {
                            FormTypeListeners.setFormHeaderListeners(addedNode);
                            continue;
                        }
                        if(elementLayout.classList.contains('body') === true) {
                            FormTypeListeners.setFormBodyListeners(addedNode);
                            continue;
                        }
                        if(elementLayout.classList.contains('footer') === true) {
                            FormTypeListeners.setFormFooterListeners(addedNode);
                            continue;
                        }
                    }else if(addedNode.classList.contains('object') === true ){
                            ObjectListeners.setObjectListeners(addedNode);
                            continue;
                    }else if(addedNode.classList.contains('route') === true) {
                        const elementLayout = addedNode.parentNode;
                        if(elementLayout.classList.contains('header') === true) {
                            MenuListeners.setRouteListeners(addedNode);
                            continue;
                        }
                    }else if(addedNode.classList.contains('new')) {
                        const elementLayout = addedNode.parentNode;
                        if(elementLayout.classList.contains('header') === true) {
                            MenuListeners.setNewListeners(addedNode);
                            continue;
                        }
                    }else if(addedNode.classList.contains('filter')) {
                        const elementLayout = addedNode.parentNode;
                        if(elementLayout.classList.contains('header') === true) {
                            MenuListeners.setFilterListeners(addedNode);
                            continue;
                        }
                    }
                    else if(addedNode.id === 'login-background') {
                        LoginListeners.setLoginListeners(addedNode);
                    }
                    else {
                        console.log(addedNode);
                    }
                }
            }
        }
    }
}

const observer = new MutationObserver(mutationCallBack);

const targetNode = document.body;
const config = {childList: true, subtree: true};
observer.observe(targetNode, config);


LoginElement.mechanicLogin();

// try{
//     await DataManager.getCollections();
//     MenuElement.setDefaultTab();
//     DateTimeManager.setWeekdayMap();
//     HolderElement.appendHolder('header', 1, 'menu');
//     HolderElement.appendHolder('body');
//     HolderElement.appendHolder('footer', 1, 'menu');
//     ClockManager.startClock();
// }catch(error){
//     console.error({message: error});
// }