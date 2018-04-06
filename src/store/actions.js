export const TYPES = {
    UPDATE_CURRENT_PAGE: 'UPDATE_CURRENT_PAGE',
    REMOVE_NOTIFICATION: 'REMOVE_NOTIFICATION',
    REMOVE_BOOK_TO_RATE: 'REMOVE_BOOK_TO_RATE'
}

export const actions = {
    updateCurrentPage: (newCurrentPage) => ({ type: TYPES.UPDATE_CURRENT_PAGE, newCurrentPage }),
    removeNotification: (notificationToRemoveID) => ({ type: TYPES.REMOVE_NOTIFICATION, notificationToRemoveID }),
    removeBookToRate: () => ({ type: TYPES.REMOVE_BOOK_TO_RATE })
}
