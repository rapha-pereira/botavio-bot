/**
 * Represents a BotavioQueue.
 * @class
 */
class BotavioQueue {
  /**
   * Creates an instance of BotavioQueue.
   * @constructor
   */
  constructor() {
    this.lockService = LockService.getScriptLock();
  }

  /**
   * Checks if the queue is free.
   * @returns {boolean} Returns true if the queue is free, false otherwise.
   */
  isFreeQueue() {
    const freeQueue = this.lockService.tryLock(30000);

    if (!freeQueue) {
      return false;
    }

    return true;
  }

  /**
   * Releases the queue lock.
   * @returns {boolean} Returns true if the queue lock is successfully released.
   */
  releaseQueue() {
    this.lockService.releaseLock();
    return true;
  }
}
