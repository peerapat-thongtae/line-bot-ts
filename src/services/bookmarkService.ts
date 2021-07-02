import axios from 'axios';

const BOOKMARK_API = 'https://f05cf22fe458.ngrok.io/api';
export const getBookmarks = async () => {
  try {
    const bookmarks = await axios.get(`${BOOKMARK_API}/bookmark`);
    console.log(bookmarks);
    return bookmarks.data;

  } catch(e) {
    return e;
  }
}