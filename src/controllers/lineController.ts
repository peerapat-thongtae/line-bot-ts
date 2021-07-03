import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage, MessageAPIResponseBase, FlexBubble, FlexMessage } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as BookmarkService from '../../src/services/bookmarkService';
import * as MovieService from '../../src/services//TMDB/movieService';
import { cardMedia } from '../../src/utils/messageHelper';
import { getMoviePopular, sendMedia } from '../utils/handleTextHelper';

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

    default:
      // code block
  }
  // if(text === 'movie popular') {
    
  // }


  return;
  
};