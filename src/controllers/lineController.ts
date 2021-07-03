import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage, MessageAPIResponseBase, FlexBubble, FlexMessage } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import * as BookmarkService from '../../src/services/bookmarkService';
import * as MovieService from '../../src/services//TMDB/movieService';
import { cardMedia } from '../../src/utils/messageHelper';

export const textEventHandler = async (event: WebhookEvent , client:Client): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  console.log(event);
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Process all message related variables here.
  const { replyToken } = event;
  const { text } = event.message;
  

  if(text === 'movie popular') {
    const movies = await MovieService.discoverMovie();
    console.log(movies);
    let replyArr = [];
    for(let i = 0; i<movies.results.length; i++) {
      if(i < 6) {
        const response: FlexMessage = cardMedia(movies.results[i]);
        replyArr.push(response);
      } else {
        const text: TextMessage = {
          type : "text",
          text : movies.results[i].title
        }
        replyArr.push(text);
      }
      
    }
    await client.replyMessage(replyToken, replyArr);
  }


  return;
  
};