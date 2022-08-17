export function createStore(rootReducer, initState) {
    let state = rootReducer(initState, { type: 'INIT' });
    const subsribers = [];
    return {
        dispatch(action) {
            state = rootReducer(state, action);
            subsribers.forEach(callback => callback());
        },
        subscribe(callback) {
            subsribers.push(callback);
        },
        getState() {
            // возвращаем копию объекта хранилища, чтобы вызывающий
            // код не мог случйно изменить объект прямым доступом
            return { ...state };
        },
    };
}
