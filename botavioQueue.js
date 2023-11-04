// Base class to handle multiple requests using Lock Service

class BotavioRequestsQueue {
  constructor(){
    this.lockService = LockService.getScriptLock();
  }

  isFreeQueue(){
    let freeQueue = this.lockService.tryLock(30000);
    
    if (!freeQueue){
      return false;
    }

    else{
      return true;
    }
  }

  releaseQueue(){
    this.lockService.releaseLock();
    return true;
  }
}
