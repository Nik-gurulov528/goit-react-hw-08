import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;

export const selectLoading = state => state.contacts.loading;

export const selectError = state => state.contacts.error;

export const selectStatus = state => state.contacts.status;

export const selectChangingItem = state => state.contacts.changingItem;

export const selectIsChanging = state => state.contacts.isChanging;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (arrayContacts, filterStr) => {
    if (!Number.parseInt(filterStr[0])) {
      return arrayContacts.filter(item => {
        return item.name.toLowerCase().includes(filterStr.toLowerCase());
      });
    } else {
      return arrayContacts.filter(item => {
        return item.number.includes(filterStr);
      });
    }
  }
);
