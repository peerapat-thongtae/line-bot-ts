import axios from 'axios';
import express from 'express';

export const getJobThai = async () => {
  try {
    const data = await axios.get(`${process.env.SCRAPING_URL}/job/jobthai`);
    return data.data;
  } catch(e) {
    return e;
  }
  
}