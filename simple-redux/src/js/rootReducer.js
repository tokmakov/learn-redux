export function rootReducer(state, action) {
    const newState = { ...state };
    switch (action.type) {
        case 'PLUS':
            newState.count++;
            return newState;
        case 'MINUS':
            newState.count--;
            return newState;
        case 'RESET':
            newState.count = 0;
            return newState;
        default:
            return newState;
    }
}
