export class Store {
    private subscribers: Function[];
    private reducers: { [key: string]: Function};
    private state: { [key: string]: any};

    constructor(reducers = {}, initialState = {}) {
        this.subscribers = [];
        this.reducers = reducers;
        this.state = initialState;
        this.state = this.reduce(this.state, initialState);
    }

    get value() {
        return this.state;
    }

    subscribe(fn) {
        this.subscribers = [...this.subscribers, fn];
        this.notify()
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== fn);
        }
    }

    private notify() {
        this.subscribers.forEach(fn => fn(this.value))
    }

    dispatch(action: any) {
        //Add new todo
        this.state = this.reduce(this.state, action);
        this.notify();
    }

    private reduce(state, action) {
        const newState = {}
        for(const property in this.reducers) {
            newState[property] = this.reducers[property](state[property], action)
        }
        return newState;
    }
}