import { createSelector } from 'reselect'

const selectEntry = state => state.clock

export const selectCurrentEntry = createSelector(
    [selectEntry],
    clock => clock.currentClock
)