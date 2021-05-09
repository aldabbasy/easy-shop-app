import React from 'react';

type userType = {
  user_name: string;
  user_role: number;
  cart_items_count: number;
  refetchUserData?: () => Promise<any>;
}

const initialData: userType = {
  user_name: '',
  user_role: 0,
  cart_items_count: 0
};

const UserContext = React.createContext(initialData);
export const UserProvider = UserContext.Provider;

export default UserContext;
