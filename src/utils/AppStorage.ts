function AppStorage() {

  function set(key: string, value: any) {
    window?.localStorage?.setItem(key, btoa(unescape(encodeURIComponent(value))));
  }

  function get(key: string) {
    const value = window?.localStorage?.getItem(key);
    return value ? decodeURIComponent(escape(window.atob(value))) : 'null';
  }

  function remove(key: string) {
    window?.localStorage?.removeItem(key);
  }

  return { set, get, remove };
}

export default AppStorage();