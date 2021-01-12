export const updateState = (oldState, updatedValues) => {
    return {
         ...oldState,
         ...updatedValues
         }
};
