import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage, MessageAPIResponseBase, FlexBubble, FlexMessage } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as BookmarkService from '../../src/services/bookmarkService';
import * as MovieService from '../../src/services//TMDB/movieService';
import * as TVService from '../../src/services//TMDB/tvService';
import { cardMedia } from '../../src/utils/messageHelper';
import { getMoviePopular, sendMedia, sendText } from '../utils/handleTextHelper';
import { getJobsBlognone, getJobsDB, getJobThai } from '../services/Scraping/JobService';
import { JobInterface } from '../models/JobModel';

export const textEventHandler = async (event: WebhookEvent , client:Client): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  console.log(event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;
  const { text } = event.message;
  
  switch(text) {
    case "movie popular":
      await getMoviePopular(replyToken , client);
      break;
    case "trending movie day" :
      const trending = await MovieService.trendingMovieDay();
      await sendMedia(replyToken , client , trending);
    case "trending tv day" :
      const trendingTV = await TVService.trendingTVDay();
      await sendMedia(replyToken , client , trendingTV);
    case "job jobthai" :
      const jobthai:Array<JobInterface> = await getJobThai();
      await sendText<JobInterface>(replyToken , client , jobthai);
    case "job jobsdb" : 
      const jobsdb:Array<JobInterface> = await getJobsDB();
      await sendText<JobInterface>(replyToken , client , jobsdb);
    case "job jobsblognone" : 
      const jobsblognone:Array<JobInterface> = await getJobsBlognone();
      await sendText<JobInterface>(replyToken , client , jobsblognone);
    default:
      // code block
  }
  // if(text === 'movie popular') {
    
  // }


  return;
  
};