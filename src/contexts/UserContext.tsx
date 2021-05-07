import React from 'react';

type userType = {
  user_name: string;
  user_role: string;
  cart_items_count: number;
  refetchUserData?: () => Promise<any>;
}

const initialData: userType = {
  user_name: '',
  user_role: '',
  cart_items_count: 0
};

const UserContext = React.createContext(initialData);
export const UserProvider = UserContext.Provider;

export default UserContext;
