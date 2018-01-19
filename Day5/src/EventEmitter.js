//@flow

//Let's use map and set instead of plain object
//Three ways to delete event listener
// 1. return removal function in addListener
// 2. add method for deleting listener in eventList
// 3. cancel the setTimeout() event with cancelTimeout()

// Instead of creating another map inside the map,
// You could just use another map to link the id of an event listener
// with it's remover function which will be created together with the event
// listener.

// That way, you don't have to do nested loop of something similar to check
// the id inside.

type EventList = Set<Function>;
type EventMap = Map<string, EventList>;
type RemoverList = Map<string, () => void>;
type CallbackFn = () => void;

class EventEmitter {
  listenerID = Math.random().toString(10);
  events: EventMap = new Map();
  removers: RemoverList = new Map();
  addListener(eventName: string, eventHandler: CallbackFn) {
    let eventList = this.events.get(eventName);
    if (eventList == null) {
      eventList = new Set();
      this.events.set(eventName, eventList);
    }
    eventList.add(eventHandler);
    this.removers.set(this.listenerID, () => {
      if (eventList) {
        eventList.delete(eventHandler);
      }
    });

    return this.listenerID;
  }

  removeListenerByID(id: string) {
    let remover = this.removers.get(id);
    if (remover) {
      remover();
    }
  }

  emit(eventName: string) {
    let eventList = this.events.get(eventName);
    if (eventList) {
      eventList.forEach((listener) => {
        listener();
      });
    }
  }
}

export default EventEmitter;

// let emitter = new EventEmitter();
//
// emitter.addListener('user_logout', () => {
//   console.log('Bye-bye');
// });
// emitter.addListener('user_logout', () => {
//   console.log('And dont even bother coming back');
// });
//
// emitter.emit('user_logout');
